const dbChef = db.getSiblingDB('chefya');

const ahora = new Date();

// =====================
// IDs
// =====================

const usuarioId1 = new ObjectId();
const usuarioId2 = new ObjectId();
const usuarioId3 = new ObjectId();
const usuarioId4 = new ObjectId();
const usuarioId5 = new ObjectId();

const categoriaId1 = new ObjectId();
const categoriaId2 = new ObjectId();
const categoriaId3 = new ObjectId();
const categoriaId4 = new ObjectId();
const categoriaId5 = new ObjectId();

const restauranteId1 = new ObjectId();
const restauranteId2 = new ObjectId();
const restauranteId3 = new ObjectId();
const restauranteId4 = new ObjectId();
const restauranteId5 = new ObjectId();

const productoId1 = new ObjectId();
const productoId2 = new ObjectId();
const productoId3 = new ObjectId();
const productoId4 = new ObjectId();
const productoId5 = new ObjectId();
const productoId6 = new ObjectId();
const productoId7 = new ObjectId();
const productoId8 = new ObjectId();
const productoId9 = new ObjectId();
const productoId10 = new ObjectId();

const pedidoId1 = new ObjectId();
const pedidoId2 = new ObjectId();
const pedidoId3 = new ObjectId();
const pedidoId4 = new ObjectId();
const pedidoId5 = new ObjectId();

// =====================
// USUARIOS (5)
// =====================

dbChef.usuarios.insertMany([
  {
    _id: usuarioId1,
    googleId: "demo-002",
    nombre: "Carlos López",
    correo: "carlos.lopez@example.com",
    telefono: "5511111111",
    direcciones: [
      {
        etiqueta: "Casa",
        calle: "Calle Reforma 100",
        ciudad: "CDMX",
        estado: "CDMX",
        cp: "01010",
        geo: { lat: 19.4325, lng: -99.1331 }
      }
    ],
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    _id: usuarioId2,
    googleId: "demo-003",
    nombre: "María García",
    correo: "maria.garcia@example.com",
    telefono: "5522222222",
    direcciones: [
      {
        etiqueta: "Oficina",
        calle: "Av. Insurgentes Sur 800",
        ciudad: "CDMX",
        estado: "CDMX",
        cp: "03100",
        geo: { lat: 19.3876, lng: -99.1620 }
      }
    ],
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    _id: usuarioId3,
    googleId: "demo-004",
    nombre: "Luis Fernández",
    correo: "luis.fernandez@example.com",
    telefono: "5533333333",
    direcciones: [
      {
        etiqueta: "Casa",
        calle: "Calle Niza 45",
        ciudad: "CDMX",
        estado: "CDMX",
        cp: "06600",
        geo: { lat: 19.4269, lng: -99.1637 }
      }
    ],
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    _id: usuarioId4,
    googleId: "demo-005",
    nombre: "Sofía Ramírez",
    correo: "sofia.ramirez@example.com",
    telefono: "5544444444",
    direcciones: [
      {
        etiqueta: "Casa",
        calle: "Av. Universidad 300",
        ciudad: "CDMX",
        estado: "CDMX",
        cp: "04310",
        geo: { lat: 19.3450, lng: -99.1820 }
      }
    ],
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    _id: usuarioId5,
    googleId: "demo-006",
    nombre: "Jorge Martínez",
    correo: "jorge.martinez@example.com",
    telefono: "5555555555",
    direcciones: [
      {
        etiqueta: "Trabajo",
        calle: "Av. Patriotismo 250",
        ciudad: "CDMX",
        estado: "CDMX",
        cp: "03800",
        geo: { lat: 19.4010, lng: -99.1780 }
      }
    ],
    creadoEn: ahora,
    actualizadoEn: ahora
  }
]);

// =====================
// CATEGORÍAS (5)
// =====================

dbChef.categorias.insertMany([
  {
    _id: categoriaId1,
    slug: "mexicana-tradicional",
    nombre: "Mexicana tradicional"
  },
  {
    _id: categoriaId2,
    slug: "italiana",
    nombre: "Italiana"
  },
  {
    _id: categoriaId3,
    slug: "japonesa",
    nombre: "Japonesa"
  },
  {
    _id: categoriaId4,
    slug: "postres",
    nombre: "Postres"
  },
  {
    _id: categoriaId5,
    slug: "saludable",
    nombre: "Saludable"
  }
]);

