const dbChef = db.getSiblingDB('chefya');

const ahora = new Date();

const restauranteId51 = new ObjectId();



const productoId211 = new ObjectId();
const productoId212 = new ObjectId();
const productoId213 = new ObjectId();
const productoId214 = new ObjectId();
const productoId215 = new ObjectId();
const productoId216 = new ObjectId();



dbChef.restaurantes.insertMany([
   
    {
        _id: restauranteId51,
        nombre: "Multipollo",
        slug: "Pollos fritos, asados y a la leña",
        descripcion: "Los mejores pollos en todo Huajuapan de leon.",
        categorias: ["oaxaquena", "antojitos"],
        imagen: "https://scontent.fmtt1-2.fna.fbcdn.net/v/t39.30808-6/312642085_489178279896352_6023840382052884007_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=q1eTZaZ7WokQ7kNvwFj3MwB&_nc_oc=AdmCzIcQoURrocV6-d4ym81THO-tSckGRk-9zgKZ7UMgyPmJE9du3BTbFicQ6Mm45lexg4sYjfAu57WnESwxeVV2&_nc_zt=23&_nc_ht=scontent.fmtt1-2.fna&_nc_gid=myX66O2DifGBZ00Zy4dzmg&oh=00_AfjP--7Zu29weYUDctrEvbQkqRuwTDY5ikmBkMrBdYo20A&oe=692E694C",
        imagen_banner: "https://scontent.fmtt1-1.fna.fbcdn.net/v/t39.30808-6/476440387_1010976161049892_201754054953539667_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=qnStt_Q95IMQ7kNvwHSjs4r&_nc_oc=Adl0qKIS4lY7h4RvaKztVpYa4YnE_BJVj68xisq1KtrsRay2TT4DSnlN7RCnDH65ZGOIOXBWme5gw_hxSOHtkDkL&_nc_zt=23&_nc_ht=scontent.fmtt1-1.fna&_nc_gid=ldBwSzsKA5vNRoiryiaCfw&oh=00_AfgCh7jO_JOJQZbq1KD3w8gJNC7rNBaBXvshGGjLJAoQDg&oe=692E5A53",
        calificacion: { promedio: 4, conteo: 8 },
        entrega: { minutosPromedio: 10, tarifa: 25 },
        direccion: {
            calle: "Avenida Universidad #20, Acatlima, 64009 Heroica Cdad. de Huajuapan de León, Oax.",
            colonia: "Acatlima",
            ciudad: "Huajuapan de León",
            estado: "Oaxaca",
            cp: "64009",
            geo: { lat: 17.827769, lng: -97.809269} 
        },
        horario: {
            lunes:     { abre: "08:00", cierra: "22:00" },
            martes:    { abre: "08:00", cierra: "22:00" },
            miercoles: { abre: "08:00", cierra: "22:00" },
            jueves:    { abre: "08:00", cierra: "22:00" },
            viernes:   { abre: "08:00", cierra: "23:00" },
            sabado:    { abre: "08:00", cierra: "23:00" },
            domingo:   { abre: "09:00", cierra: "22:00" }
        },
        diasServicio: ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"],
        url_localizacion: "https://maps.app.goo.gl/TVLsfjnypUHPXtP47",
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    }
]);



