const nodemailer = require("nodemailer");

// =====================================
// SEND CONTACT MESSAGE
// =====================================
exports.sendContactMessage =
  async (req, res) => {
    try {
      const {
        name,
        email,
        subject,
        message,
      } = req.body;

      // Validation
      if (
        !name ||
        !email ||
        !subject ||
        !message
      ) {
        return res.status(400).json({
          success: false,
          message:
            "All fields are required",
        });
      }

      // =====================================
      // TRANSPORTER
      // =====================================
      const transporter =
        nodemailer.createTransport({
          service: "gmail",

          auth: {
            user:
              process.env.EMAIL_USER,

            pass:
              process.env.EMAIL_PASS,
          },
        });

      // =====================================
      // EMAIL OPTIONS
      // =====================================
      const mailOptions = {
        from: email,

        to:
          process.env.EMAIL_USER,

        subject: `Contact Form: ${subject}`,

        html: `
          <h2>New Contact Message</h2>

          <p>
            <strong>Name:</strong>
            ${name}
          </p>

          <p>
            <strong>Email:</strong>
            ${email}
          </p>

          <p>
            <strong>Subject:</strong>
            ${subject}
          </p>

          <p>
            <strong>Message:</strong>
          </p>

          <p>${message}</p>
        `,
      };

      // =====================================
      // SEND EMAIL
      // =====================================
      await transporter.sendMail(
        mailOptions
      );

      res.status(200).json({
        success: true,
        message:
          "Message sent successfully",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to send message",
      });
    }
  };