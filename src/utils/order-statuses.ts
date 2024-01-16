export const ORDER_STATUSES = {
  done: {
    original: "done" as const,
    decoded: "Выполнен" as const,
  },
  pending: {
    original: "pending" as const,
    decoded: "Готовится" as const,
  },
  created: {
    original: "created" as const,
    decoded: "Создан" as const,
  },
  cancelled: {
    original: "cancelled" as const,
    decoded: "Отменён" as const,
  },      
};
