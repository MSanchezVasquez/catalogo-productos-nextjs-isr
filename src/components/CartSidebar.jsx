import { useCartStore } from "@/useCartStore";
import { X, Trash2, ShoppingBag } from "lucide-react";

export default function CartSidebar() {
  const { cart, isCartOpen, closeCart, removeFromCart, getTotal } =
    useCartStore();

  const total = getTotal();

  return (
    <>
      {/* Overlay oscuro */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Panel deslizante */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header del Carrito */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" /> Tu Carrito
            </h2>
            <button
              onClick={closeCart}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Lista de Productos */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 space-y-4">
                <ShoppingBag className="h-16 w-16 text-gray-300" />
                <p>Tu carrito está vacío.</p>
                <button
                  onClick={closeCart}
                  className="text-indigo-600 font-medium hover:underline"
                >
                  Volver a la tienda
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={`${item.id}`} className="flex gap-4">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-contain p-2"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3 className="line-clamp-1">
                        <a href="#">{item.title}</a>
                      </h3>
                      <p className="ml-4">${item.price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500 capitalize">
                      {item.category}
                    </p>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500">Cant: 1</p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="font-medium text-red-500 hover:text-red-700 flex items-center gap-1"
                      >
                        <Trash2 className="h-4 w-4" /> Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer del Carrito (Checkout) */}
          {cart.length > 0 && (
            <div className="border-t border-gray-100 px-6 py-6 bg-gray-50">
              <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                <p>Subtotal</p>
                <p>${total.toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500 mb-6">
                Impuestos y envío calculados al finalizar la compra.
              </p>
              <button className="w-full rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors">
                Finalizar Compra
              </button>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <button
                  onClick={closeCart}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  o Continuar Comprando
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
