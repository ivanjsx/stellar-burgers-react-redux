// API
export const BASE_URL = "https://norma.nomoreparties.space/api/";



// FEATURES
export const BUNS_IN_BURGER_COUNT = 2;



// STATE MANAGEMENT
export const USER_STATE_NAME = "user";
export const BURGER_INGREDIENTS_STATE_NAME = "burgerIngredients";
export const BURGER_CONSTRUCTOR_STATE_NAME = "burgerConstructor";



// ROUTING 

// TOP-LEVEL

export const HOME_PAGE_PATH = "/";

export const FEED_PAGE_RELATIVE_PATH = "feed";
export const FEED_PAGE_ABSOLUTE_PATH = "/feed";

export const INGREDIENT_ID_PARAM_NAME = "ingredientId";
export const INGREDIENT_PAGE_RELATIVE_PATH = `ingredients/:${INGREDIENT_ID_PARAM_NAME}`;
export const INGREDIENT_PAGE_ABSOLUTE_PATH = `/ingredients/:${INGREDIENT_ID_PARAM_NAME}`;

export const LOGIN_PAGE_RELATIVE_PATH = "login";
export const LOGIN_PAGE_ABSOLUTE_PATH = "/login";

export const LOGOUT_PAGE_RELATIVE_PATH = "logout";
export const LOGOUT_PAGE_ABSOLUTE_PATH = "/logout";

export const REGISTER_PAGE_RELATIVE_PATH = "register";
export const REGISTER_PAGE_ABSOLUTE_PATH = "/register";

export const FORGOT_PASSWORD_PAGE_RELATIVE_PATH = "forgot-password";
export const FORGOT_PASSWORD_PAGE_ABSOLUTE_PATH = "/forgot-password";

export const RESET_PASSWORD_PAGE_RELATIVE_PATH = "reset-password";
export const RESET_PASSWORD_PAGE_ABSOLUTE_PATH = "/reset-password";

// PROFILE-LEVEL

export const PROFILE_PAGE_RELATIVE_PATH = "profile";
export const PROFILE_PAGE_ABSOLUTE_PATH = "/profile";

export const HISTORY_PAGE_RELATIVE_PATH = "orders";
export const HISTORY_PAGE_ABSOLUTE_PATH = "/profile/orders";

export const ORDER_NUMBER_PARAM_NAME = "orderNumber";
export const ORDER_PAGE_RELATIVE_PATH = `:${ORDER_NUMBER_PARAM_NAME}`
export const ORDER_PAGE_ABSOLUTE_PATH = `/profile/orders/:${ORDER_NUMBER_PARAM_NAME}`;
