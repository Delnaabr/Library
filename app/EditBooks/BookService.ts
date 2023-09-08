

import { BASE_URL } from "@/pages/utils/apis";

export async function updateBook(bookId:any, updatedBookData:any) {
  try {
    const response = await fetch(`${BASE_URL}/books/${bookId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBookData),
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Update failed");
    }
  } catch (error) {
    throw new Error(`Error updating book:`);
  }
}
