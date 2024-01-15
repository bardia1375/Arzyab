import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    {
      employeeId: "۱۲۳۴۵۶",
      fullName: "عرفان پایا",
      id: "l2h9prr4okbk5fspb",
      informationMethod: {
        withEmail: false,
        withMessage: false,
        withWhatsapp: false,
      },
      personalInformation: {
        birthDate: "۱۳۸۱/۰۶/۱۴",
        fatherName: "منصور",
        firstName: "عرفان",
        gender: "مرد",
        lastName: "پایا",
        nationalCode: "۴۸۶۰۳۶۴۷۹۱",
      },
      position: "تست",
      userInformation: {
        email: "erfanpaya2019@gmail.com",
        employeeId: "۱۲۳۴۵۶",
        identificationNumber: "۸۸۶۵۴۵",
        password: "ss",
      },
    },
  ],
};

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    changeInformationMethodStatus(state, action) {
      let selectedItem, selectedItemIndex, updatedItems, updatedItem;

      selectedItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      selectedItem = state.items[selectedItemIndex];
      updatedItem = {
        ...selectedItem,
        informationMethod: {
          ...selectedItem.informationMethod,
          [action.payload.method]:
            !selectedItem.informationMethod[action.payload.method],
        },
      };

      updatedItems = [...state.items];
      updatedItems[selectedItemIndex] = updatedItem;

      return { ...state, items: updatedItems };
    },
    deleteEmployee(state, action) {
      let updatedItems = [...state.items];
      updatedItems = updatedItems.filter((item) => item.id !== action.payload);

      return { ...state, items: updatedItems };
    },
    addEmployee(state, action) {
      let updatedItems = [...state.items];
      updatedItems.push(action.payload);

      return { ...state, items: updatedItems };
    },
    putEmployee(state, action) {
      const selectedItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      let updatedItems = [...state.items];
      // updatedItems = updatedItems.filter(item => item.id !== action.payload.id);
      updatedItems[selectedItemIndex] = { ...action.payload };

      return { ...state, items: updatedItems };
    },
  },
});

export const {
  changeInformationMethodStatus,
  deleteEmployee,
  addEmployee,
  putEmployee,
} = employeesSlice.actions;
export default employeesSlice.reducer;
