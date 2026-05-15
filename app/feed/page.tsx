import { Metadata } from "next";
import Header from "../ui/Header";
import { lilita, johmuria, konkhmer } from "../ui/fonts";

export const metadata: Metadata = {
  title: 'Feed'
}

export default function Page() {
  return (
    <>
      <Header />
      <main className="h-dvh w-dvw">
        <div className="h-2/6 relative overflow-hidden items-center justify-center flex">
          <img src="/bg-feed.jpg" alt="background image of curated food" className="absolute inset-0 w-full h-full object-cover" />
          <p className={`${konkhmer.className} relative text-center text-5xl`}>Comida Deliciosa,<br /><span className="italic">Enviada a ti</span></p>
        </div>
        <div className="flex flex-row justify-center mt-6 gap-6">
          <aside className="h-full flex flex-col gap-2">
            <section className="">
              <header className="flex flex-row gap-1.5">
                <svg width={24} height={24}><use xlinkHref="/search.svg"></use></svg>
                <p>Los más buscados</p>
              </header>
              <p>Mapear mas buscados aqui</p>
            </section>
            <section>
              <header className="flex flex-row gap-1.5">
                <svg width={24} height={24}><use xlinkHref="/squares.svg"></use></svg>
                <p>Todas las categorias</p>
              </header>
              <p>Mexicana</p>
              <p>Italiana</p>
              <p>Mariscos</p>
            </section>
          </aside>
          <section className="">
            <header>
              <p>Populares cerca de ti</p>
            </header>
          </section>
        </div>
      </main>
    </>
  );
}