import nodemailer from "nodemailer";

// =====================================
// SEND CONTACT MESSAGE
// =====================================
export const sendContactMessage = async (req, res) => {
  try {
    const {
      name,
      email,
      subject,
      message,
    } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // =====================================
    // EMAIL TRANSPORTER
    // =====================================
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // =====================================
    // SEND TO SUPPORT
    // =====================================
    await transporter.sendMail({
      from: `"UketBooks Contact Form" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: `📩 ${subject}`,
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px">
          <h2>New Contact Message</h2>

          <hr>

          <p><strong>Name:</strong> ${name}</p>

          <p><strong>Email:</strong> ${email}</p>

          <p><strong>Subject:</strong> ${subject}</p>

          <p><strong>Message:</strong></p>

          <div style="padding:15px;background:#f7f7f7;border-radius:8px;">
            ${message}
          </div>

        </div>
      `,
    });

    // =====================================
    // AUTO REPLY TO CUSTOMER
    // =====================================
    await transporter.sendMail({
      from: `"UketBooks Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "We've received your message",
      html: `
        <div style="font-family:Arial,sans-serif;padding:30px">

          <h2>Hello ${name}, 👋</h2>

          <p>
            Thank you for contacting
            <strong>UketBooks</strong>.
          </p>

          <p>
            We've received your message and our support
            team will respond within 24 hours.
          </p>

          <hr>

          <p><strong>Your Subject:</strong></p>

          <p>${subject}</p>

          <p><strong>Your Message:</strong></p>

          <p>${message}</p>

          <br>

          <p>
            Regards,
            <br>
            <strong>UketBooks Support Team</strong>
          </p>

        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });

  } catch (error) {
    console.error("CONTACT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};