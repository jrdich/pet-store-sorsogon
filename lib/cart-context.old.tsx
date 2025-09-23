"use client"

import { createContext, useContext, useReducer, useEffect, useState } from "react"
import type { ReactNode } from "react"
import { useSession } from "next-auth/react"

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  category: string
}

interface CartState {
  items: CartItem[]
  totalItems: number
  totalAmount: number
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
  addToCart: (item: Omit<CartItem, "quantity">) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
} | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find((item) => item.id === action.payload.id)

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
        )

        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + 1,
          totalAmount: state.totalAmount + action.payload.price,
        }
      }

      const newItem = { ...action.payload, quantity: 1 }
      return {
        ...state,
        items: [...state.items, newItem],
        totalItems: state.totalItems + 1,
        totalAmount: state.totalAmount + action.payload.price,
      }
    }

    case "REMOVE_ITEM": {
      const itemToRemove = state.items.find((item) => item.id === action.payload)
      if (!itemToRemove) return state

      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        totalItems: state.totalItems - itemToRemove.quantity,
        totalAmount: state.totalAmount - itemToRemove.price * itemToRemove.quantity,
      }
    }

    case "UPDATE_QUANTITY": {
      const item = state.items.find((item) => item.id === action.payload.id)
      if (!item) return state

      const quantityDiff = action.payload.quantity - item.quantity

      if (action.payload.quantity <= 0) {
        return cartReducer(state, { type: "REMOVE_ITEM", payload: action.payload.id })
      }

      const updatedItems = state.items.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item,
      )

      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems + quantityDiff,
        totalAmount: state.totalAmount + item.price * quantityDiff,
      }
    }

    case "CLEAR_CART":
      return {
        items: [],
        totalItems: 0,
        totalAmount: 0,
      }

    case "LOAD_CART":
      const totalItems = action.payload.reduce((sum, item) => sum + item.quantity, 0)
      const totalAmount = action.payload.reduce((sum, item) => sum + item.price * item.quantity, 0)

      return {
        items: action.payload,
        totalItems,
        totalAmount,
      }

    default:
      return state
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const [isInitialized, setIsInitialized] = React.useState(false)
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    totalItems: 0,
    totalAmount: 0,
  })

  // Load cart from localStorage or API on mount and when session changes
  // useEffect(() => {
  //   let isSubscribed = true;

  //   const loadCart = async () => {
  //     if (session?.user) {
  //       // Load from API for authenticated users
  //       try {
  //         const response = await fetch("/api/cart")
  //         if (response.ok) {
  //           const cartData = await response.json()
  //           if (isSubscribed) {
  //             dispatch({ type: "LOAD_CART", payload: cartData.items || [] })
  //           }
  //         } else {
  //           console.error("Failed to load cart:", await response.text())
  //         }
  //       } catch (error) {
  //         console.error("Failed to load cart from API:", error)
  //         // Try to load from localStorage as fallback
  //         const savedCart = localStorage.getItem("cart")
  //         if (savedCart && isSubscribed) {
  //           try {
  //             const cartItems = JSON.parse(savedCart)
  //             dispatch({ type: "LOAD_CART", payload: cartItems })
  //           } catch (e) {
  //             console.error("Failed to parse cart from localStorage:", e)
  //           }
  //         }
  //       }
  //     } else {
  //       // Load from localStorage for guest users
  //       const savedCart = localStorage.getItem("cart")
  //       if (savedCart && isSubscribed) {
  //         try {
  //           const cartItems = JSON.parse(savedCart)
  //           dispatch({ type: "LOAD_CART", payload: cartItems })
  //         } catch (error) {
  //           console.error("Failed to parse cart from localStorage:", error)
  //         }
  //       }
  //     }
  //   }

  //   loadCart()

  //   // Cleanup subscription on unmount
  //   return () => {
  //     isSubscribed = false
  //   }
  // }, [session])

  useEffect(() => {
    let isSubscribed = true;
    let initialLoadComplete = false;

    const loadCart = async () => {
      if (!initialLoadComplete && session?.user) {
        try {
          const response = await fetch("/api/cart");
          if (response.ok) {
            const cartData = await response.json();
            if (isSubscribed) {
              dispatch({ type: "LOAD_CART", payload: cartData.items || [] });
              // Save to localStorage as backup
              localStorage.setItem("cart", JSON.stringify(cartData.items));
            }
          }
        } catch (error) {
          console.error("Failed to load cart:", error);
          // Fallback to localStorage
          const savedCart = localStorage.getItem("cart");
          if (savedCart && isSubscribed) {
            dispatch({ type: "LOAD_CART", payload: JSON.parse(savedCart) });
          }
        }
        initialLoadComplete = true;
      }
    };

    loadCart();
    return () => {
      isSubscribed = false;
    };
  }, [session]);


  // Save cart to localStorage or API when cart changes
  useEffect(() => {
    if (!isInitialized) return;

    const saveCart = async () => {
      console.log("Saving cart items:", state.items);
      
      // Always save to localStorage
      localStorage.setItem("cart", JSON.stringify(state.items))

      if (session?.user) {
        try {
          console.log("Saving cart to API...");
          const response = await fetch("/api/cart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ items: state.items }),
          })
          
          if (!response.ok) {
            const errorText = await response.text();
            console.error("Failed to save cart:", errorText)
            throw new Error(errorText);
          }
          
          console.log("Cart saved successfully to API");
        } catch (error) {
          console.error("Failed to save cart to API:", error)
        }
      }
    }

    const delayedSave = setTimeout(saveCart, 500)
    return () => clearTimeout(delayedSave)
    
  }, [state.items, session, isInitialized])

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    dispatch({ type: "ADD_ITEM", payload: item })
  }

  const removeFromCart = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
