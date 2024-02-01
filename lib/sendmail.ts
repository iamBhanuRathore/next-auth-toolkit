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
type Props = {
  token: string;
  username: string;
  userMail: string;
};
export async function sendMail({ token, userMail, username }: Props) {
  const accessToken = oauth2Client.getAccessToken((err, accessToken) => {
    if (err) {
      console.error("GoogleToken Error", err.message);
      return;
    }
    return accessToken;
    // Use the access token to send the email
  });
  const transporter = nodemailer.createTransport({
    //@ts-ignore
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
    from: `NEXT-AUTH-TOOLKIT <${process.env.VERIFICATION_CODE_EMAIL}>`,
    to: userMail,
    subject: "Authentication Mail !",
    html: EmailTemplate({
      username,
      token,
    }),
  };
  // console.log({ mailOptions });
  await transporter.sendMail(mailOptions);
}
