
import { GET_BOOK_LIST } from "../ActionType";

const initialState = {
  bookList: null,
};

export const bookListReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_BOOK_LIST:
      console.log("haii",action);

      return {
        ...state,
        bookList: action.payload,
      };

    default:
      return state;
  }
};
