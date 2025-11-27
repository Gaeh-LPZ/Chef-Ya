const dbChef = db.getSiblingDB('chefya');

const ahora = new Date();

// ============================================================
// DEFINICIÓN DE NUEVOS IDs (Puebla Batch)
// ============================================================

// Categorías nuevas (opcionales, si necesitas específicas de Puebla)
const categoriaId36 = new ObjectId(); // Poblana
const categoriaId37 = new ObjectId(); // Panaderia

// Restaurantes id36 → id40 (Puebla)
const restauranteId36 = new ObjectId();
const restauranteId37 = new ObjectId();
const restauranteId38 = new ObjectId();
const restauranteId39 = new ObjectId();
const restauranteId40 = new ObjectId();

// Productos id156 → id180 (25 productos nuevos)
const productoId156 = new ObjectId();
const productoId157 = new ObjectId();
const productoId158 = new ObjectId();
const productoId159 = new ObjectId();
const productoId160 = new ObjectId();

const productoId161 = new ObjectId();
const productoId162 = new ObjectId();
const productoId163 = new ObjectId();
const productoId164 = new ObjectId();
const productoId165 = new ObjectId();

const productoId166 = new ObjectId();
const productoId167 = new ObjectId();
const productoId168 = new ObjectId();
const productoId169 = new ObjectId();
const productoId170 = new ObjectId();

const productoId171 = new ObjectId();
const productoId172 = new ObjectId();
const productoId173 = new ObjectId();
const productoId174 = new ObjectId();
const productoId175 = new ObjectId();

const productoId176 = new ObjectId();
const productoId177 = new ObjectId();
const productoId178 = new ObjectId();
const productoId179 = new ObjectId();
const productoId180 = new ObjectId();

// Insertar nuevas categorías específicas si no existen
dbChef.categorias.insertMany([
    { _id: categoriaId36, slug: "poblana", nombre: "Poblana" },
    { _id: categoriaId37, slug: "panaderia", nombre: "Panadería" }
]);

