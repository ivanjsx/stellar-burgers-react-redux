export type IngredientType = {
  _id: string,
  fat: number,
  name: string,
  price: number,
  calories: number,
  proteins: number,
  image_large: string,
  carbohydrates: number,
  type: "bun" | "sauce" | "main",
};

export type CreatedOrderType = {
  order?: {
    number: number,
  },
};

export type FetchedOrderType = {
  id: string,
  name: string,
  number: number,
  createdAt: string,
  ingredients: Array<string>,
  status: "done" | "pending" | "created" | "cancelled",  
};

export type FeedMessageType = {
  total: number,
  totalToday: number,
  orders: Array<FetchedOrderType>,
};

export type UserInfoType = {
  name: string,
  email: string,
  password: string,
  securityCode: string,
};
