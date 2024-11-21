const nodemailer = require("nodemailer");
const Test = require("../models/test");

exports.getTest = async (req, res) => {
  const testname = req.params.id;
  try {
    const test = await Test.findOne({ testName: testname });
    res.status(200).json(test);
  } catch (error) {
    console.error("Error fetching test:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.sendOnlineApplication = async (req, res) => {
  if (req.method === "POST") {
    const {
      person,
      email,
      date,
      placeOfBirth,
      phoneNumber,
      categories,
      message,
    } = req.body;

    // Log the request body to check if it's coming correctly
    console.log("Received data:", req.body);

    // Continue with email sending process
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "jure@gmail.com", // Sender's email
        pass: "", // App password for Gmail (if 2FA is enabled)
      },
    });

    const mailOptions = {
      from: `"Online Prijava" <${email}>`, // Sender
      to: "jure@gmail.com", // Receiver (fixed email)
      subject: "Nova prijava putem online forme", // Email subject
      html: `
        <h3>Detalji prijave:</h3>
        <p><strong>Ime i prezime:</strong> ${person}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Datum rođenja:</strong> ${date.day}.${date.month}.${
        date.year
      }</p>
        <p><strong>Mjesto rođenja:</strong> ${placeOfBirth}</p>
        <p><strong>Kontakt broj:</strong> ${phoneNumber}</p>
        <p><strong>Kategorije:</strong> ${categories.join(", ")}</p>
        <p><strong>Poruka:</strong> ${message}</p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email je uspješno poslan!" });
    } catch (error) {
      // Log the error to understand what went wrong with sending the email
      console.error("Error while sending email:", error);
      res.status(500).json({ message: "Greška pri slanju e-maila." });
    }
  } else {
    res.status(405).json({ message: "Metoda nije podržana." });
  }
};
