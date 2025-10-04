// "use server"

// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export const sendEmail = async () => {
//     await resend.emails.send({
//         from: 'john.c@strastan.com',
//         to: 'johnraphaelchavaria02@gmail.com',
//         subject: 'hello world',
//         html: '<strong>it works!</strong>',
//     });
// }

//(2)
"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

interface EmailData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

interface AppointmentData {
  petName: string
  petType: string
  service: string
  date: string
  time: string
  notes: string
  ownerName: string
  ownerEmail: string
}

export const sendAppointmentEmail = async (data: AppointmentData) => {
  try {
    const { petName, petType, service, date, time, notes, ownerName, ownerEmail } = data

    const { data: emailData, error } = await resend.emails.send({
      from: 'Veterinary <onboarding@resend.dev>',
      to: 'johnraphaelchavaria02@gmail.com',
      subject: `New Veterinary Appointment Booking`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.5;
                margin: 0;
              }
              .header {
                background-color: #059669;
                color: white;
                padding: 20px;
                text-align: center;
              }
              .content {
                padding: 20px;
                color: #374151;
              }
              .field {
                margin-bottom: 12px;
              }
              .label {
                color: #6b7280;
                font-size: 14px;
              }
              .value {
                font-size: 16px;
              }
              .footer {
                color: #6b7280;
                font-size: 12px;
                text-align: center;
                padding: 20px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h2>New Veterinary Appointment</h2>
              <p>Received on ${new Date().toLocaleDateString()}</p>
            </div>
            
            <div class="content">
              <div class="field">
                <div class="label">Owner Name:</div>
                <div class="value">${ownerName}</div>
              </div>
              
              <div class="field">
                <div class="label">Owner Email:</div>
                <div class="value">${ownerEmail}</div>
              </div>
              
              <div class="field">
                <div class="label">Pet Name:</div>
                <div class="value">${petName}</div>
              </div>
              
              <div class="field">
                <div class="label">Pet Type:</div>
                <div class="value">${petType}</div>
              </div>
              
              <div class="field">
                <div class="label">Service:</div>
                <div class="value">${service}</div>
              </div>
              
              <div class="field">
                <div class="label">Date:</div>
                <div class="value">${date}</div>
              </div>
              
              <div class="field">
                <div class="label">Time:</div>
                <div class="value">${time}</div>
              </div>
              
              <div class="field">
                <div class="label">Notes:</div>
                <div class="value">${notes || 'No additional notes'}</div>
              </div>
            </div>

            <div class="footer">
              This is an automated message from Veterinary appointment booking.
              <br>
              © ${new Date().getFullYear()} Veterinary Services. All rights reserved.
            </div>
          </body>
        </html>
      `
    })

    if (error) {
      throw new Error(error.message)
    }

    return { success: true, data: emailData }
  } catch (error) {
    console.error('Appointment email error:', error)
    return { success: false, error: 'Failed to send appointment email' }
  }
}

export const sendEmail = async (data: EmailData) => {
  try {
    const { name, email, phone, subject, message } = data

    const { data: emailData, error } = await resend.emails.send({
      from: 'Pet Store Sorsogon <onboarding@resend.dev>',
      to: 'johnraphaelchavaria02@gmail.com',
      subject: `New Contact Form Submission`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.5;
                margin: 0;
              }
              .header {
                background-color: #6366f1;
                color: white;
                padding: 20px;
                text-align: center;
              }
              .content {
                padding: 20px;
                color: #374151;
              }
              .field {
                margin-bottom: 12px;
              }
              .label {
                color: #6b7280;
                font-size: 14px;
              }
              .value {
                font-size: 16px;
              }
              .footer {
                color: #6b7280;
                font-size: 12px;
                text-align: center;
                padding: 20px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h2>New Contact Form Submission</h2>
              <p>Received on ${new Date().toLocaleDateString()}</p>
            </div>
            
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${email}</div>
              </div>
              
              <div class="field">
                <div class="label">Phone:</div>
                <div class="value">${phone}</div>
              </div>
              
              <div class="field">
                <div class="label">Subject:</div>
                <div class="value">${subject}</div>
              </div>
              
              <div class="field">
                <div class="label">Message:</div>
                <div class="value">${message}</div>
              </div>
            </div>

            <div class="footer">
              This is an automated message from Pet Store Sorsogon's contact form.
              <br>
              © ${new Date().getFullYear()} Pet Store Sorsogon. All rights reserved.
            </div>
          </body>
        </html>
      `
    })

    if (error) {
      throw new Error(error.message)
    }

    return { success: true, data: emailData }
  } catch (error) {
    console.error('Email error:', error)
    return { success: false, error: 'Failed to send email' }
  }
}