// =====================
// RESTAURANTES (5)
// =====================

dbChef.restaurantes.insertMany([
  {
    _id: restauranteId1,
    nombre: "Taquería El Centro",
    slug: "taqueria-el-centro",
    descripcion: "Tacos, tortas y gringas al pastor en el corazón de la ciudad",
    categorias: ["mexicana-tradicional"],
    imagen: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
    imagen_banner: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
    calificacion: { promedio: 0, conteo: 0 },
    entrega: { minutosPromedio: 20, tarifa: 25 },
    direccion: {
      calle: "Calle Madero 200",
      ciudad: "CDMX",
      estado: "CDMX",
      geo: { lat: 19.4330, lng: -99.1350 }
    },
    activo: true,
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    _id: restauranteId2,
    nombre: "Pizzería Roma",
    slug: "pizzeria-roma",
    descripcion: "Pizzas artesanales al horno de piedra",
    categorias: ["italiana"],
    imagen: "https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg",
    imagen_banner: "https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg",
    calificacion: { promedio: 0, conteo: 0 },
    entrega: { minutosPromedio: 30, tarifa: 30 },
    direccion: {
      calle: "Av. Roma 50",
      ciudad: "CDMX",
      estado: "CDMX",
      geo: { lat: 19.4150, lng: -99.1625 }
    },
    activo: true,
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    _id: restauranteId3,
    nombre: "Sushi Go",
    slug: "sushi-go",
    descripcion: "Sushi, bowls y rollos frescos",
    categorias: ["japonesa"],
    imagen: "https://images.pexels.com/photos/3577566/pexels-photo-3577566.jpeg",
    imagen_banner: "https://images.pexels.com/photos/3577566/pexels-photo-3577566.jpeg",
    calificacion: { promedio: 0, conteo: 0 },
    entrega: { minutosPromedio: 35, tarifa: 35 },
    direccion: {
      calle: "Av. Asia 12",
      ciudad: "CDMX",
      estado: "CDMX",
      geo: { lat: 19.4300, lng: -99.1500 }
    },
    activo: true,
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    _id: restauranteId4,
    nombre: "Dulce Tentación",
    slug: "dulce-tentacion",
    descripcion: "Repostería, pasteles y postres individuales",
    categorias: ["postres"],
    imagen: "https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg",
    imagen_banner: "https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg",
    calificacion: { promedio: 0, conteo: 0 },
    entrega: { minutosPromedio: 25, tarifa: 20 },
    direccion: {
      calle: "Calle Azúcar 8",
      ciudad: "CDMX",
      estado: "CDMX",
      geo: { lat: 19.4400, lng: -99.1200 }
    },
    activo: true,
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    _id: restauranteId5,
    nombre: "Green Bowl",
    slug: "green-bowl",
    descripcion: "Ensaladas, bowls y comida saludable",
    categorias: ["saludable"],
    imagen: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
    imagen_banner: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
    calificacion: { promedio: 0, conteo: 0 },
    entrega: { minutosPromedio: 28, tarifa: 25 },
    direccion: {
      calle: "Av. Salud 15",
      ciudad: "CDMX",
      estado: "CDMX",
      geo: { lat: 19.4200, lng: -99.1400 }
    },
    activo: true,
    creadoEn: ahora,
    actualizadoEn: ahora
  }
]);


// =====================
// PRODUCTOS (10)
// =====================

