import { createContext, useContext, useState } from "react";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  // Add book to cart
  const addToCart = (book) => {
    setCart((prev) => [...prev, book]);
  };

  // Remove book from cart
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <StoreContext.Provider
      value={{
        books,
        setBooks,
        cart,
        addToCart,
        removeFromCart,
        user,
        setUser,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore must be used inside StoreProvider");
  }

  return context;
}