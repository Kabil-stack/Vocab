require("dotenv").config({ path: "./config.env" });
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);
async function sendMail({ to, subject, text }) {
  try {
    await resend.emails.send({
      from: {
        name: "Vocab",
        address: process.env.SENDER_MAIL,
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
