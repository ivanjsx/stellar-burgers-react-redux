// APP FEATURES

export const BUNS_IN_BURGER_COUNT = 2;
export const MAX_ICONS_IN_ORDER_CARD = 6;



// API URLS

export const BASE_API_URL = "https://norma.nomoreparties.space/api/";



// WEBSOCKET URLS

export const BASE_WS_URL = "wss://norma.nomoreparties.space/";



// INTERNAL STATE MANAGEMENT

export const USER_STATE_NAME = "user";
export const ORDER_FEED_STATE_NAME = "orderFeed";
export const ORDER_DETAILS_STATE_NAME = "orderDetails";
export const ORDER_CREATION_STATE_NAME = "orderCreation";
export const BURGER_INGREDIENTS_STATE_NAME = "burgerIngredients";
export const BURGER_CONSTRUCTOR_STATE_NAME = "burgerConstructor";



// LOCAL STORAGE KEYS

export const ACCESS_TOKEN_KEY = "accessToken";
export const REFRESH_TOKEN_KEY = "refreshToken";
export const PASSWORD_RESET_EMAIL_SENT_KEY = "passwordResetEmailSent";



// WEBSOCKET CONNECTION STATUSES

export enum WS_CONNECTION_STATUSES {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
  CONNECTING = "CONNECTING",  
}
