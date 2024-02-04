export const TwoFactorOTPTemplate = ({
  username,
  token,
}: {
  username: string;
  token: string;
}) => {
  const companyName = process.env.PRODUCT_NAME;
  return `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style>
            body {
              font-family: 'Arial', sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f0f4f8;
            }
            .container {
              max-width: 600px;
              margin: auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 5px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
  
            h1 {
              color: #2b6cb0;
            }
  
            p {
              margin: 10px 0;
            }
  
            code {
              background-color: #f0f4f8;
              padding: 2px 5px;
              border-radius: 3px;
              font-family: 'Courier New', monospace;
              font-size: 1.1em;
              color: #2b6cb0;
            }
  
            .footer {
              margin-top: 20px;
              text-align: center;
              color: #6b7280;
              font-size: 0.8rem;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Two-Factor Authentication</h1>
            <p>Hello <b>${username}</b>,</p>
            <p>We have received a request to verify your identity using two-factor authentication.</p>
            <p>Your One-Time Password (OTP) is: <code>${token}</code></p>
            <p>This OTP is valid for a short period. Please do not share it with anyone.</p>
            <p>If you did not initiate this request, please disregard this email.</p>
            <p>Best regards,</p>
            <p><b>${companyName}</b> Team</p>
          </div>
          <footer class="footer">
            <p>© ${new Date().getFullYear()} ${companyName}</p>
          </footer>
        </body>
      </html>
    `;
};
