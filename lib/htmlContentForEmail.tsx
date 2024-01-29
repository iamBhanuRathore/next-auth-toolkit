import React from "react";

export const EmailTemplate = ({
  username,
  companyName,
  otp,
}: {
  username: string;
  companyName: string;
  otp: string;
}) => {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        body {
          font-family: "Arial", sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f0f4f8;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }
  
        .container {
          max-width: 24rem;
          width: 100%;
          background-color: #ffffff;
          border-radius: 0.5rem;
          box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
          padding: 1.5rem;
          position: relative;
          overflow: hidden;
        }
  
        .close-button {
          position: absolute;
          top: 1rem;
          right: 1rem;
          color: #6b7280;
          cursor: pointer;
          transition: color 0.3s ease-in-out;
        }
  
        .close-button:hover {
          color: #4a5568;
        }
  
        .icon-success {
          width: 4rem;
          height: 4rem;
          color: #2b6cb0;
          margin-bottom: 1rem;
        }
  
        .title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2d3748;
          margin-top: 1rem;
        }
  
        .otp {
          font-size: 2rem;
          font-weight: bold;
          margin-top: 1rem;
          color: #2b6cb0;
        }
  
        .info-text {
          color: #4a5568;
          margin-top: 1.5rem;
          text-align: center;
          line-height: 1.5;
          font-size: 1rem;
        }
  
        .info-link {
          color: #4299e1;
          text-decoration: none;
          border-bottom: 1px solid #4299e1;
          cursor: pointer;
          transition: color 0.3s ease-in-out;
        }
  
        .info-link:hover {
          color: #3182ce;
        }
  
        .info-text-resend {
          margin-top: 1rem;
        }
  
        .username-company {
          font-size: 1.1rem;
          font-weight: 600;
          margin-top: 1rem;
          color: #2d3748;
        }
  
        .footer {
          margin-top: 2rem;
          text-align: center;
          color: #6b7280;
          font-size: 0.8rem;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <button class="close-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <line x1="3" x2="21" y1="9" y2="9" />
            <path d="m9 16 3-3 3 3" />
          </svg>
        </button>
        <div>
          <svg
            class="icon-success"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <h2 class="title">Email Confirmation</h2>
          <h3 class="otp">OTP: ${otp}</h3>
          <p class="info-text">
            Thank you for choosing our service! To complete your account
            registration, please use the following One-Time Password (OTP):
            <a class="info-link" href="#">{receiver's mail}</a>. This OTP is valid
            for a short period. Please enter it on our website/app to verify your
            account.
          </p>
          <p class="info-text info-text-resend">
            If you did not request this OTP, please contact our support
            immediately or
            <a class="info-link" href="#">Resend confirmation mail</a>.
          </p>
          <h3 class="username-company">Username: JohnDoe</h3>
          <h3 class="username-company">Company: ${companyName}</h3>
        </div>
      </div>
      <footer class="footer">
        <p>© 2024 ${companyName}</p>
      </footer>
    </body>
  </html>
  `;
};
