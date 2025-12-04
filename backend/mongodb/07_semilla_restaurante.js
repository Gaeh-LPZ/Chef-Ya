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
        imagen: "https://scontent.fmtt1-2.fna.fbcdn.net/v/t39.30808-6/312642085_489178279896352_6023840382052884007_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=5_CwCQUNtloQ7kNvwFdGQ3-&_nc_oc=AdmBIRXBaA0h9ChD9Eqy6FEYvqTGAzRXyNJAZLhHzh_8wTaUTnMwP-x1XTN1mqkCt8T2WShxyI4PePQtgFM5XOHU&_nc_zt=23&_nc_ht=scontent.fmtt1-2.fna&_nc_gid=IeqaWXFFk9FNVQOsrpiizg&oh=00_Aflml7GqCukbREqZti7e5H9RhBZhor4bycqqsbrLMYJ8FQ&oe=69376B8C",
        imagen_banner: "https://scontent.fmtt1-1.fna.fbcdn.net/v/t39.30808-6/476440387_1010976161049892_201754054953539667_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=PYoWqfMRA0sQ7kNvwHpB3oT&_nc_oc=AdlkHm5TNMneqw3YwdRpS335ijMVZE4OoHVv5-Rs7fMuvVGhuvXRE3vwPsT8p-4JfBmQBGLr5ttIu5TR1O3dhe58&_nc_zt=23&_nc_ht=scontent.fmtt1-1.fna&_nc_gid=elKnwP38zdKMexCHR0ncyw&oh=00_AfkF8BeZSl5jEzPxs_APhuyBDpBwORb097zaOJP_kxfM9w&oe=693794D3",
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
        url_localizacion: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2364.7006534860657!2d-97.80989570640666!3d17.827035078479287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c8aa60f430fd99%3A0x45c4198f12a3c150!2sAcatlima%2C%20Oax.!5e0!3m2!1ses-419!2smx!4v1764861438218!5m2!1ses-419!2smx",
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
        imagen: "https://scontent.fmtt1-2.fna.fbcdn.net/v/t39.30808-6/583330599_1234726308674875_5708886881374279623_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=dlUZbOIdpEMQ7kNvwFf-Q-p&_nc_oc=AdmXbYIFKBpw4S9kSO0CRJ1Qjd7xxhUgvXLqtf_jUu4fMvKWXCcuUKQU6YoT3BLwumWLcPynQN2SVB7lW77Qi_47&_nc_zt=23&_nc_ht=scontent.fmtt1-2.fna&_nc_gid=iCnfbagQ5ksSek48_mfgVw&oh=00_Afn2rrUDjh4wAMxMFTo1ya3xN8T8-n-upsuvF6IDzIzmsA&oe=69377CB5",
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
        imagen: "https://scontent.fmtt1-2.fna.fbcdn.net/v/t39.30808-6/554100221_1187740533373453_1098051231715049740_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=Oe2EzrvUzt0Q7kNvwGoEVpN&_nc_oc=AdnAtShzB293b5WRQ_rv2u5saw0nTqijgd0MJBAd1q-sJ-tU2QdGQEzBbUE8YcmJpF1k6nRoWZSOgHFXgbHrkKaF&_nc_zt=23&_nc_ht=scontent.fmtt1-2.fna&_nc_gid=Ak1q_d8RATZs0I96oIHSdQ&oh=00_AfkDwwxj-ovKF-IYwIEETCy8TCgjrSPR9WXVCn5qRwzAxw&oe=69378155",
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
        imagen: "https://scontent.fmtt1-2.fna.fbcdn.net/v/t51.82787-15/530393834_18074229743509439_6886964114601140432_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=3fbSIbi5P-QQ7kNvwFbp6bi&_nc_oc=AdmelyFCrEJqDJDZtKFVjOXhzZlMjv5xUZvsyiNw1jt1GpVFqgF0CU-D0t4RJ6T1WF9aF9NdW5nsSIJkxIdsvF-u&_nc_zt=23&_nc_ht=scontent.fmtt1-2.fna&_nc_gid=P9ehHWZdqHB4qgQ6jPdhzQ&oh=00_AfkNmJ4TJp0IdMFRRSA6f9Gb1hSHGkKknD_AaKfYBQWaaQ&oe=69377663",
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
        imagen: "https://scontent.fmtt1-2.fna.fbcdn.net/v/t39.30808-6/515263258_1121885763292264_2315449721911486963_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=fOG_BO7IJj0Q7kNvwGNd91o&_nc_oc=Adn8HYBnHLony9vv0WreZQ3KMmaUuFMA-1N4Qj-Wv8PFP55aJLjWUThConLTUixLE8SMLhbzRd6ejei1omq7aXSs&_nc_zt=23&_nc_ht=scontent.fmtt1-2.fna&_nc_gid=2db_JYnuMvQL9_89T0GCbA&oh=00_AfnXElnTL-gL-raLyivouV6Oitp5zTc7bI4hM-FXAxCfyg&oe=6937617E",
        disponible: true,
        etiquetas: ["especialidad", "antojito"],
        categoriaMenu: "Platos Estacionales",
        creadoEn: ahora,
        actualizadoEn: ahora
    },

    {
        _id: productoId215,
        restauranteId: restauranteId51,
        nombre: "pollo enchilado",
        descripcion: "Pollo enchilado estilo multipollo con 8 piezas.",
        precio: 175,
        imagen: "https://scontent.fmtt1-1.fna.fbcdn.net/v/t39.30808-6/515327545_1121885753292265_7890028721835776875_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=x5RHVXv25b4Q7kNvwFMtlET&_nc_oc=AdkR1GE6rqHaOs5V0mtwI4n4lWX9uO2anbfLFF4eWBgSP_sQJ3iXFCMRLiX-pc5rYj5eaePhDI6DLakqE7EZ9kcU&_nc_zt=23&_nc_ht=scontent.fmtt1-1.fna&_nc_gid=N3euVFKJpG0Dzo9eIatEEA&oh=00_AfmKw3IWSFQKOS4xA3fJrwzOV_0RPPXEtpU45CFDVpMJXA&oe=693794AF",
        disponible: true,
        etiquetas: ["especialidad", "antojito"],
        categoriaMenu: "Platos Estacionales",
        creadoEn: ahora,
        actualizadoEn: ahora
    },

    {
        _id: productoId216,
        restauranteId: restauranteId51,
        nombre: "pollo rostizado",
        descripcion: "Pollo rostizado estilo multipollo con 8 piezas.",
        precio: 175,
        imagen: "https://scontent.fmtt1-1.fna.fbcdn.net/v/t39.30808-6/515322035_1121885729958934_7638250608952576573_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=lXqLUyBSLxwQ7kNvwEiEU9q&_nc_oc=AdnmA1KlVdb9pIU5urX_loc_adY5B7tUp2FmkDYWEdHQi3255MzI9ekIt6l4T9CXBDrvmsNgMrBPyAYisQYp-oxa&_nc_zt=23&_nc_ht=scontent.fmtt1-1.fna&_nc_gid=qgDNLeYq2d2TZnD2kD3CgA&oh=00_AfnpYLUnqg1Wt40bVAc0mOORhPx7OoCn0fjcdt36qPFtgQ&oe=6937674E",
        disponible: true,
        etiquetas: ["especialidad", "antojito"],
        categoriaMenu: "Platos Estacionales",
        creadoEn: ahora,
        actualizadoEn: ahora
    }
]);