const dbChef = db.getSiblingDB('chefya');

const ahora = new Date();

// Categorías nuevas
const categoriaId26 = new ObjectId();
const categoriaId27 = new ObjectId();
const categoriaId28 = new ObjectId();
const categoriaId29 = new ObjectId();
const categoriaId30 = new ObjectId();

const categoriaId32 = new ObjectId();
const categoriaId33 = new ObjectId();
const categoriaId34 = new ObjectId();
const categoriaId35 = new ObjectId();

// Restaurantes id26 → id35
const restauranteId26 = new ObjectId();
const restauranteId27 = new ObjectId();
const restauranteId28 = new ObjectId();
const restauranteId29 = new ObjectId();
const restauranteId30 = new ObjectId();
const restauranteId31 = new ObjectId();
const restauranteId32 = new ObjectId();
const restauranteId33 = new ObjectId();
const restauranteId34 = new ObjectId();
const restauranteId35 = new ObjectId();

// Productos id106 → id155 (50 productos)
const productoId106 = new ObjectId();
const productoId107 = new ObjectId();
const productoId108 = new ObjectId();
const productoId109 = new ObjectId();
const productoId110 = new ObjectId();

const productoId111 = new ObjectId();
const productoId112 = new ObjectId();
const productoId113 = new ObjectId();
const productoId114 = new ObjectId();
const productoId115 = new ObjectId();

const productoId116 = new ObjectId();
const productoId117 = new ObjectId();
const productoId118 = new ObjectId();
const productoId119 = new ObjectId();
const productoId120 = new ObjectId();

const productoId121 = new ObjectId();
const productoId122 = new ObjectId();
const productoId123 = new ObjectId();
const productoId124 = new ObjectId();
const productoId125 = new ObjectId();

const productoId126 = new ObjectId();
const productoId127 = new ObjectId();
const productoId128 = new ObjectId();
const productoId129 = new ObjectId();
const productoId130 = new ObjectId();

const productoId131 = new ObjectId();
const productoId132 = new ObjectId();
const productoId133 = new ObjectId();
const productoId134 = new ObjectId();
const productoId135 = new ObjectId();

const productoId136 = new ObjectId();
const productoId137 = new ObjectId();
const productoId138 = new ObjectId();
const productoId139 = new ObjectId();
const productoId140 = new ObjectId();

const productoId141 = new ObjectId();
const productoId142 = new ObjectId();
const productoId143 = new ObjectId();
const productoId144 = new ObjectId();
const productoId145 = new ObjectId();

const productoId146 = new ObjectId();
const productoId147 = new ObjectId();
const productoId148 = new ObjectId();
const productoId149 = new ObjectId();
const productoId150 = new ObjectId();

const productoId151 = new ObjectId();
const productoId152 = new ObjectId();
const productoId153 = new ObjectId();
const productoId154 = new ObjectId();
const productoId155 = new ObjectId();

dbChef.categorias.insertMany([
    { _id: categoriaId26, slug: "mariscos", nombre: "Mariscos" },
    { _id: categoriaId27, slug: "italiana", nombre: "Italiana" },
    { _id: categoriaId28, slug: "japonesa", nombre: "Japonesa" },
    { _id: categoriaId29, slug: "hamburguesas", nombre: "Hamburguesas" },
    { _id: categoriaId30, slug: "cafe", nombre: "Café" },

    { _id: categoriaId32, slug: "pizzeria", nombre: "Pizzería" },
    { _id: categoriaId33, slug: "vegana", nombre: "Vegana" },
    { _id: categoriaId34, slug: "postres", nombre: "Postres" },
    { _id: categoriaId35, slug: "ramen", nombre: "Ramen" }
]);


