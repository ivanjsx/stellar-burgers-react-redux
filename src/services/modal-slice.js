// libraries
import { createSlice } from "@reduxjs/toolkit";



export const modalSlice = createSlice(
  {
    name: "modal",
    initialState: {
      modalIsVisible: false,
      modalMode: "",
      modalHeading: "",
      previewableContent: null,
    },
    reducers: {
      closeModal: state => {
        state.modalIsVisible = false;
      },
      openModalInOrderMode: (state, action) => {
        state.modalMode = "order";
        state.modalHeading = "";
        state.previewableContent = action.payload;
        state.modalIsVisible = true;
      },
      openModalInIngredientMode: (state, action) => {
        state.modalMode = "ingredient";
        state.modalHeading = "Детали ингредиента";
        state.previewableContent = action.payload;
        state.modalIsVisible = true;
      }
    }
  }
);

export const {closeModal, openModalInOrderMode, openModalInIngredientMode} = modalSlice.actions;
