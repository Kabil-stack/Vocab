require("dotenv").config({ path: "./config.env" });

const { BrevoClient } = require("@getbrevo/brevo");

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
});

async function sendMail({ to, subject, text }) {
  try {
    await brevo.transactionalEmails.sendTransacEmail({
      sender: {
        name: "Vocab",
        email: process.env.SENDER_MAIL,
      },
      to: [{ email: to }],
      subject,
      textContent: text,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = sendMail;