dbChef.productos.insertMany([
  // Taquería El Centro
  {
    _id: productoId1,
    restauranteId: restauranteId1,
    nombre: "Taco de suadero",
    descripcion: "Taco de suadero con cebolla, cilantro y salsa verde",
    precio: 35,
    imagen: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
    disponible: true,
    etiquetas: ["taco", "suadero", "mexicana"],
    categoriaMenu: "Plato fuerte",
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    _id: productoId2,
    restauranteId: restauranteId1,
    nombre: "Gringa al pastor",
    descripcion: "Tortilla de harina con pastor, queso y piña",
    precio: 65,
    imagen: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
    disponible: true,
    etiquetas: ["gringa", "pastor"],
    categoriaMenu: "Plato fuerte",
    creadoEn: ahora,
    actualizadoEn: ahora
  },

  // Pizzería Roma
  {
    _id: productoId3,
    restauranteId: restauranteId2,
    nombre: "Pizza Margarita",
    descripcion: "Pizza clásica con jitomate, queso mozzarella y albahaca",
    precio: 180,
    imagen: "https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg",
    disponible: true,
    etiquetas: ["pizza", "italiana", "vegetariana"],
    categoriaMenu: "Plato fuerte",
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    _id: productoId4,
    restauranteId: restauranteId2,
    nombre: "Pizza Pepperoni",
    descripcion: "Pizza con salsa de jitomate, queso y pepperoni",
    precio: 190,
    imagen: "https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg",
    disponible: true,
    etiquetas: ["pizza", "pepperoni"],
    categoriaMenu: "Plato fuerte",
    creadoEn: ahora,
    actualizadoEn: ahora
  },

  // Sushi Go
  {
    _id: productoId5,
    restauranteId: restauranteId3,
    nombre: "California Roll",
    descripcion: "Roll con surimi, aguacate y pepino",
    precio: 120,
    imagen: "https://images.pexels.com/photos/3577566/pexels-photo-3577566.jpeg",
    disponible: true,
    etiquetas: ["sushi", "roll"],
    categoriaMenu: "Plato fuerte",
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    _id: productoId6,
    restauranteId: restauranteId3,
    nombre: "Salmón nigiri",
    descripcion: "Arroz avinagrado con lámina de salmón fresco",
    precio: 90,
    imagen: "https://images.pexels.com/photos/3577566/pexels-photo-3577566.jpeg",
    disponible: true,
    etiquetas: ["sushi", "nigiri", "salmon"],
    categoriaMenu: "Plato fuerte",
    creadoEn: ahora,
    actualizadoEn: ahora
  },

  // Dulce Tentación
  {
    _id: productoId7,
    restauranteId: restauranteId4,
    nombre: "Cheesecake de frutos rojos",
    descripcion: "Rebanada de cheesecake con coulis de frutos rojos",
    precio: 85,
    imagen: "https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg",
    disponible: true,
    etiquetas: ["postre", "cheesecake"],
    categoriaMenu: "Postre",
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    _id: productoId8,
    restauranteId: restauranteId4,
    nombre: "Brownie con helado",
    descripcion: "Brownie de chocolate con bola de helado de vainilla",
    precio: 80,
    imagen: "https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg",
    disponible: true,
    etiquetas: ["postre", "chocolate"],
    categoriaMenu: "Postre",
    creadoEn: ahora,
    actualizadoEn: ahora
  },

  // Green Bowl
  {
    _id: productoId9,
    restauranteId: restauranteId5,
    nombre: "Ensalada Green Power",
    descripcion: "Mezcla de hojas verdes, quinoa, aguacate y semillas",
    precio: 130,
    imagen: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
    disponible: true,
    etiquetas: ["ensalada", "saludable"],
    categoriaMenu: "Plato fuerte",
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    _id: productoId10,
    restauranteId: restauranteId5,
    nombre: "Bowl de pollo teriyaki",
    descripcion: "Arroz integral, pollo teriyaki, verduras salteadas",
    precio: 145,
    imagen: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
    disponible: true,
    etiquetas: ["bowl", "pollo", "saludable"],
    categoriaMenu: "Plato fuerte",
    creadoEn: ahora,
    actualizadoEn: ahora
  }
]);

// =====================
// CUPONES (5)
// =====================

dbChef.cupones.insertMany([
  {
    codigo: "PRIMER_PEDIDO",
    tipo: "fijo",
    valor: 50,
    subtotalMinimo: 200,
    iniciaEn: ahora,
    expiraEn: new Date(ahora.getTime() + 60 * 24 * 60 * 60 * 1000),
    redencionesMaximas: 500,
    redimidos: 0,
    activo: true
  },
  {
    codigo: "ENVIOGRATIS",
    tipo: "fijo",
    valor: 25,
    subtotalMinimo: 150,
    iniciaEn: ahora,
    expiraEn: new Date(ahora.getTime() + 30 * 24 * 60 * 60 * 1000),
    redencionesMaximas: 300,
    redimidos: 0,
    activo: true
  },
  {
    codigo: "2X1PIZZA",
    tipo: "porcentaje",
    valor: 50,
    subtotalMinimo: 250,
    iniciaEn: ahora,
    expiraEn: new Date(ahora.getTime() + 45 * 24 * 60 * 60 * 1000),
    redencionesMaximas: 200,
    redimidos: 0,
    activo: true
  },
  {
    codigo: "TACONOCHE",
    tipo: "porcentaje",
    valor: 20,
    subtotalMinimo: 120,
    iniciaEn: ahora,
    expiraEn: new Date(ahora.getTime() + 20 * 24 * 60 * 60 * 1000),
    redencionesMaximas: 150,
    redimidos: 0,
    activo: true
  },
  {
    codigo: "FIT10",
    tipo: "porcentaje",
    valor: 10,
    subtotalMinimo: 100,
    iniciaEn: ahora,
    expiraEn: new Date(ahora.getTime() + 90 * 24 * 60 * 60 * 1000),
    redencionesMaximas: 1000,
    redimidos: 0,
    activo: true
  }
]);

