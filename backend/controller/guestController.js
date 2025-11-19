const sendEmail = require("../utils/mailer");
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
  if (req.method !== "POST")
    return res.status(405).json({ message: "Metoda nije podržana." });

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

  try {
    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: "Online prijava",
      replyTo: email,
      html: `
        <h3>Detalji prijave:</h3>
        <p><strong>Ime i prezime:</strong> ${person}</p>
        <p><strong>Email korisnika:</strong> ${email}</p>
        <p><strong>Datum rođenja:</strong> ${date}</p>
        <p><strong>Mjesto rođenja:</strong> ${placeOfBirth}</p>
        <p><strong>Kontakt broj:</strong> ${phoneNumber}</p>
        <p><strong>Kategorije:</strong> ${categories.join(", ")}</p>
        <p><strong>Napomena:</strong> ${message}</p>
      `,
    });

    res.status(200).json({ message: "Email je uspješno poslan!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Greška pri slanju e-maila.", error: error.message });
  }
};

exports.sendInquiry = async (req, res) => {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Metoda nije podržana." });

  const { person, email, phoneNumber, message } = req.body;

  console.log("Received data:", req.body);

  try {
    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: "Upit za autoškolu",
      replyTo: email,
      html: `
        <p><strong>Ime i prezime:</strong> ${person}</p>
        <p><strong>Email korisnika:</strong> ${email}</p>
        <p><strong>Kontakt broj:</strong> ${phoneNumber}</p>
        <p><strong>Poruka:</strong> ${message}</p>
      `,
    });

    res.status(200).json({ message: "Email je uspješno poslan!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Greška pri slanju e-maila.", error: error.message });
  }
};
