

import { BASE_URL } from "@/pages/utils/apis";

export async function addBook( addedBookData:any) {
  try {
    const response = await fetch(`${BASE_URL}/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addedBookData),
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Added failed");
    }
  } catch (error) {
    throw new Error(`Error adding book:`);
  }
}
