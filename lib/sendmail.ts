import nodemailer from "nodemailer";
import { google } from "googleapis";
import { EmailTemplate } from "./htmlContentForEmail";

const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_CLIENT_REDIRECT_URL // Redirect URL
);
oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_CLIENT_REFRESH_TOKEN,
});

export async function sendMail(
  data = {
    email: "bhanuofficepes@gmail.com",
    subject: "This is subject of my mail",
    message: "This is the text message of my mail",
  }
) {
  const accessToken = oauth2Client.getAccessToken((err, accessToken) => {
    if (err) {
      console.error("GoogleToken Error", err.message);
      return;
    }
    return accessToken;
    // Use the access token to send the email
  });
  const transporter = nodemailer.createTransport({
    // smtpTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.GOOGLE_MAIL,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_CLIENT_REFRESH_TOKEN,
      accessToken: accessToken,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const mailOptions = {
    from: `NEXT-AUTH-TOOLKIT <${process.env.GOOGLE_MAIL}>`,
    to: data.email,
    subject: data.subject,
    html: EmailTemplate({
      username: "Reciever's Name",
      companyName: "Next Auth Toolkit",
      otp: "696969",
    }),
  };
  // console.log({ mailOptions });
  await transporter.sendMail(mailOptions);
}
