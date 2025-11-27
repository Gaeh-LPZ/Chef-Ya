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
const restauranteId21 = new ObjectId();
const restauranteId22 = new ObjectId();
const restauranteId23 = new ObjectId();
const restauranteId24 = new ObjectId();
const restauranteId25 = new ObjectId();



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
const productoId41 = new ObjectId();
const productoId42 = new ObjectId();
const productoId43 = new ObjectId();
const productoId44 = new ObjectId();
const productoId45 = new ObjectId();
const productoId46 = new ObjectId();
const productoId47 = new ObjectId();
const productoId48 = new ObjectId();
const productoId49 = new ObjectId();
const productoId50 = new ObjectId();
const productoId51 = new ObjectId();
const productoId52 = new ObjectId();
const productoId53 = new ObjectId();
const productoId54 = new ObjectId();
const productoId55 = new ObjectId();
const productoId56 = new ObjectId();
const productoId57 = new ObjectId();
const productoId58 = new ObjectId();
const productoId59 = new ObjectId();
const productoId60 = new ObjectId();
const productoId61 = new ObjectId();
const productoId62 = new ObjectId();
const productoId63 = new ObjectId();
const productoId64 = new ObjectId();
const productoId65 = new ObjectId();
const productoId66 = new ObjectId();
const productoId67 = new ObjectId();
const productoId68 = new ObjectId();
const productoId69 = new ObjectId();
const productoId70 = new ObjectId();
const productoId71 = new ObjectId();
const productoId72 = new ObjectId();
const productoId73 = new ObjectId();
const productoId74 = new ObjectId();
const productoId75 = new ObjectId();
const productoId76 = new ObjectId();
const productoId77 = new ObjectId();
const productoId78 = new ObjectId();
const productoId79 = new ObjectId();
const productoId80 = new ObjectId();
const productoId81 = new ObjectId();
const productoId82 = new ObjectId();
const productoId83 = new ObjectId();
const productoId84 = new ObjectId();
const productoId85 = new ObjectId();
const productoId86 = new ObjectId();
const productoId87 = new ObjectId();
const productoId88 = new ObjectId();
const productoId89 = new ObjectId();
const productoId90 = new ObjectId();
const productoId91 = new ObjectId();
const productoId92 = new ObjectId();
const productoId93 = new ObjectId();
const productoId94 = new ObjectId();
const productoId95 = new ObjectId();
const productoId96 = new ObjectId();
const productoId97 = new ObjectId();
const productoId98 = new ObjectId();
const productoId99 = new ObjectId();
const productoId100 = new ObjectId();
const productoId101 = new ObjectId();
const productoId102 = new ObjectId();
const productoId103 = new ObjectId();
const productoId104 = new ObjectId();
const productoId105 = new ObjectId();

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
            calle: "Heroico Colegio Militar 7, Centro, 69000 Heroica Cdad. de Huajuapan de León, Oax.",
            ciudad: "Huajuapan de León",
            estado: "Oaxaca",
            cp: "69000",
            geo: { lat: 17.8074, lng: -97.7796 }
        },
        horario: {
            lunes:     { abre: "11:00", cierra: "21:00" },
            martes:    { abre: "11:00", cierra: "21:00" },
            miercoles: { abre: "11:00", cierra: "21:00" },
            jueves:    { abre: "11:00", cierra: "21:00" },
            viernes:   { abre: "11:00", cierra: "21:00" },
            sabado:    { abre: "11:00", cierra: "21:00" },
            domingo:   { abre: "11:00", cierra: "21:00" }
        },
        diasServicio: ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"],
        url_localizacion: "https://maps.app.goo.gl/RoJkL4joTeuUPifA9",
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
            calle: "Heroico Colegio Militar 9, Centro, 69000 Heroica Cdad. de Huajuapan de León, Oax.",
            ciudad: "Huajuapan de León",
            estado: "Oaxaca",
            cp: "69000",
            geo: { lat: 17.8074, lng: -97.7796 }
        },
        horario: {
            lunes:     { abre: "09:00", cierra: "22:00" },
            martes:    { abre: "09:00", cierra: "22:00" },
            miercoles: { abre: "09:00", cierra: "22:00" },
            jueves:    { abre: "09:00", cierra: "22:00" },
            viernes:   { abre: "09:00", cierra: "22:00" },
            sabado:    { abre: "09:00", cierra: "22:00" },
            domingo:   { abre: "09:00", cierra: "22:00" }
        },
        diasServicio: ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"],
        url_localizacion: "https://maps.app.goo.gl/oBTeEUJT3DDkvSJM8",
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
            calle: "Valerio Trujano #6, Altos León Plaza, Centro, 69000 Heroica Cdad. de Huajuapan de León, Oax.",
            colonia: "Centro",
            ciudad: "Huajuapan de León",
            estado: "Oaxaca",
            cp: "69000",
            geo: { lat: 17.8079, lng: -97.7792 }
        },
        horario: {
            lunes:     { abre: "08:00", cierra: "23:59" },
            martes:    { abre: "08:00", cierra: "23:59" },
            miercoles: { abre: "08:00", cierra: "23:59" },
            jueves:    { abre: "08:00", cierra: "23:59" },
            viernes:   { abre: "08:00", cierra: "23:59" },
            sabado:    { abre: "08:00", cierra: "23:59" },
            domingo:   { abre: "08:00", cierra: "12:00" }
        },
        diasServicio: ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"],
        url_localizacion: "https://maps.app.goo.gl/5kyjRQZHekZ43qLV7",
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
            calle: "Heroico Colegio Militar 1, Centro, 69000 Heroica Cdad. de Huajuapan de León, Oax.",
            colonia: "Centro",
            ciudad: "Huajuapan de León",
            estado: "Oaxaca",
            cp: "69000",
            geo: { lat: 17.8080, lng: -97.7795 }
        },
        horario: {
            lunes:     { abre: "08:00", cierra: "22:30" },
            martes:    { abre: "08:00", cierra: "23:00" },
            miercoles: { abre: "08:00", cierra: "23:00" },
            jueves:    { abre: "08:00", cierra: "23:00" },
            viernes:   { abre: "08:00", cierra: "22:30" },
            sabado:    { abre: "08:00", cierra: "23:00" },
            domingo:   { abre: "08:00", cierra: "23:00" }
        },
        diasServicio: ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"],
        url_localizacion: "https://maps.app.goo.gl/gcCrqTvH6PwfvE2F6",
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
            calle: "C. Chihuahua, 1ªseccion, Santa Rosa, 69000 Heroica Cdad. de Huajuapan de León, Oax.",
            colonia: "Centro",
            ciudad: "Huajuapan de León",
            estado: "Oaxaca",
            cp: "69000",
            geo: { lat: 17.8076, lng: -97.7802 }
        },
        horario: {
            lunes:     { abre: "08:00", cierra: "22:00" },
            martes:    { abre: "08:00", cierra: "22:00" },
            miercoles: { abre: "08:00", cierra: "22:00" },
            jueves:    { abre: "08:00", cierra: "22:00" },
            viernes:   { abre: "08:00", cierra: "22:00" },
            sabado:    { abre: "08:00", cierra: "22:00" },
            domingo:   { abre: "08:00", cierra: "22:00" }
        },
        diasServicio: ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"],
        url_localizacion: "https://maps.app.goo.gl/AYepxqCgikXeXFmS8",
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: restauranteId16,
        nombre: "Sakura sushi",
        slug: "sushi-haru",
        descripcion: "Sushi, ramen y comida japonesa",
        categorias: ["japonesa"],
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763936489/download_ili85v.jpg",
        imagen_banner: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763936494/asianfood-restaurant-sushi-banner-design-vector_pmuvul.jpg",
        calificacion: { promedio: 0, conteo: 0 },
        entrega: { minutosPromedio: 30, tarifa: 22 },
        direccion: {
            calle: "C. 2 de Abril, La Merced, 69006 Heroica Cdad. de Huajuapan de León, Oax.",
            colonia: "Centro",
            ciudad: "Huajuapan de León",
            estado: "Oaxaca",
            cp: "69000",
            geo: { lat: 17.8072, lng: -97.7810 }
        },
        horario: {
            lunes:     { abre: "13:00", cierra: "23:00" },
            martes:    { abre: "13:00", cierra: "23:00" },
            miercoles: { abre: "13:00", cierra: "23:00" },
            jueves:    { abre: "13:00", cierra: "23:00" },
            viernes:   { abre: "13:00", cierra: "23:00" },
            sabado:    { abre: "13:00", cierra: "23:00" },
            domingo:   { abre: "13:00", cierra: "23:00" }
        },
        diasServicio: ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"],
        url_localizacion: "https://maps.app.goo.gl/32dv3KosHbdMRbMq9",
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: restauranteId17,
        nombre: "",
        slug: "cafe la estacion",
        descripcion: "Cafetería, postres y panadería",
        categorias: ["cafeteria"],
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763936640/84588221-cafe-banner-template-design-with-lettering-for-coffee-shop-modern-hipster-colorful-cafe-menu_th8zaq.jpg",
        imagen_banner: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763936657/gettyimages-579761386-612x612_hzebi0.jpg",
        calificacion: { promedio: 0, conteo: 0 },
        entrega: { minutosPromedio: 16, tarifa: 12 },
        direccion: {
            calle: "Antonio de León 18, Centro, 69000 Heroica Cdad. de Huajuapan de León, Oax.",
            colonia: "Centro",
            ciudad: "Huajuapan de León",
            estado: "Oaxaca",
            cp: "69000",
            geo: { lat: 17.8069, lng: -97.7807 }
        },
        horario: {
            lunes:     { abre: "08:00", cierra: "21:00" },
            martes:    { abre: "08:00", cierra: "21:00" },
            miercoles: { abre: "08:00", cierra: "21:00" },
            jueves:    { abre: "08:00", cierra: "21:00" },
            viernes:   { abre: "08:00", cierra: "21:00" },
            sabado:    { abre: "09:00", cierra: "22:00" },
            domingo:   { abre: "09:00", cierra: "22:00" }
        },
        diasServicio: ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"],
        url_localizacion: "https://maps.app.goo.gl/Nhj5daphe8DBxMnk9",
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: restauranteId18,
        nombre: "Tlayudas con sabor y tradicion Lupita",
        slug: "tlayudas-lupita",
        descripcion: "Tlayudas y antojitos típicos oaxaqueños",
        categorias: ["oaxaquena"],
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763936724/download_dut6nh.png",
        imagen_banner: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763936739/istockphoto-1275661164-612x612_is0v77.jpg",
        calificacion: { promedio: 0, conteo: 0 },
        entrega: { minutosPromedio: 27, tarifa: 20 },
        direccion: {
            calle: "Narciso Mendoza 136, 2da Aviacion, 69007 Heroica Cdad. de Huajuapan de León, Oax.",
            colonia: "Centro",
            ciudad: "Huajuapan de León",
            estado: "Oaxaca",
            cp: "69000",
            geo: { lat: 17.8075, lng: -97.7815 }
        },
        horario: {
            lunes:     { abre: "19:00", cierra: "23:30" },
            martes:    { abre: "19:00", cierra: "23:30" },
            miercoles: { abre: "19:00", cierra: "23:30" },
            jueves:    { abre: "19:00", cierra: "23:30" },
            viernes:   { abre: "19:00", cierra: "01:00" },
            sabado:    { abre: "19:00", cierra: "01:00" },
            domingo:   { abre: "19:00", cierra: "01:00" }
        },
        diasServicio: ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"],
        url_localizacion: "https://maps.app.goo.gl/KFDkQjA3UjuZUSDBA",
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: restauranteId19,
        nombre: "Macho Grill",
        slug: "la-cabana-grill",
        descripcion: "Cortes, parrilladas y hamburguesas",
        categorias: ["grill"],
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763936830/download_lsvm7x.jpg",
        imagen_banner: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763936827/Banner-Conoce-Nuestra-Tienda-1300x480.jpg_gsk4iz.webp",
        calificacion: { promedio: 0, conteo: 0 },
        entrega: { minutosPromedio: 32, tarifa: 25 },
        direccion: {
            calle: "Colonia, C. Campillo 72, Alta Vista de Juárez, 69005 Heroica Cdad. de Huajuapan de León, Oax.",
            colonia: "Centro",
            ciudad: "Huajuapan de León",
            estado: "Oaxaca",
            cp: "69000",
            geo: { lat: 17.8083, lng: -97.7801 }
        },
        horario: {
            lunes:     { abre: "13:00", cierra: "23:00" },
            martes:    { abre: "13:00", cierra: "23:00" },
            miercoles: { abre: "13:00", cierra: "23:00" },
            jueves:    { abre: "13:00", cierra: "23:00" },
            viernes:   { abre: "13:00", cierra: "00:00" },
            sabado:    { abre: "13:00", cierra: "00:00" },
            domingo:   { abre: "13:00", cierra: "00:00" }
        },
        diasServicio: ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"],
        url_localizacion: "https://maps.app.goo.gl/64L5Yn2czvLUee2u8",
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: restauranteId20,
        nombre: "Don pedro Chu pan tradicional",
        slug: "panes-y-cafe-don-pedro",
        descripcion: "Pan artesanal y bebidas calientes",
        categorias: ["panaderia"],
        imagen: "https://scontent.fpbc2-3.fna.fbcdn.net/v/t39.30808-6/279758345_723497832417152_4539581761324865104_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=MqGl2YiSAT8Q7kNvwHiLytJ&_nc_oc=AdlYDeFWnK4WBsxDxhkMIDFcqzcJQ1EmRVMRKCcWqvyjySeG9XRDx2jl_wHWMscItek&_nc_zt=23&_nc_ht=scontent.fpbc2-3.fna&_nc_gid=J0i7ovmus6D6juf28eFMTg&oh=00_AfjARYCv9UuM0If0mjeZziO6d63CL-AUEXeWplOsE20zpQ&oe=692E6684",
        imagen_banner: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763936993/banner-con-diferentes-tipos-de-pan-en-superficie-oscura-primer-plano-concepto-panader%C3%ADa-fondo-tienda-alimentos-espacio-vac%C3%ADo-210558323_ifnhh9.webp",
        calificacion: { promedio: 0, conteo: 0 },
        entrega: { minutosPromedio: 15, tarifa: 10 },
        direccion: {
            calle: "Carr. a Huajuapan, Centro, 69270 San Marcos Arteaga, Oax.",
            colonia: "Centro",
            ciudad: "Huajuapan de León",
            estado: "Oaxaca",
            cp: "69000",
            geo: { lat: 17.8088, lng: -97.7799 }
        },
        horario: {
            lunes:     { abre: "07:00", cierra: "22:00" },
            martes:    { abre: "07:00", cierra: "22:00" },
            miercoles: { abre: "07:00", cierra: "22:00" },
            jueves:    { abre: "07:00", cierra: "22:00" },
            viernes:   { abre: "07:00", cierra: "22:00" },
            sabado:    { abre: "07:00", cierra: "22:00" },
            domingo:   { abre: "07:00", cierra: "22:00" }
        },
        diasServicio: ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"],
        url_localizacion: "https://maps.app.goo.gl/Vk3otsy7UYsKrQVi7",
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    
    //ATENCION PENDIENTES DE UBICACION LOS SIGUIENTES 5 RESTAURANTES EN OAXACA DE JUAREZ
    {
        _id: restauranteId21,
        nombre: "Restaurant Doña Chica",
        slug: "fonda-dona-chica",
        descripcion: "Comida casera oaxaqueña",
        categorias: ["oaxaqueña"],
        imagen: "https://tse3.mm.bing.net/th/id/OIP.PoNrl6APuef_bRBZ_3z88wHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
        calificacion: { promedio: 0, conteo: 0 },
        entrega: { minutosPromedio: 18, tarifa: 20 },
        direccion: {
            calle: "Morelos 41, Centro, 70430 San Pablo Villa de Mitla, Oax.",
            colonia: "Centro",
            ciudad: "Oaxaca de Juárez",
            estado: "Oaxaca",
            cp: "68000",
            geo: { lat: 17.0591, lng: -96.7246 }
        },
        horario: {
            lunes:     { abre: "08:00", cierra: "18:00" },
            martes:    { abre: "08:00", cierra: "18:00" },
            miercoles: { abre: "08:00", cierra: "18:00" },
            jueves:    { abre: "08:00", cierra: "18:00" },
            viernes:   { abre: "08:00", cierra: "18:00" },
            sabado:    { abre: "08:00", cierra: "18:00" },
            domingo:   { abre: "09:00", cierra: "16:00" }
        },
        diasServicio: ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"],
        url_localizacion: "https://maps.app.goo.gl/8CQPM8v6NDr96gij8",
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: restauranteId22,
        nombre: "Tlayudas el negro",
        slug: "la-tlayuderia-del-centro",
        descripcion: "Tlayudas y antojitos oaxaqueños",
        categorias: ["antojitos"],
        imagen: "https://scontent.fpbc2-6.fna.fbcdn.net/v/t39.30808-6/408149447_745442717610255_4260594138822571777_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=ua9F3_Rl-88Q7kNvwHU88r1&_nc_oc=Adn5QTm9WviCwGFqCTecmkQ7XJ4h4zlgvJmRTFxF4W4LPVnDGnV0YvHzMu-S7jOA-04&_nc_zt=23&_nc_ht=scontent.fpbc2-6.fna&_nc_gid=CtNEF4FG_1sclAMVtq28-w&oh=00_AfgG5AziYaRwHE4sgRhz2MGqHKQR6ujl5o_TeI8rTL4aQA&oe=692E4472",
        imagen_banner: "https://scontent.fpbc2-1.fna.fbcdn.net/v/t39.30808-6/473831974_1017450677076123_9221518851507375154_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=llMzLG65Hy4Q7kNvwF5EPsb&_nc_oc=AdmZm7ijJVK6iHcbE6Pa-dwWwgyZ9ry3BK5_yLRrcAVO6mwjdMzErwPDUWw8Os69tYk&_nc_zt=23&_nc_ht=scontent.fpbc2-1.fna&_nc_gid=zEjtADpA3fjU_R-cDF6E5A&oh=00_AfiPGD_kJfTbLmxLx8__VDRS5CiZnxYeZSrjx3vIycpb6g&oe=692E6892",//esta imagen se va a cambiar 
        calificacion: { promedio: 0, conteo: 0 },
        entrega: { minutosPromedio: 25, tarifa: 22 },
        direccion: {
            calle: "Av. de la Independencia 310, Zona Lunes Feb 09, Centro, 68000 Oaxaca de Juárez, Oax.",
            colonia: "Centro",
            ciudad: "Oaxaca de Juárez",
            estado: "Oaxaca",
            cp: "68000",
            geo: { lat: 17.0569, lng: -96.7242 }
        },
        horario: {
            lunes:     { abre: "18:00", cierra: "23:30" },
            martes:    { abre: "18:00", cierra: "23:30" },
            miercoles: { abre: "18:00", cierra: "23:30" },
            jueves:    { abre: "18:00", cierra: "23:30" },
            viernes:   { abre: "18:00", cierra: "00:30" },
            sabado:    { abre: "18:00", cierra: "00:30" },
            domingo:   { abre: "18:00", cierra: "00:30" }
        },
        diasServicio: ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"],
        url_localizacion: "https://maps.app.goo.gl/jBJGLrrJwuCQfRtm6",
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: restauranteId23,
        nombre: "Comedor Tipico La Abuelita",
        slug: "comedor-la-abuelita",
        descripcion: "Platillos económicos y tradicionales",
        categorias: ["comida-casera"],
        imagen: "https://www.prosaypolitica.cl/wp-content/uploads/2023/04/9788413431727.jpg",
        imagen_banner: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/ad/5f/0d/interior.jpg?w=1200&h=-1&s=1",
        calificacion: { promedio: 0, conteo: 0 },
        entrega: { minutosPromedio: 14, tarifa: 10 },
        direccion: {
            calle: "20 De Noviembre, 20 de Noviembre, OAX_RE_BENITO JUAREZ, Centro, 68000 Oaxaca de Juárez, Oax.",
            colonia: "Centro",
            ciudad: "Oaxaca de Juárez",
            estado: "Oaxaca",
            cp: "68000",
            geo: { lat: 17.0560, lng: -96.7249 }
        },
        horario: {
            lunes:     { abre: "07:00", cierra: "20:30" },
            martes:    { abre: "07:00", cierra: "20:30" },
            miercoles: { abre: "07:00", cierra: "20:30" },
            jueves:    { abre: "07:00", cierra: "20:30" },
            viernes:   { abre: "07:00", cierra: "20:30" },
            sabado:    { abre: "07:00", cierra: "20:30" },
            domingo:   { abre: "07:00", cierra: "20:30" }
        },
        diasServicio: ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"],
        url_localizacion: "https://maps.app.goo.gl/uAsoNcCUSfgXn1pm6",
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: restauranteId24,
        nombre: "Sazón Oaxaqueño",
        slug: "sazon-oaxaqueno",
        descripcion: "Moles, tasajo y comida típica",
        categorias: ["oaxaqueña"],
        imagen: "https://tse3.mm.bing.net/th/id/OIP.ZXBzR-2FfdlQCeHFuodkZgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
        imagen_banner: "https://tse1.mm.bing.net/th/id/OIP._3hSRJ3F8C7uvGx0ceudbwHaCv?rs=1&pid=ImgDetMain&o=7&rm=3",
        calificacion: { promedio: 0, conteo: 0 },
        entrega: { minutosPromedio: 30, tarifa: 25 },
        direccion: {
            calle: "C. De Manuel Doblado SN, Zona Feb 10 2015, Centro, 68000 Oaxaca de Juárez, Oax.",
            colonia: "Centro",
            ciudad: "Oaxaca de Juárez",
            estado: "Oaxaca",
            cp: "68020",
            geo: { lat: 17.0628, lng: -96.7230 }
        },
        horario: {
            lunes:     { abre: "08:00", cierra: "22:00" },
            martes:    { abre: "08:00", cierra: "22:00" },
            miercoles: { abre: "08:00", cierra: "22:00" },
            jueves:    { abre: "08:00", cierra: "22:00" },
            viernes:   { abre: "08:00", cierra: "22:00" },
            sabado:    { abre: "08:00", cierra: "22:00" },
            domingo:   { abre: "08:00", cierra: "22:00" }
        },
        diasServicio: ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"],
        url_localizacion: "https://maps.app.goo.gl/8iQddCMm3h4bmAai6",
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: restauranteId25,
        nombre: "Mercado 20 de Noviembre Pasillo de Humo",
        slug: "pasillo-de-humo",
        descripcion: "Carnes asadas estilo tradicional",
        categorias: ["grill"],
        imagen: "https://i.ytimg.com/vi/OYHv8ACdlHA/maxresdefault.jpg",
        imagen_banner: "https://oaxaca.quadratin.com.mx/www/wp-content/uploads/2021/05/20nov-1160x700.jpg",
        calificacion: { promedio: 0, conteo: 0 },
        entrega: { minutosPromedio: 20, tarifa: 18 },
        direccion: {
            calle: "20 De Noviembre, 68000, Miguel Cabrera 116, Centro, 68000 Oaxaca de Juárez, Oax.",
            colonia: "Centro",
            ciudad: "Oaxaca de Juárez",
            estado: "Oaxaca",
            cp: "68000",
            geo: { lat: 17.0563, lng: -96.7245 }
        },
        horario: {
            lunes:     { abre: "08:00", cierra: "19:00" },
            martes:    { abre: "08:00", cierra: "19:00" },
            miercoles: { abre: "08:00", cierra: "19:00" },
            jueves:    { abre: "08:00", cierra: "19:00" },
            viernes:   { abre: "08:00", cierra: "19:00" },
            sabado:    { abre: "08:00", cierra: "19:00" },
            domingo:   { abre: "08:00", cierra: "19:00" }
        },
        diasServicio: ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"],
        url_localizacion: "https://maps.app.goo.gl/XUfhi6hfqNRcGAkK7",
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
    },
    // === TAQUERÍA EL PAISA ===
    {
        _id: productoId41,
        restauranteId: restauranteId13,
        nombre: "Tacos de Pastor",
        descripcion: "Tortilla de maíz, carne de pastor, piña y cebolla.",
        precio: 18,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763957629/download_o77qg4.jpg",
        disponible: true,
        etiquetas: ["tacos", "pastor", "mexicana"],
        categoriaMenu: "Tacos",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId42,
        restauranteId: restauranteId13,
        nombre: "Quesadillas de Asada",
        descripcion: "Queso derretido con carne asada en tortilla grande.",
        precio: 40,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763957645/download_uwc8by.jpg",
        disponible: true,
        etiquetas: ["quesadilla", "asada", "mexicana"],
        categoriaMenu: "Antojitos",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId43,
        restauranteId: restauranteId13,
        nombre: "Taco de Tripa Dorada",
        descripcion: "Tripa bien doradita, cebolla y cilantro.",
        precio: 22,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763957667/download_r51rpl.jpg",
        disponible: true,
        etiquetas: ["tacos", "tripa", "mexicana"],
        categoriaMenu: "Tacos",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId44,
        restauranteId: restauranteId13,
        nombre: "Gringas de Pastor",
        descripcion: "Tortilla de harina con queso y pastor.",
        precio: 55,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763957683/download_g1u74k.jpg",
        disponible: true,
        etiquetas: ["gringa", "pastor", "mexicana"],
        categoriaMenu: "Antojitos",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId45,
        restauranteId: restauranteId13,
        nombre: "Pizza Mexicana",
        descripcion: "Pizza estilo taquería con carne al gusto.",
        precio: 120,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763957703/download_fam2jv.jpg",
        disponible: true,
        etiquetas: ["pizza", "mexicana"],
        categoriaMenu: "Especialidades",
        creadoEn: ahora,
        actualizadoEn: ahora
    },

    // === RESTAURANT GARCÍA PERAL ===
    {
        _id: productoId46,
        restauranteId: restauranteId14,
        nombre: "Pechuga en Salsa de Tamarindo",
        descripcion: "Pechuga asada con salsa fina de tamarindo.",
        precio: 165,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763957778/download_o0ksrd.jpg",
        disponible: true,
        etiquetas: ["gourmet", "pollo", "platillo-fuerte"],
        categoriaMenu: "Plato fuerte",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId47,
        restauranteId: restauranteId14,
        nombre: "Crema de Elote",
        descripcion: "Crema suave con elote tierno y crotones.",
        precio: 85,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763957794/download_ixu0js.jpg",
        disponible: true,
        etiquetas: ["crema", "sopa", "gourmet"],
        categoriaMenu: "Sopas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId48,
        restauranteId: restauranteId14,
        nombre: "Ensalada de Arúgula",
        descripcion: "Ensalada fresca con arúgula, nuez y aderezo cítrico.",
        precio: 95,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763957795/download_hvvot6.jpg",
        disponible: true,
        etiquetas: ["ensalada", "gourmet", "fresco"],
        categoriaMenu: "Entradas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId49,
        restauranteId: restauranteId14,
        nombre: "Filete en Salsa de Vino",
        descripcion: "Corte fino bañado en reducción de vino tinto.",
        precio: 210,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763957816/download_bu67ga.jpg",
        disponible: true,
        etiquetas: ["carne", "filete", "gourmet"],
        categoriaMenu: "Plato fuerte",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId50,
        restauranteId: restauranteId14,
        nombre: "Cheesecake de Frutos Rojos",
        descripcion: "Rebanada de cheesecake artesanal con frutos rojos.",
        precio: 75,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763957854/download_queook.jpg",
        disponible: true,
        etiquetas: ["postre", "cheesecake", "gourmet"],
        categoriaMenu: "Postres",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    // === ANTOJITOS DOÑA MARY ===
    {
        _id: productoId51,
        restauranteId: restauranteId15,
        nombre: "Tostadas de Tinga",
        descripcion: "Tostadas crujientes con tinga de pollo y crema.",
        precio: 28,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763958009/download_ub3mkg.jpg",
        disponible: true,
        etiquetas: ["tostadas", "tinga", "mexicana"],
        categoriaMenu: "Antojitos",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId52,
        restauranteId: restauranteId15,
        nombre: "Enchiladas Verdes",
        descripcion: "Rellenas de pollo con salsa verde y queso.",
        precio: 65,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763958021/download_atkotr.jpg",
        disponible: true,
        etiquetas: ["enchiladas", "salsa-verde", "mexicana"],
        categoriaMenu: "Plato fuerte",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId53,
        restauranteId: restauranteId15,
        nombre: "Sopes de Chorizo",
        descripcion: "Sopes gruesos con frijoles, chorizo y lechuga.",
        precio: 22,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763958033/download_opkxbm.jpg",
        disponible: true,
        etiquetas: ["sopes", "chorizo", "mexicana"],
        categoriaMenu: "Antojitos",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId54,
        restauranteId: restauranteId15,
        nombre: "Pozole Rojo",
        descripcion: "Pozole casero con carne de cerdo y rábano.",
        precio: 75,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763958046/download_d0h9rm.jpg",
        disponible: true,
        etiquetas: ["pozole", "mexicana", "caldo"],
        categoriaMenu: "Plato fuerte",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId55,
        restauranteId: restauranteId15,
        nombre: "Empanadas de Amaranto",
        descripcion: "Empanadas dulces y tradicionales.",
        precio: 18,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763958086/download_a5aham.jpg",
        disponible: true,
        etiquetas: ["empanadas", "dulce", "mexicana"],
        categoriaMenu: "Postres",
        creadoEn: ahora,
        actualizadoEn: ahora
    },

    // === SUSHI HARU ===
    {
        _id: productoId56,
        restauranteId: restauranteId16,
        nombre: "Sushi California Roll",
        descripcion: "Rollo con pepino, aguacate y surimi.",
        precio: 95,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763958160/download_oog9fh.jpg",
        disponible: true,
        etiquetas: ["sushi", "roll", "japonesa"],
        categoriaMenu: "Sushi",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId57,
        restauranteId: restauranteId16,
        nombre: "Ramen Tradicional",
        descripcion: "Caldo caliente con fideos, huevo y cerdo.",
        precio: 110,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763958171/download_xheifn.jpg",
        disponible: true,
        etiquetas: ["ramen", "fideos", "japonesa"],
        categoriaMenu: "Ramen",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId58,
        restauranteId: restauranteId16,
        nombre: "Tempura de Camarón",
        descripcion: "Camarones crujientes con salsa especial.",
        precio: 85,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763958187/download_axywme.jpg",
        disponible: true,
        etiquetas: ["tempura", "camarón", "japonesa"],
        categoriaMenu: "Entradas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId59,
        restauranteId: restauranteId16,
        nombre: "Yakimeshi",
        descripcion: "Arroz frito estilo japonés con verduras.",
        precio: 70,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763958203/download_fqeozi.jpg",
        disponible: true,
        etiquetas: ["arroz", "yakimeshi", "japonesa"],
        categoriaMenu: "Arroz",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId60,
        restauranteId: restauranteId16,
        nombre: "Maki Dragón",
        descripcion: "Rollo especial con anguila y aguacate.",
        precio: 130,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763958257/download_dgzqzj.jpg",
        disponible: true,
        etiquetas: ["sushi", "dragón", "japonesa"],
        categoriaMenu: "Sushi",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    // Café La Estación
    {
        _id: productoId61,
        restauranteId: restauranteId17,
        nombre: "Café americano",
        descripcion: "Café recién preparado, sabor intenso.",
        precio: 30,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763958483/download_iqjevd.jpg",
        disponible: true,
        etiquetas: ["café", "bebidas"],
        categoriaMenu: "Bebidas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId62,
        restauranteId: restauranteId17,
        nombre: "Cappuccino",
        descripcion: "Café con leche espumada, perfecto para cualquier momento.",
        precio: 45,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763958496/download_ql9ntz.jpg",
        disponible: true,
        etiquetas: ["café", "bebidas"],
        categoriaMenu: "Bebidas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId63,
        restauranteId: restauranteId17,
        nombre: "Latte vainilla",
        descripcion: "Café latte con un toque dulce de vainilla.",
        precio: 50,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763958519/download_qzrrcc.jpg",
        disponible: true,
        etiquetas: ["café", "bebidas"],
        categoriaMenu: "Bebidas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId64,
        restauranteId: restauranteId17,
        nombre: "Chocolate caliente",
        descripcion: "Dulce, cremoso y perfecto para días fríos.",
        precio: 40,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763958534/download_ohqvmf.jpg",
        disponible: true,
        etiquetas: ["bebidas"],
        categoriaMenu: "Bebidas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId65,
        restauranteId: restauranteId17,
        nombre: "Chamoyada de mango",
        descripcion: "Mango frappé con chamoy y tajín.",
        precio: 55,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763958553/download_ehoaox.jpg",
        disponible: true,
        etiquetas: ["bebidas"],
        categoriaMenu: "Bebidas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    // Tlayudas Lupita
    {
        _id: productoId66,
        restauranteId: restauranteId18,
        nombre: "Tlayuda sencilla",
        descripcion: "Tlayuda con asiento, frijoles y quesillo.",
        precio: 70,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763958600/download_uaeo56.jpg",
        disponible: true,
        etiquetas: ["tlayudas"],
        categoriaMenu: "Plato fuerte",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId67,
        restauranteId: restauranteId18,
        nombre: "Tlayuda con tasajo",
        descripcion: "Tlayuda con frijoles, quesillo y tasajo.",
        precio: 95,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763958613/download_e8tqsg.jpg",
        disponible: true,
        etiquetas: ["tlayudas"],
        categoriaMenu: "Plato fuerte",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId68,
        restauranteId: restauranteId18,
        nombre: "Tlayuda con cecina enchilada",
        descripcion: "Sabor intensa y tradicional.",
        precio: 95,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763958640/download_yadxkf.jpg",
        disponible: true,
        etiquetas: ["tlayudas"],
        categoriaMenu: "Plato fuerte",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId69,
        restauranteId: restauranteId18,
        nombre: "Tlayuda mixta",
        descripcion: "Tasajo, chorizo y quesillo.",
        precio: 120,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763958656/download_u0guil.jpg",
        disponible: true,
        etiquetas: ["tlayudas", "especialidades"],
        categoriaMenu: "Plato fuerte",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId70,
        restauranteId: restauranteId18,
        nombre: "Tlayuda de chorizo",
        descripcion: "Clásica y con mucho sabor.",
        precio: 90,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763958672/download_pejqzo.jpg",
        disponible: true,
        etiquetas: ["tlayudas"],
        categoriaMenu: "Plato fuerte",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    //la cabaña grill
    {
        _id: productoId71,
        restauranteId: restauranteId19,
        nombre: "Arrachera asada",
        descripcion: "Corte jugoso acompañado de nopales y cebollitas.",
        precio: 165,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763958904/download_ikxuly.jpg",
        disponible: true,
        etiquetas: ["carnes", "parrilla"],
        categoriaMenu: "Plato fuerte",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId72,
        restauranteId: restauranteId19,
        nombre: "Costillas BBQ",
        descripcion: "Costillas suaves bañadas en salsa BBQ casera.",
        precio: 180,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763958924/download_lvvjvc.jpg",
        disponible: true,
        etiquetas: ["carnes", "parrilla"],
        categoriaMenu: "Plato fuerte",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId73,
        restauranteId: restauranteId19,
        nombre: "Hamburguesa clásica grill",
        descripcion: "Carne asada al carbón con queso y vegetales frescos.",
        precio: 95,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763958941/download_vureyq.jpg",
        disponible: true,
        etiquetas: ["parrilla"],
        categoriaMenu: "Plato fuerte",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId74,
        restauranteId: restauranteId19,
        nombre: "Alitas búfalo",
        descripcion: "Orden de alitas bañadas en salsa búfalo.",
        precio: 110,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763958951/download_fsfwxc.jpg",
        disponible: true,
        etiquetas: ["especialidades"],
        categoriaMenu: "Entradas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId75,
        restauranteId: restauranteId19,
        nombre: "Papas gajo",
        descripcion: "Crujientes, especiadas y servidas con aderezo.",
        precio: 55,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763958953/download_djwwzi.jpg",
        disponible: true,
        etiquetas: ["entradas"],
        categoriaMenu: "Entradas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    //panaderia 
    {
        _id: productoId76,
        restauranteId: restauranteId20,
        nombre: "Concha de vainilla",
        descripcion: "Clásica concha suave y esponjosa.",
        precio: 12,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763959016/download_chdo8u.jpg",
        disponible: true,
        etiquetas: ["panadería"],
        categoriaMenu: "Pan dulce",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId77,
        restauranteId: restauranteId20,
        nombre: "Oreja",
        descripcion: "Crujiente y con un toque caramelizado.",
        precio: 10,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763959049/download_r6mrqe.jpg",
        disponible: true,
        etiquetas: ["panadería"],
        categoriaMenu: "Pan dulce",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId78,
        restauranteId: restauranteId20,
        nombre: "Panque de naranja",
        descripcion: "Panqué húmedo con aroma natural de naranja.",
        precio: 20,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763959061/download_dve56e.jpg",
        disponible: true,
        etiquetas: ["panadería", "postres"],
        categoriaMenu: "Postres",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId79,
        restauranteId: restauranteId20,
        nombre: "Café de olla",
        descripcion: "Con canela y piloncillo, estilo tradicional.",
        precio: 18,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763959073/download_ylkspd.jpg",
        disponible: true,
        etiquetas: ["bebidas"],
        categoriaMenu: "Bebidas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId80,
        restauranteId: restauranteId20,
        nombre: "Biscocho de mantequilla",
        descripcion: "Tradicional, suave y ligeramente dulce.",
        precio: 8,
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1763959086/download_cdzxv7.jpg",
        disponible: true,
        etiquetas: ["panadería"],
        categoriaMenu: "Pan dulce",
        creadoEn: ahora,
        actualizadoEn: ahora
    },

// RESTAURANTE: Fonda Doña Chica
    {
        _id: productoId81,
        restauranteId: restauranteId21,
        nombre: "Enchiladas verdes",
        descripcion: "Tortillas rellenas de pollo bañadas en salsa verde.",
        precio: 65,
        imagen: "https://cdn.tasteatlas.com/images/dishes/419e9618f6104bf2a29cd88bb64d2bc5.jpg",
        disponible: true,
        etiquetas: ["comida", "platillo"],
        categoriaMenu: "Platos fuertes",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId82,
        restauranteId: restauranteId21,
        nombre: "Huevos al gusto",
        descripcion: "A la mexicana, revueltos o estrellados.",
        precio: 40,
        imagen: "https://1.bp.blogspot.com/-pnvkoRBso8g/W8mDP9DOt7I/AAAAAAAAJNs/M7qxa4tezjk0HFVBSgk0B05imVYWBxb4ACLcBGAs/s1600/receta.jpg",
        disponible: true,
        etiquetas: ["desayuno"],
        categoriaMenu: "Desayunos",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId83,
        restauranteId: restauranteId21,
        nombre: "Tamal oaxaqueño",
        descripcion: "De mole negro con pollo.",
        precio: 32,
        imagen: "https://thumbs.dreamstime.com/b/tamales-mexicanos-en-hojas-de-pl%C3%A1tano-sobre-fondo-madera-tradicionales-203146624.jpg",
        disponible: true,
        etiquetas: ["antojitos","tamales"],
        categoriaMenu: "Antojitos",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId84,
         restauranteId: restauranteId21,
        nombre: "Atole de panela",
        descripcion: "Atole caliente endulzado con panela.",
        precio: 20,
        imagen: "https://www.maricruzavalos.com/wp-content/uploads/2021/09/atole_mexican_drink.jpg",
        disponible: true,
        etiquetas: ["bebidas"],
        categoriaMenu: "Bebidas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId85,
        restauranteId: restauranteId21,
        nombre: "Tlayuda sencilla",
        descripcion: "Con asiento, quesillo y lechuga.",
        precio: 55,
        imagen: "https://s.hdnux.com/photos/54/42/52/11676317/5/1200x0.jpg",
        disponible: true,
        etiquetas: ["antojitos","tlayudas","especialidades"],
        categoriaMenu: "Antojitos",
        creadoEn: ahora,
        actualizadoEn: ahora
    },

// RESTAURANT: La Tlayudería del Centro
     {
         _id: productoId86,
         restauranteId: restauranteId22,
         nombre: "Tlayuda con tasajo",
         descripcion: "Tlayuda grande con tasajo a las brasas.",
         precio: 85,
         imagen: "https://www.brooklyntropicali.com/wp-content/uploads/2017/06/IMG_4018LR.jpg",
         disponible: true,
         etiquetas: ["antojitos","tlayudas","especialidades"],
         categoriaMenu: "Tlayudas",
         creadoEn: ahora,
         actualizadoEn: ahora
     },
     {
         _id: productoId87,
         restauranteId: restauranteId22,
         nombre: "Tlayuda con cecina enchilada",
         descripcion: "Crujiente y con sabor tradicional.",
         precio: 90,
         imagen: "https://tvazteca.brightspotcdn.com/e0/f8/ca7e732749008a721bd7c4cd7a1c/feria-del-huarache-toluca-2023-cuando-es.jpg",
         disponible: true,
         etiquetas: ["antojitos","tlayudas","especialidades"],
         categoriaMenu: "Tlayudas",
         creadoEn: ahora,
         actualizadoEn: ahora
     },
     {
         _id: productoId88,
         restauranteId: restauranteId22,
         nombre: "Memela sencilla",
         descripcion: "Con asiento, frijol y queso fresco.",
         precio: 18,
         imagen: "https://masienda.com/cdn/shop/articles/ConvertOut-Resized-Memela6_Klein_June24_600x.jpg?v=1719604770",
         disponible: true,
         etiquetas: ["antojitos"],
         categoriaMenu: "Memelas",
         creadoEn: ahora,
         actualizadoEn: ahora
     },
     {
         _id: productoId89,
         restauranteId: restauranteId22,
         nombre: "Agua de horchata con tuna",
         descripcion: "Refrescante y tradicional.",
         precio: 22,
         imagen: "https://i.pinimg.com/736x/88/4e/26/884e262270513b17f8be54e445f52289--aguas-frescas-horchata.jpg",
         disponible: true,
         etiquetas: ["bebidas"],
         categoriaMenu: "Bebidas",
         creadoEn: ahora,
         actualizadoEn: ahora
     },
     {
         _id: productoId90,
         restauranteId: restauranteId22,
         nombre: "Empanada de amarillo",
         descripcion: "Empanada grande hecha al comal.",
         precio: 28,
         imagen: "https://i.pinimg.com/736x/99/8a/7e/998a7e50cbea0893dbcceb4195f39dbb--empanada-oaxaca.jpg",
         disponible: true,
         etiquetas: ["antojitos", "empanadas"],
         categoriaMenu: "Empanadas",
         creadoEn: ahora,
         actualizadoEn: ahora
     },
     
     // RESTAURANTE: Comedor La Abuelita
     {
         _id: productoId91,
         restauranteId: restauranteId23,
         nombre: "Comida corrida",
         descripcion: "Incluye sopa, arroz, guisado y bebida.",
         precio: 70,
         imagen: "https://media-cdn.tripadvisor.com/media/photo-s/1a/e0/1d/42/photo0jpg.jpg",
         disponible: true,
         etiquetas: ["comida"],
         categoriaMenu: "Platillos del día",
         creadoEn: ahora,
         actualizadoEn: ahora
     },
     {
         _id: productoId92,
         restauranteId: restauranteId23,
         nombre: "Caldo de res",
         descripcion: "Caliente y tradicional, con verduras frescas.",
         precio: 60,
         imagen: "https://i.pinimg.com/1200x/a5/11/3f/a5113fc5471eab14181b6cf7e99c29b2.jpg",
         disponible: true,
         etiquetas: ["sopas"],
         categoriaMenu: "Sopas",
         creadoEn: ahora,
         actualizadoEn: ahora
     },
     {
         _id: productoId93,
         restauranteId: restauranteId23,
         nombre: "Arroz rojo",
         descripcion: "Guarnición casera.",
         precio: 20,
         imagen: "https://i.pinimg.com/1200x/94/73/4b/94734bec4d9a06bf7e0afdf52b7151ed.jpg",
         disponible: true,
         etiquetas: ["guarniciones"],
         categoriaMenu: "Guarniciones",
         creadoEn: ahora,
         actualizadoEn: ahora
     },
     {
         _id: productoId94,
         restauranteId: restauranteId23,
         nombre: "Té de hierbabuena",
         descripcion: "Infusión fresca y ligera.",
         precio: 15,
         imagen: "https://i.pinimg.com/736x/fa/a2/fb/faa2fbd924cb4c2ff038702e3e2aa0d5.jpg",
         disponible: true,
         etiquetas: ["bebidas"],
         categoriaMenu: "Bebidas",
         creadoEn: ahora,
         actualizadoEn: ahora
     },
     {
         _id: productoId95,
         restauranteId: restauranteId23,
         nombre: "Pollo en salsa verde",
         descripcion: "Acompañado de arroz y frijoles.",
         precio: 55,
         imagen: "https://i.pinimg.com/originals/a3/cc/2d/a3cc2dc0f182fe3a7fc2fd811ff1387f.jpg",
         disponible: true,
         etiquetas: ["platillos"],
         categoriaMenu: "Platos fuertes",
         creadoEn: ahora,
         actualizadoEn: ahora
     },
     
     // RESTAURANT: Sazón Oaxaqueño
     {
         _id: productoId96,
         restauranteId: restauranteId24,
         nombre: "Mole negro",
         descripcion: "Platillo tradicional acompañado con arroz.",
         precio: 95,
         imagen: "https://mujer.com.mx/cdn/recipes/IRecipes_030659700157966185669_orig.jpg",
         disponible: true,
         etiquetas: ["oaxaqueña"],
         categoriaMenu: "Platos fuertes",
         creadoEn: ahora,
         actualizadoEn: ahora
     },
     {
         _id: productoId97,
         restauranteId: restauranteId24,
         nombre: "Tasajo asado",
         descripcion: "Carne asada con guarniciones.",
         precio: 110,
         imagen: "https://cocineo.com.mx/wp-content/uploads/2024/02/Receta-de-tasajo-1536x864.jpg",
         disponible: true,
         etiquetas: ["oaxaqueña"],
         categoriaMenu: "Carnes",
         creadoEn: ahora,
         actualizadoEn: ahora
     },
     {
         _id: productoId98,
         restauranteId: restauranteId24,
         nombre: "Estofado oaxaqueño",
         descripcion: "Guiso tradicional con pollo.",
         precio: 80,
         imagen: "https://gourmetdemexico.com.mx/wp-content/uploads/2023/03/diseno-sin-titulo-8-10-1024x597.jpg",
         disponible: true,
         etiquetas: ["platillos", "oaxaqueña"],
         categoriaMenu: "Platos fuertes",
         creadoEn: ahora,
         actualizadoEn: ahora
     },
     {
         _id: productoId99,
         restauranteId: restauranteId24,
         nombre: "Agua de chilacayota",
         descripcion: "Refrescante y endulzada con piloncillo.",
         precio: 20,
         imagen: "https://www.mexicodesconocido.com.mx/wp-content/uploads/2019/01/agua-chilcayota.jpg",
         disponible: true,
         etiquetas: ["bebidas"],
         categoriaMenu: "Bebidas",
         creadoEn: ahora,
         actualizadoEn: ahora
     },
     {
         _id: productoId100,
         restauranteId: restauranteId24,
         nombre: "Tamales de chepil",
         descripcion: "Tamales de masa con chepil y salsa.",
         precio: 25,
         imagen: "https://i.ytimg.com/vi/UPhzAkTvCOs/maxresdefault.jpg",
         disponible: true,
         etiquetas: ["antojitos", "tamales"],
         categoriaMenu: "Antojitos",
         creadoEn: ahora,
         actualizadoEn: ahora
     },
     
     // RESTAURANTE: Pasillo de Humo 
     {
         _id: productoId101,
         restauranteId: restauranteId25,
         nombre: "Carne asada al carbón",
         descripcion: "Carne seleccionada preparada al instante.",
         precio: 75,
         imagen: "https://i0.wp.com/www.atiempo.mx/wp-content/uploads/2023/03/230308-carne-asada-1-800x533-atiempo.jpg?resize=780%2C470&ssl=1",
         disponible: true,
         etiquetas: ["grill","carnes"],
         categoriaMenu: "Carnes",
         creadoEn: ahora,
         actualizadoEn: ahora
     },
     {
         _id: productoId102,
         restauranteId: restauranteId25,
         nombre: "Chorizo oaxaqueño",
         descripcion: "Asado al carbón, perfecto para acompañar.",
         precio: 40,
         imagen: "https://i0.wp.com/gudomagazine.com/wp-content/uploads/2022/12/chorizo-oaxaqueno-valles-1.jpg?resize=768%2C448&ssl=1",
         disponible: true,
         etiquetas: ["grill","carnes"],
         categoriaMenu: "Carnes",
         creadoEn: ahora,
         actualizadoEn: ahora
     },
     {
         _id: productoId103,
         restauranteId: restauranteId25,
         nombre: "Cecina enchilada",
         descripcion: "Asada al momento, suave y con sabor intenso.",
         precio: 65,
         imagen: "https://media-cdn.tripadvisor.com/media/photo-s/12/2b/2e/c2/lomito-al-chipotle-chipotle.jpg",
         disponible: true,
         etiquetas: ["grill","carnes"],
         categoriaMenu: "Carnes",
         creadoEn: ahora,
         actualizadoEn: ahora
     },
     {
         _id: productoId104,
         restauranteId: restauranteId25,
         nombre: "Ensalada fresca",
         descripcion: "Lechuga, jitomate, pepino y aderezo.",
         precio: 20,
         imagen: "https://cdn.kiwilimon.com/recetaimagen/25914/22610.jpg",
         disponible: true,
         etiquetas: ["guarniciones","ensaladas"],
         categoriaMenu: "Guarniciones",
         creadoEn: ahora,
         actualizadoEn: ahora
     },
     {
         _id: productoId105,
         restauranteId: restauranteId25,
         nombre: "Agua de jamaica",
         descripcion: "Natural y refrescante.",
         precio: 15,
         imagen: "https://www.mexicodesconocido.com.mx/wp-content/uploads/2017/03/Nuevo-proyecto-74.png",
         disponible: true,
         etiquetas: ["bebidas"],
         categoriaMenu: "Bebidas",
         creadoEn: ahora,
         actualizadoEn: ahora
     }
     ]);