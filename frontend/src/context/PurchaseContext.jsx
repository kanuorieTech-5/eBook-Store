import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const PurchaseContext =
  createContext();

export function PurchaseProvider({
  children,
}) {

  const [purchases,
    setPurchases] =
    useState(() => {

      const saved =
        localStorage.getItem(
          "uketbooks-purchases"
        );

      return saved
        ? JSON.parse(saved)
        : [];
    });

  /* SAVE PURCHASES */
  useEffect(() => {

    localStorage.setItem(
      "uketbooks-purchases",
      JSON.stringify(purchases)
    );

  }, [purchases]);

  /* ADD PURCHASE */
  const addPurchase = (
    books
  ) => {

    setPurchases((prev) => {

      const existingIds =
        prev.map(
          (item) => item.id
        );

      const newBooks =
        books.filter(
          (book) =>
            !existingIds.includes(
              book.id
            )
        );

      return [
        ...prev,
        ...newBooks,
      ];
    });
  };

  /* CHECK OWNERSHIP */
  const hasPurchased = (
    bookId
  ) => {

    return purchases.some(
      (book) =>
        book.id === bookId
    );
  };

  return (
    <PurchaseContext.Provider
      value={{
        purchases,
        addPurchase,
        hasPurchased,
      }}
    >
      {children}
    </PurchaseContext.Provider>
  );
}

export const usePurchases =
  () =>
    useContext(
      PurchaseContext
    );