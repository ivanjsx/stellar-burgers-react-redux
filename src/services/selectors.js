// constants 
import { 
  USER_STATE_NAME,
  ORDER_FEED_STATE_NAME,
  ORDER_CREATION_STATE_NAME,
  BURGER_INGREDIENTS_STATE_NAME,
  BURGER_CONSTRUCTOR_STATE_NAME,
} from "../utils/constants";



export const defaultUserSelector = state => state[USER_STATE_NAME];
export const defaultOrderFeedSelector = state => state[ORDER_FEED_STATE_NAME];
export const defaultOrderCreationSelector = state => state[ORDER_CREATION_STATE_NAME];
export const defaultBurgerIngredientsSelector = state => state[BURGER_INGREDIENTS_STATE_NAME];
export const defaultBurgerConstructorSelector = state => state[BURGER_CONSTRUCTOR_STATE_NAME];
