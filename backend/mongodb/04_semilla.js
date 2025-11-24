const dbChef = db.getSiblingDB('chefya');

const ahora = new Date();

const restauranteId11 = new ObjectId();
const restauranteId12 = new ObjectId();
const restauranteId13 = new ObjectId();
const restauranteId14 = new ObjectId();
const restauranteId15 = new ObjectId();
const restauranteId16 = new ObjectId();
const restauranteId17 = new ObjectId();
const restauranteId18 = new ObjectId();
const restauranteId19 = new ObjectId();
const restauranteId20 = new ObjectId();



const categoriaId11 = new ObjectId();
const categoriaId12 = new ObjectId();
const categoriaId13 = new ObjectId();
const categoriaId14 = new ObjectId();
const categoriaId15 = new ObjectId();
const categoriaId16 = new ObjectId();
const categoriaId17 = new ObjectId();


const productoId21 = new ObjectId();
const productoId22 = new ObjectId();
const productoId23 = new ObjectId();
const productoId24 = new ObjectId();
const productoId25 = new ObjectId();
const productoId26 = new ObjectId();
const productoId27 = new ObjectId();
const productoId28 = new ObjectId();
const productoId29 = new ObjectId();
const productoId30 = new ObjectId();
const productoId31 = new ObjectId();
const productoId32 = new ObjectId();
const productoId33 = new ObjectId();
const productoId34 = new ObjectId();
const productoId35 = new ObjectId();
const productoId36 = new ObjectId();
const productoId37 = new ObjectId();
const productoId38 = new ObjectId();
const productoId39 = new ObjectId();
const productoId40 = new ObjectId();

