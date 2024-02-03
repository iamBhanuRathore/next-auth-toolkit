import { ROUTE_NEW_PASSWORD } from "@/routes";

export const PasswordResetEmailTemplate = ({
  username,
  token,
}: {
  username: string;
  token: string;
}) => {
  const verificationLink = `${process.env.NEXT_APP_URL}/${ROUTE_NEW_PASSWORD}?token=${token}`;
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

          a {
            display: inline-block;
            margin-top: 10px;
            padding: 10px 15px;
            background-color: #4299e1;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
          }

          a:hover {
            background-color: #3182ce;
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
          <h1>Password Reset</h1>
          <p>Hello ${username},</p>
          <p>We received a request to reset your password for ${companyName} account.</p>
          <p>If you made this request, please click on the following link to reset your password:</p>
          <a href="${verificationLink}">Reset Password</a>
          <p>If the above button doesn't work, you can also use the following URL:</p>
          <a href="${verificationLink}">${verificationLink}</a>
          <p>If you did not request a password reset, please disregard this email.</p>
          <p>Best regards,</p>
          <p>${companyName} Team</p>
        </div>
        <footer class="footer">
          <p>© ${new Date().getFullYear()} ${companyName}</p>
        </footer>
      </body>
    </html>
  `;
};
