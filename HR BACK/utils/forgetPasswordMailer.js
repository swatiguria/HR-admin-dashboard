import nodemailer from "nodemailer";
import env from "dotenv";

env.config();

export default async function forgetPasswordMailer(email, id, token) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASS,
      },
      port: 465,
      host: "smtp.gmail.com",
    });
    const mailOptions = {
      from: `"HR-Admin" <${email}>`,
      to: `${email}`,
      subject: "HR - Reset Password",
      html: `
      <div style="padding:40px 40px"><h2>Please click the link below to reset your password</h2>
      <a href="http://localhost:3000/reset-password/${id}/${token}" style="padding:10px 20px; background-color: #697ce4;text-decoration:none; font-size:1.3rem; margin-top:2rem; border-radius:10px; color:white; border:none; box-shadow: 0px 10px 10px gray" >Reset Your Password</a></div>
      `,
    };
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}
