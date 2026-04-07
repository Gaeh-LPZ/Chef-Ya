import { Metadata } from "next";
import Header from "../ui/Header";
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
      <section>
        <header>
          <h1>Bienvenido de vuelta</h1>
          <p>Accede a tus menus preferidos y rastrea tus pedidos</p>
        </header>
        <form action="">
          <label>
            <span className=" material-symbols-outlined text-outline" data-icon="mail">mail</span>
            Correo Electronico
            <input type="text" name="email" placeholder="name@example.com"/>
          </label>
        </form>
      </section>
    </main>
  );
}