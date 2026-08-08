import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Order, Address } from "@/types/common";
import { generateOrderId, calculateShipping, calculateTax, getEstimatedDelivery } from "@/types/common";
import type { CartItem } from "@/store/cart-store";

interface OrderState {
  orders: Order[];
  currentOrder: Partial<Order> | null;

  // Actions
  createOrder: (
    userId: string,
    items: CartItem[],
    shippingAddress: Address,
    paymentMethod: string,
    shippingMethod?: string,
    billingAddress?: Address
  ) => Order;

  addOrder: (order: Order) => void;
  getOrderById: (id: string) => Order | undefined;
  getUserOrders: (userId: string) => Order[];
  updateOrderStatus: (orderId: string, status: string) => void;
  clearOrders: () => void;

  // Checkout helpers
  setCurrentOrder: (order: Partial<Order>) => void;
  clearCurrentOrder: () => void;
}

export const useOrderStore = create<OrderState>(
  persist(
    (set, get) => ({
      orders: [],
      currentOrder: null,

      createOrder: (userId, items, shippingAddress, paymentMethod, shippingMethod = "standard", billingAddress) => {
        const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
        const shipping = calculateShipping(subtotal, shippingMethod);
        const tax = calculateTax(subtotal, shippingAddress.state);
        const total = subtotal + shipping + tax;

        const order: Order = {
          id: generateOrderId(),
          userId,
          items,
          subtotal: Math.round(subtotal * 100) / 100,
          shipping: Math.round(shipping * 100) / 100,
          tax: Math.round(tax * 100) / 100,
          total: Math.round(total * 100) / 100,
          status: "confirmed",
          shippingAddress,
          billingAddress,
          paymentMethod,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          estimatedDelivery: getEstimatedDelivery(5), // Default 5 days
        };

        set((state) => ({
          orders: [...state.orders, order],
          currentOrder: null,
        }));

        return order;
      },

      addOrder: (order) => {
        set((state) => ({
          orders: [...state.orders, order],
        }));
      },

      getOrderById: (id) => {
        return get().orders.find((order) => order.id === id);
      },

      getUserOrders: (userId) => {
        return get().orders.filter((order) => order.userId === userId);
      },

      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId
              ? { ...order, status: status as any, updatedAt: new Date().toISOString() }
              : order
          ),
        }));
      },

      clearOrders: () => {
        set({ orders: [] });
      },

      setCurrentOrder: (order) => {
        set({ currentOrder: order });
      },

      clearCurrentOrder: () => {
        set({ currentOrder: null });
      },
    }),
    { name: "vingo-orders" }
  )
);