dbChef.restaurantes.insertMany([
    {
        _id: restauranteId11,
        nombre: "Domino's Pizza",
        slug: "dominos-pizza",
        descripcion: "Pizzas, pasta y complementos",
        categorias: ["pizza", "rapida"],
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763935421/logo-domino-s-pizza_qq16yu.jpg",
        imagen_banner: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763935490/1697545758-header-1_iwn3l1.webp",
        calificacion: { promedio: 0, conteo: 0 },
        entrega: { minutosPromedio: 30, tarifa: 25 },
        direccion: {
            calle: "Heroico Colegio Militar 7",
            ciudad: "Huajuapan de León",
            estado: "Oaxaca",
            cp: "69000",
            geo: { lat: 17.8074, lng: -97.7796 }
        },
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: restauranteId12,
        nombre: "Burger King",
        slug: "burger-king",
        descripcion: "Hamburguesas, papas, postres y comida rápida",
        categorias: ["hamburguesas", "rapida"],
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763935581/download_daev88.png",
        imagen_banner: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763935658/BANNERDUOKING_hnsfkc.jpg",
        calificacion: { promedio: 0, conteo: 0 },
        entrega: { minutosPromedio: 32, tarifa: 25 },
        direccion: {
            calle: "Heroico Colegio Militar 7",
            ciudad: "Huajuapan de León",
            estado: "Oaxaca",
            cp: "69000",
            geo: { lat: 17.8074, lng: -97.7796 }
        },
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: restauranteId13,
        nombre: "Taquería El Paisa",
        slug: "taqueria-el-paisa",
        descripcion: "Tacos, quesadillas, pizzas y antojitos mexicanos",
        categorias: ["mexicana", "tacos"],
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763610893/paisa_y9bab7.jpg",
        imagen_banner: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763935740/557542549_1379090100809897_8962292327855233324_n_fu9yi3.jpg",
        calificacion: { promedio: 0, conteo: 0 },
        entrega: { minutosPromedio: 22, tarifa: 20 },
        direccion: {
            calle: "Valerio Trujano #6, Altos León Plaza",
            colonia: "Centro",
            ciudad: "Huajuapan de León",
            estado: "Oaxaca",
            cp: "69000",
            geo: { lat: 17.8079, lng: -97.7792 }
        },
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: restauranteId14,
        nombre: "Restaurant García Peral",
        slug: "restaurant-garcia-peral",
        descripcion: "Comida gourmet, desaayunos, platillos, postres y más",
        categorias: ["gourmet"],
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763935794/515441764_1242210011252804_5732178484877941484_n_dwc3vt.jpg",
        imagen_banner: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763935805/483756689_1129226152551191_3092799196785459210_n_nxzuph.jpg",
        calificacion: { promedio: 0, conteo: 0 },
        entrega: { minutosPromedio: 25, tarifa: 20 },
        direccion: {
            calle: "Heroico Colegio Militar 1",
            colonia: "Centro",
            ciudad: "Huajuapan de León",
            estado: "Oaxaca",
            cp: "69000",
            geo: { lat: 17.8080, lng: -97.7795 }
        },
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: restauranteId15,
        nombre: "Antojitos Doña Mary",
        slug: "antojitos-dona-mary",
        descripcion: "Antojitos mexicanos tradicionales",
        categorias: ["mexicana"],
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763936398/download_oxj9xh.jpg",
        imagen_banner: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763936378/colorful-spread-of-traditional-mexican-dishes-arranged-on-a-wooden-table-during-a-festive-gathering-in-a-cozy-indoor-setting-photo_ufjwjd.jpg",
        calificacion: { promedio: 0, conteo: 0 },
        entrega: { minutosPromedio: 22, tarifa: 18 },
        direccion: {
            calle: "Avenida 5 de Febrero #12",
            colonia: "Centro",
            ciudad: "Huajuapan de León",
            estado: "Oaxaca",
            cp: "69000",
            geo: { lat: 17.8076, lng: -97.7802 }
        },
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: restauranteId16,
        nombre: "Sushi Haru",
        slug: "sushi-haru",
        descripcion: "Sushi, ramen y comida japonesa",
        categorias: ["japonesa"],
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763936489/download_ili85v.jpg",
        imagen_banner: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763936494/asianfood-restaurant-sushi-banner-design-vector_pmuvul.jpg",
        calificacion: { promedio: 0, conteo: 0 },
        entrega: { minutosPromedio: 30, tarifa: 22 },
        direccion: {
            calle: "Morelos #48",
            colonia: "Centro",
            ciudad: "Huajuapan de León",
            estado: "Oaxaca",
            cp: "69000",
            geo: { lat: 17.8072, lng: -97.7810 }
        },
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: restauranteId17,
        nombre: "Café La Estación",
        slug: "cafe-la-estacion",
        descripcion: "Cafetería, postres y panadería",
        categorias: ["cafeteria"],
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763936640/84588221-cafe-banner-template-design-with-lettering-for-coffee-shop-modern-hipster-colorful-cafe-menu_th8zaq.jpg",
        imagen_banner: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763936657/gettyimages-579761386-612x612_hzebi0.jpg",
        calificacion: { promedio: 0, conteo: 0 },
        entrega: { minutosPromedio: 16, tarifa: 12 },
        direccion: {
            calle: "Colón #3",
            colonia: "Centro",
            ciudad: "Huajuapan de León",
            estado: "Oaxaca",
            cp: "69000",
            geo: { lat: 17.8069, lng: -97.7807 }
        },
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: restauranteId18,
        nombre: "Tlayudas Lupita",
        slug: "tlayudas-lupita",
        descripcion: "Tlayudas y antojitos típicos oaxaqueños",
        categorias: ["oaxaquena"],
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763936724/download_dut6nh.png",
        imagen_banner: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763936739/istockphoto-1275661164-612x612_is0v77.jpg",
        calificacion: { promedio: 0, conteo: 0 },
        entrega: { minutosPromedio: 27, tarifa: 20 },
        direccion: {
            calle: "Guerrero #25",
            colonia: "Centro",
            ciudad: "Huajuapan de León",
            estado: "Oaxaca",
            cp: "69000",
            geo: { lat: 17.8075, lng: -97.7815 }
        },
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: restauranteId19,
        nombre: "La Cabaña Grill",
        slug: "la-cabana-grill",
        descripcion: "Cortes, parrilladas y hamburguesas",
        categorias: ["grill"],
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763936830/download_lsvm7x.jpg",
        imagen_banner: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763936827/Banner-Conoce-Nuestra-Tienda-1300x480.jpg_gsk4iz.webp",
        calificacion: { promedio: 0, conteo: 0 },
        entrega: { minutosPromedio: 32, tarifa: 25 },
        direccion: {
            calle: "Galeana #10",
            colonia: "Centro",
            ciudad: "Huajuapan de León",
            estado: "Oaxaca",
            cp: "69000",
            geo: { lat: 17.8083, lng: -97.7801 }
        },
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: restauranteId20,
        nombre: "Panes y Café Don Pedro",
        slug: "panes-y-cafe-don-pedro",
        descripcion: "Pan artesanal y bebidas calientes",
        categorias: ["panaderia"],
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763936996/download_emdjel.jpg",
        imagen_banner: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763936993/banner-con-diferentes-tipos-de-pan-en-superficie-oscura-primer-plano-concepto-panader%C3%ADa-fondo-tienda-alimentos-espacio-vac%C3%ADo-210558323_ifnhh9.webp",
        calificacion: { promedio: 0, conteo: 0 },
        entrega: { minutosPromedio: 15, tarifa: 10 },
        direccion: {
            calle: "Nicolás Bravo #7",
            colonia: "Centro",
            ciudad: "Huajuapan de León",
            estado: "Oaxaca",
            cp: "69000",
            geo: { lat: 17.8088, lng: -97.7799 }
        },
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    }











]);

