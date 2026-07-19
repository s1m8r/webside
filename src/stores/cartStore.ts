import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  productId: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeItem: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (item) =>
        set((state) => {
          const exist = state.items.find((i) => i.productId === item.productId);

          if (exist) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i,
              ),
            };
          }

          return {
            items: [...state.items, item],
          };
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),

      increaseQuantity: (productId) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        })),

      decreaseQuantity: (productId) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.productId === productId
                ? { ...i, quantity: i.quantity - 1 }
                : i,
            )
            .filter((i) => i.quantity > 0),
        })),

      clearCart: () => set({ items: [] }),

      totalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      totalPrice: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    {
      name: "cart-storage",
    },
  ),
);
