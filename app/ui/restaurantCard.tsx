export default function restaurantCard() {
    return (
        <div className="flex flex-row h-fit p-4 gap-2.5 rounded-md">
            <img src="/public/Chef-Ya-Logo.png" alt="logo" width="240" height="auto" />
            <section className="flex flex-col">
                <h1 className="text-xl font-bold">Coffe Surf</h1>
                <p className="text-sm">Restaurantes</p>
                <div className="flex text-sm items-center gap-1">
                    <svg width="12" height="12"><use xlinkHref="/public/star.svg"></use></svg>
                    <p>4.5 (26)</p>
                </div>
                <button className="bg-orange-500 p-2 rounded-md cursor-pointer text-white hover:scale-105 transition-all transform">Ordenar ahora</button>
            </section>
        </div>
    );
}