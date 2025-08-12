import { createTransport } from "nodemailer";

// Create a test account or replace with real credentials.
const sendMail = async ({ to, from, subject, body }) => {
  const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: from,
      pass: "qzer ezgg nhrz raur",
    },
  });
  const info = await transporter.sendMail({
    from: `"Quizzy" <${from}>`,
    to: to,
    subject: subject,
    text: body,
    html: body,
  });
  return info;
};

export default sendMail;
