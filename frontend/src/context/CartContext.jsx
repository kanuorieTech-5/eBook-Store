import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const CartContext =
  createContext();

export function CartProvider({
  children,
}) {

  /* LOAD SAVED CART */
  const [cart, setCart] =
    useState(() => {

      const savedCart =
        localStorage.getItem(
          "uketbooks-cart"
        );

      return savedCart
        ? JSON.parse(savedCart)
        : [];
    });

  /* SAVE CART */
  useEffect(() => {

    localStorage.setItem(
      "uketbooks-cart",
      JSON.stringify(cart)
    );

  }, [cart]);

  /* ADD TO CART */
  const addToCart = (book) => {

    const existingBook =
      cart.find(
        (item) =>
          item.id === book.id
      );

    if (existingBook) {

      setCart((prev) =>
        prev.map((item) =>
          item.id === book.id
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
              }
            : item
        )
      );

    } else {

      setCart((prev) => [
        ...prev,
        {
          ...book,
          quantity: 1,
        },
      ]);
    }
  };

  /* REMOVE ITEM */
  const removeFromCart = (
    id
  ) => {

    setCart((prev) =>
      prev.filter(
        (item) =>
          item.id !== id
      )
    );
  };

  /* INCREASE QUANTITY */
  const increaseQuantity = (
    id
  ) => {

    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
      )
    );
  };

  /* DECREASE QUANTITY */
  const decreaseQuantity = (
    id
  ) => {

    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity:
                  item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) =>
            item.quantity > 0
        )
    );
  };

  /* CLEAR CART */
  const clearCart = () => {
    setCart([]);
  };

  /* TOTALS */
  const totalItems =
    cart.reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    );

  const totalPrice =
    cart.reduce(
      (sum, item) =>
        sum +
        Number(item.price) *
          item.quantity,
      0
    );

  return (
    <CartContext.Provider
      value={{
        cart,

        addToCart,

        removeFromCart,

        increaseQuantity,

        decreaseQuantity,

        clearCart,

        totalItems,

        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () =>
  useContext(CartContext);