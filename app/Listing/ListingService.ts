import { BASE_URL } from "@/pages/utils/apis";
import moment from "moment";
const formatToIST = (date: Date) => {
  return moment(date).tz("Asia/Kolkata").format("DD-MM-YYYY");
};

export const updateBookReturnDateAndStatus = async (
  id: any,
  returnDate: any
) => {
  try {
    const response = await fetch(`${BASE_URL}/students/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch student data for ID ${id}`);
    }

    const studentData = await response.json();

    const updatedStudent = {
      ...studentData,
      book_return_date: formatToIST(returnDate),
      status: "returned",
    };

    const updateResponse = await fetch(`${BASE_URL}/students/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedStudent),
    });

    if (!updateResponse.ok) {
      throw new Error(`Failed to update student data for ID ${id}`);
    }

    return updatedStudent;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
