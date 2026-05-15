export default function FeaturedBooks() {
  const books = [
    { id: 1,
      cover: "https://images-na.ssl-images-amazon.com/images/I/51-nXsSRfZL._SX329_BO1,204,203,200_.jpg",
      title: "Atomic Habits", 
      author: "James Clear" },
    { id: 2, 
      cover: "https://tse3.mm.bing.net/th/id/OIP.xlJ7Ym0GXIQYBR6C5v1TSQHaJQ?rs=1&pid=ImgDetMain&o=7&rm=3",
      title: "Rich Dad Poor Dad", 
      author: "Robert Kiyosaki" },
    { id: 3, 
      cover: "https://th.bing.com/th/id/R.e49e4d33dd7f6c8a818a3f826f121537?rik=ZPBPzVndLsIb3A&pid=ImgRaw&r=0.jpg",
      title: "The Alchemist", 
      author: "Paulo Coelho" },
    { id: 4, 
      cover: "https://my-test-11.slatic.net/p/3e55e57fac4d8d71f675f3f1a14764b3.jpg",
      title: "Think and Grow Rich", 
      author: "Napoleon Hill" },
  ];

  return (
    <section className="bg-black border-t border-white/10 text-gray-400 py-20">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-3xl font-bold mb-10 text-center">
          ⭐ Featured Books
        </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
            >
              <div className="h-40 bg-gray-200 rounded mb-4"
                style={{ backgroundImage: `url(${book.cover})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              ></div>

              <h3 className="font-bold">{book.title}</h3>
              <p className="text-sm text-gray-500">{book.author}</p>

              <button className="mt-4 w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800">
                View Book
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}