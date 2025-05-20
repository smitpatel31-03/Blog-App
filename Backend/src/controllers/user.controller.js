import { Email } from "../model/email.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import nodemailer from "nodemailer";

const addEmailSubscribe = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  const checkmail = await Email.findOne({ email });

  if (checkmail) {
    return res.status(409).json({ success: false, message: "Email already subscribed" });
  }

  // Save email in DB
  await Email.create({ email });

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "maddison53@ethereal.email",
      pass: "jn7jnAPss4f63QBp6D",
    },
  });

  const mailOptions = {
    from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
    to: "your-real-email@example.com", // Send *TO YOU*, not to the user
    subject: "New Email Subscription",
    text: `A new user subscribed with this email: ${email}`,
  };

  // Send email
  const info = await transporter.sendMail(mailOptions);

  // You can preview the email at Ethereal
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  return res.status(200).json({ success: true, message: "Subscription successful" });
});

export { addEmailSubscribe };
