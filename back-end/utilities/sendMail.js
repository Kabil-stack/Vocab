require("dotenv").config({ path: "./config.env" });
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMPT_USER,
    pass: process.env.SMPT_PASS,
  },
});

async function sendMail({ to, subject, text }) {
  try {
    await transporter.sendMail({
      from: {
        name: "Vocab",
        address: process.env.SMPT_USER,
      },
      to,
      subject,
      text,
    });
    console.log("mail sent successfully");
  } catch (err) {
    next(err);
  }
}

module.exports = sendMail;
