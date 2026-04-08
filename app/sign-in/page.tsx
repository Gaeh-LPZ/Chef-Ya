import { Metadata } from "next";
import { konkhmer } from "../ui/fonts";

export const metadata: Metadata = {
  title: 'Sign in'
}

export default function Page() {
  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <aside className="bg-black relative overflow-hidden h-screen">
        <img src="/bg-sign-in.jpg" alt="Chef Ya! Curated Dish" className="absolute inset-0 w-full h-full object-cover" />
        <p className={`${konkhmer.className} text-white text-xl tracking-tighter bg-white/10 backdrop-blur-md px-6 py-4 rounded-full w-fit border border-white/20 top-12 left-12 absolute`}><strong>Chef Ya!</strong></p>
      </aside>
      <section className="bg-surface flex flex-col items-center justify-center px-6 py-12 md:px-28 lg:px-60 relative h-screen gap-4">
        <header className="flex flex-col gap-1.5 w-full">
          <h1 className={`${konkhmer.className} text-4xl font-bold`}>Bienvenido de vuelta</h1>
          <p className="text-gray-500 text-base">Accede a tus menus preferidos y rastrea tus pedidos</p>
        </header>
        <form action="" className="w-full flex flex-col gap-6">
          <label className="text-gray-600 text-sm flex flex-col gap-1">
            CORREO ELECTRONICO
            <div className="flex flex-row gap-4 bg-white rounded-full p-2">
              <span className=" material-symbols-outlined text-outline" data-icon="mail">mail</span>
              <input type="text" name="email" placeholder="name@example.com" />
            </div>
          </label>
          <label className="text-gray-600 text-sm flex flex-col gap-1">
            CONTRASEÑA
            <div className="flex flex-row gap-4 bg-white rounded-full p-2">
              <span className="material-symbols-outlined text-outline" data-icon="lock">lock</span>
              <input type="password" name="password" placeholder="********"/>
            </div>
          </label>
          <button className="w-full py-5 bg-linear-to-br from-primary to-primary-container text-white/90 font-bold text-lg rounded-full editorial-shadow hover:scale-[1.02] active:scale-95 transition-all duration-300">Inciar Sesion</button>
        </form>
      </section>
    </main>
  );
}