// =====================
// CARRITOS (5)
// =====================

dbChef.carritos.insertMany([
  {
    usuarioId: usuarioId1,
    items: [
      {
        restauranteId: restauranteId1,
        productoId: productoId1,
        nombre: "Taco de suadero",
        precio: 35,
        cantidad: 3,
        subtotal: 105
      },
      {
        restauranteId: restauranteId1,
        productoId: productoId2,
        nombre: "Gringa al pastor",
        precio: 65,
        cantidad: 1,
        subtotal: 65
      }
    ],
    cuponAplicado: { codigo: "TACONOCHE", descuento: 34 }, // 20% de 170
    moneda: "MXN",
    subtotal: 170,
    tarifaEnvio: 25,
    total: 161,
    actualizadoEn: ahora
  },
  {
    usuarioId: usuarioId2,
    items: [
      {
        restauranteId: restauranteId2,
        productoId: productoId3,
        nombre: "Pizza Margarita",
        precio: 180,
        cantidad: 1,
        subtotal: 180
      }
    ],
    cuponAplicado: { codigo: "ENVIOGRATIS", descuento: 25 },
    moneda: "MXN",
    subtotal: 180,
    tarifaEnvio: 30,
    total: 185,
    actualizadoEn: ahora
  },
  {
    usuarioId: usuarioId3,
    items: [
      {
        restauranteId: restauranteId3,
        productoId: productoId5,
        nombre: "California Roll",
        precio: 120,
        cantidad: 2,
        subtotal: 240
      }
    ],
    cuponAplicado: { codigo: "PRIMER_PEDIDO", descuento: 50 },
    moneda: "MXN",
    subtotal: 240,
    tarifaEnvio: 35,
    total: 225,
    actualizadoEn: ahora
  },
  {
    usuarioId: usuarioId4,
    items: [
      {
        restauranteId: restauranteId4,
        productoId: productoId7,
        nombre: "Cheesecake de frutos rojos",
        precio: 85,
        cantidad: 2,
        subtotal: 170
      },
      {
        restauranteId: restauranteId4,
        productoId: productoId8,
        nombre: "Brownie con helado",
        precio: 80,
        cantidad: 1,
        subtotal: 80
      }
    ],
    cuponAplicado: null,
    moneda: "MXN",
    subtotal: 250,
    tarifaEnvio: 20,
    total: 270,
    actualizadoEn: ahora
  },
  {
    usuarioId: usuarioId5,
    items: [
      {
        restauranteId: restauranteId5,
        productoId: productoId9,
        nombre: "Ensalada Green Power",
        precio: 130,
        cantidad: 1,
        subtotal: 130
      },
      {
        restauranteId: restauranteId5,
        productoId: productoId10,
        nombre: "Bowl de pollo teriyaki",
        precio: 145,
        cantidad: 1,
        subtotal: 145
      }
    ],
    cuponAplicado: { codigo: "FIT10", descuento: 27 }, // 10% de 275
    moneda: "MXN",
    subtotal: 275,
    tarifaEnvio: 25,
    total: 273,
    actualizadoEn: ahora
  }
]);

// =====================
// PEDIDOS (5)
// =====================

