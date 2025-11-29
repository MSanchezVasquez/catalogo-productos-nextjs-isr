import Link from "next/link";
import { ShoppingBag, Menu, Search } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/useCartStore";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cart = useCartStore((state) => state.cart);
  const openCart = useCartStore((state) => state.openCart);

  const cartCount = cart.length;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              Store<span className="text-indigo-600">Pro</span>
            </span>
          </Link>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-700">
            <Link href="/" className="hover:text-indigo-600 transition-colors">
              Inicio
            </Link>
            <Link href="#" className="hover:text-indigo-600 transition-colors">
              Nuevos
            </Link>
            <Link href="#" className="hover:text-indigo-600 transition-colors">
              Categorías
            </Link>
            <Link href="#" className="hover:text-indigo-600 transition-colors">
              Ofertas
            </Link>
          </nav>

          {/* Acciones */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-100 rounded-full transition-all">
              <Search className="h-5 w-5" />
            </button>

            <button
              onClick={openCart}
              className="relative p-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-100 rounded-full transition-all group"
            >
              <ShoppingBag className="h-5 w-5 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white shadow-sm ring-2 ring-white animate-bounce-short">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Botón Menú Móvil */}
            <button
              className="md:hidden p-2 text-gray-500"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 shadow-lg">
          <nav className="flex flex-col gap-4 text-base font-medium text-gray-600">
            <Link href="/" className="hover:text-indigo-600">
              Inicio
            </Link>
            <Link href="#" className="hover:text-indigo-600">
              Nuevos
            </Link>
            <Link href="#" className="hover:text-indigo-600">
              Categorías
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
