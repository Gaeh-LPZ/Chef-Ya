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
        imagen: "https://scontent.fmtt1-2.fna.fbcdn.net/v/t39.30808-6/543388252_1368882341906094_3696587340217621891_n.jpg?_nc_cat=109&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeHN4SCrNNaDZOdUdBOzXYJruzUj09KUG0y7NSPT0pQbTBLqq4NPYfHFdT3Ctvn6p43imFx23WQSJ3vK6C5ed8bJ&_nc_ohc=09iw3jxFWNEQ7kNvwGCRBi5&_nc_oc=AdlCuG7Imswz0IH2UN2JEBpaga7DOnJwy7V0Oj3SkspZZPPlL7cjO_ilRl2FtXSjfFRwPCdVx-l7m5L1FLe19Kld&_nc_zt=23&_nc_ht=scontent.fmtt1-2.fna&_nc_gid=dJJ09RlBXIjZYiDBhZY_ZA&oh=00_Afj2_AhJ1D40iRCrhFuD7LUTc0mTgeYfdGhpND4VkI5pEQ&oe=692B7D9C",
        imagen_banner: "https://scontent.fmtt1-2.fna.fbcdn.net/v/t39.30808-6/475134478_4005353956353405_6339183684181688670_n.jpg?_nc_cat=106&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFrM3hKjfPFMFJY75lXyMONWG4lF8kkVjJYbiUXySRWMs25HbcGh8yiBaJ9rLtgrDmFXQjvGJseIf76aGOFmIsM&_nc_ohc=3ChUY1drJFcQ7kNvwF6a5nj&_nc_oc=AdkStyVUKxfRbdcdACa0H-CG_afdOZKeAzEgZiYfedmrbckf547EnCGTpJQik2hFG47OWMcA8PdSL2iweR-TWCzK&_nc_zt=23&_nc_ht=scontent.fmtt1-2.fna&_nc_gid=bk-88JLUVMiQfJqubDP5lw&oh=00_AfjVlK7BQCretDOJDS6I8JVUFV8ro7g-6hoJtKV-zbfhHw&oe=692B77D1",
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
        url_localizacion: "https://maps.app.goo.gl/drZGYawpSUpPx7a76",
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
        imagen: "https://instagram.fmtt1-1.fna.fbcdn.net/v/t51.2885-19/353674205_1449337112488369_5785366860583225745_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby41NTQuYzEifQ&_nc_ht=instagram.fmtt1-1.fna.fbcdn.net&_nc_cat=101&_nc_oc=Q6cZ2QHJYuR__rasGaGmrGn0OTAMvW8duxwfWae524Imxgn3xhsfyyLUuMGEbpNGn0iKac9fOsYWYPkajKtI_FOPsoG9&_nc_ohc=yRc5DI_1fAwQ7kNvwEdHh6d&_nc_gid=c93seKiB6bG6G2fsJtfs9A&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfjdUh2U3R1fOvsVgXSv22zAbDJTa_xVmlDQECnvlucjPw&oe=692B87FC&_nc_sid=8b3546",
        imagen_banner: "https://scontent.fmtt1-1.fna.fbcdn.net/v/t39.30808-6/490615095_1213685717427102_5138725601744396002_n.jpg?_nc_cat=101&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeHbRDnj7UzqpVNwoCBzaXW2wf5WWiAe4eDB_lZaIB7h4Czwt1eUYjI-hBXCWoHJRgUDd5dJvi2xGlRCUmOrYaLL&_nc_ohc=cp9ra_YGJEQQ7kNvwGQIeAD&_nc_oc=AdlAnp8xMmj0IDmMB3E4672Yo8WsQXuaXyBpbHS6iNPp-iYwmnd4vMWK-KywPSBqqJ5fMVcKLiHgBzXjrthXGFVD&_nc_zt=23&_nc_ht=scontent.fmtt1-1.fna&_nc_gid=9Rw4YJVcDOlJakX3qYnbyQ&oh=00_AfhwT14NClG3fyjVwm-I4sWP-1PSa9gbVVxK--ULY-p6Gw&oe=692B5B65",
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
        url_localizacion: "https://maps.app.goo.gl/Lu6c6E1yFSePeg3r5",
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
        imagen: "https://scontent.fmtt1-2.fna.fbcdn.net/v/t39.30808-6/469083628_1355359252338638_1176721163478512397_n.jpg?_nc_cat=108&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEHFXqWmwdmqaGBK3ncXb5nWnPt0ldESERac-3SV0RIRD8QWgk1AOwvctWcCtHWJcN5ro4vxS0hLPHX3VKKA95p&_nc_ohc=uniCMK2Z6M0Q7kNvwFehWib&_nc_oc=Adl20riakkL-iLRUe58lU4ef-mVl9SoeEGRpV_xkQ9y9YNNFOG4kFEySF02b-jZ34xxx7uHGPx_3hhR9nWWqWQL9&_nc_zt=23&_nc_ht=scontent.fmtt1-2.fna&_nc_gid=Cfx4h8tNF_bte_Cn7SUMng&oh=00_Afj9GnkHXhET5bcyQC3P-85fb5dt6zZhAzy2LS7w7YppdA&oe=692B8E3C",
        imagen_banner: "https://scontent.fmtt1-1.fna.fbcdn.net/v/t39.30808-6/489547500_1459531885254707_8699029739171764239_n.jpg?_nc_cat=103&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeEbhh8fvqKb4760Pt2I6V7cOUtA3jr3Aw85S0DeOvcDD6zffXjlbh2p7AL2xqsVATY-UAGhLNbdT5teGDnJo-Jk&_nc_ohc=adjIWltnrXgQ7kNvwEUmhCJ&_nc_oc=AdkLrwK0EZtwsXwXmCmiCotIQXF9lW24OO4E18YfHi--nBtuWm8piURaI6cuSDPC_h-egZF0ffiWtL3O9UNpfkYZ&_nc_zt=23&_nc_ht=scontent.fmtt1-1.fna&_nc_gid=fPOunfENuPlJCxtWKX0Z4w&oh=00_AfiDrc9bacfWS5GPB_5npdSUMSEd_UJCSaZlSl5y7S6pbw&oe=692B8DB5",
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
        url_localizacion: "https://maps.app.goo.gl/f21za3rS2tez4moD8",
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
        imagen: "https://scontent.fmtt1-2.fna.fbcdn.net/v/t39.30808-6/310352956_539922184801702_3362808414139704421_n.jpg?_nc_cat=100&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGD4C5FV0dfJ1MJUIpsi76aVBTnp25ahqdUFOenblqGp17l8x-EynX72IjeShIqhtWcrxNgn38F7ZPJjCMAJHqt&_nc_ohc=9CCTv8XPnOYQ7kNvwHZEdWd&_nc_oc=AdlXeBspFsGfjjbh_dZhWyoRI2I0_VBTFqBf8mxCnno_PFluDfFxuaIQCxqOaGKin-yatMAJn6-Vl47a-mjQo0ha&_nc_zt=23&_nc_ht=scontent.fmtt1-2.fna&_nc_gid=MVVVvOxwwuMTBweK12R3ag&oh=00_AfhiwPhrbVEHDupbnOeBgoXIOBe1ybYJNsIphj_oYPQiWg&oe=692C9C86",
        imagen_banner: "https://scontent.fmtt1-1.fna.fbcdn.net/v/t39.30808-6/491359789_1259542342839679_7235319448134460668_n.jpg?_nc_cat=105&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeHJynsj4CqhmRIPs8Xrc_mu2ucVnozIRJra5xWejMhEmiHoKvInY417IDC-ZvgRdov1tsTQN7_ht6k1CoxudOvn&_nc_ohc=t86nKqyrY9wQ7kNvwE-3mZ0&_nc_oc=AdnGqnhW01dh5OP5azvhJeiS1gHsGBrmrI442XIAqllcu8u8feonwN9FKrxb9CK3PIKZ-5ibvIWSZXkvXM0Cp-Ap&_nc_zt=23&_nc_ht=scontent.fmtt1-1.fna&_nc_gid=jT9ymBlYgcC9IMAnYw3IuQ&oh=00_AfhgOTeY902tti2s_ZBarQJAavwEayZmaXg9OzeAKwKndQ&oe=692CBF27",
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
        url_localizacion: "https://maps.app.goo.gl/P2RkqytUU3jCthpy6",
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
        imagen: "https://scontent.fmtt1-1.fna.fbcdn.net/v/t39.30808-6/307756056_148936324498992_1249334688067993949_n.jpg?_nc_cat=111&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHMAcQTsUszvqVGRG1hNpp7-h4Sjkuh9yT6HhKOS6H3JE_oTOGksHyefGkeNNxcsCBORVhpZoB50Vz9QDA67Rpf&_nc_ohc=51unIo1BojcQ7kNvwFLm9Xw&_nc_oc=Adm8P4nwyCOoboC4skJrzKQ9mu5p-jKot9r3izihTRxWWEcGdA7W7YpiQ-30xe7wiTfdYTIt0DBTGWM_UgYNNum-&_nc_zt=23&_nc_ht=scontent.fmtt1-1.fna&_nc_gid=mo01EuUZjW1bbIQDJwD-rQ&oh=00_AfgFmk1wZ1m09aGb-mLF1odhYJquWdU3rrwLZm_ueb66aw&oe=692CC3D9",
        imagen_banner: "https://scontent.fmtt1-1.fna.fbcdn.net/v/t39.30808-6/517406374_10161386064780817_253588518141310453_n.jpg?_nc_cat=103&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=cf85f3&_nc_eui2=AeG2AVrMRsKuLpSZH7HuleZD9zNBmBDPjn_3M0GYEM-Of4h1rOMFuOyLFDWjONsTlUnmqLgF7-sk0i9ItWKeZgJo&_nc_ohc=vPaucweJyuwQ7kNvwGcjdzI&_nc_oc=AdnxJ8z1iCXAtJ3RfXykPvXuGzctnXYg9zfpIDZQvYhLzgPxYltlR77R7CQg-Hc7M44Z4ELwvtj1aidTakE434l6&_nc_zt=23&_nc_ht=scontent.fmtt1-1.fna&_nc_gid=v1E8qhnpVWIs05eXZpdmSw&oh=00_AfhBJYz819eqRpRf3Fzzkt2kwJ5YFe4-JqhH0Qs9ZvwCXg&oe=692CCCE0",
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
        url_localizacion: "https://maps.app.goo.gl/65eim7Fm9Vmm2Aqm7",
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
        imagen: "https://scontent.fmtt1-1.fna.fbcdn.net/v/t39.30808-6/360088938_757353896399402_9148923962854924815_n.jpg?_nc_cat=102&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFGfb1fJWOq1AlTLP-0SRJvmhjG7UFz0Y2aGMbtQXPRjblrwhJGfOEGyYb4UqzrKOAv2GpvDfe0hA_PDsk-NY_c&_nc_ohc=2fMb2Wb5NA0Q7kNvwFqe8vO&_nc_oc=Adl-mF7JwdiG4zpY_7ub1rSTp5tcDYUb3zcBNRuSXS6pMWRykDFG0rS-KUws89okBHgNUq7xQHhtAuAUAn6phV4U&_nc_zt=23&_nc_ht=scontent.fmtt1-1.fna&_nc_gid=ggTHPNTWk2K9TO1coD9wYw&oh=00_AfjvoGMRIa2O0m35f77bQITkcwU-i4l9BEIRuOTp8uRdFA&oe=692CFC41",
        imagen_banner: "https://scontent.fmtt1-2.fna.fbcdn.net/v/t39.30808-6/562258934_1438266064974845_7417603405089222433_n.png?_nc_cat=108&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeF_13vnXt_lRMG5Mg4wYkHr-LZ5oupXxTD4tnmi6lfFMA_TT-DZ3vILFo-5qjFtfNARNmd1GMdiUC6SPdn2fMeZ&_nc_ohc=2sYx85AKhYIQ7kNvwFaAL9R&_nc_oc=Adnh8HpFeXEno0rUzeHUqfmlnSohMqnjW1HNqdFocO8uF44MkVIShcEjclORwVW1x3oqfU0AyVh2x2DMJnZh4wkJ&_nc_zt=23&_nc_ht=scontent.fmtt1-2.fna&_nc_gid=7pCAZVIeaIeyff28-TNfRg&oh=00_AfimFHLSq-jMWRgvsdugkWfESfmk0EXkP_TIGd0X9DICuw&oe=692D1E9F",
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
        url_localizacion: "https://maps.app.goo.gl/sppQb9mJsYN66N5n7",
        activo: true,
        creadoEn: ahora,
        actualizadoEn: ahora
    },

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
        imagen: "https://scontent.fmtt1-2.fna.fbcdn.net/v/t39.30808-6/565661875_1396256009168339_534257186511305419_n.jpg?stp=dst-jpg_s590x590_tt6&_nc_cat=106&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEW_MwKsVth52Y6RAFl-FcmY7F1qctUAcpjsXWpy1QBymeKJRfDPg3kxDRU9wD-Ox3zFahe96H2r4TLyo9buSqg&_nc_ohc=r2EyQ0layKwQ7kNvwGGef9U&_nc_oc=Adl_1Trn8ecRHn4qQtlylpv4zxZgFPQ1AgnAzQY4s0sfkJcCzmubc4KsO2M4pWlEf3kNbzFGrrAAwpoMUyONgHfW&_nc_zt=23&_nc_ht=scontent.fmtt1-2.fna&_nc_gid=1zlPAlLjfW9ou5it0CYr0g&oh=00_AfjuOzvcFfTehzy20-aBNTq0vlsopBlCV7qaHwo5UfgJyg&oe=692C9208",
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
        imagen: "https://scontent.fmtt1-1.fna.fbcdn.net/v/t39.30808-6/571132538_1222224126609655_5607081734525584693_n.jpg?stp=dst-jpg_s590x590_tt6&_nc_cat=103&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFeyV1Y7zlpNRsSTcmXPcEZJ9NZMrnlNgsn01kyueU2C7XsOfWRudOxOa2056XnZRH8EHByXxX1ft7hugCBhPNy&_nc_ohc=665z_57U1WkQ7kNvwEfaFrd&_nc_oc=Adme1lq6pi1T_Uc0HQneBCojl39NlDgcBaKZLrfw68j15J5tbsD6EOUCTqgQ34u5-jtvXFpklL4QQs6EfObUBdVK&_nc_zt=23&_nc_ht=scontent.fmtt1-1.fna&_nc_gid=Hi9Q8OLKOCPVkiVRcrcNOQ&oh=00_Afj1-LLPeu93m3AZP_cacdjaK1HonT8HnIIiAKKiYKQGSg&oe=692C9BEA",
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
        imagen: "https://scontent.fmtt1-1.fna.fbcdn.net/v/t39.30808-6/586861944_1269709231863831_2176279076709108464_n.jpg?stp=cp6_dst-jpg_p180x540_tt6&_nc_cat=101&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeE9hnj8r6nfjTsjw0SikVi8oqBieTBu-rqioGJ5MG76uiALVH_2BYASFiDQG8C17pjoDoCimiIMaWI8zu-6GYLS&_nc_ohc=FeWWlsVSfr4Q7kNvwGxtBa2&_nc_oc=AdlPa_-JDiNXhasx3FG3IWbLroK72dU8jyjw6nrnBLqNEYvr_CLZ2e27uc5cGaivo7QH40jUSW__bT-gTZYYULpL&_nc_zt=23&_nc_ht=scontent.fmtt1-1.fna&_nc_gid=ajhoOzcdqCb7ZocPtIR6_A&oh=00_AfiVY54JBOSC1WBrPMGsfCf6yYDOHhSt4qJeTLfWvoDvBA&oe=692CC446",
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
        imagen: "https://scontent.fmtt1-1.fna.fbcdn.net/v/t39.30808-6/585054874_1429109652551558_2992535831056882096_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=105&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHG-4z1F0PxD32HGsQ7tG4hl5ZJ0QctigeXlknRBy2KB_JC1skjNKzOc4FEko2KSigqIT8Pn-hQQSAMQskez54m&_nc_ohc=iycCP-X7dyoQ7kNvwEwoVH8&_nc_oc=AdkJBoq949ribjF8Rc34erCJ8RYr_9AbQnNASzN8rB_RCaZSCEZJ_AUhUpf8mc9lW39LO9TQSdVO9Nz3dT4G-ewY&_nc_zt=23&_nc_ht=scontent.fmtt1-1.fna&_nc_gid=ocDHVE5GPN9wmEDH9mHKcA&oh=00_AfiAzXmEYHbMppPVwM1z9QNyJDECXT6W-TMwNR6qjjA4AA&oe=692CB3CE",
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
        imagen: "https://scontent.fmtt1-1.fna.fbcdn.net/v/t39.30808-6/584892449_122131656932980473_8195081178375931383_n.jpg?stp=dst-jpg_s590x590_tt6&_nc_cat=111&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeFGAd_1FO2Xp2V4OIjtosfO5g8lqwBzQ6fmDyWrAHNDp11rBrAAgyC4H4S1O1zJt10kuW_Ot-TmDE6ULVnEdSDQ&_nc_ohc=8S-zenHZAogQ7kNvwHt012G&_nc_oc=AdknmcnKfpg2uuMGyhKCv4wwD-yky0OixkrvjAJ6ioSYv5gt1YRIbzt92UQaHOYECfZtfi-c1M0EMd8JtcePQk67&_nc_zt=23&_nc_ht=scontent.fmtt1-1.fna&_nc_gid=RxY0EECNt6iQyRtLeGixwA&oh=00_AfgoKo5Ja8lxPxJDSq4uDdhWD5DbTIbaC3-urR_W8il25A&oe=692C988F",
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
        imagen: "https://scontent.fmtt1-2.fna.fbcdn.net/v/t39.30808-6/544747835_1358502469217853_4868194576663893643_n.jpg?stp=c0.84.1024.1024a_dst-jpg_s206x206_tt6&_nc_cat=109&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=714c7a&_nc_eui2=AeEOUx2UFj2CQE1rhHJIOoiU2AZklKXuhXTYBmSUpe6FdBswllDr17985Zr9s3UZicB95akByVEuPp6R-V3lpTJO&_nc_ohc=gy8sxxMXbLsQ7kNvwH2QJ39&_nc_oc=Adks2XO6DSmNb-oeeIRgnw79SBfoZK-11gWRePhvnj4D4SKKkvBFYtE7qjjiuaAhQWY2KcgaRuqZpMD-uKEo3tea&_nc_zt=23&_nc_ht=scontent.fmtt1-2.fna&_nc_gid=H_AqMUvzekDr_pqemGf7pQ&oh=00_AfiZdJPzQoiCLhjk_Jht9-b43nRUbu0r4erIpetxoDsfsA&oe=692B82B3",
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
        imagen: "https://scontent.fmtt1-2.fna.fbcdn.net/v/t39.30808-6/552290856_1370922701309163_2240168048156357972_n.jpg?stp=c0.89.1080.1080a_dst-jpg_s206x206_tt6&_nc_cat=108&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=714c7a&_nc_eui2=AeHxuDdFYG5YPFG2kp63jJFLsjgBWmeap3eyOAFaZ5qnd2HB65KN1_Sq1yYfHFTNqtAjVFaacjMa8okwb2u2hitr&_nc_ohc=h0cCCTy3tzIQ7kNvwEM2Wa9&_nc_oc=AdmsU5B3uuNNDN2ZsPk5TLhMq5VLsxqlo4PsjC-qW65sCr8yrokEYp2D61HZxfGEZ2QlFghTv62foOuZkuKGivXb&_nc_zt=23&_nc_ht=scontent.fmtt1-2.fna&_nc_gid=2yrDLNwdP2gVtuaWUPcAeQ&oh=00_AfjwjJGHo6FI0goIQWQBFW9PbRSaFz3WwgjmgC_MbkjGOQ&oe=692B8DCD",
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
        imagen: "https://scontent.fmtt1-1.fna.fbcdn.net/v/t39.30808-6/557613885_1377094734025293_7929748507192120673_n.jpg?stp=c0.89.1080.1080a_dst-jpg_s206x206_tt6&_nc_cat=102&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=714c7a&_nc_eui2=AeGY9R007ksCVbxFu6bO1lUpvGAP_hIQACa8YA_-EhAAJp6B0tUPXDTZ9yefthX419X4dE8gksZ3aajBjzIVMkE6&_nc_ohc=c5_ymdR8NGEQ7kNvwFy4SZ6&_nc_oc=Admgv5aqWj5TT2akcjPQjABgl4EZUA0pPbIeAAz9EbK6aYulZbbRD_ntzFasVV43lknEaa6WMRQjPSZHdrX828Wc&_nc_zt=23&_nc_ht=scontent.fmtt1-1.fna&_nc_gid=2yrDLNwdP2gVtuaWUPcAeQ&oh=00_AfjT_9JhROTyX1FJeoUlPFLcUYb1or-QfSZWgpiZVMW3ew&oe=692B83FA",
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
        imagen: "https://scontent.fmtt1-1.fna.fbcdn.net/v/t51.82787-15/542154487_18396868915139519_7436282517976842925_n.webp?stp=dst-jpg_tt6&_nc_cat=104&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFjNYxec6mW5pkFXuEB8e3Q5aplQ50WMoTlqmVDnRYyhDk3cCiMB2oJ7C8YoD4BBSMDZHgdYwxfyHz2wSs8I3Pe&_nc_ohc=q3slfUafK2IQ7kNvwEg2s3M&_nc_oc=AdmhNn3ZXWo2iQqzIhxxVWt7EfpTOa1sSqSNab2SqjScKxZmkH7Q9_BzzvIUBW1F-tizBA2BHrAXukt2a14WXMGh&_nc_zt=23&_nc_ht=scontent.fmtt1-1.fna&_nc_gid=_1BkQ-yYNZ_aSfrpEoi1-A&oh=00_Afj8NglRVyNo7IOzzGJzNDAM7nOEEt8ez8GmJSYc7G9huA&oe=692B710A",
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
        imagen: "https://scontent.fmtt1-1.fna.fbcdn.net/v/t51.82787-15/556978918_18401023228139519_7345451841225556117_n.jpg?_nc_cat=107&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGIPkteyvuDdCFZDFN4y8wCSCsXb5zCWldIKxdvnMJaV9LcuA4et4mpdtLwmDJRGqVMe3oFOQ_2rlwrh416WpWP&_nc_ohc=39ovWT2bVoQQ7kNvwEQM6zv&_nc_oc=AdlWFSr97j0YXSi-fGB58JVaClJkwlpTMzTyjb-En1kHdNtoR1yV4686hdEAZa_rR8u_ckOjvnjQKZzrB1cj7uPt&_nc_zt=23&_nc_ht=scontent.fmtt1-1.fna&_nc_gid=fKJD7KTgKTIco6d5DcC-Rg&oh=00_Afj7aYR_95AmWb7UeYsYTkZI0Tp5qoTOw7FDSOMXtmiBcQ&oe=692B972A",
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
        imagen: "https://scontent.fmtt1-1.fna.fbcdn.net/v/t51.82787-15/556978918_18401023228139519_7345451841225556117_n.jpg?stp=c0.119.1177.1177a_dst-jpg_s206x206_tt6&_nc_cat=107&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=714c7a&_nc_eui2=AeGIPkteyvuDdCFZDFN4y8wCSCsXb5zCWldIKxdvnMJaV9LcuA4et4mpdtLwmDJRGqVMe3oFOQ_2rlwrh416WpWP&_nc_ohc=39ovWT2bVoQQ7kNvwEQM6zv&_nc_oc=AdlWFSr97j0YXSi-fGB58JVaClJkwlpTMzTyjb-En1kHdNtoR1yV4686hdEAZa_rR8u_ckOjvnjQKZzrB1cj7uPt&_nc_zt=23&_nc_ht=scontent.fmtt1-1.fna&_nc_gid=CpY87McStjnIM7n6Xtw8Ww&oh=00_AfhOBPpoOlsi73n1NyVbQ5PdLrOkHqZIMWtOCz5RIR9sTg&oe=692B972A",
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
        imagen: "https://scontent.fmtt1-2.fna.fbcdn.net/v/t39.30808-6/494914816_1275374711256442_6560338473961097490_n.jpg?_nc_cat=100&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFaOBTXCUzhK63x0ZpO4tNpSFh2ApkG0CxIWHYCmQbQLM9A0Z78r7doR-dDPIwMhCWczupU8TWpXABEc_l4NPCx&_nc_ohc=TXHrjAGfNzcQ7kNvwGPu7Wf&_nc_oc=AdnU8l_1EEpB5PzvApAXS6wQsW9GCwuv-SXnFYCQxu8p7U_raYuGqLGiL_xFJijp7_Z4ew85rHg9_s22XR5Iqgjn&_nc_zt=23&_nc_ht=scontent.fmtt1-2.fna&_nc_gid=uiLxGSTlLd_LOQAqiSLkMA&oh=00_Afgv7Ey7PdnLduro29AjXiHTsNxaf8RKNnpDe4dijmvFoA&oe=692CC041",
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
        imagen: "https://scontent.fmtt1-2.fna.fbcdn.net/v/t39.30808-6/491368151_1269048061889107_6281906554508670365_n.jpg?_nc_cat=100&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHhmjeEtJ-QDpVZ45hXjodAztbws_T8gmDO1vCz9PyCYCa_MXnsI1kVM26d-aXXf7tMBw0gRAWpO7zrV25ZVE3w&_nc_ohc=VDjQLn6AALcQ7kNvwGWWXD0&_nc_oc=AdkeUkbdW6P5TZJx_f1ffItVUi-htat2nndr38r9FkNPtb9rF4cffd-eSvQVG5RklDNMl4MfqcECGC6SZgA8SDLV&_nc_zt=23&_nc_ht=scontent.fmtt1-2.fna&_nc_gid=LwPKNJGVWPqL-oAaK2i99w&oh=00_AfjZ_9omRZ593SdEWr8L5E4u0wbTqh1JXguz8DmSqb8_8A&oe=692CC8F7",
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
        imagen: "https://res.cloudinary.com/drvghzp9n/image/upload/v1764000525/caldo-camaron_t8u9v0.jpg",
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
        imagen: "https://scontent.fmtt1-1.fna.fbcdn.net/v/t39.30808-6/492144903_1263185079142072_1933947229953016198_n.jpg?_nc_cat=102&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHhYSnbKr9rdv7gL6b7aVpVMpyjZuWJ8iQynKNm5YnyJByVyDPw4HlxTLX-BNHhNpIXMOU3BLMhZJG-xmGKkaLL&_nc_ohc=nZIvTAnpcGUQ7kNvwFZestp&_nc_oc=AdnV8MGYFlELLtiXYVz2hW8-LrQQHjPUkNfscEbsn2GxQDOF8zWeXYh2zHn-5dD7gLeqeIC4PM5pio0RNqAbtEWT&_nc_zt=23&_nc_ht=scontent.fmtt1-1.fna&_nc_gid=KKwlplU6UHuZ0liWyDLRoA&oh=00_AfgdwtQpkC1RIn4cTYq6T0XKLed0xzs3QIjen0MbUbRZtQ&oe=692CD333",
        disponible: true,
        etiquetas: ["pescado", "platillo"],
        categoriaMenu: "Platos Fuertes",
        creadoEn: ahora,
        actualizadoEn: ahora
    },
    {
        _id: productoId200,
        restauranteId: restauranteId47,
        nombre: "Enchiladas suizas ",
        descripcion: "Tortilla de maiz con salsa de jitomate, con pollo deshebrado, crema y queso.",
        precio: 80,
        imagen: "https://scontent.fmtt1-2.fna.fbcdn.net/v/t39.30808-6/590204030_1442970414502899_876481006375151312_n.jpg?_nc_cat=100&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeESUX-Fb8opehn27a51to_56eLwTkpc5oTp4vBOSlzmhIGoaOHUsiyJwmeKxyfncL4ZXAc0-AljFBa8kv42tKnN&_nc_ohc=2d6T4dzvqh4Q7kNvwF7Li2A&_nc_oc=AdlUmdZEMg9R8XeV6kuoU-Wwb8E7I8issyLHzMeXRBdbpS97ulXSKJwMev01n0oYw-2uE6zDKyPOwhNIoKQvGWmx&_nc_zt=23&_nc_ht=scontent.fmtt1-2.fna&_nc_gid=8rQtgzv3GHIw0NzvgBt6pg&oh=00_AfhKKxN__d39FZ8nycmRnJNEIf68aoc5ehPg9ix71CER-g&oe=692CAAA8",
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
        imagen: "https://scontent.fmtt1-2.fna.fbcdn.net/v/t39.30808-6/565696114_1407505198049421_1307574979531519289_n.jpg?_nc_cat=108&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGEJI1aYl3YpFp0Gd94zEhp1m-FpNHW9i_Wb4Wk0db2L8K-DNbMqiWfb-E7KQgVREiW8Fdei6i6vSQzHEroKdRL&_nc_ohc=Le-nG0tAycMQ7kNvwEXcVTq&_nc_oc=AdmHnnrZOysjUaMWdX8phx_ss31_1wxZN4cnl9zrjbB9wP7lStGG66O8FsaojbOobKqfZkL14WVUb60glVmdt1T0&_nc_zt=23&_nc_ht=scontent.fmtt1-2.fna&_nc_gid=6eGpLkkXG6QTAdXD94tYYQ&oh=00_Afi0OziAvBwldIOJ-nGq26GjC_gRfLZelblrmtbUhqpfBg&oe=692CB652",
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
        imagen: "https://scontent.fmtt1-2.fna.fbcdn.net/v/t39.30808-6/486591782_1310890147359788_5375044176192740355_n.jpg?_nc_cat=106&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFoIqOai-RymYEyQgBiHyVAfDoCI0QQCoV8OgIjRBAKhaoIM0j_WYFuD3DDMBzKft4B5WqmYeyNliXBmJKnVXdf&_nc_ohc=D1xzzeZ-eIwQ7kNvwG0mZMR&_nc_oc=AdkxUcgYNUovxtlJBk2aYK8WGlofmm-JL_IA6O64qtz2B5IJTuDK3cTgUXp4Nbd2MRn8ElKoAX-zhtjwNLAYA5Nx&_nc_zt=23&_nc_ht=scontent.fmtt1-2.fna&_nc_gid=Fu_isMfLVoJPe2OrRVKqiQ&oh=00_Afj68aGpW3_GGZwxRQmut-lH0e8zbb6wRPKgw3M9YMgDaA&oe=692CD817",
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
        imagen: "https://scontent.fmtt1-2.fna.fbcdn.net/v/t39.30808-6/466666061_18082660174555936_3693178638738698039_n.jpg?_nc_cat=109&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHROne6mVLygaoxMidC26y5lfpt2JCXX5GV-m3YkJdfkbqrAogtWRShVHD1SixqWL4SJI5AINvFQp9M2w-mGpA-&_nc_ohc=QrEZJmzX8kIQ7kNvwGZAuJF&_nc_oc=Adm0YHk-6OZk2svwOylnlQSMU31HebwalClHHmOpOAHYeLzHOLwdmsmeA0XAkSid0bsuSUQ6cEkO6rcM1ST7aVs-&_nc_zt=23&_nc_ht=scontent.fmtt1-2.fna&_nc_gid=Wg85rT2_QIJ7NZhhpMXObw&oh=00_AfgG1Fah456yb2kbNaUs68I0_uf0ZkjxfiyYq-8SZ0hszQ&oe=692CE12F",
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
        imagen: "https://scontent.fmtt1-2.fna.fbcdn.net/v/t39.30808-6/488459364_1320071526441650_8082823079549829709_n.jpg?_nc_cat=109&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGT42eseXJ-PKZBtNpeCPlgPfMAwcEIdDw98wDBwQh0PNPDhB2zDaXTEwHJRUz4RkU4p6fd47MQeW7IItWEW-CF&_nc_ohc=kSEEck87FhsQ7kNvwHfX9id&_nc_oc=Adkd8jGk97jtZXjijiW5oHtVGTxXCciruU3debFDsm8TY-9aQxLfW0b9fsbvIWiOZ3CUEQI1jSPg4KE9LDvZWiLw&_nc_zt=23&_nc_ht=scontent.fmtt1-2.fna&_nc_gid=UNcVhAhtHN0lj9_UiNxOcQ&oh=00_AfhFQqkkPPIGoLhzJ1rDQpe2USmvFG5dliAURVlYnQgHRA&oe=692CCA4D",
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
        imagen: "https://scontent.fmtt1-2.fna.fbcdn.net/v/t51.75761-15/487310374_18034374062623046_3569615844122642741_n.webp?stp=dst-jpg_tt6&_nc_cat=110&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFs5A2uM17VqipLPsaj3OMnsg6_Zg-0M26yDr9mD7QzbnE6K9QBP0zb3KvcBpz0Ym8YFYByLC9N_Yy5lzpqjtwH&_nc_ohc=BXMqWz3Bb78Q7kNvwFWrulc&_nc_oc=AdlruaWAp4J9qzuGYIaP835fmgLK3mlkjJbUGN_BNX49u3bwlgfoZb_pWTgW4Nkx8Z5OjWKmnHh3aM4Xp3nA0ghG&_nc_zt=23&_nc_ht=scontent.fmtt1-2.fna&_nc_gid=Q24-wXS0JVN2aG-67i5dDg&oh=00_Afi07T41Az0ylzpehQN4apEqFQH5DpCWZhbsfgiuGfMgWQ&oe=692D2900",
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
        imagen: "https://scontent.fmtt1-2.fna.fbcdn.net/v/t51.82787-15/571106734_18058820645623046_7929960661016508367_n.webp?stp=dst-jpg_tt6&_nc_cat=100&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHB30z_NOozhczQV-S5Fm6MvVUh6JugYqe9VSHom6BipxIsnA95FV5Az32-IXZKchx-RUFWwgnOGDFBxb-f5CiO&_nc_ohc=JXJM8QqZj-YQ7kNvwH2Xxig&_nc_oc=Adk6an1kdolbcrGcrFCqyo-R4VMbiAPMYlsFVSjIpFBGsyYzligXblSZKJ-zjQqI9pHzrR7726SD3CP7e5leqcNZ&_nc_zt=23&_nc_ht=scontent.fmtt1-2.fna&_nc_gid=YuFIolUYhxcYs97IVNKTcw&oh=00_AfjL0cP3ATG7H6OSSUx5LPfGsZMZlQqqmqXGgZdBpUCELw&oe=692D0AAD",
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
        imagen: "https://scontent.fmtt1-1.fna.fbcdn.net/v/t51.82787-15/533190016_18049653890623046_7956269792653691918_n.webp?stp=dst-jpg_tt6&_nc_cat=104&_nc_cb=99be929b-ad57045b&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEekLCVtCEOYIHwR0ubRWvBNpJ1wXuqBMM2knXBe6oEw040KDtpnHtdjhdztgZJ7r6UUaEMMfjRx0jHmZAv3j-U&_nc_ohc=y0wwQJpVYEAQ7kNvwHQiLM1&_nc_oc=AdnlmlYLzKlaJVIAbmWSQmHwqacWBwqH4UtgrbutiAfNbCUF5hgVEe9WIedleehvX7Pahkm_ZEF95fK6lDpIzo4M&_nc_zt=23&_nc_ht=scontent.fmtt1-1.fna&_nc_gid=UtHRbK5CyJ0jW0P9ydXT0w&oh=00_AfiLrldRpeaPxmmYvVQX6iNYIUCrmY3sFTdz6bvvWd8NOA&oe=692D213B",
        disponible: true,
        etiquetas: ["especialidad", "gourmet"],
        categoriaMenu: "Platos Estacionales",
        creadoEn: ahora,
        actualizadoEn: ahora
    },

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