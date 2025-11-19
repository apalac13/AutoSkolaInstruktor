const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async ({ email, to, subject, html }) => {
  try {
    await sgMail.send({
      from: email,
      to: process.env.EMAIL_USER,
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
