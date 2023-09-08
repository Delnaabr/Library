import { BASE_URL } from "@/pages/utils/apis";

export const updateBookReturnDateAndStatus = async (
  id: any,
  returnDate: any
) => {
  try {
    const response = await fetch(`${BASE_URL}/students/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        book_return_date: returnDate,
        status: "returned",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update data in the API");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
