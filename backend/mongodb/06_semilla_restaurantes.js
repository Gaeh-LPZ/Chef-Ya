const dbChef = db.getSiblingDB('chefya');

const ahora = new Date();

const restauranteId41 = new ObjectId();
const restauranteId42 = new ObjectId();
const restauranteId43 = new ObjectId();
const restauranteId44 = new ObjectId();
const restauranteId45 = new ObjectId();
const restauranteId46 = new ObjectId();
const restauranteId47 = new ObjectId();
const restauranteId48 = new ObjectId();
const restauranteId49 = new ObjectId();
const restauranteId50 = new ObjectId();
const restauranteId51 = new ObjectId();

const categoriaId38 = new ObjectId();
const categoriaId39 = new ObjectId();


const productoId181 = new ObjectId(); 
const productoId182 = new ObjectId();
const productoId183 = new ObjectId();
const productoId184 = new ObjectId(); 
const productoId185 = new ObjectId();
const productoId186 = new ObjectId();
const productoId187 = new ObjectId();
const productoId188 = new ObjectId();
const productoId189 = new ObjectId();
const productoId190 = new ObjectId();
const productoId191 = new ObjectId();
const productoId192 = new ObjectId();
const productoId193 = new ObjectId();
const productoId194 = new ObjectId();
const productoId195 = new ObjectId();
const productoId196 = new ObjectId();
const productoId197 = new ObjectId();
const productoId198 = new ObjectId();
const productoId199 = new ObjectId();
const productoId200 = new ObjectId();
const productoId201 = new ObjectId();
const productoId202 = new ObjectId();
const productoId203 = new ObjectId();
const productoId204 = new ObjectId();
const productoId205 = new ObjectId();
const productoId206 = new ObjectId();
const productoId207 = new ObjectId();
const productoId208 = new ObjectId();
const productoId209 = new ObjectId();
const productoId210 = new ObjectId();
const productoId211 = new ObjectId();
const productoId212 = new ObjectId();
const productoId213 = new ObjectId();
const productoId214 = new ObjectId();
const productoId215 = new ObjectId();
const productoId216 = new ObjectId();