dbChef.restaurantes.insertMany([
    // -----------------------------------------------------
    // id26
    // -----------------------------------------------------
    {
        _id: restauranteId26,
        nombre: "Marisquería El Océano",
        slug: "marisqueria-el-oceano",
        descripcion: "Mariscos frescos preparados al momento.",
        categorias: ["mariscos"],
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764218568/download_j4axeq.png",
        imagen_banner: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764218590/download_vndebn.jpg",
        calificacion: { promedio: 4.8, conteo: 120 },
        entrega: { minutosPromedio: 35, tarifa: 25 },
        direccion: {
            calle: "Av. Del Mar 120",
            ciudad: "Oaxaca de Juárez",
            estado: "Oaxaca",
            geo: { lat: 17.075, lng: -96.713 }
        },
        horario: {
            lunes: { abre: "12:00", cierra: "22:00" },
            martes: { abre: "12:00", cierra: "22:00" },
            miercoles: { abre: "12:00", cierra: "22:00" },
            jueves: { abre: "12:00", cierra: "22:00" },
            viernes: { abre: "12:00", cierra: "23:00" },
            sabado: { abre: "12:00", cierra: "23:00" },
            domingo: { abre: "12:00", cierra: "22:00" }
        },
        diasServicio: ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"],
        url_localizacion: "https://www.google.com/maps/search/?api=1&query=Av.+Del+Mar+120+Oaxaca+de+Juárez+Oaxaca",
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    },

    // -----------------------------------------------------
    // id27
    // -----------------------------------------------------
    {
        _id: restauranteId27,
        nombre: "Trattoria Bella Italia",
        slug: "trattoria-bella-italia",
        descripcion: "Comida italiana tradicional con recetas caseras.",
        categorias: ["italiana", "pizzeria"],
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764219146/download_atbvf0.jpg",
        imagen_banner: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764219147/download_s5furb.jpg",
        calificacion: { promedio: 4.9, conteo: 210 },
        entrega: { minutosPromedio: 40, tarifa: 30 },
        direccion: {
            calle: "Mujeres Ilustres 88",
            ciudad: "Oaxaca de Juárez",
            estado: "Oaxaca",
            geo: { lat: 17.078, lng: -96.717 }
        },
        horario: {
            lunes: { abre: "13:00", cierra: "23:00" },
            martes: { abre: "13:00", cierra: "23:00" },
            miercoles: { abre: "13:00", cierra: "23:00" },
            jueves: { abre: "13:00", cierra: "23:00" },
            viernes: { abre: "13:00", cierra: "00:00" },
            sabado: { abre: "13:00", cierra: "00:00" },
            domingo: { abre: "13:00", cierra: "22:00" }
        },
        diasServicio: ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"],
        url_localizacion: "https://www.google.com/maps/search/?api=1&query=Mujeres+Ilustres+88+Oaxaca+de+Juárez+Oaxaca",
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    },

    // -----------------------------------------------------
    // id28
    // -----------------------------------------------------
    {
        _id: restauranteId28,
        nombre: "Tokyo Ramen House",
        slug: "tokyo-ramen-house",
        descripcion: "Auténtico ramen japonés hecho a mano.",
        categorias: ["japonesa", "ramen"],
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764219227/download_itfhnu.jpg",
        imagen_banner: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764219262/download_cisjig.jpg",
        calificacion: { promedio: 4.7, conteo: 188 },
        entrega: { minutosPromedio: 30, tarifa: 20 },
        direccion: {
            calle: "Calzada Madero 300",
            ciudad: "Oaxaca de Juárez",
            estado: "Oaxaca",
            geo: { lat: 17.073, lng: -96.71 }
        },
        horario: {
            lunes: { abre: "13:00", cierra: "22:00" },
            martes: { abre: "13:00", cierra: "22:00" },
            miercoles: { abre: "13:00", cierra: "22:00" },
            jueves: { abre: "13:00", cierra: "22:00" },
            viernes: { abre: "13:00", cierra: "23:00" },
            sabado: { abre: "13:00", cierra: "23:00" },
            domingo: { abre: "13:00", cierra: "22:00" }
        },
        diasServicio: ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"],
        url_localizacion: "https://www.google.com/maps/search/?api=1&query=Calzada+Madero+300+Oaxaca+de+Juárez+Oaxaca",
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    },

    // -----------------------------------------------------
    // id29
    // -----------------------------------------------------
    {
        _id: restauranteId29,
        nombre: "Burgertown",
        slug: "burgertown",
        descripcion: "Hamburguesas artesanales jugosas y gourmet.",
        categorias: ["hamburguesas"],
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764219338/download_ss7crn.jpg",
        imagen_banner: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764219356/download_qzihhp.jpg",
        calificacion: { promedio: 4.6, conteo: 165 },
        entrega: { minutosPromedio: 25, tarifa: 20 },
        direccion: {
            calle: "Av. Universidad 55",
            ciudad: "Oaxaca de Juárez",
            estado: "Oaxaca",
            geo: { lat: 17.071, lng: -96.719 }
        },
        horario: {
            lunes: { abre: "12:00", cierra: "22:00" },
            martes: { abre: "12:00", cierra: "22:00" },
            miercoles: { abre: "12:00", cierra: "22:00" },
            jueves: { abre: "12:00", cierra: "22:00" },
            viernes: { abre: "12:00", cierra: "23:00" },
            sabado: { abre: "12:00", cierra: "23:00" },
            domingo: { abre: "12:00", cierra: "22:00" }
        },
        diasServicio: ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"],
        url_localizacion: "https://www.google.com/maps/search/?api=1&query=Av.+Universidad+55+Oaxaca+de+Juárez+Oaxaca",
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    },

    // -----------------------------------------------------
    // id30
    // -----------------------------------------------------
    {
        _id: restauranteId30,
        nombre: "Café Aromas",
        slug: "cafe-aromas",
        descripcion: "Café artesanal, panadería y bebidas calientes.",
        categorias: ["cafe", "postres"],
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764219513/download_e1nza8.jpg",
        imagen_banner: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764219516/download_t3ssfn.png",
        calificacion: { promedio: 4.8, conteo: 144 },
        entrega: { minutosPromedio: 20, tarifa: 15 },
        direccion: {
            calle: "Morelos 150",
            ciudad: "Oaxaca de Juárez",
            estado: "Oaxaca",
            geo: { lat: 17.074, lng: -96.712 }
        },
        horario: {
            lunes: { abre: "08:00", cierra: "21:00" },
            martes: { abre: "08:00", cierra: "21:00" },
            miercoles: { abre: "08:00", cierra: "21:00" },
            jueves: { abre: "08:00", cierra: "21:00" },
            viernes: { abre: "08:00", cierra: "22:00" },
            sabado: { abre: "08:00", cierra: "22:00" },
            domingo: { abre: "08:00", cierra: "21:00" }
        },
        diasServicio: ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"],
        url_localizacion: "https://www.google.com/maps/search/?api=1&query=Morelos+150+Oaxaca+de+Juárez+Oaxaca",
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    },

    // -----------------------------------------------------
    // id31
    // -----------------------------------------------------
    {
        _id: restauranteId31,
        nombre: "La Casa Oaxaqueña",
        slug: "la-casa-oaxaquena",
        descripcion: "Platillos tradicionales de Oaxaca.",
        categorias: ["oaxaquena", "mexicana"],
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764219759/download_qi52si.jpg",
        imagen_banner: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764219785/download_anarl6.jpg",
        calificacion: { promedio: 4.9, conteo: 300 },
        entrega: { minutosPromedio: 45, tarifa: 30 },
        direccion: {
            calle: "Bustamante 67",
            ciudad: "Oaxaca de Juárez",
            estado: "Oaxaca",
            geo: { lat: 17.076, lng: -96.711 }
        },
        horario: {
            lunes: { abre: "13:00", cierra: "22:00" },
            martes: { abre: "13:00", cierra: "22:00" },
            miercoles: { abre: "13:00", cierra: "22:00" },
            jueves: { abre: "13:00", cierra: "22:00" },
            viernes: { abre: "13:00", cierra: "23:00" },
            sabado: { abre: "13:00", cierra: "23:00" },
            domingo: { abre: "13:00", cierra: "22:00" }
        },
        diasServicio: ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"],
        url_localizacion: "https://www.google.com/maps/search/?api=1&query=Bustamante+67+Oaxaca+de+Juárez+Oaxaca",
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    },

    // -----------------------------------------------------
    // id32
    // -----------------------------------------------------
    {
        _id: restauranteId32,
        nombre: "Pizzería Don Luigi",
        slug: "pizzeria-don-luigi",
        descripcion: "Pizzas artesanales al horno de piedra.",
        categorias: ["pizzeria", "italiana"],
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764219863/download_qfyru4.jpg",
        imagen_banner: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764219880/download_r9u7z6.jpg",
        calificacion: { promedio: 4.7, conteo: 190 },
        entrega: { minutosPromedio: 35, tarifa: 25 },
        direccion: {
            calle: "Independencia 400",
            ciudad: "Oaxaca de Juárez",
            estado: "Oaxaca",
            geo: { lat: 17.072, lng: -96.714 }
        },
        horario: {
            lunes: { abre: "12:00", cierra: "23:00" },
            martes: { abre: "12:00", cierra: "23:00" },
            miercoles: { abre: "12:00", cierra: "23:00" },
            jueves: { abre: "12:00", cierra: "23:00" },
            viernes: { abre: "12:00", cierra: "00:00" },
            sabado: { abre: "12:00", cierra: "00:00" },
            domingo: { abre: "12:00", cierra: "22:00" }
        },
        diasServicio: ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"],
        url_localizacion: "https://www.google.com/maps/search/?api=1&query=Independencia+400+Oaxaca+de+Juárez+Oaxaca",
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    },

    // -----------------------------------------------------
    // id33
    // -----------------------------------------------------
    {
        _id: restauranteId33,
        nombre: "Green Life",
        slug: "green-life",
        descripcion: "Restaurante vegano con ingredientes frescos.",
        categorias: ["vegana"],
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764219943/download_xmoba6.png",
        imagen_banner: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764219947/download_s9igik.jpg",
        calificacion: { promedio: 4.8, conteo: 120 },
        entrega: { minutosPromedio: 25, tarifa: 20 },
        direccion: {
            calle: "Melchor Ocampo 155",
            ciudad: "Oaxaca de Juárez",
            estado: "Oaxaca",
            geo: { lat: 17.070, lng: -96.713 }
        },
        horario: {
            lunes: { abre: "11:00", cierra: "21:00" },
            martes: { abre: "11:00", cierra: "21:00" },
            miercoles: { abre: "11:00", cierra: "21:00" },
            jueves: { abre: "11:00", cierra: "21:00" },
            viernes: { abre: "11:00", cierra: "22:00" },
            sabado: { abre: "11:00", cierra: "22:00" },
            domingo: { abre: "11:00", cierra: "21:00" }
        },
        diasServicio: ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"],
        url_localizacion: "https://www.google.com/maps/search/?api=1&query=Melchor+Ocampo+155+Oaxaca+de+Juárez+Oaxaca",
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    },

    // -----------------------------------------------------
    // id34
    // -----------------------------------------------------
    {
        _id: restauranteId34,
        nombre: "Dulces Tentaciones",
        slug: "dulces-tentaciones",
        descripcion: "Repostería fina y postres artesanales.",
        categorias: ["postres"],
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764220107/download_rttxhc.jpg",
        imagen_banner: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764220161/images_dgumji.jpg",
        calificacion: { promedio: 4.9, conteo: 230 },
        entrega: { minutosPromedio: 20, tarifa: 20 },
        direccion: {
            calle: "Garcia Vigil 78",
            ciudad: "Oaxaca de Juárez",
            estado: "Oaxaca",
            geo: { lat: 17.074, lng: -96.715 }
        },
        horario: {
            lunes: { abre: "10:00", cierra: "21:00" },
            martes: { abre: "10:00", cierra: "21:00" },
            miercoles: { abre: "10:00", cierra: "21:00" },
            jueves: { abre: "10:00", cierra: "21:00" },
            viernes: { abre: "10:00", cierra: "22:00" },
            sabado: { abre: "10:00", cierra: "22:00" },
            domingo: { abre: "10:00", cierra: "21:00" }
        },
        diasServicio: ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"],
        url_localizacion: "https://www.google.com/maps/search/?api=1&query=Garcia+Vigil+78+Oaxaca+de+Juárez+Oaxaca",
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    },

    // -----------------------------------------------------
    // id35
    // -----------------------------------------------------
    {
        _id: restauranteId35,
        nombre: "Noodle Lab",
        slug: "noodle-lab",
        descripcion: "Tallarines orientales, ramen y platos asiáticos.",
        categorias: ["ramen", "japonesa"],
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764220246/download_f720vk.jpg",
        imagen_banner: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764220249/images_mbfowc.jpg",
        calificacion: { promedio: 4.7, conteo: 156 },
        entrega: { minutosPromedio: 35, tarifa: 25 },
        direccion: {
            calle: "Heroica Escuela Naval 200",
            ciudad: "Oaxaca de Juárez",
            estado: "Oaxaca",
            geo: { lat: 17.079, lng: -96.718 }
        },
        horario: {
            lunes: { abre: "12:00", cierra: "22:00" },
            martes: { abre: "12:00", cierra: "22:00" },
            miercoles: { abre: "12:00", cierra: "22:00" },
            jueves: { abre: "12:00", cierra: "22:00" },
            viernes: { abre: "12:00", cierra: "23:00" },
            sabado: { abre: "12:00", cierra: "23:00" },
            domingo: { abre: "12:00", cierra: "22:00" }
        },
        diasServicio: ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"],
        url_localizacion: "https://www.google.com/maps/search/?api=1&query=Heroica+Escuela+Naval+200+Oaxaca+de+Juárez+Oaxaca",
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    }
]);

