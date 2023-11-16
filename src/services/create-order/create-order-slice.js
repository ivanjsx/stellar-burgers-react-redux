// libraries
import { createSlice } from "@reduxjs/toolkit";

// constants 
import { CREATE_ORDER_STATE_NAME } from "../../utils/constants";

// actions
import { requestOrderPlacement } from "./create-order-thunks";

// images
import doneImage from "../../images/done.svg";
import failedImage from "../../images/failed.svg";
import pendingImage from "../../images/pending.svg";


const createOrderSlice = createSlice(
  {
    name: CREATE_ORDER_STATE_NAME,
    
    initialState: {
      previewableOrder: null,
      errorRequestingOrder: false,
      pendingRequestingOrder: false,      
      status: "",
      action: "",
      iconSrc: "",
      suggestion: "",
    },
    
    reducers: {
      resetPreviewableOrder: state => {
        state.previewableOrder = null;        
      }
    },
    
    extraReducers: builder => {
      builder.addCase(
        requestOrderPlacement.pending, state => {
          state.pendingRequestingOrder = true;
          state.previewableOrder = {};
          state.status = "создаём заказ";
          state.action = "Скоро начнём готовить заказ";
          state.iconSrc = pendingImage;          
          state.suggestion = "Обычно это занимает совсем немного времени";
        }
      ).addCase(
        requestOrderPlacement.rejected, (state, action) => {
          console.error(action.payload);
          state.errorRequestingOrder = true;
          state.pendingRequestingOrder = false;
          state.previewableOrder = {};
          state.status = "не удалось создать заказ";
          state.action = "Что-то пошло не так";
          state.iconSrc = failedImage;             
          state.suggestion = "Лучше всего будет, если вы напишете в поддержку";
        }
      ).addCase(
        requestOrderPlacement.fulfilled, (state, action) => {
          state.errorRequestingOrder = false;
          state.pendingRequestingOrder = false;
          state.previewableOrder = action.payload;
          state.status = "идентификатор заказа";
          state.action = "Ваш заказ начали готовить";
          state.iconSrc = doneImage;               
          state.suggestion = "Дождитесь готовности на орбитальной станции";
        }
      ).addDefaultCase(
        state => state
      );
    },
  }
);

export const { resetPreviewableOrder } = createOrderSlice.actions;

export const createOrderReducer = createOrderSlice.reducer;
