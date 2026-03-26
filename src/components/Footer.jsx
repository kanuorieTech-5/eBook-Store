export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">

        {/* Logo / About */}
        <div>
          <h2 className="text-xl font-bold mb-4">📚 E-Library</h2>
          <p className="text-gray-400">
            Discover thousands of books, learning resources, and digital
            libraries all in one place.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>

          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="/books" className="hover:text-white">
                Browse Books
              </a>
            </li>
            <li>
              <a href="/profile" className="hover:text-white">
                My Profile
              </a>
            </li>
            <li>
              <a href="/library" className="hover:text-white">
                My Library
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-4">Contact</h3>

          <p className="text-gray-400">
            Email: support@elibrary.com
          </p>

          <p className="text-gray-400">
            Built with ❤️ using React
          </p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-4 text-gray-500">
        © {new Date().getFullYear()} E-Library. All rights reserved.
      </div>

    </footer>
  );
}