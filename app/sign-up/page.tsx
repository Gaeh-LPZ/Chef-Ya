import { konkhmer } from "../ui/fonts";

export default function Page(){
    return (
        <main className="h-screen grid grid-cols-2 p-7">
            <aside className="h-full relative overflow-hidden rounded-l-4xl">
                <img src="/bg-sign-up.jpg" alt="Chef Ya! cured plate" className=""/>
                <p className={`${konkhmer.className} text-white text-2xl tracking-tighter px-6 py-4 rounded-full w-fit top-12 left-12 absolute`}>Chef Ya!</p>
            </aside>
            <section className="flex flex-col justify-center md:p-20 gap-6">
                <header className="flex flex-col gap-2">
                    <h1 className={`text-3xl font-semibold ${konkhmer.className}`}>Crear Cuenta</h1>
                    <p className="text-gray-600">Empieza tu busqueda dentro de la cocina curada</p>
                </header>
                <form action="" className="flex flex-col gap-2">
                    <label className="flex flex-col text-sm gap-1.5">
                        NOMBRE COMPLETO
                        <input type="text" name="name" required placeholder="Julian Mercer" className="p-4 bg-gray-200 rounded-full mb-2 placeholder:text-base"/>
                    </label>
                    <label className="flex flex-col text-sm gap-1.5">
                        CORREO ELECTRÓNICO
                        <input type="email" name="email" required placeholder="chef@ya.com" className="p-4 bg-gray-200 rounded-full mb-2 placeholder:text-base"/>
                    </label>
                    <label className="flex flex-col text-sm gap-1.5">
                        CONTRASEÑA
                        <input type="password" name="password" required placeholder="********" className="p-4 bg-gray-200 rounded-full mb-2 placeholder:text-base"/>
                    </label>
                    <label className="flex flex-col text-sm gap-1.5">
                        CONFIRMAR CONTRASEÑA
                        <input type="password" name="psw-confirmation" required placeholder="********" className="p-4 bg-gray-200 rounded-full mb-2 placeholder:text-base"/>
                    </label>
                    <label className="flex flex-row gap-1.5">
                        <input type="radio" required name="radio-accept"/>
                        Acepto los <strong className="text-primary">terminos y condiciones</strong>
                    </label>
                    <button type="submit" className="w-full py-5 bg-linear-to-br from-primary to-primary-container text-white/90 font-bold text-lg rounded-full editorial-shadow hover:scale-[1.02] active:scale-95 transition-all duration-300">Crear Cuenta</button>
                </form>
                <footer  className="flex flex-col items-center">
                    <a href="/sign-in">¿Ya tienes una cuenta? <strong className="text-primary">Inicia Sesion</strong></a>
                </footer>
            </section>
        </main>
    );
}