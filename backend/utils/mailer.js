const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, html, replyTo }) => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject,
      html,
      reply_to: replyTo || "askinstruktor@gmail.com",
    });

    console.log("Email poslan");
  } catch (error) {
    console.error("Resend error:", error);
    throw error;
  }
};

module.exports = sendEmail;
