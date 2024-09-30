export const ORDER_STATUSES = {
  done: {
    original: "done" as const,
    decoded: "Completed" as const,
  },
  pending: {
    original: "pending" as const,
    decoded: "Is Being Prepared" as const,
  },
  created: {
    original: "created" as const,
    decoded: "Created" as const,
  },
  cancelled: {
    original: "cancelled" as const,
    decoded: "Cancelled" as const,
  },      
};
