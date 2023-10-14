// libraries
import { createSlice } from "@reduxjs/toolkit";



export const modalSlice = createSlice(
  {
    name: "modal",
    initialState: {
      modalIsVisible: false,
      modalMode: null,
      modalHeading: null,
      orderDetails: null,
      previewableIngredient: null,
    },
    reducers: {
      closeModal: state => {
        state.modalIsVisible = false;
      },
      openModalInOrderMode: (state, action) => {
        state.modalMode = "order";
        state.modalHeading = "";
        state.orderDetails = action.payload;
        state.modalIsVisible = true;
      },
      openModalInIngredientMode: (state, action) => {
        state.modalMode = "ingredient";
        state.modalHeading = "Детали ингредиента";
        state.previewableIngredient = action.payload;
        state.modalIsVisible = true;
      }
    }
  }
);

export const {closeModal, openModalInOrderMode, openModalInIngredientMode} = modalSlice.actions;
