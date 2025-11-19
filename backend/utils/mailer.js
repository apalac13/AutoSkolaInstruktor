const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.EMAIL_PASS);

const sendEmail = async ({ to, subject, html }) => {
  try {
    await sgMail.send({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });
    console.log("Email poslan");
  } catch (error) {
    console.error("Greška pri slanju emaila:", error);
    throw error;
  }
};

module.exports = sendEmail;
