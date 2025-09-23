import { useState } from 'react'

export function useLoadingState(initialState = false) {
  const [isLoading, setIsLoading] = useState(initialState)

  const startLoading = () => setIsLoading(true)
  const stopLoading = () => setIsLoading(false)

  const withLoading = async (callback: () => Promise<any>) => {
    try {
      startLoading()
      await callback()
    } finally {
      stopLoading()
    }
  }

  return {
    isLoading,
    startLoading,
    stopLoading,
    withLoading,
  }
}