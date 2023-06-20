export const ORDER_STATUS = {
  IN_PROCESS: "in_process",
  PENDING: "pending",
  ACCEPTED: "accepted",
  SHIPPED: "shipped",
  OUT_FOR_DELIVERY: "out_for_delivery",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
  RETURNED: "returned",
};
export const ORDER_TABS = {
  ALL: "all",
  ...ORDER_STATUS,
};
