import nodemailer from "nodemailer";
import { google } from "googleapis";
import { EmailVerificationTemplate } from "./html-verfication-email";
import { PasswordResetEmailTemplate } from "./html-reset-email";

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
  emailType: "verification" | "password-reset";
};
type MailTemplateFunction = (props: { username: string; token: string; }) => string;

export async function sendMail({ token, userMail, username, emailType }: Props) {
  const mailTemplateConfig: Record<Props['emailType'], MailTemplateFunction> = {
    "verification": EmailVerificationTemplate,
    "password-reset": PasswordResetEmailTemplate
  };
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
    from: `NEXT-AUTH-TOOLKIT`,
    to: userMail,
    subject: "Authentication Mail !",
    html: mailTemplateConfig[emailType]({
      username,
      token,
    }),
  };
  // console.log({ mailOptions });
  await transporter.sendMail(mailOptions);
}