dbChef.pedidos.insertMany([
  {
    _id: pedidoId1,
    folio: "CY-2025-000002",
    usuarioId: usuarioId1,
    restauranteId: restauranteId1,
    items: [
      {
        productoId: productoId1,
        nombre: "Taco de suadero",
        precio: 35,
        cantidad: 3,
        subtotal: 105
      },
      {
        productoId: productoId2,
        nombre: "Gringa al pastor",
        precio: 65,
        cantidad: 1,
        subtotal: 65
      }
    ],
    direccionEntrega: {
      etiqueta: "Casa",
      calle: "Calle Reforma 100",
      ciudad: "CDMX",
      estado: "CDMX",
      cp: "01010"
    },
    cupon: { codigo: "TACONOCHE", descuento: 34 },
    montos: { subtotal: 170, tarifaEnvio: 25, total: 161 },
    estado: "entregado",
    realizadoEn: ahora,
    cronologia: [
      { estado: "recibido", en: ahora },
      { estado: "preparando", en: new Date(ahora.getTime() + 5 * 60000) },
      { estado: "en_camino", en: new Date(ahora.getTime() + 20 * 60000) },
      { estado: "entregado", en: new Date(ahora.getTime() + 40 * 60000) }
    ],
    pago: { modo: "simulado", estado: "autorizado", referencia: "SIM-002" },
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    _id: pedidoId2,
    folio: "CY-2025-000003",
    usuarioId: usuarioId2,
    restauranteId: restauranteId2,
    items: [
      {
        productoId: productoId3,
        nombre: "Pizza Margarita",
        precio: 180,
        cantidad: 1,
        subtotal: 180
      }
    ],
    direccionEntrega: {
      etiqueta: "Oficina",
      calle: "Av. Insurgentes Sur 800",
      ciudad: "CDMX",
      estado: "CDMX",
      cp: "03100"
    },
    cupon: { codigo: "ENVIOGRATIS", descuento: 25 },
    montos: { subtotal: 180, tarifaEnvio: 30, total: 185 },
    estado: "en_camino",
    realizadoEn: ahora,
    cronologia: [
      { estado: "recibido", en: ahora },
      { estado: "preparando", en: new Date(ahora.getTime() + 10 * 60000) },
      { estado: "en_camino", en: new Date(ahora.getTime() + 35 * 60000) }
    ],
    pago: { modo: "simulado", estado: "autorizado", referencia: "SIM-003" },
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    _id: pedidoId3,
    folio: "CY-2025-000004",
    usuarioId: usuarioId3,
    restauranteId: restauranteId3,
    items: [
      {
        productoId: productoId5,
        nombre: "California Roll",
        precio: 120,
        cantidad: 2,
        subtotal: 240
      }
    ],
    direccionEntrega: {
      etiqueta: "Casa",
      calle: "Calle Niza 45",
      ciudad: "CDMX",
      estado: "CDMX",
      cp: "06600"
    },
    cupon: { codigo: "PRIMER_PEDIDO", descuento: 50 },
    montos: { subtotal: 240, tarifaEnvio: 35, total: 225 },
    estado: "preparando",
    realizadoEn: ahora,
    cronologia: [
      { estado: "recibido", en: ahora },
      { estado: "preparando", en: new Date(ahora.getTime() + 8 * 60000) }
    ],
    pago: { modo: "simulado", estado: "autorizado", referencia: "SIM-004" },
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    _id: pedidoId4,
    folio: "CY-2025-000005",
    usuarioId: usuarioId4,
    restauranteId: restauranteId4,
    items: [
      {
        productoId: productoId7,
        nombre: "Cheesecake de frutos rojos",
        precio: 85,
        cantidad: 2,
        subtotal: 170
      },
      {
        productoId: productoId8,
        nombre: "Brownie con helado",
        precio: 80,
        cantidad: 1,
        subtotal: 80
      }
    ],
    direccionEntrega: {
      etiqueta: "Casa",
      calle: "Av. Universidad 300",
      ciudad: "CDMX",
      estado: "CDMX",
      cp: "04310"
    },
    cupon: null,
    montos: { subtotal: 250, tarifaEnvio: 20, total: 270 },
    estado: "recibido",
    realizadoEn: ahora,
    cronologia: [
      { estado: "recibido", en: ahora }
    ],
    pago: { modo: "simulado", estado: "autorizado", referencia: "SIM-005" },
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    _id: pedidoId5,
    folio: "CY-2025-000006",
    usuarioId: usuarioId5,
    restauranteId: restauranteId5,
    items: [
      {
        productoId: productoId9,
        nombre: "Ensalada Green Power",
        precio: 130,
        cantidad: 1,
        subtotal: 130
      },
      {
        productoId: productoId10,
        nombre: "Bowl de pollo teriyaki",
        precio: 145,
        cantidad: 1,
        subtotal: 145
      }
    ],
    direccionEntrega: {
      etiqueta: "Trabajo",
      calle: "Av. Patriotismo 250",
      ciudad: "CDMX",
      estado: "CDMX",
      cp: "03800"
    },
    cupon: { codigo: "FIT10", descuento: 27 },
    montos: { subtotal: 275, tarifaEnvio: 25, total: 273 },
    estado: "en_camino",
    realizadoEn: ahora,
    cronologia: [
      { estado: "recibido", en: ahora },
      { estado: "preparando", en: new Date(ahora.getTime() + 7 * 60000) },
      { estado: "en_camino", en: new Date(ahora.getTime() + 30 * 60000) }
    ],
    pago: { modo: "simulado", estado: "autorizado", referencia: "SIM-006" },
    creadoEn: ahora,
    actualizadoEn: ahora
  }
]);

