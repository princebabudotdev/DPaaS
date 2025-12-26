import config from "../config/config.js";
import transporter from "../config/email.config.js";

export const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `${config.GOOGLE_EMAIL_USER}`,
      to,
      subject,
      text,
      html,
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    throw new Error(500, "Failed to send email");
  }
};
