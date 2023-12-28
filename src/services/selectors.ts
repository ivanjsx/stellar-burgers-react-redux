// constants 
import { 
  USER_STATE_NAME,
  ORDER_FEED_STATE_NAME,
  ORDER_DETAILS_STATE_NAME,
  ORDER_CREATION_STATE_NAME,
  BURGER_INGREDIENTS_STATE_NAME,
  BURGER_CONSTRUCTOR_STATE_NAME,
} from "../utils/constants";

// types 
import { RootStateType } from "./reducers";



export const defaultUserSelector = (state: RootStateType) => state[USER_STATE_NAME];
export const defaultOrderFeedSelector = (state: RootStateType) => state[ORDER_FEED_STATE_NAME];
export const defaultOrderDetailsSelector = (state: RootStateType) => state[ORDER_DETAILS_STATE_NAME];
export const defaultOrderCreationSelector = (state: RootStateType) => state[ORDER_CREATION_STATE_NAME];
export const defaultBurgerIngredientsSelector = (state: RootStateType) => state[BURGER_INGREDIENTS_STATE_NAME];
export const defaultBurgerConstructorSelector = (state: RootStateType) => state[BURGER_CONSTRUCTOR_STATE_NAME];
