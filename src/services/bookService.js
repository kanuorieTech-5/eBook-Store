import API from "./axios";

// =========================
// GET BOOKS
// =========================
export const getBooks =
  async () => {
    const response =
      await API.get("/books");

    return response.data;
  };

// =========================
// GET SINGLE BOOK
// =========================
export const getBook =
  async (id) => {
    const response =
      await API.get(
        `/books/${id}`
      );

    return response.data;
  };

// =========================
// CREATE BOOK
// =========================
export const createBook =
  async (bookData) => {
    const formData =
      new FormData();

    Object.keys(bookData).forEach(
      (key) => {
        formData.append(
          key,
          bookData[key]
        );
      }
    );

    const response =
      await API.post(
        "/books",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  };

// =========================
// UPDATE BOOK
// =========================
export const updateBook =
  async (id, data) => {
    const response =
      await API.put(
        `/books/${id}`,
        data
      );

    return response.data;
  };

// =========================
// DELETE BOOK
// =========================
export const deleteBook =
  async (id) => {
    const response =
      await API.delete(
        `/books/${id}`
      );

    return response.data;
  };