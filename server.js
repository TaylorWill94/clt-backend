// const app = require("./app");
// const port = 3000;

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// const app = require("./app");
const express = require("express");
const app = express();
const cors = require("cors");
const nodemailer = require("nodemailer");

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
// app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send("Welcome");
});

app.post("/send-email", (req, res) => {
  const { name, email, message } = req.body;

  // Create a transporter with your email provider's SMTP settings
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "taylasouul@gmail.com",
      pass: "sbmsqqqonnavsbdz",
    },
    debug: true,
  });

  // Prepare the email data
  const mailOptions = {
    from: `<${email}>`,
    to: "taylasouul@gmail.com",
    subject: "New Contact Form Submission",
    replyTo: ` <${email}>`,
    text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      console.log("Error sending email:", error.message);
      console.log("Stack trace:", error.stack);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.send("Email sent successfully");
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