dbChef.restaurantes.insertMany([
    // -----------------------------------------------------
    // id36 - Restaurante Tradicional (Puebla Centro)
    // -----------------------------------------------------
    {
        _id: restauranteId36,
        nombre: "Casona del Mole Poblano",
        slug: "casona-del-mole-poblano",
        descripcion: "El mejor mole de Puebla en el corazón del centro histórico.",
        categorias: ["poblana", "mexicana"],
        imagen: "https://media-cdn.tripadvisor.com/media/photo-m/1280/21/dc/71/4b/nuestro-logo-oficial.jpg", // Placeholder
        imagen_banner: "https://turismoafondo.mx/wp-content/uploads/2021/03/restaurantes_puebla_muraldelospoblanos.jpeg", // Placeholder
        calificacion: { promedio: 4.9, conteo: 450 },
        entrega: { minutosPromedio: 45, tarifa: 35 },
        direccion: {
            calle: "Av. Henry Ford Esquina con Amalia 186, Guadalupe Tepeyac, Gustavo A. Madero, 07840 Ciudad de México, CDMX",
            ciudad: "Puebla",
            estado: "Puebla",
            geo: { lat: 19.0437, lng: -98.1983 }
        },
        horario: {
            lunes: { abre: "13:00", cierra: "22:00" },
            martes: { abre: "13:00", cierra: "22:00" },
            miercoles: { abre: "13:00", cierra: "22:00" },
            jueves: { abre: "13:00", cierra: "22:00" },
            viernes: { abre: "13:00", cierra: "23:00" },
            sabado: { abre: "13:00", cierra: "23:00" },
            domingo: { abre: "13:00", cierra: "21:00" }
        },
        diasServicio: ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"],
        url_localizacion: "https://maps.app.goo.gl/snHhqraKd1bL36cT6",
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    },

    // -----------------------------------------------------
    // id37 - Pastelería / Dulces (Barrio del Artista)
    // -----------------------------------------------------
    {
        _id: restauranteId37,
        nombre: "Dulces y Postres Santa Clara",
        slug: "dulces-y-postres-santa-clara",
        descripcion: "Dulces típicos de Puebla y repostería fina.",
        categorias: ["postres", "panaderia"],
        imagen: "https://scontent.fpbc2-3.fna.fbcdn.net/v/t39.30808-6/299894614_395352206038075_7492315013493827868_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=K85yL5ZZGjsQ7kNvwEGCeUS&_nc_oc=AdmidPexbKJTmabiIrVLtmY5GSlzfPvmB5IEe3bc9-Aq-nU68dVXEGROtpnqN9eVYR8&_nc_zt=23&_nc_ht=scontent.fpbc2-3.fna&_nc_gid=b7dK1ecOsh0LkyP5hfAhKw&oh=00_Afhxc4a7JzpxfNcv5ziqmHFnENZ8UcrwMx9TjCvMvOQEqw&oe=692E4C48", // Placeholder
        imagen_banner: "https://scontent.fpbc2-3.fna.fbcdn.net/v/t39.30808-6/472233870_911534861086471_9072517238513785649_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=CLlt_0hGddMQ7kNvwGJWjFh&_nc_oc=AdmMv3aWfaN0Fd04GXVAPO6SNTYaY9Q8X5OLqchZgIr5WYVj5yCxmX2fIO6l7Zqi4Dc&_nc_zt=23&_nc_ht=scontent.fpbc2-3.fna&_nc_gid=lPfnPaN0Cdq-knyj3Z5cWA&oh=00_AfiCY96ZlDr67UcboRUxGmM8v78lEDJ-vVd4uIbtcqZpHA&oe=692E3ED3", // Placeholder
        calificacion: { promedio: 4.8, conteo: 320 },
        entrega: { minutosPromedio: 30, tarifa: 25 },
        direccion: {
            calle: "Parque Puebla, Calzada Ignacio Zaragoza, 72220 Heroica Puebla de Zaragoza, Pue.",
            ciudad: "Puebla",
            estado: "Puebla",
            geo: { lat: 19.0430, lng: -98.1960 }
        },
        horario: {
            lunes: { abre: "10:00", cierra: "20:00" },
            martes: { abre: "10:00", cierra: "20:00" },
            miercoles: { abre: "10:00", cierra: "20:00" },
            jueves: { abre: "10:00", cierra: "20:00" },
            viernes: { abre: "10:00", cierra: "21:00" },
            sabado: { abre: "10:00", cierra: "21:00" },
            domingo: { abre: "11:00", cierra: "19:00" }
        },
        diasServicio: ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"],
        url_localizacion: "https://maps.app.goo.gl/mbRLzdyD2sSXmFE8A",
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    },

    // -----------------------------------------------------
    // id38 - Cafetería (Zona Av. Juárez)
    // -----------------------------------------------------
    {
        _id: restauranteId38,
        nombre: "Café Talavera",
        slug: "cafe-talavera",
        descripcion: "Café de altura poblano en un ambiente relajado.",
        categorias: ["cafe", "postres"],
        imagen: "https://scontent.fpbc2-1.fna.fbcdn.net/v/t39.30808-6/301020022_110547115117073_6344943016877260916_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Szoj5eLFvwgQ7kNvwGu4VuU&_nc_oc=Adms-XkHHTeIn0RrmdwpyhlGgwLLzktZefAwQ5JB_QYAfz2WMzflB4GBHVUjeIunmag&_nc_zt=23&_nc_ht=scontent.fpbc2-1.fna&_nc_gid=Zjoj18OEowwTIzOoqf2OnQ&oh=00_AfgZoJIaoooBbGTVo4hMZHBdpDtHxMdhTtTMBygl1l1Vow&oe=692E2643", // Placeholder
        imagen_banner: "https://scontent.fpbc2-3.fna.fbcdn.net/v/t39.30808-6/301582137_110562815115503_6030312323594528954_n.png?_nc_cat=100&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=8OydI48iXsMQ7kNvwF7sNBL&_nc_oc=Adn_RTiFhxP8Y7JVkSoo-cNp-6_mIZCWmfd-epwGJ3EIrhcvvrMOt21fQCB9TidjzDE&_nc_zt=23&_nc_ht=scontent.fpbc2-3.fna&_nc_gid=nhMBBgmHqJ-5I5hfFh_s7g&oh=00_AfizxGuiTVK6c4xUAFGZV9DXHjd51Gtg0-d_QrgfeuK-Pw&oe=692E4C7E", // Placeholder
        calificacion: { promedio: 4.7, conteo: 180 },
        entrega: { minutosPromedio: 25, tarifa: 20 },
        direccion: {
            calle: "Av 5 Pte 2522, La Paz, 72160 Heroica Puebla de Zaragoza, Pue.",
            ciudad: "Puebla",
            estado: "Puebla",
            geo: { lat: 19.0489, lng: -98.2163 }
        },
        horario: {
            lunes: { abre: "08:00", cierra: "22:00" },
            martes: { abre: "08:00", cierra: "22:00" },
            miercoles: { abre: "08:00", cierra: "22:00" },
            jueves: { abre: "08:00", cierra: "22:00" },
            viernes: { abre: "08:00", cierra: "23:00" },
            sabado: { abre: "09:00", cierra: "23:00" },
            domingo: { abre: "09:00", cierra: "21:00" }
        },
        diasServicio: ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"],
        url_localizacion: "https://maps.app.goo.gl/iwSygKo2CAEi5YjC7",
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    },

    // -----------------------------------------------------
    // id39 - Vegano (Cholula / Puebla limítrofe)
    // -----------------------------------------------------
    {
        _id: restauranteId39,
        nombre: "Verde Orgánico",
        slug: "verde-organico-puebla",
        descripcion: "Cocina 100% basada en plantas y libre de gluten.",
        categorias: ["vegana", "ensalada"],
        imagen: "https://scontent.fpbc2-6.fna.fbcdn.net/v/t39.30808-6/294600897_522101896409330_9178256851082885016_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Ig6_FWyfILwQ7kNvwGsIHlD&_nc_oc=AdkRjCNhHY9INVUmrd7l0CgBZpa8fgAkDqt_FbgYz-MGXvcSfd8vOCIkBOCFf98XcWY&_nc_zt=23&_nc_ht=scontent.fpbc2-6.fna&_nc_gid=WkC6dYTZF08CKBlNsThpQg&oh=00_Afi06iaSE9dEftqfSVY1nD93pehqrgc9akw5L-61BRFpgA&oe=692E3359", // Placeholder
        imagen_banner: "https://scontent.fpbc2-3.fna.fbcdn.net/v/t39.30808-6/477808510_1207888014497378_7869249115184728421_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=5_dqcEuZeGAQ7kNvwGmWcT6&_nc_oc=AdmXUWG1vX_2t1sRTgze2xg1xYxvXxDDeroNx0bqiS5yDjpAFDH1LQeLFhVOGsFm2Ro&_nc_zt=23&_nc_ht=scontent.fpbc2-3.fna&_nc_gid=2Vhbz_YRJWALOlgHQXBGPg&oh=00_Afge56cPshASHe963zLJ9D-QwoxihP-6KECg4LWDKkH1ig&oe=692E34FA", // Placeholder
        calificacion: { promedio: 4.8, conteo: 150 },
        entrega: { minutosPromedio: 40, tarifa: 30 },
        direccion: {
            calle: "Calzada Zavaleta, Colonia Concepción la Cruz 1905, Buenavista, 72176 Heroica Puebla de Zaragoza, Pue.",
            ciudad: "Puebla",
            estado: "Puebla",
            geo: { lat: 19.0550, lng: -98.2400 }
        },
        horario: {
            lunes: { abre: "12:00", cierra: "20:00" },
            martes: { abre: "12:00", cierra: "20:00" },
            miercoles: { abre: "12:00", cierra: "20:00" },
            jueves: { abre: "12:00", cierra: "20:00" },
            viernes: { abre: "12:00", cierra: "21:00" },
            sabado: { abre: "12:00", cierra: "21:00" },
            domingo: { abre: "12:00", cierra: "18:00" }
        },
        diasServicio: ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"],
        url_localizacion: "https://maps.app.goo.gl/EGg8fwskXptYFn9w7",
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    },

    // -----------------------------------------------------
    // id40 - Tacos Árabes (Angelópolis/Zavaleta) - General
    // -----------------------------------------------------
    {
        _id: restauranteId40,
        nombre: "Tacos Árabes El Sultán",
        slug: "tacos-arabes-el-sultan",
        descripcion: "Los tradicionales tacos árabes de Puebla con salsa especial.",
        categorias: ["poblana", "mexicana"],
        imagen: "https://scontent.fpbc2-1.fna.fbcdn.net/v/t39.30808-6/429806061_122106114488218711_7911753425280897342_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=anhf-qP3hyYQ7kNvwF0uP3E&_nc_oc=AdkUhuDYv2Z1c-wKGaZh-nAUSTCXurfIpPihXDIHhdStYXUPtY6yaaTu_iPgUIZl5mg&_nc_zt=23&_nc_ht=scontent.fpbc2-1.fna&_nc_gid=Eaznb5J-Xm4STghSXKFVwQ&oh=00_AfiyRucNKeWY4uIaHf4cHglJJA0sgAIROKJZk1kxTnOd2g&oe=692E5020", // Placeholder
        imagen_banner: "https://scontent.fpbc2-1.fna.fbcdn.net/v/t39.30808-6/470207439_122195594294218711_5923656046453333380_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=go2I3UNoP58Q7kNvwEQ70J-&_nc_oc=AdlBipMowZ2gculT2_o5vcfNa8q8z35q72-bAIa1_QzuYEth0OtcH2XMbBXIQLq08k4&_nc_zt=23&_nc_ht=scontent.fpbc2-1.fna&_nc_gid=0sZtd-2uMedCXvL0H_67GA&oh=00_Afjo6Zg9SYw_mCAqxpKsw83UAVyBvCC4JbTtlEkL7BA7fA&oe=692E1E21", // Placeholder
        calificacion: { promedio: 4.6, conteo: 500 },
        entrega: { minutosPromedio: 25, tarifa: 20 },
        direccion: {
            calle: "5 de Mayo 2-Local C, Centro histórico de Puebla, 72000 Heroica Puebla de Zaragoza, Pue.",
            ciudad: "Puebla",
            estado: "Puebla",
            geo: { lat: 19.0350, lng: -98.2320 }
        },
        horario: {
            lunes: { abre: "14:00", cierra: "00:00" },
            martes: { abre: "14:00", cierra: "00:00" },
            miercoles: { abre: "14:00", cierra: "00:00" },
            jueves: { abre: "14:00", cierra: "01:00" },
            viernes: { abre: "14:00", cierra: "02:00" },
            sabado: { abre: "14:00", cierra: "02:00" },
            domingo: { abre: "14:00", cierra: "23:00" }
        },
        diasServicio: ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"],
        url_localizacion: "https://maps.app.goo.gl/HevBcHgaf9pJgDvk9",
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    }
]);

