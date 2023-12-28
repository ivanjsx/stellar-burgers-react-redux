export type IngredientType = {
  _id: string,
}

export type CreatedOrderType = {
  order?: {
    number: number
  }
}

export type FetchedOrderType = {
  id: string,
  number: number,
}

export type FeedMessageType = {
  total: number,
  totalToday: number,
  orders: Array<FetchedOrderType>
}
