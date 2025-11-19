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

    console.log("Received data:", req.body);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `<${person}>`,
      to: process.env.EMAIL_USER,
      subject: "Online prijava",
      html: `
        <h3>Detalji prijave:</h3>
        <p><strong>Ime i prezime:</strong> ${person}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Datum rođenja:</strong> ${date}</p>
        <p><strong>Mjesto rođenja:</strong> ${placeOfBirth}</p>
        <p><strong>Kontakt broj:</strong> ${phoneNumber}</p>
        <p><strong>Kategorije:</strong> ${categories.join(", ")}</p>
        <p><strong>Napomena:</strong> ${message}</p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email je uspješno poslan!" });
    } catch (error) {
      console.error("Error while sending email:", error);
      res.status(500).json({ message: "Greška pri slanju e-maila." });
    }
  } else {
    res.status(405).json({ message: "Metoda nije podržana." });
  }
};

exports.sendInquiry = async (req, res) => {
  if (req.method === "POST") {
    const { person, email, phoneNumber, message } = req.body;

    console.log("Received data:", req.body);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `<${person}>`,
      to: process.env.EMAIL_USER,
      subject: "Upit za autoškolu",
      html: `
        <p><strong>Ime i prezime:</strong> ${person}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Kontakt broj:</strong> ${phoneNumber}</p>
        <p><strong>Poruka:</strong> ${message}</p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email je uspješno poslan!" });
    } catch (error) {
      console.error("Error while sending email:", error);
      res.status(500).json({ message: "Greška pri slanju e-maila." });
    }
  } else {
    res.status(405).json({ message: "Metoda nije podržana." });
  }
};
