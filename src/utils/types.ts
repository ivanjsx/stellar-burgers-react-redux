export type IngredientType = {
  id: string,
}

export type OrderType = {
  id: string,
  number: number,
}

export type FeedMessageType = {
  total: number,
  totalToday: number,
  orders: Array<OrderType>
}
