// store/useCartStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      // ESTADO INICIAL
      cart: [],
      isCartOpen: false,

      // ACCIONES (Lógica)

      // Abrir/Cerrar el carrito lateral
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      // Añadir producto (si ya existe, no lo duplicamos, opcionalmente podrías sumar cantidad)
      addToCart: (product) => {
        const { cart } = get();
        // Chequeamos si ya existe para evitar duplicados exactos (opcional)
        const exists = cart.some((item) => item.id === product.id);

        if (!exists) {
          set({
            cart: [...cart, product],
            isCartOpen: true,
          });
        } else {
          // Aquí podrías implementar lógica de incrementar cantidad
          set({ isCartOpen: true });
        }
      },

      // Eliminar un producto por ID
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        })),

      // Vaciar carrito
      clearCart: () => set({ cart: [] }),

      // Calcular total (Getter derivado)
      getTotal: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.price, 0);
      },
    }),
    {
      name: "shopping-cart-storage", // Nombre de la key en localStorage
    }
  )
);
