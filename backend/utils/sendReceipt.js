import transporter
  from "../config/mail.js";

const sendReceipt =
  async ({
    email,
    books,
    amount,
    reference,
  }) => {
    const booksHtml =
      books
        .map(
          (book) => `
            <li>
              ${book.title}
            </li>
          `
        )
        .join("");

    const mailOptions = {
      from:
        `"UketBooks" <${process.env.EMAIL_USER}>`,

      to: email,

      subject:
        "Payment Successful - Ebook Purchase",

      html: `
        <div
          style="
            font-family:
            Arial,
            sans-serif;
            padding:20px;
          "
        >
          <h2>
            Thank you for your purchase!
          </h2>

          <p>
            Your payment was successful.
          </p>

          <h3>
            Purchased Books:
          </h3>

          <ul>
            ${booksHtml}
          </ul>

          <p>
            <strong>
              Total:
            </strong>
            ₦${amount}
          </p>

          <p>
            <strong>
              Reference:
            </strong>
            ${reference}
          </p>

          <p>
            Your ebooks are now
            available in your
            library.
          </p>

          <a href="BOOK_URL">
            Download Ebook
          </a>

          <hr />

          <p
            style="
              color:gray;
              font-size:12px;
            "
          >
            UketBooks Digital
          </p>
        </div>
      `,
    };

    await transporter.sendMail(
      mailOptions
    );
  };

export default sendReceipt;