dbChef.productos.insertMany([
    // ============================================================
    // 🔹 RESTAURANTE 36 (Casona del Mole) — productos 156–160
    // ============================================================
    {
        _id: productoId156,
        restauranteId: restauranteId36,
        nombre: "Mole Poblano con Pollo",
        descripcion: "Pieza de pollo bañada en nuestro mole artesanal con ajonjolí.",
        precio: 180,
        imagen: "https://i.pinimg.com/1200x/73/83/52/73835296b4834afdd5d757bffd06613a.jpg",
        disponible: true,
        etiquetas: ["poblana", "platillo"],
        categoriaMenu: "Platos fuertes",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId157,
        restauranteId: restauranteId36,
        nombre: "Chalupas Poblanas",
        descripcion: "Orden de 4 chalupas (2 rojas, 2 verdes) con carne deshebrada.",
        precio: 65,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764221048/download_t9husn.jpg",
        disponible: true,
        etiquetas: ["poblana", "entrada"],
        categoriaMenu: "Entradas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId158,
        restauranteId: restauranteId36,
        nombre: "Chiles en Nogada",
        descripcion: "De temporada. Chile poblano relleno cubierto de nogada y granada.",
        precio: 250,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764221012/download_vnipxw.jpg", // Placeholder
        disponible: true,
        etiquetas: ["poblana", "gourmet"],
        categoriaMenu: "Especialidades",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId159,
        restauranteId: restauranteId36,
        nombre: "Sopa Poblana",
        descripcion: "Sopa de flor de calabaza con granos de elote.",
        precio: 80,
        imagen: "https://i.pinimg.com/1200x/55/85/08/558508991ba741033f08ceb407f6ade6.jpg", // Placeholder
        disponible: true,
        etiquetas: ["sopas"],
        categoriaMenu: "Entradas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId160,
        restauranteId: restauranteId36,
        nombre: "Agua de Limón con Chía",
        descripcion: "Refrescante agua natural.",
        precio: 35,
        imagen: "https://i.pinimg.com/1200x/6a/c6/a4/6ac6a4c4b4810389d78531894e70b150.jpg",
        disponible: true,
        etiquetas: ["bebidas"],
        categoriaMenu: "Bebidas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },

    // ============================================================
    // 🔹 RESTAURANTE 37 (Dulces Santa Clara) — productos 161–165
    // ============================================================
    {
        _id: productoId161,
        restauranteId: restauranteId37,
        nombre: "Tortitas de Santa Clara",
        descripcion: "Galleta tradicional de Puebla cubierta de dulce de pepita.",
        precio: 15,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764220974/download_bahw5u.jpg", // Placeholder
        disponible: true,
        etiquetas: ["postres", "poblana"],
        categoriaMenu: "Dulces Típicos",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId162,
        restauranteId: restauranteId37,
        nombre: "Camotes Poblanos",
        descripcion: "Caja de camotes de sabores variados.",
        precio: 60,
        imagen: "https://i.pinimg.com/736x/86/62/ed/8662ed6c29bed502b8e673f51f491c00.jpg", // Placeholder
        disponible: true,
        etiquetas: ["postres", "poblana"],
        categoriaMenu: "Dulces Típicos",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId163,
        restauranteId: restauranteId37,
        nombre: "Borrachitos",
        descripcion: "Dulces de leche con un toque de licor.",
        precio: 50,
        imagen: "https://i.pinimg.com/1200x/75/7f/26/757f2649744c2b58fc80ff3c914cf638.jpg", // Placeholder
        disponible: true,
        etiquetas: ["postres"],
        categoriaMenu: "Dulces Típicos",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId164,
        restauranteId: restauranteId37,
        nombre: "Pastel de Tres Leches",
        descripcion: "Rebanada de pastel húmedo tradicional.",
        precio: 45,
        imagen: "https://i.pinimg.com/736x/8c/fd/cc/8cfdcca50f17408c85a30bc886da7a47.jpg",
        disponible: true,
        etiquetas: ["pasteleria"],
        categoriaMenu: "Pasteles",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId165,
        restauranteId: restauranteId37,
        nombre: "Café de Olla",
        descripcion: "Café con canela y piloncillo.",
        precio: 30,
        imagen: "https://i.pinimg.com/1200x/e7/3d/9a/e73d9a9651de973ac94cd6b765d9b137.jpg",
        disponible: true,
        etiquetas: ["bebidas"],
        categoriaMenu: "Bebidas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },

    // ============================================================
    // 🔹 RESTAURANTE 38 (Café Talavera) — productos 166–170
    // ============================================================
    {
        _id: productoId166,
        restauranteId: restauranteId38,
        nombre: "Capuchino Talavera",
        descripcion: "Espresso con leche espumada y arte latte.",
        precio: 55,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764220879/download_xijghj.jpg",
        disponible: true,
        etiquetas: ["cafe"],
        categoriaMenu: "Bebidas Calientes",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId167,
        restauranteId: restauranteId38,
        nombre: "Croissant de Jamón",
        descripcion: "Croissant de mantequilla relleno de jamón y queso.",
        precio: 65,
        imagen: "https://i.pinimg.com/736x/61/e4/b7/61e4b7425853f78a81216909d86da62b.jpg", // Placeholder
        disponible: true,
        etiquetas: ["panaderia"],
        categoriaMenu: "Desayunos",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId168,
        restauranteId: restauranteId38,
        nombre: "Cold Brew",
        descripcion: "Café extraído en frío por 12 horas.",
        precio: 60,
        imagen: "https://i.pinimg.com/1200x/a0/8b/61/a08b618b6bbe45c5f3ae62ffdaff1d7d.jpg",
        disponible: true,
        etiquetas: ["cafe"],
        categoriaMenu: "Bebidas Frías",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId169,
        restauranteId: restauranteId38,
        nombre: "Pay de Queso con Zarzamora",
        descripcion: "Rebanada cremosa con mermelada casera.",
        precio: 55,
        imagen: "https://i.pinimg.com/736x/47/ce/ec/47ceecebb6197a6a3440406f3dd95d62.jpg",
        disponible: true,
        etiquetas: ["postres"],
        categoriaMenu: "Postres",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId170,
        restauranteId: restauranteId38,
        nombre: "Tisana Frutal",
        descripcion: "Infusión de frutos rojos deshidratados.",
        precio: 45,
        imagen: "https://i.pinimg.com/736x/be/93/ef/be93ef25c5d73f92d40419712a71660e.jpg",
        disponible: true,
        etiquetas: ["bebidas"],
        categoriaMenu: "Bebidas Calientes",
        creadoEn: ahora,
        actualizadoEn: ahora
    },

    // ============================================================
    // 🔹 RESTAURANTE 39 (Verde Orgánico) — productos 171–175
    // ============================================================
    {
        _id: productoId171,
        restauranteId: restauranteId39,
        nombre: "Tacos de Jamaica",
        descripcion: "Flor de jamaica sazonada estilo tinga en tortilla de maíz.",
        precio: 85,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764221290/download_c7tgxm.jpg",
        disponible: true,
        etiquetas: ["vegana"],
        categoriaMenu: "Platos Fuertes",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId172,
        restauranteId: restauranteId39,
        nombre: "Pizza Vegana",
        descripcion: "Queso de almendra, tomate, albahaca y champiñones.",
        precio: 140,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764220510/download_hwgnvg.jpg", // Placeholder
        disponible: true,
        etiquetas: ["vegana", "italiana"],
        categoriaMenu: "Platos Fuertes",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId173,
        restauranteId: restauranteId39,
        nombre: "Ensalada Cholula",
        descripcion: "Mix de lechugas, nuez, arándanos y aderezo de mostaza.",
        precio: 95,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764221300/download_wo05z1.jpg",
        disponible: true,
        etiquetas: ["vegana", "ensalada"],
        categoriaMenu: "Entradas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId174,
        restauranteId: restauranteId39,
        nombre: "Brownie de Frijol Negro",
        descripcion: "Delicioso brownie sin harina, base de frijol y cacao.",
        precio: 45,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764221477/download_gl4sp3.jpg",
        disponible: true,
        etiquetas: ["vegana", "postres"],
        categoriaMenu: "Postres",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId175,
        restauranteId: restauranteId39,
        nombre: "Kombucha",
        descripcion: "Bebida fermentada sabor jengibre.",
        precio: 60,
        imagen: "https://i.pinimg.com/1200x/99/02/54/99025455429f0dfd8488382134c62e46.jpg", // Placeholder
        disponible: true,
        etiquetas: ["vegana", "bebidas"],
        categoriaMenu: "Bebidas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },

    // ============================================================
    // 🔹 RESTAURANTE 40 (Tacos Árabes El Sultán) — productos 176–180
    // ============================================================
    {
        _id: productoId176,
        restauranteId: restauranteId40,
        nombre: "Taco Árabe",
        descripcion: "Carne condimentada en pan pita (pan árabe).",
        precio: 25,
        imagen: "https://i.pinimg.com/1200x/ee/05/ee/ee05ee4622013b2ba5dd57ec797137f6.jpg", // Placeholder
        disponible: true,
        etiquetas: ["tacos", "poblana"],
        categoriaMenu: "Tacos",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId177,
        restauranteId: restauranteId40,
        nombre: "Cemita de Carne Árabe",
        descripcion: "Cemita poblana rellena de carne árabe y queso.",
        precio: 75,
        imagen: "https://i.pinimg.com/1200x/48/d3/0d/48d30d802cd68de893fc7e0cabbd0df1.jpg", // Placeholder
        disponible: true,
        etiquetas: ["poblana"],
        categoriaMenu: "Platos Fuertes",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId178,
        restauranteId: restauranteId40,
        nombre: "Jocoque Seco",
        descripcion: "Jocoque preparado con aceite de oliva y zaatar.",
        precio: 50,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764220560/download_v7hf8e.jpg", // Placeholder
        disponible: true,
        etiquetas: ["entrada"],
        categoriaMenu: "Entradas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId179,
        restauranteId: restauranteId40,
        nombre: "Taco Oriental",
        descripcion: "Carne árabe en tortilla de maíz.",
        precio: 20,
        imagen: "https://i.pinimg.com/736x/9d/92/c5/9d92c5fa0ce67d88fb57f9c3cbc97e74.jpg", // Placeholder
        disponible: true,
        etiquetas: ["tacos"],
        categoriaMenu: "Tacos",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId180,
        restauranteId: restauranteId40,
        nombre: "Refresco de sandia",
        descripcion: "Refresco casero de sandia.",
        precio: 25,
        imagen: "https://i.pinimg.com/736x/d4/cf/eb/d4cfebd2881020f516482cf24228e20a.jpg",
        disponible: true,
        etiquetas: ["bebidas"],
        categoriaMenu: "Bebidas",
        creadoEn: ahora,
        actualizadoEn: ahora
    }
]);