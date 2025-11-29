import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Columna Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">
              Store<span className="text-indigo-500">Pro</span>
            </h3>
            <p className="text-sm text-gray-400">
              Elevando tu experiencia de compra con productos de calidad y
              diseño excepcional.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-indigo-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-indigo-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-indigo-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Tienda
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Novedades
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Más vendidos
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Rebajas
                </Link>
              </li>
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Soporte
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Ayuda
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Envíos
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Devoluciones
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Suscríbete
            </h4>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="tu@email.com"
                className="rounded-lg bg-gray-800 border-none px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
              />
              <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors">
                Unirse
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-xs text-gray-500">
          &copy; 2024 StorePro Inc. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
