import {
  FAIL_REQUEST,
  GET_PRODUCT_LIST,
  ADD_NEW_USER,
  DELETE_BOOK,
  ADD_NEW_BOOK,
  GET_STUDENT_LIST,
  GET_LIBRARIAN_LIST,
  USER_LOGIN,
  GET_BOOK_LIST,
} from "./ActionType";
import axios from "axios";

export const failRequest = (error) => {
  return {
    type: FAIL_REQUEST,
    payload: error,
  };
};

export const getAllStudents = (data) => {
  return {
    type: GET_STUDENT_LIST,
    payload: data,
  };
};

export const getAllBooks = (data) => {
  return {
    type: GET_BOOK_LIST,
    payload: data,
  };
};

// export const userLogin = (userDetails) => {
//   return {
//     type: USER_LOGIN,
//     payload: userDetails,
//   };
// };

// export const getProductList = (data) => {
//   return {
//     type: GET_PRODUCT_LIST,
//     payload: data,
//   };
// };

// export const addNewUser = (data) => {
//   return {
//     type: ADD_NEW_USER,
//     payload: data,
//   };
// };

// export const addNewProduct = (data) => {
//   return {
//     type: ADD_NEW_BOOK,
//     payload: data,
//   };
// };

// export const deleteProduct = (productId) => {
//   return {
//     type: DELETE_BOOK,
//     payload: productId,
//   };
// };

export const fetchStudentList = () => {
  return (dispatch) => {
    dispatch(getAllStudents([]));
    axios
      .get(studentDetails)
      .then((res) => {
        const studentList = res.data;
        console.log("haii",studentList)
        dispatch(getAllStudents(studentList));
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
      });
  };
};

export const fetchBookList= () => {
  return (dispatch) => {
    dispatch(getAllBooks([]));
    axios
      .get(bookDetails)
      .then((res) => {
        const bookList = res.data;
        console.log("haii",bookList)
        dispatch(getAllBooks(bookList));
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
      });
  };
};

// export const fetchUserList = () => {
//   return (dispatch) => {
//     dispatch(getAllUser([]));
//     axios
//       .get(RegisteredUserDetail)
//       .then((res) => {
//         const logginedUser = res.data;
//         dispatch(getAllUser(logginedUser));
//       })
//       .catch((err) => {
//         dispatch(failRequest(err.message));
//       });
//   };
// };