dbChef.restaurantes.insertMany([
    {
        _id: restauranteId41,
        nombre: "Takuni-Na",
        slug: "taco",
        descripcion: "Tacos, burritos, gringas y más",
        categorias: ["tacos", "rapida", "burritos"],
        imagen: "https://scontent.fmtt1-2.fna.fbcdn.net/v/t39.30808-6/543388252_1368882341906094_3696587340217621891_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=yPn3SCpXb6sQ7kNvwFqFbQN&_nc_oc=AdnmKN9_S2YxwSZzkZ-GBr7yvjGYzWd_pJF65sl6CE6kI3Es8OKvQKR0L73ngfOfL3kxO5fEX2S58C-BHIKx5p1p&_nc_zt=23&_nc_ht=scontent.fmtt1-2.fna&_nc_gid=T4T6Tv6zJ0hP78_6vVeEPA&oh=00_AfnlMVcyxYNdhvL3g5Z-FfMoU3Qr7sFknDkSaXuL1Y8cIA&oe=6937935C",
        imagen_banner: "https://scontent.fmtt1-2.fna.fbcdn.net/v/t39.30808-6/491734670_1242171184577211_8695084659782075260_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=ixhZYUr1y5UQ7kNvwH-VO4y&_nc_oc=AdlAqIJaMdexPOIKdutQrfsQSFd2gGzfRtizqRMrd--qF6v0Qccpk78tjR6UXVOk457K2kBgyo3MdEFTmRjtIrVk&_nc_zt=23&_nc_ht=scontent.fmtt1-2.fna&_nc_gid=4AP4pAf3OP3fzcNwtFy3Ow&oh=00_Afk0Y38bEb6xnALQSCXZu8TI9_BULFcrT4JFyWGXf4ZTxw&oe=6937917B",
        calificacion: { promedio: 0, conteo: 0 },
        entrega: { minutosPromedio: 25, tarifa: 22 },
        direccion: {
            calle: "Av. Universidad esquina 10 de Abril",
            colonia: "Acatlima",
            ciudad: "Huajuapan de León",
            estado: "Oaxaca",
            cp: "69005",
            geo: { lat: 17.0620, lng: -96.7210 }
        },
        horario: {
            lunes:     { abre: "13:00", cierra: "23:00" },
            martes:    { abre: "13:00", cierra: "23:00" },
            miercoles: { abre: "13:00", cierra: "23:00" },
            jueves:    { abre: "13:00", cierra: "23:00" },
            viernes:   { abre: "13:00", cierra: "00:00" },
            sabado:    { abre: "13:00", cierra: "00:00" },
            domingo:   { abre: "13:00", cierra: "23:00" }
        },
        diasServicio: ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"],
        url_localizacion: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3798.2591431401356!2d-97.80635749999999!3d17.826482800000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c8abffaa4a8b95%3A0xd41b1a9892e69c1a!2sTakuni%20Na!5e0!3m2!1ses-419!2smx!4v1764862734125!5m2!1ses-419!2smx",
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: restauranteId42,
        nombre: "Casa María Lombardo",
        slug: "casa-maria-lombardo",
        descripcion: "Alta cocina mexicana con enfoque en tradición oaxaqueña.",
        categorias: ["gourmet", "oaxaquena"],
        imagen: "https://scontent.fmtt1-1.fna.fbcdn.net/v/t39.30808-6/301474017_508011781323877_6954503738954342885_n.jpg?_nc_cat=101&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeG2KNtzPAXGScIwyGxD1AAA7PTPNQ_s9gns9M81D-z2CRLvG4UwD8Cvz6fE6yADJbZXTxj3wjK8AEEc4FxVE36q&_nc_ohc=icF0uvB2hUUQ7kNvwH_-9-F&_nc_oc=AdkgHMxPHFdSGmPBLdFMFXYNZgTMKKDiXDFwRmSSEfgXOTHI7RDw7CLhaZt-sN_2nQNX1iSSS0pctUShGtEOwlma&_nc_zt=23&_nc_ht=scontent.fmtt1-1.fna&_nc_gid=g5DNpj-KKXvAotE3TgbJ6A&oh=00_AfjRIk0GevgklShfukEFTwctL3Xw8VBRbNXmBGkKQcDucg&oe=692B6D0E",
        imagen_banner: "https://scontent.fmtt1-2.fna.fbcdn.net/v/t39.30808-6/480784637_1216229393835442_2782165156784384345_n.jpg?_nc_cat=108&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeGrmqzi39rwlc344XYB-5lvmJJuJRzLPTGYkm4lHMs9MTgj76so3kpLtPgFvuldIIIbxKkUdeTDAb-u-Bu8mEaT&_nc_ohc=GukQ_Adv1yAQ7kNvwFzhTF8&_nc_oc=AdlxhbYNFqsWByLjPzni6OLSj89Xv20QJtWRw4osp_O3JDBp4dS8X3ghevTHjfHpbNh-77MrhsW-KRV9tBuiZusU&_nc_zt=23&_nc_ht=scontent.fmtt1-2.fna&_nc_gid=5CWJDBrtagc8gBPqncnbNQ&oh=00_AfiJLZwz0QPlRoGCaZ2jnoNISzMXxO2IikqFLMQfU56SNw&oe=692B75F4",
        calificacion: { promedio: 0, conteo: 0 },
        entrega: { minutosPromedio: 35, tarifa: 30 },
        direccion: {
            calle: "Av. Juárez 503",
            colonia: "Centro",
            ciudad: "Oaxaca de Juárez",
            estado: "Oaxaca",
            cp: "68000",
            geo: { lat: 17.0625, lng: -96.7260 }
        },
        horario: {
            lunes:     { abre: "14:00", cierra: "22:00" },
            martes:    { abre: "14:00", cierra: "22:00" },
            miercoles: { abre: "14:00", cierra: "22:00" },
            jueves:    { abre: "14:00", cierra: "22:00" },
            viernes:   { abre: "14:00", cierra: "23:00" },
            sabado:    { abre: "14:00", cierra: "23:00" },
            domingo:   { abre: "14:00", cierra: "22:00" }
        },
        diasServicio: ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"],
        url_localizacion: "https://maps.app.goo.gl/cbK18DFo4YVpXUgA7",
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: restauranteId43,
        nombre: "Café Petirrojo Huajuapan",
        slug: "cafe-petirrojo-huajuapan",
        descripcion: "Especialistas en café de altura y repostería artesanal.",
        categorias: ["cafeteria", "panaderia"],
        imagen: "https://scontent.fmtt1-1.fna.fbcdn.net/v/t39.30808-6/301474017_508011781323877_6954503738954342885_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=5BLq2mL5fJQQ7kNvwFfY8sh&_nc_oc=Adlb3wPSbY_C47QBf1UYQiLfH6KWgjAFjYJlYS-D4kY_S3cxRwAx_PE2OT_8tlK6GFfYV3yfcGR92XPYPG-MrNAL&_nc_zt=23&_nc_ht=scontent.fmtt1-1.fna&_nc_gid=p7rj8jUXRB0LoS8UdvTbhQ&oh=00_AfkQgO_gQSUUfLV6sMnPP5ctxZX2sMPJpveskVxpbC2S-w&oe=693782CE",
        imagen_banner: "https://scontent.fmtt1-1.fna.fbcdn.net/v/t39.30808-6/571314641_1435709508554095_3790976252049139519_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=75d36f&_nc_ohc=ihPTd_OJkB0Q7kNvwFU9Vyn&_nc_oc=AdniK7xqSgzpsekbZo0fu6f0spAveXcn-Ar0BATaI0Sxb3TLKhTZZSUz4oeUT-vP9Q_jlMxjnV7c9fHMIt4gaAWu&_nc_zt=23&_nc_ht=scontent.fmtt1-1.fna&_nc_gid=qKsNV9CtMWEZLotg0Q-30A&oh=00_AflFkK3wAn9EibF5rI8cguVY1veDSg7rPHV82Ve8x1oo7Q&oe=6937629E",
        calificacion: { promedio: 0, conteo: 0 },
        entrega: { minutosPromedio: 18, tarifa: 15 },
        direccion: {
            calle: "Benito Juárez #33",
            colonia: "Centro",
            ciudad: "Huajuapan de León",
            estado: "Oaxaca",
            cp: "69000",
            geo: { lat: 17.8075, lng: -97.7812 }
        },
        horario: {
            lunes:     { abre: "07:30", cierra: "21:00" },
            martes:    { abre: "07:30", cierra: "21:00" },
            miercoles: { abre: "07:30", cierra: "21:00" },
            jueves:    { abre: "07:30", cierra: "21:00" },
            viernes:   { abre: "07:30", cierra: "21:30" },
            sabado:    { abre: "08:00", cierra: "21:30" },
            domingo:   { abre: "08:00", cierra: "21:00" }
        },
        diasServicio: ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"],
        url_localizacion: "https://maps.app.goo.gl/ihDFfpjdr8PsbsW69",
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: restauranteId44,
        nombre: "Terranova Oaxaca",
        slug: "terranova-oaxaca",
        descripcion: "Restaurante de alta cocina, combinando tradición oaxaqueña y tendencias internacionales.",
        categorias: ["gourmet", "oaxaquena"],
        imagen: "https://scontent.fmtt1-2.fna.fbcdn.net/v/t39.30808-6/549185293_1368271528240947_1611324393598441124_n.jpg?_nc_cat=100&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHk4m2GWJHdBzCdY7wAFXUFooUAuXAPinSihQC5cA-KdA5BHMGA-oEgZkfta64DVbFhIDoVHFoZBc8ipNr_f_r2&_nc_ohc=ILKs3fnfb-YQ7kNvwH4ZEck&_nc_oc=Adlm0BApmNLzWWGClG89FqDcUTG2SSbCejfFmUNyUQ40y4v17bgz13jGzJyCpRZgzK_LpDfTDuCBXNViSVAfbI8Q&_nc_zt=23&_nc_ht=scontent.fmtt1-2.fna&_nc_gid=XnywNt3y64kjQeIC1E0b_g&oh=00_Afig59z0Fc7lG7ch9dc0_C1N_c_4BE15jsuhoiRK2pSR_g&oe=692B6523",
        imagen_banner: "https://scontent.fmtt1-2.fna.fbcdn.net/v/t39.30808-6/560464856_1390578426010257_2700910387250399220_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=106&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeGQTsyNt5wxoKTcQh5N--f_EJeWInWPmyUQl5YidY-bJTnefbBIyGCrhmnYu1EvcgOkvSksZAkIJJk5cwkZ6h2G&_nc_ohc=EgM69UzbxpMQ7kNvwGuKhAA&_nc_oc=AdnIY9wIEaEYwlR8bGD_W4GNBwc8QtCWt7eubUychKxrBnws-E0WdseZMr8IkRgnoH6SRkJanG51PDkuTDbevu1c&_nc_zt=23&_nc_ht=scontent.fmtt1-2.fna&_nc_gid=m2ZZd_Y2BVCjNik_YxNTbQ&oh=00_Afit9Qq7B3_e5bAVU2qeXNS9hlPe_PAo4V6ZYFy-c2vG9A&oe=692B7FC4",
        calificacion: { promedio: 0, conteo: 0 },
        entrega: { minutosPromedio: 30, tarifa: 28 },
        direccion: {
            calle: "M. Alcalá #101",
            colonia: "Centro",
            ciudad: "Oaxaca de Juárez",
            estado: "Oaxaca",
            cp: "68000",
            geo: { lat: 17.0585, lng: -96.7265 }
        },
        horario: {
            lunes:     { abre: "08:00", cierra: "23:00" },
            martes:    { abre: "08:00", cierra: "23:00" },
            miercoles: { abre: "08:00", cierra: "23:00" },
            jueves:    { abre: "08:00", cierra: "23:00" },
            viernes:   { abre: "08:00", cierra: "00:00" },
            sabado:    { abre: "08:00", cierra: "00:00" },
            domingo:   { abre: "08:00", cierra: "22:00" }
        },
        diasServicio: ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"],
        url_localizacion: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15256.267854451438!2d-96.73236!3d17.0693769!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c62ec3b9df1757%3A0xd01ae15216f32122!2sTerranova!5e0!3m2!1ses-419!2smx!4v1764862944786!5m2!1ses-419!2smx",
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: restauranteId45,
        nombre: "El Nido Billar Resto-Bar",
        slug: "el-nido-billar-resto-bar",
        descripcion: "Bar y restaurante con antojitos, alitas, hamburguesas y billar.",
        categorias: ["grill", "rapida"],
        imagen: "https://scontent.fmtt1-2.fna.fbcdn.net/v/t39.30808-6/469083628_1355359252338638_1176721163478512397_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=hS-ftsL-dXkQ7kNvwHxmu-i&_nc_oc=Adm5sDQVdz-47rcX5mjNMcTV5GKqA30pe5MDxu7IAysbTKWc27lPpgB9EBGS8g97FL6GhDdDIKTnvJioGXg_AqhW&_nc_zt=23&_nc_ht=scontent.fmtt1-2.fna&_nc_gid=IA9ESg7pfhD6QpDdBjT-sw&oh=00_AfnFIf-FRsPVYsrg4DpYGNw6zEGbuP0gU6YZGdf36rwYqQ&oe=69376BBC",
        imagen_banner: "https://scontent.fmtt1-2.fna.fbcdn.net/v/t51.82787-15/571884669_18405739633139519_2852574730181164416_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=_fnEEviBeuoQ7kNvwFQO0TG&_nc_oc=AdkNV748iq2pAVJs-QqvUK87nSgPD-sS1Et4vvKtDpTrwVRdGnSjc9s2U4TDCe51-bpu9rLebC9a3H9YfvPNtsms&_nc_zt=23&_nc_ht=scontent.fmtt1-2.fna&_nc_gid=x7GzYkECz6cfnfw7NDVVYQ&oh=00_AfnGpzqk2JIXYL0OSS2ae9BmwOd37OGWhMhB2jIgLsxKKw&oe=69378903",
        calificacion: { promedio: 0, conteo: 0 },
        entrega: { minutosPromedio: 25, tarifa: 22 },
        direccion: {
            calle: "Carr. Huajuapan - Juxtlahuaca #15",
            colonia: "Centro",
            ciudad: "Huajuapan de León",
            estado: "Oaxaca",
            cp: "69000",
            geo: { lat: 17.8090, lng: -97.7785 }
        },
        horario: {
            lunes:     { abre: "13:00", cierra: "01:00" },
            martes:    { abre: "13:00", cierra: "01:00" },
            miercoles: { abre: "13:00", cierra: "01:00" },
            jueves:    { abre: "13:00", cierra: "02:00" },
            viernes:   { abre: "13:00", cierra: "03:00" },
            sabado:    { abre: "13:00", cierra: "03:00" },
            domingo:   { abre: "13:00", cierra: "01:00" }
        },
        diasServicio: ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"],
        url_localizacion: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3798.724121746585!2d-97.7761304!3d17.804658199999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c601e4f41e3941%3A0xf56cd0b83f6bfa2d!2sEl%20Nido%20Resto-Bar!5e0!3m2!1ses-419!2smx!4v1764863061814!5m2!1ses-419!2smx",
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: restauranteId46,
        nombre: "Mariscos El Pariente",
        slug: "mariscos-el-pariente",
        descripcion: "Los mejores mariscos frescos: cócteles, ceviches y pescados fritos.",
        categorias: ["mariscos"],
        imagen: "https://scontent.fmtt1-2.fna.fbcdn.net/v/t39.30808-6/310352956_539922184801702_3362808414139704421_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=LyKgW4bhlwoQ7kNvwFSnZt8&_nc_oc=AdnJiDrgsvS7aygp4eC1NKitWvPuow_Nlu7y6yHA6ePnXuYwjRS-B1rcadQuzXAHhq4DppdIRWQhThHNP9hjAwJs&_nc_zt=23&_nc_ht=scontent.fmtt1-2.fna&_nc_gid=QMbM67rtMsvgioQEJnXq1A&oh=00_AfnPXKKZcwB0DuevHkef2nDyZINwrjNku61WqOJL4u0gJQ&oe=69379906",
        imagen_banner: "https://scontent.fmtt1-1.fna.fbcdn.net/v/t39.30808-6/580866213_1445200530940525_679055611977267216_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=1Tj0LQ99DL8Q7kNvwGvq7Sm&_nc_oc=AdlFzuccnYGAszZxF3pYuUGYN2qt7P4jEDBaAANzcLDI-3TW_gTfwE1-bPvjQ2lkLUn72hFzv9LYrxalGF4oT8UW&_nc_zt=23&_nc_ht=scontent.fmtt1-1.fna&_nc_gid=vRJu7j1PAMzrfKm3TnLqZA&oh=00_Aflm9Wsn2VM_5d0bjPywy7cJbb73yL3dwWheaBtbbRWylQ&oe=693795DC",
        calificacion: { promedio: 0, conteo: 0 },
        entrega: { minutosPromedio: 28, tarifa: 25 },
        direccion: {
            calle: "Av. Ejército Nacional 25",
            colonia: "Soledad",
            ciudad: "Heroica Cdad. de Huajuapan de León",
            estado: "Oaxaca",
            cp: "69006",
            geo: { lat: 17.8005, lng: -97.7780 }
        },
        horario: {
            lunes:     { abre: "11:00", cierra: "18:00" },
            martes:    { abre: "11:00", cierra: "18:00" },
            miercoles: { abre: "11:00", cierra: "18:00" },
            jueves:    { abre: "11:00", cierra: "18:00" },
            viernes:   { abre: "11:00", cierra: "19:00" },
            sabado:    { abre: "11:00", cierra: "19:00" },
            domingo:   { abre: "11:00", cierra: "19:00" }
        },
        diasServicio: ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"],
        url_localizacion: "https://maps.app.goo.gl/TjDLC2ATb5dcKJoE7",
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: restauranteId47,
        nombre: "La Carreta Restaurant",
        slug: "la-carreta-restaurant",
        descripcion: "Desayunos, comidas y antojitos tradicionales en un ambiente familiar.",
        categorias: ["oaxaquena", "comida-casera"],
        imagen: "https://scontent.fmtt1-2.fna.fbcdn.net/v/t39.30808-6/492008238_1235857585214184_6622008965096542633_n.jpg?_nc_cat=100&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEW48_aa6UrYv0izdVneRu_dPZkuVnbH4J09mS5WdsfggYjxyYyrh6Oz1bav06vPCOq6aI5zAOsydLQqNfZ_muf&_nc_ohc=p9ISBYyd2XwQ7kNvwEE7ByS&_nc_oc=AdmWq4r1U8X1PjWbDKSmF5YbWV3zOYIE2nVUZUP0TVfbuzHR17Gn0a8GO1z0j4fKpSFMSiyvC2kweCOorgpeO4dK&_nc_zt=23&_nc_ht=scontent.fmtt1-2.fna&_nc_gid=sOiI4WAlw9k4ucjGu3i9cA&oh=00_AfjwPSAjMFOZfJXXoNQgh_kP5j0364zWDjLm8IW0i-p_3g&oe=692CDBA3",
        imagen_banner: "https://scontent.fmtt1-1.fna.fbcdn.net/v/t39.30808-6/580029391_1430213685778572_4572265153604827719_n.jpg?_nc_cat=103&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeFPYX_UUNx7Wshn05bz6OdOryG1XQ7zKgWvIbVdDvMqBfXwpgtJXdD8K4PAYtNwsvqCG3A5VByT7yJBEXJTVeXj&_nc_ohc=WjChV4Jcpv4Q7kNvwGUZtq7&_nc_oc=AdlM4KQRZl0N8ObQawJlKgba9Tk_kUL_xkJt942ZBAVvGPuDc_05a6iEEqpDYHYcStVJdiUDATsaxRFSpiQT_UYj&_nc_zt=23&_nc_ht=scontent.fmtt1-1.fna&_nc_gid=2F3X6gHlI8s3Im3WEQoY6A&oh=00_Afi0u-M5tdpOg0SCnnCNsh0rpTq7vtZX6-oAE3LdSxg27A&oe=692CB9B5",
        calificacion: { promedio: 0, conteo: 0 },
        entrega: { minutosPromedio: 20, tarifa: 18 },
        direccion: {
            calle: "Colonia Santa Teresa",
            ciudad: "Heroica Cdad. de Huajuapan de León",
            estado: "Oaxaca",
            cp: "69005",
            geo: { lat: 17.7950, lng: -97.7700 } // Coordenadas aproximadas para Santa Teresa
        },
        horario: {
            lunes:     { abre: "Cerrado", cierra: "Cerrado" }, // Lunes Cerrado
            martes:    { abre: "07:00", cierra: "22:00" },
            miercoles: { abre: "07:00", cierra: "22:00" },
            jueves:    { abre: "07:00", cierra: "22:00" },
            viernes:   { abre: "07:00", cierra: "22:00" },
            sabado:    { abre: "07:00", cierra: "22:00" },
            domingo:   { abre: "07:00", cierra: "18:00" } // Domingo cierra más temprano
        },
        diasServicio: ["martes","miercoles","jueves","viernes","sabado","domingo"],
        url_localizacion: "https://maps.app.goo.gl/2M4x124PYdjJ4GiQ6",
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: restauranteId48,
        nombre: "Esencia Natura",
        slug: "esencia-natura",
        descripcion: "Opciones saludables, repostería temática y platos vegetarianos.",
        categorias: ["saludable", "postres"],
        imagen: "https://scontent.fmtt1-2.fna.fbcdn.net/v/t39.30808-6/432784345_1023976669384472_1613885840259835830_n.jpg?_nc_cat=108&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEN2MNjoQwEWljxv9Swk8wlzDgMWzg8nujMOAxbODye6CGGDKF2DiGoyG4eFmppXP2Y1nmHEPSlvNIix8DS4OgI&_nc_ohc=EkabSR_ekEwQ7kNvwGArgpJ&_nc_oc=AdnyqoIEUiqNnE7GwZxVyYxGqkC6rjAs5JGQG9sUPQNS0e45Bgod4B1ZGYMTB2j6rIeaUjEqgGONz2j2GQxJx27n&_nc_zt=23&_nc_ht=scontent.fmtt1-2.fna&_nc_gid=anDuumHeyEMTcd1XEbpQPQ&oh=00_AfhRkA70FQFIm0XYpzhelr_6-VS9Fn4PAh4881n173Ra2A&oe=692CE2B8",
        imagen_banner: "https://scontent.fmtt1-2.fna.fbcdn.net/v/t39.30808-6/489332485_1324325786016224_5935959157727065824_n.jpg?_nc_cat=108&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeFXEyIQJjiktE6HKLOq1TEaDAUjklE4UqkMBSOSUThSqYb6FXWi09ddu-lAjLCVjfO1UzzAPzFeNntc_LWpQj0g&_nc_ohc=XOazwylkN3kQ7kNvwGU49RB&_nc_oc=AdmbaFsYW1PbXb0SSHWE4kHkD5w56oBfxtcdGW3zy5g7FbOb6D_Tv3_DBdVsN6O8rQMM5ihW-XwJ5eCaxnbmuZny&_nc_zt=23&_nc_ht=scontent.fmtt1-2.fna&_nc_gid=5AcpRXDgTtDSBiw_kBTKVw&oh=00_AfjSApn49AK-ihszIeNPD9xeveRBPdx_d4jgiUUS4GODrQ&oe=692CC299",
        calificacion: { promedio: 0, conteo: 0 },
        entrega: { minutosPromedio: 20, tarifa: 15 },
        direccion: {
            calle: "C. 16 de Septiembre 4",
            colonia: "Centro",
            ciudad: "Heroica Cdad. de Huajuapan de León",
            estado: "Oaxaca",
            cp: "69000",
            geo: { lat: 17.8050, lng: -97.7765 } 
        },
        horario: {
            lunes:     { abre: "08:30", cierra: "20:00" },
            martes:    { abre: "08:30", cierra: "20:00" },
            miercoles: { abre: "08:30", cierra: "20:00" },
            jueves:    { abre: "08:30", cierra: "20:00" },
            viernes:   { abre: "08:30", cierra: "20:30" },
            sabado:    { abre: "09:00", cierra: "20:30" },
            domingo:   { abre: "09:00", cierra: "18:00" }
        },
        diasServicio: ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"],
        url_localizacion: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1899.3191983887918!2d-97.7774197!3d17.8086838!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c6017733c69aed%3A0xc3c22d976a9984f9!2sEsencia%20Natura!5e0!3m2!1ses-419!2smx!4v1764863177597!5m2!1ses-419!2smx",
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: restauranteId49,
        nombre: "Casa Oaxaca el Restaurante",
        slug: "casa-oaxaca-el-restaurante",
        descripcion: "Cocina de autor oaxaqueña, ingredientes de temporada y ambiente exclusivo.",
        categorias: ["gourmet", "oaxaquena"],
        imagen: "https://th.bing.com/th/id/R.afe1bcdd9a7c261ed60284b9c30d604a?rik=eKaD%2b9kezerkrA&riu=http%3a%2f%2fstarlitemexico.com%2fwp-content%2fuploads%2fOaxaca-01.jpg&ehk=QBP6rWZL0XREkw4kdtNoQO23cAb27ixWTy2nIwjIyk0%3d&risl=&pid=ImgRaw&r=0",
        imagen_banner: "https://cdn.tasteatlas.com/images/restaurants/17d6d9e3f2a74f11a63e6bf88216a5dd.jpg?mw=1300",
        calificacion: { promedio: 0, conteo: 0 },
        entrega: { minutosPromedio: 35, tarifa: 35 },
        direccion: {
            calle: "Constitución 104-A",
            colonia: "Centro",
            ciudad: "Oaxaca de Juárez",
            estado: "Oaxaca",
            cp: "68000",
            geo: { lat: 17.0620, lng: -96.7235 } 
        },
        horario: {
            lunes:     { abre: "13:00", cierra: "23:00" },
            martes:    { abre: "13:00", cierra: "23:00" },
            miercoles: { abre: "13:00", cierra: "23:00" },
            jueves:    { abre: "13:00", cierra: "23:00" },
            viernes:   { abre: "13:00", cierra: "23:00" },
            sabado:    { abre: "13:00", cierra: "23:00" },
            domingo:   { abre: "13:00", cierra: "21:00" }
        },
        diasServicio: ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"],
        url_localizacion: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2491.741945125881!2d-96.72383688683145!3d17.065203101063087!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c7223e8ca4ad8f%3A0xebd33261b531a740!2sCasa%20Oaxaca%20el%20Restaurante!5e0!3m2!1ses-419!2smx!4v1764863364973!5m2!1ses-419!2smx",
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: restauranteId50,
        nombre: "Casa Mayordomo",
        slug: "casa-mayordomo",
        descripcion: "Especialistas en mole y chocolate oaxaqueño. Platos gourmet y tradicionales.",
        categorias: ["oaxaquena", "gourmet"],
        imagen: "https://cdn0.bodas.com.mx/vendor/8801/3_2/320/jpg/casa-mayordomo-restaurante-logo.jpeg",
        imagen_banner: "https://scontent.fmtt1-2.fna.fbcdn.net/v/t39.30808-6/562258934_1438266064974845_7417603405089222433_n.png?_nc_cat=108&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=AdUn3D66QvAQ7kNvwET_ogs&_nc_oc=AdlAC_KsWuOpt2bhDTuCzMoq6V4cYLCbFchBGuOWsZ47nOYl-oycl816Ye7RkP37dDgoNnU9j5S8mHFCPK7LB7zr&_nc_zt=23&_nc_ht=scontent.fmtt1-2.fna&_nc_gid=PVCOL2J3_riLeAbEWwNlKQ&oh=00_Afmwv7FVVPkunBWf7VqzFcPKOOlWJnle6KCXIUybbP5PoA&oe=6937725F",
        calificacion: { promedio: 0, conteo: 0 },
        entrega: { minutosPromedio: 30, tarifa: 28 },
        direccion: {
            calle: "C. Macedonio Alcalá 302",
            colonia: "Centro",
            ciudad: "Oaxaca de Juárez",
            estado: "Oaxaca",
            cp: "68000",
            geo: { lat: 17.0605, lng: -96.7215 } 
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
        url_localizacion: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3814.174227261029!2d-96.7239895!3d17.064128399999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c7223ee0960b33%3A0xd43a5fc81c15a2af!2sCasa%20Mayordomo!5e0!3m2!1ses-419!2smx!4v1764863554227!5m2!1ses-419!2smx",
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    },
]);


dbChef.categorias.insertMany([
    {
            _id: categoriaId38,
        slug: "burritos",
        nombre: "Burritos"
    },
    {
        _id: categoriaId39,
        slug: "mariscos",
        nombre: "Mariscos"
    }
]);

dbChef.productos.insertMany([
    {
        _id: productoId181,
        restauranteId: restauranteId41,
        nombre: "Taco de Suadero",
        descripcion: "Carne de suadero suave en tortilla de maíz.",
        precio: 20,
        imagen: "https://bing.com/th?id=OSK.bcb4ec0631eefe46e0b5e708a6058bb3",
        disponible: true,
        etiquetas: ["tacos", "mexicana"],
        categoriaMenu: "Tacos",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId182,
        restauranteId: restauranteId41,
        nombre: "Burrito de Pastor",
        descripcion: "Tortilla de harina rellena de pastor, queso y pico de gallo.",
        precio: 85,
        imagen: "https://th.bing.com/th/id/OSK.fd31685bbcf068c4a58e25ea4b4d6c05?w=200&h=126&c=7&rs=1&qlt=80&o=6&cdv=1&pid=16.1",
        disponible: true,
        etiquetas: ["burritos", "pastor"],
        categoriaMenu: "Burritos y Gringas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId183,
        restauranteId: restauranteId41,
        nombre: "Gringa Campechana",
        descripcion: "Queso derretido, pastor, bistec, etc. en tortilla de harina.",
        precio: 50,
        imagen: "https://oscarburgers.com/wp-content/uploads/2020/07/IMG_5582_campechana-min.jpg",
        disponible: true,
        etiquetas: ["gringas", "bistec"],
        categoriaMenu: "Burritos y Gringas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    // RESTAURANTE: Casa María Lombardo (restauranteId27)
    {
        _id: productoId184,
        restauranteId: restauranteId42,
        nombre: "Mole Coloradito con Pato",
        descripcion: "Pato confitado en mole coloradito tradicional.",
        precio: 280,
        imagen: "https://cdn.tasteatlas.com/images/dishes/c864c12c88f04a879dd6cd42143d314b.jpg",
        disponible: true,
        etiquetas: ["oaxaquena", "gourmet", "mole"],
        categoriaMenu: "Platos Principales",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId185,
        restauranteId: restauranteId42,
        nombre: "Sopa de Calabaza de Castilla",
        descripcion: "Crema suave de calabaza con semillas tostadas.",
        precio: 110,
        imagen: "https://th.bing.com/th/id/R.c53ee18b7d89741c10da20720e203cda?rik=ybPUE335unf58g&pid=ImgRaw&r=0",
        disponible: true,
        etiquetas: ["sopa", "gourmet", "vegetariano"],
        categoriaMenu: "Entradas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId186,
        restauranteId: restauranteId42,
        nombre: "Tacos de Lechón Confitado",
        descripcion: "Tacos de lechón crujiente con adobo de chile de árbol.",
        precio: 190,
        imagen: "https://tse1.mm.bing.net/th/id/OIP.uC5g_mGXs574pk7M1lTXPQHaE7?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        disponible: true,
        etiquetas: ["tacos", "gourmet"],
        categoriaMenu: "Entradas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId187,
        restauranteId: restauranteId43,
        nombre: "Espresso Doble",
        descripcion: "Doble shot de café de altura oaxaqueño.",
        precio: 40,
        imagen: "https://media.licdn.com/dms/image/D4D12AQGbE6w3TEFoDA/article-cover_image-shrink_720_1280/0/1675113527815?e=2147483647&v=beta&t=n1hBhUjSHR1nrLRDTYzUZ2-HJBg0n5a99riynk13Jz8",
        disponible: true,
        etiquetas: ["café", "bebidas"],
        categoriaMenu: "Café de Especialidad",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId188,
        restauranteId: restauranteId43,
        nombre: "Moka Frappé",
        descripcion: "Bebida fría a base de café, chocolate y crema batida.",
        precio: 70,
        imagen: "https://scontent.fmtt1-2.fna.fbcdn.net/v/t39.30808-6/561491876_25399751136329444_5397971996459964131_n.jpg?_nc_cat=108&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeEWuaIMc_vQbkipL7TP9m-HPQYvT4qvFRc9Bi9Piq8VF5INDkUz6oVBAZ33abSiDvtgj1PUH_C38qkIOfafWYpx&_nc_ohc=uZogzHrqFswQ7kNvwEU0XnN&_nc_oc=Adn3s7AUMM6eoJatnZ2BXuVAgECTN0y4mHjPr9CEsgy7rJwfU3Y12Vx65LBkAsXx-THXRHUu6X4PyOwdER7txExl&_nc_zt=23&_nc_ht=scontent.fmtt1-2.fna&_nc_gid=DHM4J61AKk43k2KZxMfj6w&oh=00_AfheiY7OpZCXn2ZQLjjm9o79sUe9bXKKhXBFQdke1gGwVg&oe=692C961D",
        disponible: true,
        etiquetas: ["bebidas", "frío"],
        categoriaMenu: "Bebidas Frías",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId189,
        restauranteId: restauranteId43,
        nombre: "Croissant de Jamón y Queso",
        descripcion: "Croissant recién horneado, relleno de jamón y queso.",
        precio: 55,
        imagen: "https://www.togniscafe.com/wp-content/uploads/2023/01/togniscafe-_0009_CROISSANT-JAMON-Y-QUESO.jpg",
        disponible: true,
        etiquetas: ["panaderia", "salado"],
        categoriaMenu: "Panadería Salada",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId190,
        restauranteId: restauranteId44,
        nombre: "Chiles en Nogada",
        descripcion: "Chiles poblanos rellenos, bañados en salsa de nuez y granada.",
        precio: 250,
        imagen: "https://www.maspormas.com/img/2016/05/ennogada.jpg",
        disponible: true,
        etiquetas: ["gourmet", "especialidad"],
        categoriaMenu: "Platos Estacionales",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId191,
        restauranteId: restauranteId44,
        nombre: "Pozolero",
        descripcion: "Pozole mexicano muy sabroso.",
        precio: 120,
        imagen: "https://tse1.mm.bing.net/th/id/OIP.UH9AO6BgObvcHfsP81pT1AHaEK?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        disponible: true,
        etiquetas: ["sopa", "gourmet"],
        categoriaMenu: "Entradas y Sopas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId192,
        restauranteId: restauranteId44,
        nombre: "Baguette cubana",
        descripcion: "Baguette cubano con diferentes carnes y reducción de balsámico.",
        precio: 290,
        imagen: "https://tse2.mm.bing.net/th/id/OIP.U3u82vCZrS_UfWpID_RidQHaE7?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        disponible: true,
        etiquetas: ["especialidad", "gourmet"],
        categoriaMenu: "Platos Fuertes",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    // RESTAURANTE: El Nido Billar Resto-Bar (restauranteId30)
    {
        _id: productoId193,
        restauranteId: restauranteId45,
        nombre: "Alitas Búfalo 10 pzs",
        descripcion: "Alitas de pollo crujientes bañadas en salsa búfalo picante.",
        precio: 130,
        imagen: "https://tse4.mm.bing.net/th/id/OIP.AGGjptFqQYj8VfoDz-UPBQHaEO?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        disponible: true,
        etiquetas: ["alitas", "rapida", "picante"],
        categoriaMenu: "Especialidades",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId194,
        restauranteId: restauranteId45,
        nombre: "Hamburguesa El Nido",
        descripcion: "Carne de res, tocino, queso y aderezo especial de la casa.",
        precio: 95,
        imagen: "https://www.cnature.es/wp-content/uploads/2021/12/hamburguesa-con-guacamole.jpg",
        disponible: true,
        etiquetas: ["hamburguesa", "rapida"],
        categoriaMenu: "Hamburguesas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId195,
        restauranteId: restauranteId45,
        nombre: "Papas Gajo con Queso",
        descripcion: "Papas gajo sazonadas, servidas con queso cheddar fundido.",
        precio: 70,
        imagen: "https://tse3.mm.bing.net/th/id/OIP.GjXsYRIwOrHaVrqZHvRRsQHaE8?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        disponible: true,
        etiquetas: ["entradas", "rapida"],
        categoriaMenu: "Entradas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId196,
        restauranteId: restauranteId46,
        nombre: "Cóctel de Camarón Grande",
        descripcion: "Camarones cocidos en salsa catsup preparada con aguacate y cebolla.",
        precio: 180,
        imagen: "https://tse3.mm.bing.net/th/id/OIP.on0J0nKKwyhsaD2nQUxwSgAAAA?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        disponible: true,
        etiquetas: ["mariscos", "coctel", "fresco"],
        categoriaMenu: "Cócteles",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId197,
        restauranteId: restauranteId46,
        nombre: "Tostadas de Pulpo",
        descripcion: "Tostadas crujientes con pulpo, mayonesa y aguacate.",
        precio: 75,
        imagen: "https://cdn.kiwilimon.com/recetaimagen/36309/44882.jpg",
        disponible: true,
        etiquetas: ["mariscos", "tostadas"],
        categoriaMenu: "Entradas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId198,
        restauranteId: restauranteId46,
        nombre: "Caldo de Camarón",
        descripcion: "Caldo caliente con camarones y verduras.",
        precio: 95,
        imagen: "https://cdn.kiwilimon.com/clasificacion/3881/3881.jpg",
        disponible: true,
        etiquetas: ["caldo", "mariscos"],
        categoriaMenu: "Calderos",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId199,
        restauranteId: restauranteId46,
        nombre: "Mojarra Frita",
        descripcion: "Deliciosa mojarra frita acompañada con ensalada y papas.",
        precio: 150,
        imagen: "https://recetasdehonduras.org/wp-content/uploads/2022/03/Receta-de-Mojarra-Frita-con-Tajadas-e1647035505472-1024x852.jpg",
        disponible: true,
        etiquetas: ["pescado", "platillo"],
        categoriaMenu: "Platos Fuertes",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId200,
        restauranteId: restauranteId47,
        nombre: "Enchiladas suizas",
        descripcion: "Tortilla de maiz con salsa de jitomate, con pollo deshebrado, crema y queso.",
        precio: 80,
        imagen: "https://www.recipeworkbook.com/wp-content/uploads/2021/08/enchiladas-verdes2-1024x683.jpg",
        disponible: true,
        etiquetas: ["desayuno", "mexicana"],
        categoriaMenu: "Desayunos",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId201,
        restauranteId: restauranteId47,
        nombre: "Mole de caderas",
        descripcion: "Mole de caderas.",
        precio: 65,
        imagen: "https://www.gastrolabweb.com/u/fotografias/m/2020/11/10/f1280x720-4970_136645_5050.jpg",
        disponible: true,
        etiquetas: ["sopa", "mexicana"],
        categoriaMenu: "Sopas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId202,
        restauranteId: restauranteId48,
        nombre: "Enchiladas Verdes de Pollo",
        descripcion: "Enchiladas de maíz bañadas en salsa verde de tomatillo, con pollo y queso fresco.",
        precio: 85,
        imagen: "https://tse4.mm.bing.net/th/id/OIP.LEsBoGuCxIFMGXr_nmxh9QAAAA?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        disponible: true,
        etiquetas: ["antojitos", "mexicana"],
        categoriaMenu: "Comida Mexicana",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId203,
        restauranteId: restauranteId48,
        nombre: "Pastel Corazón de Chocolate",
        descripcion: "Rebanada de pastel de chocolate con crema de mantequilla, ideal para regalar.",
        precio: 170,
        imagen: "https://images.aws.nestle.recipes/resized/2024_10_18T12_36_32_badun_images.badun.es_pastel_corazon_de_chocolate_con_nata_y_fresas_1290_742.jpg",
        disponible: true,
        etiquetas: ["postre", "tematico", "dulce"],
        categoriaMenu: "Postres Temáticos",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId204,
        restauranteId: restauranteId48,
        nombre: "Brownie Vegano",
        descripcion: "Brownie de cacao sin lácteos ni huevo, ideal para veganos.",
        precio: 55,
        imagen: "https://treurer.com/wp-content/uploads/Brownie-vegano-de-frambuesa-y-chocolate.jpg",
        disponible: true,
        etiquetas: ["postre", "vegano"],
        categoriaMenu: "Postres Temáticos",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId205,
        restauranteId: restauranteId49,
        nombre: "Sopa de Guías de Calabaza",
        descripcion: "Sopa tradicional con flor y guías de calabaza.",
        precio: 140,
        imagen: "https://casaoaxacaelrestaurante.com/wp-content/uploads/2025/11/Sopa_de_frijolon_Casa_Oaxaca_El_Restaurante_1.jpg",
        disponible: true,
        etiquetas: ["oaxaquena", "gourmet", "sopa"],
        categoriaMenu: "Entradas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId206,
        restauranteId: restauranteId49,
        nombre: "Mole Negro de la Casa",
        descripcion: "Receta ancestral de mole negro con pierna de guajolote.",
        precio: 320,
        imagen: "https://casaoaxacaelrestaurante.com/wp-content/uploads/2025/11/Short_rib_Casa_Oaxaca_El_Restaurante_1.jpg",
        disponible: true,
        etiquetas: ["oaxaquena", "mole", "gourmet"],
        categoriaMenu: "Platos Fuertes",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId207,
        restauranteId: restauranteId49,
        nombre: "Ensalada de Nopales y Queso Fresco",
        descripcion: "Nopales tiernos con aguacate, jitomate y queso de rancho.",
        precio: 110,
        imagen: "https://casaoaxacaelrestaurante.com/wp-content/uploads/2025/11/Tostada_de_insectos_Casa_Oaxaca_El_Restaurante_3.jpg",
        disponible: true,
        etiquetas: ["saludable", "oaxaquena"],
        categoriaMenu: "Entradas",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId208,
        restauranteId: restauranteId50,
        nombre: "Pulpo Mayordomo",
        descripcion: "Pulpo servido sobre mole negro o rojo, acompañado de arroz y plátano macho frito.",
        precio: 295,
        imagen: "https://th.bing.com/th/id/R.4e7ed672074df665cb2d78724bbfbf73?rik=8u6FannvK%2fKxGw&riu=http%3a%2f%2flacocinaesvida.com%2fwp-content%2fuploads%2f2020%2f08%2fARROZ-NEGRO-CON-PULPO-2.jpg&ehk=2cpTkYEXM%2brwVHjLKm7tP8Pg3y4TtU5QWcB3KE70qXM%3d&risl=&pid=ImgRaw&r=0",
        disponible: true,
        etiquetas: ["especialidad", "mole", "mariscos"],
        categoriaMenu: "Especialidades de la Casa",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId209,
        restauranteId: restauranteId50,
        nombre: "Mole con Pollo",
        descripcion: "Pollo bañado en el clásico mole negro Mayordomo, servido con arroz.",
        precio: 160,
        imagen: "https://img.freepik.com/premium-photo/mole-con-pollo-y-arroz-rojo-con-verduras-comida-tipica-mexican_517131-168.jpg?w=2000",
        disponible: true,
        etiquetas: ["oaxaquena", "mole"],
        categoriaMenu: "Platos Fuertes",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId210,
        restauranteId: restauranteId50,
        nombre: "Chiles en Nogada",
        descripcion: "Chile poblano relleno de carne y fruta, cubierto con salsa de nuez.",
        precio: 240,
        imagen: "https://img.freepik.com/premium-vector/chiles-en-nogada-typical-food-mexico-from-puebla-with-walnut-chile-pomegranate_1278344-2299.jpg?w=2000",
        disponible: true,
        etiquetas: ["especialidad", "gourmet"],
        categoriaMenu: "Platos Estacionales",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
]);