dbChef.productos.insertMany([
    
    {
        _id: productoId211,
        restauranteId: restauranteId51,
        nombre: "Pure de Papa",
        descripcion: "Pure de papa cremoso, fresco e irresistible.",
        precio: 75,
        imagen: "https://scontent.fmtt1-2.fna.fbcdn.net/v/t39.30808-6/583330599_1234726308674875_5708886881374279623_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=8qcxiDXmHi4Q7kNvwFT31M0&_nc_oc=AdnykhpIJHCKMvyvE3phkKYdoReDNsku6niKxF7cRc217jdWUpnhJRsJI6Oan-cymLZB9o1zlBChutOXNFjcFbYm&_nc_zt=23&_nc_ht=scontent.fmtt1-2.fna&_nc_gid=xGVWune3YYgyJnzRaCsqPg&oh=00_AfhHa3J4Zz-cd0LLz0Q7EdZ3NHZqmsH9W_rt9O8wkiS_3g&oe=692E7A75",
        disponible: true,
        etiquetas: ["especialidad", "antojito"],
        categoriaMenu: "Platos Estacionales",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
     {
        _id: productoId212,
        restauranteId: restauranteId51,
        nombre: "Combo multipollo",
        descripcion: "Combo multipollo que incluye: arroz, nopales,papas a la francesa y 4 piezas de pollo frito.",
        precio: 175,
        imagen: "https://scontent.fmtt1-2.fna.fbcdn.net/v/t39.30808-6/554100221_1187740533373453_1098051231715049740_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=UGy96ImDHsQQ7kNvwFtJA1c&_nc_oc=AdliAzYcYXMXK82-cU7GXhNa6JQeTPefACLibSDz498kzFCy8pnZR6pqqAkTXhnBs9I-6DKSWTsbK5hFe8hIoa7U&_nc_zt=23&_nc_ht=scontent.fmtt1-2.fna&_nc_gid=pCh3QNFMvqFjstvw7fx53w&oh=00_AfgsAIqE2TYPkqvaOYoob0fonvNoQvgrkWAJOBVGFyzzXw&oe=692E7F15",
        disponible: true,
        etiquetas: ["especialidad", "antojito"],
        categoriaMenu: "Platos Estacionales",
        creadoEn: ahora,
        actualizadoEn: ahora
    },

    {
        _id: productoId213,
        restauranteId: restauranteId51,
        nombre: "pollo frito",
        descripcion: "Pollo frito estilo multipollo con 8 piezas.",
        precio: 175,
        imagen: "https://scontent.fmtt1-1.fna.fbcdn.net/v/t39.30808-6/500707589_1093169269497247_2453642537272410690_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=Ik2iuCVjqOsQ7kNvwFDE8i-&_nc_oc=AdlYzbQdF3mmYfx0tfkuuKiNCipGQxc4ZQHPwV-GcWezRhaJo2L4dXBQvYSEr5juyHKUt2qo1aGkWqwPWAw7zKnD&_nc_zt=23&_nc_ht=scontent.fmtt1-1.fna&_nc_gid=oIYDwI20InIzB6Nb36jGSg&oh=00_AfjfXHbmXLqHf2Awy9qFMDWQZBd8Tne2hPMhNX--sBIItg&oe=692E5263",
        disponible: true,
        etiquetas: ["especialidad", "antojito"],
        categoriaMenu: "Platos Estacionales",
        creadoEn: ahora,
        actualizadoEn: ahora
    },

     {
        _id: productoId214,
        restauranteId: restauranteId51,
        nombre: "pollo en barbacoa",
        descripcion: "Pollo en barbacoa estilo multipollo con 8 piezas.",
        precio: 175,
        imagen: "https://scontent.fmtt1-2.fna.fbcdn.net/v/t39.30808-6/515263258_1121885763292264_2315449721911486963_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=CgtS-sK5t00Q7kNvwGvAFdo&_nc_oc=AdmOkU2-5yjeAxdyYZNRh9EKGHvzhjql6Hg2SPRVziHUe7bwtacXiWSyOMqotkBZOn84dHVIw9v-W6eBI5s13kTj&_nc_zt=23&_nc_ht=scontent.fmtt1-2.fna&_nc_gid=2R8hsH0AOpzXiOz6lr8sZA&oh=00_AfgRjSOH4Ujao5ikpqD4kFvKPm8aZQrNAFfHjGd3ISSyog&oe=692E5F3E",
        disponible: true,
        etiquetas: ["especialidad", "antojito"],
        categoriaMenu: "Platos Estacionales",
        creadoEn: ahora,
        actualizadoEn: ahora
    },

    {
        _id: productoId215,
        restauranteId: restauranteId51,
        nombre: "pollo en enchilado",
        descripcion: "Pollo enchilado estilo multipollo con 8 piezas.",
        precio: 175,
        imagen: "https://scontent.fmtt1-1.fna.fbcdn.net/v/t39.30808-6/515327545_1121885753292265_7890028721835776875_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=F31cbDZluzIQ7kNvwGmh5Xi&_nc_oc=AdlfEFMEEPqJHFiNcCa1Rhp0jTw_wqvGt4SOM_IZ6sddwEsrqWLW5Vp8HxxE8G7sOsvmk2PuJj6arHscW2qBedJf&_nc_zt=23&_nc_ht=scontent.fmtt1-1.fna&_nc_gid=AKlYGvMLxRMjdCczU2iv4w&oh=00_AfjwlKSYrCIZRi37HtSdrfMYPUL7Eo2Pxs_ZRNjr_hJKyw&oe=692E5A2F",
        disponible: true,
        etiquetas: ["especialidad", "antojito"],
        categoriaMenu: "Platos Estacionales",
        creadoEn: ahora,
        actualizadoEn: ahora
    },

    {
        _id: productoId216,
        restauranteId: restauranteId51,
        nombre: "pollo en rostizado",
        descripcion: "Pollo rostizado estilo multipollo con 8 piezas.",
        precio: 175,
        imagen: "https://scontent.fmtt1-1.fna.fbcdn.net/v/t39.30808-6/515322035_1121885729958934_7638250608952576573_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=sQWTIkUF5GgQ7kNvwEWE8RS&_nc_oc=AdmDyfLkK828WT2jYdCeCHUHgUvoo7Efc79AgrfjKITTIB41_-KnbnqvvnSExFEM6ohTbxw24_2YqmpVz5CXanC5&_nc_zt=23&_nc_ht=scontent.fmtt1-1.fna&_nc_gid=JNNwGlq37YaMXDaVrOBtqg&oh=00_AfiXQouio--FvD2PEw8yo2w0jE42-sRL9nQ-0MGdBV6H9Q&oe=692E650E",
        disponible: true,
        etiquetas: ["especialidad", "antojito"],
        categoriaMenu: "Platos Estacionales",
        creadoEn: ahora,
        actualizadoEn: ahora
    }
]);