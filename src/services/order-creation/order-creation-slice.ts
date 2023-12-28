// libraries
import { createSlice } from "@reduxjs/toolkit";

// constants 
import { ORDER_CREATION_STATE_NAME } from "../../utils/constants";

// actions
import { createOrder } from "./order-creation-thunks";

// images
import doneImage from "../../images/done.svg";
import failedImage from "../../images/failed.svg";
import pendingImage from "../../images/pending.svg";

// types 
import { CreatedOrderType } from "../../utils/types";



type InitialStateType = {
  createdOrder: CreatedOrderType | null,
  errorCreatingOrder: boolean,
  pendingCreatingOrder: boolean,      
  status: string,
  action: string,
  iconSrc: string,
  suggestion: string,
}

const initialState: InitialStateType = {
  createdOrder: null,
  errorCreatingOrder: false,
  pendingCreatingOrder: false,      
  status: "",
  action: "",
  iconSrc: "",
  suggestion: "",
}



const orderCreationSlice = createSlice(
  {
    name: ORDER_CREATION_STATE_NAME,
    initialState,
    
    reducers: {
      resetCreatedOrder: (state) => {
        state.createdOrder = null;        
      }
    },
    
    extraReducers: (builder) => {
      builder.addCase(
        createOrder.pending, (state) => {
          state.pendingCreatingOrder = true;
          state.createdOrder = {};
          state.status = "создаём заказ";
          state.action = "Скоро начнём готовить заказ";
          state.iconSrc = pendingImage;          
          state.suggestion = "Обычно это занимает совсем немного времени";
        }
      ).addCase(
        createOrder.rejected, (state, action) => {
          console.error(action.payload);
          state.errorCreatingOrder = true;
          state.pendingCreatingOrder = false;
          state.createdOrder = {};
          state.status = "не удалось создать заказ";
          state.action = "Что-то пошло не так";
          state.iconSrc = failedImage;             
          state.suggestion = "Лучше всего будет, если вы напишете в поддержку";
        }
      ).addCase(
        createOrder.fulfilled, (state, action) => {
          state.errorCreatingOrder = false;
          state.pendingCreatingOrder = false;
          state.createdOrder = action.payload;
          state.status = "идентификатор заказа";
          state.action = "Ваш заказ начали готовить";
          state.iconSrc = doneImage;               
          state.suggestion = "Дождитесь готовности на орбитальной станции";
        }
      ).addDefaultCase(
        (state) => state
      );
    },
  }
);

export const { resetCreatedOrder } = orderCreationSlice.actions;

export const orderCreationReducer = orderCreationSlice.reducer;