dbChef.categorias.insertMany([
    {
        _id: categoriaId11,
        slug: "gourmet",
        nombre: "Gourmet"
    },
    {
        _id: categoriaId12,
        slug: "oaxaquena",
        nombre: "Oaxaquena"
    },
    {
        _id: categoriaId13,
        slug: "grill",
        nombre: "Grill"
    },
    {
        _id: categoriaId14,
        slug: "panaderia",
        nombre: "Panaderia"
    },
    {
        _id: categoriaId15,
        slug: "pizza",
        nombre: "Pizza"
    },
    {
        _id: categoriaId16,
        slug: "rapida",
        nombre: "Rápida"
    },
    {
        _id: categoriaId17,
        slug: "tacos",
        nombre: "Tacos"
    }
]);



dbChef.productos.insertMany([
    // DOMINO'S PIZZA (restauranteId11)

    {
        _id: productoId21,
        restauranteId: restauranteId11,
        nombre: "Pizza Pepperoni Mediana",
        descripcion: "Clásica pizza con doble pepperoni y queso mozzarella.",
        precio: 159,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763937526/download_mopwvu.jpg",
        disponible: true,
        etiquetas: ["pizza", "pepperoni"],
        categoriaMenu: "Pizzas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId22,
        restauranteId: restauranteId11,
        nombre: "Pizza Hawaiana Grande",
        descripcion: "Piña, jamón y queso mozzarella en masa tradicional.",
        precio: 199,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763937550/download_bxd1hh.jpg",
        disponible: true,
        etiquetas: ["pizza", "hawaiana"],
        categoriaMenu: "Pizzas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId23,
        restauranteId: restauranteId11,
        nombre: "Pizza Mexicana Mediana",
        descripcion: "Carne molida, jalapeño, cebolla y mezcla de quesos.",
        precio: 175,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763937608/E5TY9_dWYAQSr_L_rxty2o.jpg",
        disponible: true,
        etiquetas: ["pizza", "mexicana"],
        categoriaMenu: "Pizzas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId24,
        restauranteId: restauranteId11,
        nombre: "Alitas BBQ",
        descripcion: "6 piezas bañadas en salsa BBQ.",
        precio: 95,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763937711/f905c9a5-d603-4749-a5a6-1a025a7006a3_ga0hb5.jpg",
        disponible: true,
        etiquetas: ["alitas", "bbq"],
        categoriaMenu: "Complementos",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId25,
        restauranteId: restauranteId11,
        nombre: "Papas Domino’s",
        descripcion: "Papas sazonadas al estilo Domino’s.",
        precio: 65,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763937742/69ff570b-2a6a-44c4-910c-2b05170a7253_bskpbv.jpg",
        disponible: true,
        etiquetas: ["papas"],
        categoriaMenu: "Complementos",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId26,
        restauranteId: restauranteId11,
        nombre: "Pan de Ajo",
        descripcion: "Pan horneado con mantequilla de ajo.",
        precio: 59,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763937772/iqyz805jlbo91_wu8hqp.jpg",
        disponible: true,
        etiquetas: ["pan", "ajo"],
        categoriaMenu: "Complementos",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId27,
        restauranteId: restauranteId11,
        nombre: "Canelitas",
        descripcion: "Deditos dulces con azúcar y canela.",
        precio: 49,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763937802/94015851-5438-410a-a19e-1cd2ad4e0841_jtn1s3.jpg",
        disponible: true,
        etiquetas: ["postre", "canela"],
        categoriaMenu: "Postres",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId28,
        restauranteId: restauranteId11,
        nombre: "Bebida de 1.5L",
        descripcion: "Refresco a elegir.",
        precio: 45,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763937920/049f1ec9-814d-4c10-b4c0-b0fad84ea41d.ac6ed871c75b2af19b6af0699d3e1277_ukskhk.webp",
        disponible: true,
        etiquetas: ["refresco"],
        categoriaMenu: "Bebidas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId29,
        restauranteId: restauranteId11,
        nombre: "Pasta Alfredo",
        descripcion: "Pasta cremosa con salsa Alfredo.",
        precio: 89,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763937969/S_ALFR_eyi2xj.jpg",
        disponible: true,
        etiquetas: ["pasta", "alfredo"],
        categoriaMenu: "Pastas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId30,
        restauranteId: restauranteId11,
        nombre: "Pizza Cuatro Quesos Mediana",
        descripcion: "Mezcla de quesos mozzarella, parmesano, cheddar y provolone.",
        precio: 169,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763937974/uy2ZDS6HgWhrmN0r2En9ewBbX9NV81TVq8XVpfhx_byyh93.webp",
        disponible: true,
        etiquetas: ["pizza", "quesos"],
        categoriaMenu: "Pizzas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },

    // BURGER KING (restauranteId12)

    {
        _id: productoId31,
        restauranteId: restauranteId12,
        nombre: "Whopper",
        descripcion: "Carne de res a la parrilla con tomate, lechuga y cebolla.",
        precio: 89,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763938151/23-235897_hambrgueres-de-carne-whopper-do-burger-king_sibflf.jpg",
        disponible: true,
        etiquetas: ["hamburguesa", "whopper"],
        categoriaMenu: "Hamburguesas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId32,
        restauranteId: restauranteId12,
        nombre: "Whopper con Queso",
        descripcion: "El clásico Whopper con una rebanada extra de queso.",
        precio: 99,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763938154/whopper-with-cheese_dbeykn.jpg",
        disponible: true,
        etiquetas: ["hamburguesa", "whopper", "queso"],
        categoriaMenu: "Hamburguesas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId33,
        restauranteId: restauranteId12,
        nombre: "King de Pollo",
        descripcion: "Pechuga empanizada con mayonesa y lechuga.",
        precio: 85,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763938281/sandwich-pollo-burger-king_hckfin.webp",
        disponible: true,
        etiquetas: ["pollo", "hamburguesa"],
        categoriaMenu: "Hamburguesas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId34,
        restauranteId: restauranteId12,
        nombre: "Papas Grandes",
        descripcion: "Papas fritas clásicas.",
        precio: 49,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763938336/BK_Web_patatas_500X540px_Resized_qq5849.png",
        disponible: true,
        etiquetas: ["papas"],
        categoriaMenu: "Complementos",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId35,
        restauranteId: restauranteId12,
        nombre: "Aros de Cebolla",
        descripcion: "Crujientes y dorados aros de cebolla.",
        precio: 52,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763938339/Negocios_BURGER_KING_Productos_AROS_DE_CEBOLLA_KING_1758812162905_fflqg8.png",
        disponible: true,
        etiquetas: ["cebolla"],
        categoriaMenu: "Complementos",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId36,
        restauranteId: restauranteId12,
        nombre: "Nuggets 10 piezas",
        descripcion: "Crujientes piezas de pollo acompañadas de salsa.",
        precio: 59,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763938478/02278-4-SpicyNugget-PR_Image_Spanish_ALT_CR2_jkrdlb.jpg",
        disponible: true,
        etiquetas: ["pollo", "nuggets"],
        categoriaMenu: "Complementos",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId37,
        restauranteId: restauranteId12,
        nombre: "Malteada de Chocolate Abuelita",
        descripcion: "Malteada espesa sabor chocolate abuelita.",
        precio: 65,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763938481/malteada-de-chocolate_xjhxty.jpg",
        disponible: true,
        etiquetas: ["malteada", "chocolate"],
        categoriaMenu: "Bebidas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId38,
        restauranteId: restauranteId12,
        nombre: "Sundae de Caramelo",
        descripcion: "Helado suave con topping de caramelo.",
        precio: 35,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763938521/BK_Web_BURGERKINGSANDYCARAMELO_500X540px_dh8hcr.png",
        disponible: true,
        etiquetas: ["postre", "caramelo"],
        categoriaMenu: "Postres",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId39,
        restauranteId: restauranteId12,
        nombre: "Combo Whopper",
        descripcion: "Whopper + papas + bebida.",
        precio: 300,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763938660/images_j7nmsr.jpg",
        disponible: true,
        etiquetas: ["combo", "whopper"],
        categoriaMenu: "Combos",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId40,
        restauranteId: restauranteId12,
        nombre: "King Jr. Hamburguesa",
        descripcion: "Hamburguesa infantil con papas y bebida.",
        precio: 79,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763938677/download_sgxt1m.jpg",
        disponible: true,
        etiquetas: ["infantil", "hamburguesa"],
        categoriaMenu: "Infantil",
        creadoEn: ahora,
        actualizadoEn: ahora
    }
]);


