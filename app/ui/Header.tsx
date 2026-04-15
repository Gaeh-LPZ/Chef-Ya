export default function Header(){
    return (
        <header className="flex flex-row h-full justify-around p-3 items-center">
            <img src="/Chef-Ya-Logo.png" alt="Chef Ya Logo" width={132} height={55}/>
            <div className="flex flex-row gap-1.5 w-fit p-2 items-center">
                <svg width={32} height={32} aria-label="location icon" className="bg-secondary rounded-full p-1.5 text-white">
                    <use xlinkHref="/location.svg"></use>
                </svg>
                <aside>
                    <p className="text-sm text-gray-400"><small>Lugar de envio</small></p>
                    <p className="text-secondary text-sm">Lugar CP</p>
                </aside>
            </div>
            <form action="" className="hidden md:flex md:w-xl">
                <label className="flex flex-row gap-1 bg-secondary w-full p-2 rounded-full">
                    <svg width={24} height={24} aria-label="Search icon" className="text-white">
                        <use xlinkHref="/search.svg"></use>
                    </svg>
                    <input type="text" name="restaurant" placeholder="Buscar en..." className="text-gray-300 text-sm"/>
                </label>
            </form>
            <img src="/shopping-cart.svg" alt="Shopping Cart icon" width={24} height={24}/>
            <img src="/user.svg" alt="user icon" width={24} height={24}/>
        </header>
    );
    
}