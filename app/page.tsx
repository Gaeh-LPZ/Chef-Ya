import { konkhmer, johmuria, lilita } from "./ui/fonts";
import Image from "next/image";

export default function Page() {
  return (
    <div className="grid grid-rows-[auto_1fr_1fr_auto] h-screen">
      <Image src="/bg-1.png" alt="background image" className="absolute top-0 left-0 w-8/12 h-full object-cover z-[-1]" width={1024} height={1536} loading="eager"/>
      <Image src="/bg-2.png" alt="hamburger background image" className="absolute top-0 right-0 w-4/12 h-full object-cover z-[-1]" width={500} height={666}/>
      <header className="flex flex-row justify-between w-3/5 m-6 row-span-1">
        <img src="/burger.svg" alt="burger icon for more options" width={32} height={32} />
        <nav className={`${konkhmer.className} flex flex-row gap-4`}>
          <a href="/sign-in" className="bg-beige p-1.5 rounded-md">Iniciar Sesión</a>
          <a href="#" className="text-white bg-black p-1.5 rounded-md">Registrarse</a>
        </nav>
      </header>
      <main className="flex flex-row justify-around items-center row-span-2">
        <aside>
          <h2 className={`${johmuria.className} text-6xl text-white`}>¡Ordena ahora mismo!</h2>
          <form action="" className="flex flex-row gap-2">
            <label className="flex flex-row bg-beige w-full gap-2 p-1.5 rounded-md">
              <img src="/location.svg" alt="Location icon for more accesibility" width={24} height={24} />
              <input type="text" name="ubicacion" placeholder="Ingresa la dirección de entrega" className="w-full" />
            </label>
            <button type="submit" className="flex flex-row items-center bg-black w-34 p-1.5 text-white gap-2 rounded-md">
              Buscar
              <svg width={24} height={24} aria-label="search icon">
                <use xlinkHref="/search.svg" className="stroke-white fill-white"></use>
              </svg>
            </button>
          </form>
        </aside>
        <div className="flex flex-col gap-2">
          <h2 className={`${lilita.className} text-5xl text-white`}>Categorías</h2>
          <form action="">
            <label className="bg-beige flex flex-row rounded-md p-1.5">
              <input type="text" name="categoria" placeholder="Buscar comida" />
              <Image src="/search.svg" alt="Search icon" width={24} height={24}/>
            </label>
          </form>
        </div>
      </main>
      <footer  className="row-span-1 p-1">
        <Image src="/Chef-Ya-Logo.png" alt="Chef-Ya Logo" width={264} height={110}/>
      </footer>
    </div>
  );
}