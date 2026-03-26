📚 eBook-Store

A modern, responsive React frontend for an online eBook store, featuring search, category filters, book details, a cart, and a checkout/payment prototype. Built with React, Tailwind CSS, and Vite.

Live Demo:
coming soon...

Features:

Browse books by category or search by title
View book details including title, author, description, price, and cover
Add to cart and view cart items
Mock checkout/payment system
Profile page for user info and saved courses
Fully responsive, mobile-first design

Technologies Used:

React – Frontend UI
Vite – Fast development build tool
Tailwind CSS – Modern styling
React Router DOM – Page routing
LocalStorage – Save user data and cart items

Getting Started:

1. Clone the repository
git clone https://github.com/stephaniekanu-5/eBook-Store
cd eBook-Store
2. Install dependencies
npm install
3. Start development server
npm run dev

Visit http://localhost:5173/ to see the app in your browser.

Project Structure:

eBook-Store/
├─ public/                  # Static assets
│   └─ covers/              # Book cover images
├─ src/
│   ├─ components/          # Reusable UI components
│   ├─ context/             # Cart and Auth context
│   ├─ data/                # Sample books data
│   ├─ pages/               # All page components (Books, Profile, Cart, Checkout)
│   └─ App.jsx              # Main app with routes
├─ package.json
└─ README.md

How to Use:

Browse books on the home page
Filter by category or search by title
Click “Buy Now” to add to cart
View your cart and proceed to checkout
Edit your profile and manage saved courses

Note: Payment is currently a mock simulation.

Future Improvements

Integrate secure backend & database
Real payment gateway (Stripe, PayPal, etc.)
User authentication & authorization
Persistent user sessions across devices

Author

Stephanie Kanu – Frontend Developer
GitHub | LinkedIn