dbChef.productos.insertMany([
    // ============================================================
    // 🔹 RESTAURANTE 26 — productos 106–110
    // ============================================================
    {
        _id: productoId106,
        restauranteId: restauranteId26,
        nombre: "Ceviche de pescado",
        descripcion: "Pescado fresco marinado en limón con verduras.",
        precio: 85,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764220314/download_vygloc.jpg",
        disponible: true,
        etiquetas: ["mariscos", "platillo"],
        categoriaMenu: "Platos fuertes",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId107,
        restauranteId: restauranteId26,
        nombre: "Tostada de camarón",
        descripcion: "Tostada crujiente con camarón preparado al estilo de la casa.",
        precio: 45,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764220385/download_w1ak6g.jpg",
        disponible: true,
        etiquetas: ["mariscos"],
        categoriaMenu: "Entradas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId108,
        restauranteId: restauranteId26,
        nombre: "Filete empanizado",
        descripcion: "Filete de pescado crocante acompañado de ensalada.",
        precio: 95,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764220400/download_twerds.jpg",
        disponible: true,
        etiquetas: ["mariscos", "platillo"],
        categoriaMenu: "Platos fuertes",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId109,
        restauranteId: restauranteId26,
        nombre: "Coctel de camarón",
        descripcion: "Camarones frescos en salsa de tomate con limón.",
        precio: 90,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764220432/download_kwjdqc.jpg",
        disponible: true,
        etiquetas: ["mariscos"],
        categoriaMenu: "Entradas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId110,
        restauranteId: restauranteId26,
        nombre: "Agua de horchata",
        descripcion: "Refrescante agua natural de horchata.",
        precio: 25,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764220463/download_ddowlo.jpg",
        disponible: true,
        etiquetas: ["bebidas"],
        categoriaMenu: "Bebidas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },

    // ============================================================
    // 🔹 RESTAURANTE 27 — productos 111–115
    // ============================================================
    {
        _id: productoId111,
        restauranteId: restauranteId27,
        nombre: "Pizza margarita",
        descripcion: "Clásica pizza italiana con tomate, queso y albahaca.",
        precio: 120,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764220510/download_hwgnvg.jpg",
        disponible: true,
        etiquetas: ["italiana", "platillo"],
        categoriaMenu: "Platos fuertes",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId112,
        restauranteId: restauranteId27,
        nombre: "Lasaña boloñesa",
        descripcion: "Pasta horneada con salsa boloñesa casera.",
        precio: 140,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764220521/download_vrmpi9.jpg",
        disponible: true,
        etiquetas: ["italiana"],
        categoriaMenu: "Platos fuertes",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId113,
        restauranteId: restauranteId27,
        nombre: "Ensalada caprese",
        descripcion: "Jitomate, mozzarella fresca y albahaca.",
        precio: 80,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764220560/download_v7hf8e.jpg",
        disponible: true,
        etiquetas: ["italiana", "ensalada"],
        categoriaMenu: "Entradas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId114,
        restauranteId: restauranteId27,
        nombre: "Pan de ajo",
        descripcion: "Pan horneado con mantequilla y ajo.",
        precio: 40,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764220580/download_h5hsng.jpg",
        disponible: true,
        etiquetas: ["italiana", "entrada"],
        categoriaMenu: "Entradas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId115,
        restauranteId: restauranteId27,
        nombre: "Agua mineral italiana",
        descripcion: "Agua mineral importada de Italia.",
        precio: 30,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764220621/download_r7px5e.jpg",
        disponible: true,
        etiquetas: ["bebidas"],
        categoriaMenu: "Bebidas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },

    // ============================================================
    // 🔹 RESTAURANTE 28 — productos 116–120
    // ============================================================
    {
        _id: productoId116,
        restauranteId: restauranteId28,
        nombre: "Sushi roll clásico",
        descripcion: "Roll de pepino, aguacate y surimi.",
        precio: 75,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764220639/download_plbnue.jpg",
        disponible: true,
        etiquetas: ["japonesa"],
        categoriaMenu: "Platos fuertes",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId117,
        restauranteId: restauranteId28,
        nombre: "Yakimeshi",
        descripcion: "Arroz frito japonés con verduras.",
        precio: 70,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764220670/download_jpokpk.jpg",
        disponible: true,
        etiquetas: ["japonesa", "platillo"],
        categoriaMenu: "Platos fuertes",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId118,
        restauranteId: restauranteId28,
        nombre: "Tempura mixto",
        descripcion: "Verduras y camarón capeado estilo japonés.",
        precio: 90,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764220689/download_fhbt6y.jpg",
        disponible: true,
        etiquetas: ["japonesa"],
        categoriaMenu: "Entradas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId119,
        restauranteId: restauranteId28,
        nombre: "Gyozas",
        descripcion: "Empanadillas japonesas rellenas de carne.",
        precio: 60,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764220718/download_hoalry.jpg",
        disponible: true,
        etiquetas: ["japonesa"],
        categoriaMenu: "Entradas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId120,
        restauranteId: restauranteId28,
        nombre: "Té verde helado",
        descripcion: "Refrescante té verde frío.",
        precio: 30,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764220729/download_xxghdn.jpg",
        disponible: true,
        etiquetas: ["bebidas"],
        categoriaMenu: "Bebidas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },

    // ============================================================
    // 🔹 RESTAURANTE 29 — productos 121–125
    // ============================================================
    {
        _id: productoId121,
        restauranteId: restauranteId29,
        nombre: "Hamburguesa clásica",
        descripcion: "Carne 100% res con lechuga, jitomate y queso.",
        precio: 85,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764220785/download_dvsp5q.jpg",
        disponible: true,
        etiquetas: ["hamburguesas"],
        categoriaMenu: "Platos fuertes",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId122,
        restauranteId: restauranteId29,
        nombre: "Papas a la francesa",
        descripcion: "Papas fritas crujientes.",
        precio: 35,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764220793/download_q3q0xz.jpg",
        disponible: true,
        etiquetas: ["comida"],
        categoriaMenu: "Entradas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId123,
        restauranteId: restauranteId29,
        nombre: "Hamburguesa BBQ",
        descripcion: "Carne con salsa BBQ y cebolla caramelizada.",
        precio: 95,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764220827/download_sxdl0s.jpg",
        disponible: true,
        etiquetas: ["hamburguesas"],
        categoriaMenu: "Platos fuertes",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId124,
        restauranteId: restauranteId29,
        nombre: "Aros de cebolla",
        descripcion: "Cebolla empanizada frita.",
        precio: 45,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764220838/download_hdnw2n.jpg",
        disponible: true,
        etiquetas: ["comida"],
        categoriaMenu: "Entradas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId125,
        restauranteId: restauranteId29,
        nombre: "Refresco",
        descripcion: "Refresco en lata.",
        precio: 20,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764220873/download_wg7g44.jpg",
        disponible: true,
        etiquetas: ["bebidas"],
        categoriaMenu: "Bebidas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },

    // ============================================================
    // 🔹 RESTAURANTE 30 — productos 126–130
    // ============================================================
    {
        _id: productoId126,
        restauranteId: restauranteId30,
        nombre: "Latte",
        descripcion: "Café latte con leche espumosa.",
        precio: 45,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764220879/download_xijghj.jpg",
        disponible: true,
        etiquetas: ["cafe"],
        categoriaMenu: "Bebidas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId127,
        restauranteId: restauranteId30,
        nombre: "Café americano",
        descripcion: "Café negro recién preparado.",
        precio: 35,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764220926/download_jpkqmg.jpg",
        disponible: true,
        etiquetas: ["cafe"],
        categoriaMenu: "Bebidas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId128,
        restauranteId: restauranteId30,
        nombre: "Panqué de vainilla",
        descripcion: "Panqué casero suave y dulce.",
        precio: 30,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764220936/download_hid1gd.jpg",
        disponible: true,
        etiquetas: ["postres"],
        categoriaMenu: "Postres",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId129,
        restauranteId: restauranteId30,
        nombre: "Galletas artesanales",
        descripcion: "Galletas recién horneadas.",
        precio: 25,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764220974/download_bahw5u.jpg",
        disponible: true,
        etiquetas: ["postres"],
        categoriaMenu: "Postres",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId130,
        restauranteId: restauranteId30,
        nombre: "Té chai",
        descripcion: "Té chai especiado.",
        precio: 40,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764220986/download_sosakf.jpg",
        disponible: true,
        etiquetas: ["bebidas"],
        categoriaMenu: "Bebidas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },

    // ============================================================
    // 🔹 RESTAURANTE 31 — productos 131–135
    // ============================================================
    {
        _id: productoId131,
        restauranteId: restauranteId31,
        nombre: "Mole negro",
        descripcion: "Platillo tradicional oaxaqueño con pollo y mole.",
        precio: 110,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764221012/download_vnipxw.jpg",
        disponible: true,
        etiquetas: ["oaxaqueña"],
        categoriaMenu: "Platos fuertes",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId132,
        restauranteId: restauranteId31,
        nombre: "Tlayuda sencilla",
        descripcion: "Tlayuda crujiente con asiento, queso y repollo.",
        precio: 60,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764221020/download_i5rq0y.jpg",
        disponible: true,
        etiquetas: ["oaxaqueña"],
        categoriaMenu: "Platos fuertes",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId133,
        restauranteId: restauranteId31,
        nombre: "Memelas",
        descripcion: "Memelas de asiento con queso.",
        precio: 35,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764221048/download_t9husn.jpg",
        disponible: true,
        etiquetas: ["oaxaqueña"],
        categoriaMenu: "Entradas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId134,
        restauranteId: restauranteId31,
        nombre: "Tamales oaxaqueños",
        descripcion: "Tamales tradicionales envueltos en hoja de plátano.",
        precio: 30,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764221093/download_pch3fe.jpg",
        disponible: true,
        etiquetas: ["oaxaqueña"],
        categoriaMenu: "Entradas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId135,
        restauranteId: restauranteId31,
        nombre: "Agua de chilacayota",
        descripcion: "Bebida tradicional dulce y refrescante.",
        precio: 20,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764221102/download_kw6adt.jpg",
        disponible: true,
        etiquetas: ["bebidas"],
        categoriaMenu: "Bebidas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },

    // ============================================================
    // 🔹 RESTAURANTE 32 — productos 136–140
    // ============================================================
    {
        _id: productoId136,
        restauranteId: restauranteId32,
        nombre: "Pizza pepperoni",
        descripcion: "Pizza clásica con pepperoni.",
        precio: 110,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764221150/download_cuivr1.jpg",
        disponible: true,
        etiquetas: ["pizzeria"],
        categoriaMenu: "Platos fuertes",
        creadoEn: ahora,
        actualizadoEn: now
    },
    {
        _id: productoId137,
        restauranteId: restauranteId32,
        nombre: "Pizza hawaiana",
        descripcion: "Pizza con jamón y piña.",
        precio: 120,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764221158/download_oaevlv.jpg",
        disponible: true,
        etiquetas: ["pizzeria"],
        categoriaMenu: "Platos fuertes",
        creadoEn: ahora,
        actualizadoEn: now
    },
    {
        _id: productoId138,
        restauranteId: restauranteId32,
        nombre: "Pasta alfredo",
        descripcion: "Pasta con salsa cremosa alfredo.",
        precio: 95,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764221191/download_nzdhep.jpg",
        disponible: true,
        etiquetas: ["italiana"],
        categoriaMenu: "Platos fuertes",
        creadoEn: ahora,
        actualizadoEn: now
    },
    {
        _id: productoId139,
        restauranteId: restauranteId32,
        nombre: "Pan de ajo",
        descripcion: "Pan con mantequilla y ajo.",
        precio: 40,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764221218/download_vj48lm.jpg",
        disponible: true,
        etiquetas: ["italiana"],
        categoriaMenu: "Entradas",
        creadoEn: ahora,
        actualizadoEn: now
    },
    {
        _id: productoId140,
        restauranteId: restauranteId32,
        nombre: "Refresco",
        descripcion: "Refresco en lata.",
        precio: 20,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764221252/download_syfiwt.jpg",
        disponible: true,
        etiquetas: ["bebidas"],
        categoriaMenu: "Bebidas",
        creadoEn: ahora,
        actualizadoEn: now
    },

    // ============================================================
    // 🔹 RESTAURANTE 33 — productos 141–145
    // ============================================================
    {
        _id: productoId141,
        restauranteId: restauranteId33,
        nombre: "Hamburguesa vegana",
        descripcion: "Hamburguesa con carne vegetal.",
        precio: 90,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764221264/download_h6qit6.jpg",
        disponible: true,
        etiquetas: ["vegana"],
        categoriaMenu: "Platos fuertes",
        creadoEn: ahora,
        actualizadoEn: now
    },
    {
        _id: productoId142,
        restauranteId: restauranteId33,
        nombre: "Tacos veganos",
        descripcion: "Tacos con relleno vegetal.",
        precio: 70,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764221290/download_c7tgxm.jpg",
        disponible: true,
        etiquetas: ["vegana"],
        categoriaMenu: "Platos fuertes",
        creadoEn: ahora,
        actualizadoEn: now
    },
    {
        _id: productoId143,
        restauranteId: restauranteId33,
        nombre: "Ensalada fresca",
        descripcion: "Ensalada de verduras frescas.",
        precio: 55,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764221300/download_wo05z1.jpg",
        disponible: true,
        etiquetas: ["vegana"],
        categoriaMenu: "Entradas",
        creadoEn: ahora,
        actualizadoEn: now
    },
    {
        _id: productoId144,
        restauranteId: restauranteId33,
        nombre: "Bowl de quinoa",
        descripcion: "Quinoa con vegetales y aderezo.",
        precio: 75,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764221350/download_ghvrfy.jpg",
        disponible: true,
        etiquetas: ["vegana"],
        categoriaMenu: "Platos fuertes",
        creadoEn: ahora,
        actualizadoEn: now
    },
    {
        _id: productoId145,
        restauranteId: restauranteId33,
        nombre: "Agua de limón",
        descripcion: "Agua de limón natural.",
        precio: 20,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764221365/download_in9bmk.jpg",
        disponible: true,
        etiquetas: ["bebidas"],
        categoriaMenu: "Bebidas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },

    // ============================================================
    // 🔹 RESTAURANTE 34 — productos 146–150
    // ============================================================
    {
        _id: productoId146,
        restauranteId: restauranteId34,
        nombre: "Pastel de chocolate",
        descripcion: "Rebanada de pastel de chocolate.",
        precio: 55,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764221408/download_ahewkf.jpg",
        disponible: true,
        etiquetas: ["postres"],
        categoriaMenu: "Postres",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId147,
        restauranteId: restauranteId34,
        nombre: "Pay de limón",
        descripcion: "Rebanada de pay de limón.",
        precio: 50,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764221425/download_tz2apz.jpg",
        disponible: true,
        etiquetas: ["postres"],
        categoriaMenu: "Postres",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId148,
        restauranteId: restauranteId34,
        nombre: "Helado",
        descripcion: "Helado de vainilla.",
        precio: 30,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764221465/download_ughwb0.jpg",
        disponible: true,
        etiquetas: ["postres"],
        categoriaMenu: "Postres",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId149,
        restauranteId: restauranteId34,
        nombre: "Brownie",
        descripcion: "Brownie de chocolate.",
        precio: 35,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764221477/download_gl4sp3.jpg",
        disponible: true,
        etiquetas: ["postres"],
        categoriaMenu: "Postres",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId150,
        restauranteId: restauranteId34,
        nombre: "Malteada de fresa",
        descripcion: "Malteada cremosa de fresa.",
        precio: 45,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764221509/download_wuedfc.jpg",
        disponible: true,
        etiquetas: ["bebidas"],
        categoriaMenu: "Bebidas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },

    // ============================================================
    // 🔹 RESTAURANTE 35 — productos 151–155
    // ============================================================
    {
        _id: productoId151,
        restauranteId: restauranteId35,
        nombre: "Ramen tradicional",
        descripcion: "Ramen estilo japonés con caldo casero.",
        precio: 110,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764221516/download_mlguax.jpg",
        disponible: true,
        etiquetas: ["ramen"],
        categoriaMenu: "Platos fuertes",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId152,
        restauranteId: restauranteId35,
        nombre: "Ramen picante",
        descripcion: "Ramen en caldo picante.",
        precio: 120,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764221564/download_vzouxz.jpg",
        disponible: true,
        etiquetas: ["ramen"],
        categoriaMenu: "Platos fuertes",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId153,
        restauranteId: restauranteId35,
        nombre: "Gohan",
        descripcion: "Arroz blanco japonés.",
        precio: 35,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764221578/download_oqjfre.jpg",
        disponible: true,
        etiquetas: ["japonesa"],
        categoriaMenu: "Entradas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId154,
        restauranteId: restauranteId35,
        nombre: "Brochetas yakitori",
        descripcion: "Brochetas de pollo a la parrilla estilo japonés.",
        precio: 65,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764221622/download_dpqe6z.jpg",
        disponible: true,
        etiquetas: ["japonesa"],
        categoriaMenu: "Entradas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId155,
        restauranteId: restauranteId35,
        nombre: "Té de jazmín",
        descripcion: "Té aromático de jazmín.",
        precio: 25,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764221629/download_pmfikt.jpg",
        disponible: true,
        etiquetas: ["bebidas"],
        categoriaMenu: "Bebidas",
        creadoEn: ahora,
        actualizadoEn: ahora
    }
]);

