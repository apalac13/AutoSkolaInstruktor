const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async ({ to, subject, html, replyTo }) => {
  try {
    await sgMail.send({
      from: process.env.EMAIL_USER,
      to,
      subject,
      reply_to: replyTo,
      html,
    });
    console.log("Email poslan");
  } catch (error) {
    console.error("Greška pri slanju emaila:", error.response?.body || error);
    throw error;
  }
};

module.exports = sendEmail;