// =====================
// NOTIFICACIONES (5)
// =====================

dbChef.notificaciones.insertMany([
  {
    usuarioId: usuarioId1,
    pedidoId: pedidoId1,
    tipo: "estado_pedido",
    titulo: "Tu pedido fue entregado",
    mensaje: "¡Disfruta tus tacos de suadero y gringa al pastor!",
    estadoDesde: "en_camino",
    estadoHacia: "entregado",
    leida: false,
    creadoEn: ahora,
    leidaEn: null
  },
  {
    usuarioId: usuarioId2,
    pedidoId: pedidoId2,
    tipo: "estado_pedido",
    titulo: "Tu pedido va en camino",
    mensaje: "Tu pizza Margarita llegará pronto.",
    estadoDesde: "preparando",
    estadoHacia: "en_camino",
    leida: false,
    creadoEn: ahora,
    leidaEn: null
  },
  {
    usuarioId: usuarioId3,
    pedidoId: pedidoId3,
    tipo: "estado_pedido",
    titulo: "Estamos preparando tu sushi",
    mensaje: "Tu pedido está siendo preparado en Sushi Go.",
    estadoDesde: "recibido",
    estadoHacia: "preparando",
    leida: false,
    creadoEn: ahora,
    leidaEn: null
  },
  {
    usuarioId: usuarioId4,
    pedidoId: pedidoId4,
    tipo: "estado_pedido",
    titulo: "Pedido recibido",
    mensaje: "Tus postres se empezarán a preparar en breve.",
    estadoDesde: null,
    estadoHacia: "recibido",
    leida: false,
    creadoEn: ahora,
    leidaEn: null
  },
  {
    usuarioId: usuarioId5,
    pedidoId: pedidoId5,
    tipo: "estado_pedido",
    titulo: "Tu pedido saludable va en camino",
    mensaje: "Green Bowl ya envió tu pedido.",
    estadoDesde: "preparando",
    estadoHacia: "en_camino",
    leida: false,
    creadoEn: ahora,
    leidaEn: null
  }
]);

// =====================
// RESEÑAS (5)
// =====================

dbChef.reseñas.insertMany([
  {
    usuarioId: usuarioId1,
    restauranteId: restauranteId1,
    estrellas: 5,
    comentario: "Los tacos de suadero están increíbles, muy buena porción.",
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    usuarioId: usuarioId2,
    restauranteId: restauranteId2,
    estrellas: 4,
    comentario: "Pizza muy rica, aunque llegó un poco tibia.",
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    usuarioId: usuarioId3,
    restauranteId: restauranteId3,
    estrellas: 5,
    comentario: "Sushi fresco y buena presentación.",
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    usuarioId: usuarioId4,
    restauranteId: restauranteId4,
    estrellas: 5,
    comentario: "Los postres están espectaculares, repetiría sin duda.",
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    usuarioId: usuarioId5,
    restauranteId: restauranteId5,
    estrellas: 4,
    comentario: "Muy buena opción saludable, porciones generosas.",
    creadoEn: ahora,
    actualizadoEn: ahora
  }
]);

// =====================
// ACTUALIZAR CALIFICACIONES
// =====================

const aggMulti = dbChef.reseñas.aggregate([
  { $group: { _id: "$restauranteId", promedio: { $avg: "$estrellas" }, conteo: { $sum: 1 } } }
]).toArray();

aggMulti.forEach(function (doc) {
  dbChef.restaurantes.updateOne(
    { _id: doc._id },
    {
      $set: {
        "calificacion.promedio": doc.promedio,
        "calificacion.conteo": doc.conteo,
        actualizadoEn: new Date()
      }
    }
  );
});
