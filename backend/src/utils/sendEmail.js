import config from "../config/config.js";
import transporter from "../config/email.config.js";

export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"DPaaS" <${config.GOOGLE_EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("EMAIL SENT ✅", info.messageId);
    return info;

  } catch (error) {
    console.error("NODEMAILER ERROR ❌", error); // 🔥 IMPORTANT
    throw error; // DO NOT overwrite it
  }
};
