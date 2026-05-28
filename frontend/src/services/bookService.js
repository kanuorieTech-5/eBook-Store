import API from "./axios";

// =========================
// HELPERS
// =========================
const createFormData = (
  data
) => {
  const formData =
    new FormData();

  Object.keys(data).forEach(
    (key) => {
      if (
        data[key] !== undefined &&
        data[key] !== null
      ) {
        formData.append(
          key,
          data[key]
        );
      }
    }
  );

  return formData;
};

// =========================
// GET ALL BOOKS
// =========================
export const getBooks =
  async () => {
    try {
      const response =
        await API.get(
          "/api/books"
        );

      return response.data;
    } catch (error) {
      console.error(
        "Error fetching books:",
        error
      );

      throw error;
    }
  };

// =========================
// GET SINGLE BOOK
// =========================
export const getBook =
  async (id) => {
    try {
      const response =
        await API.get(
          `/api/books/${id}`
        );

      return response.data;
    } catch (error) {
      console.error(
        "Error fetching book:",
        error
      );

      throw error;
    }
  };

// =========================
// CREATE BOOK
// =========================
export const createBook =
  async (bookData) => {
    try {
      const formData =
        createFormData(
          bookData
        );

      const response =
        await API.post(
          "/api/books",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      return response.data;
    } catch (error) {
      console.error(
        "Error creating book:",
        error
      );

      throw error;
    }
  };

// =========================
// UPDATE BOOK
// =========================
export const updateBook =
  async (
    id,
    updatedData
  ) => {
    try {
      const formData =
        createFormData(
          updatedData
        );

      const response =
        await API.put(
          `/api/books/${id}`,
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      return response.data;
    } catch (error) {
      console.error(
        "Error updating book:",
        error
      );

      throw error;
    }
  };

// =========================
// DELETE BOOK
// =========================
export const deleteBook =
  async (id) => {
    try {
      const response =
        await API.delete(
          `/api/books/${id}`
        );

      return response.data;
    } catch (error) {
      console.error(
        "Error deleting book:",
        error
      );

      throw error;
    }
  };