import { GET_STUDENT_LIST } from "../ActionType";

const initialState = {
  studentList: null,
};

export const studentListReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_STUDENT_LIST:
      console.log("haii",action);

      return {
        ...state,
        studentList: action.payload,
      };

    default:
      return state;
  }
};