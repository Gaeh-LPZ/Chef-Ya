const dbChef = db.getSiblingDB('chefya');

const ahora = new Date();

// =====================
// NUEVOS IDs
// =====================

const usuarioId6  = new ObjectId();
const usuarioId7  = new ObjectId();
const usuarioId8  = new ObjectId();
const usuarioId9  = new ObjectId();
const usuarioId10 = new ObjectId();

const categoriaId6  = new ObjectId();
const categoriaId7  = new ObjectId();
const categoriaId8  = new ObjectId();
const categoriaId9  = new ObjectId();
const categoriaId10 = new ObjectId();

const restauranteId6  = new ObjectId();
const restauranteId7  = new ObjectId();
const restauranteId8  = new ObjectId();
const restauranteId9  = new ObjectId();
const restauranteId10 = new ObjectId();

const productoId11 = new ObjectId();
const productoId12 = new ObjectId();
const productoId13 = new ObjectId();
const productoId14 = new ObjectId();
const productoId15 = new ObjectId();
const productoId16 = new ObjectId();
const productoId17 = new ObjectId();
const productoId18 = new ObjectId();
const productoId19 = new ObjectId();
const productoId20 = new ObjectId();

const pedidoId6  = new ObjectId();
const pedidoId7  = new ObjectId();
const pedidoId8  = new ObjectId();
const pedidoId9  = new ObjectId();
const pedidoId10 = new ObjectId();

// =====================
// USUARIOS (5 NUEVOS)
// =====================

dbChef.usuarios.insertMany([
  {
    _id: usuarioId6,
    googleId: "demo-007",
    nombre: "Pedro Hernández",
    correo: "pedro.hernandez@example.com",
    telefono: "5566666666",
    direcciones: [
      {
        etiqueta: "Casa",
        calle: "Av. Juárez 10",
        ciudad: "CDMX",
        estado: "CDMX",
        cp: "06000",
        geo: { lat: 19.4350, lng: -99.1400 }
      }
    ],
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    _id: usuarioId7,
    googleId: "demo-008",
    nombre: "Elena Torres",
    correo: "elena.torres@example.com",
    telefono: "5577777777",
    direcciones: [
      {
        etiqueta: "Oficina",
        calle: "Av. Reforma 350",
        ciudad: "CDMX",
        estado: "CDMX",
        cp: "06600",
        geo: { lat: 19.4305, lng: -99.1550 }
      }
    ],
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    _id: usuarioId8,
    googleId: "demo-009",
    nombre: "Andrés Castillo",
    correo: "andres.castillo@example.com",
    telefono: "5588888888",
    direcciones: [
      {
        etiqueta: "Casa",
        calle: "Calle Hamburgo 80",
        ciudad: "CDMX",
        estado: "CDMX",
        cp: "06600",
        geo: { lat: 19.4260, lng: -99.1670 }
      }
    ],
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    _id: usuarioId9,
    googleId: "demo-010",
    nombre: "Lucía Mendoza",
    correo: "lucia.mendoza@example.com",
    telefono: "5599999999",
    direcciones: [
      {
        etiqueta: "Casa",
        calle: "Av. División del Norte 900",
        ciudad: "CDMX",
        estado: "CDMX",
        cp: "03300",
        geo: { lat: 19.3720, lng: -99.1620 }
      }
    ],
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    _id: usuarioId10,
    googleId: "demo-011",
    nombre: "Ricardo Flores",
    correo: "ricardo.flores@example.com",
    telefono: "5510101010",
    direcciones: [
      {
        etiqueta: "Trabajo",
        calle: "Calzada de Tlalpan 1200",
        ciudad: "CDMX",
        estado: "CDMX",
        cp: "03500",
        geo: { lat: 19.3800, lng: -99.1430 }
      }
    ],
    creadoEn: ahora,
    actualizadoEn: ahora
  }
]);

// =====================
// CATEGORÍAS (5 NUEVAS)
// =====================

dbChef.categorias.insertMany([
  {
    _id: categoriaId6,
    slug: "desayunos",
    nombre: "Desayunos"
  },
  {
    _id: categoriaId7,
    slug: "hamburguesas",
    nombre: "Hamburguesas"
  },
  {
    _id: categoriaId8,
    slug: "mariscos",
    nombre: "Mariscos"
  },
  {
    _id: categoriaId9,
    slug: "comida-casera",
    nombre: "Comida casera"
  },
  {
    _id: categoriaId10,
    slug: "cafeteria",
    nombre: "Cafetería"
  }
]);

// =====================
// RESTAURANTES (5 NUEVOS)
// =====================

dbChef.restaurantes.insertMany([
  {
    _id: restauranteId6,
    nombre: "Desayunos La Mañanita",
    slug: "desayunos-la-mananita",
    descripcion: "Chilaquiles, hot cakes y jugos frescos",
    categorias: ["desayunos"],
    imagen: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg",
    imagen_banner: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg",
    calificacion: { promedio: 0, conteo: 0 },
    entrega: { minutosPromedio: 20, tarifa: 20 },
    direccion: {
      calle: "Calle Sol 15",
      ciudad: "CDMX",
      estado: "CDMX",
      geo: { lat: 19.4300, lng: -99.1300 }
    },
    activo: true,
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    _id: restauranteId7,
    nombre: "Burger House",
    slug: "burger-house",
    descripcion: "Hamburguesas gourmet y papas a la francesa",
    categorias: ["hamburguesas"],
    imagen: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg",
    imagen_banner: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg",
    calificacion: { promedio: 0, conteo: 0 },
    entrega: { minutosPromedio: 30, tarifa: 30 },
    direccion: {
      calle: "Av. Hamburguesa 50",
      ciudad: "CDMX",
      estado: "CDMX",
      geo: { lat: 19.4200, lng: -99.1500 }
    },
    activo: true,
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    _id: restauranteId8,
    nombre: "Mariscos El Puerto",
    slug: "mariscos-el-puerto",
    descripcion: "Ceviches, cocteles y tacos de mariscos",
    categorias: ["mariscos"],
    imagen: "https://images.pexels.com/photos/3296273/pexels-photo-3296273.jpeg",
    imagen_banner: "https://images.pexels.com/photos/3296273/pexels-photo-3296273.jpeg",
    calificacion: { promedio: 0, conteo: 0 },
    entrega: { minutosPromedio: 35, tarifa: 35 },
    direccion: {
      calle: "Calle Mar 22",
      ciudad: "CDMX",
      estado: "CDMX",
      geo: { lat: 19.4100, lng: -99.1350 }
    },
    activo: true,
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    _id: restauranteId9,
    nombre: "Cocina Doña Rosa",
    slug: "cocina-dona-rosa",
    descripcion: "Comida corrida y guisos caseros",
    categorias: ["comida-casera"],
    imagen: "https://images.pexels.com/photos/4109990/pexels-photo-4109990.jpeg",
    imagen_banner: "https://images.pexels.com/photos/4109990/pexels-photo-4109990.jpeg",
    calificacion: { promedio: 0, conteo: 0 },
    entrega: { minutosPromedio: 25, tarifa: 20 },
    direccion: {
      calle: "Calle Guiso 7",
      ciudad: "CDMX",
      estado: "CDMX",
      geo: { lat: 19.3950, lng: -99.1450 }
    },
    activo: true,
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    _id: restauranteId10,
    nombre: "Café Central",
    slug: "cafe-central",
    descripcion: "Café de especialidad, pan y sándwiches",
    categorias: ["cafeteria"],
    imagen: "https://images.pexels.com/photos/374885/pexels-photo-374885.jpeg",
    imagen_banner: "https://images.pexels.com/photos/374885/pexels-photo-374885.jpeg",
    calificacion: { promedio: 0, conteo: 0 },
    entrega: { minutosPromedio: 18, tarifa: 15 },
    direccion: {
      calle: "Av. Central 120",
      ciudad: "CDMX",
      estado: "CDMX",
      geo: { lat: 19.4370, lng: -99.1505 }
    },
    activo: true,
    creadoEn: ahora,
    actualizadoEn: ahora
  }
]);


// =====================
// PRODUCTOS (10 NUEVOS)
// =====================

dbChef.productos.insertMany([
  // Desayunos La Mañanita
  {
    _id: productoId11,
    restauranteId: restauranteId6,
    nombre: "Chilaquiles verdes con pollo",
    descripcion: "Con frijoles, crema y queso",
    precio: 95,
    imagen: "https://images.pexels.com/photos/6287528/pexels-photo-6287528.jpeg",
    disponible: true,
    etiquetas: ["chilaquiles", "desayuno"],
    categoriaMenu: "Plato fuerte",
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    _id: productoId12,
    restauranteId: restauranteId6,
    nombre: "Hot cakes con fruta",
    descripcion: "3 piezas con miel de maple y fruta de temporada",
    precio: 85,
    imagen: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg",
    disponible: true,
    etiquetas: ["hotcakes", "dulce", "desayuno"],
    categoriaMenu: "Plato fuerte",
    creadoEn: ahora,
    actualizadoEn: ahora
  },

  // Burger House
  {
    _id: productoId13,
    restauranteId: restauranteId7,
    nombre: "Hamburguesa clásica",
    descripcion: "Carne de res, queso, lechuga, jitomate y aderezo de la casa",
    precio: 140,
    imagen: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg",
    disponible: true,
    etiquetas: ["hamburguesa", "res"],
    categoriaMenu: "Plato fuerte",
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    _id: productoId14,
    restauranteId: restauranteId7,
    nombre: "Hamburguesa BBQ",
    descripcion: "Carne de res, tocino, cebolla caramelizada y salsa BBQ",
    precio: 160,
    imagen: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg",
    disponible: true,
    etiquetas: ["hamburguesa", "bbq"],
    categoriaMenu: "Plato fuerte",
    creadoEn: ahora,
    actualizadoEn: ahora
  },

  // Mariscos El Puerto
  {
    _id: productoId15,
    restauranteId: restauranteId8,
    nombre: "Ceviche de pescado",
    descripcion: "Pescado marinado en limón con jitomate, cebolla y cilantro",
    precio: 130,
    imagen: "https://images.pexels.com/photos/3296273/pexels-photo-3296273.jpeg",
    disponible: true,
    etiquetas: ["ceviche", "mariscos"],
    categoriaMenu: "Plato fuerte",
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    _id: productoId16,
    restauranteId: restauranteId8,
    nombre: "Coctel de camarón",
    descripcion: "Camarón en salsa coctel con aguacate",
    precio: 150,
    imagen: "https://images.pexels.com/photos/3296273/pexels-photo-3296273.jpeg",
    disponible: true,
    etiquetas: ["camarón", "mariscos"],
    categoriaMenu: "Plato fuerte",
    creadoEn: ahora,
    actualizadoEn: ahora
  },

  // Cocina Doña Rosa
  {
    _id: productoId17,
    restauranteId: restauranteId9,
    nombre: "Milanesa de pollo",
    descripcion: "Con arroz, frijoles y tortillas",
    precio: 110,
    imagen: "https://images.pexels.com/photos/4109990/pexels-photo-4109990.jpeg",
    disponible: true,
    etiquetas: ["milanesa", "pollo", "comida-casera"],
    categoriaMenu: "Plato fuerte",
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    _id: productoId18,
    restauranteId: restauranteId9,
    nombre: "Carne de res en pasilla",
    descripcion: "Guiso de res en salsa de chile pasilla",
    precio: 120,
    imagen: "https://images.pexels.com/photos/4109990/pexels-photo-4109990.jpeg",
    disponible: true,
    etiquetas: ["res", "guiso", "comida-casera"],
    categoriaMenu: "Plato fuerte",
    creadoEn: ahora,
    actualizadoEn: ahora
  },

  // Café Central
  {
    _id: productoId19,
    restauranteId: restauranteId10,
    nombre: "Latte grande",
    descripcion: "Café espresso con leche vaporizada",
    precio: 55,
    imagen: "https://images.pexels.com/photos/374885/pexels-photo-374885.jpeg",
    disponible: true,
    etiquetas: ["cafe", "latte"],
    categoriaMenu: "Bebida",
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    _id: productoId20,
    restauranteId: restauranteId10,
    nombre: "Sándwich de pavo",
    descripcion: "Pan artesanal con pavo, queso y verduras",
    precio: 75,
    imagen: "https://images.pexels.com/photos/374885/pexels-photo-374885.jpeg",
    disponible: true,
    etiquetas: ["sandwich", "pavo"],
    categoriaMenu: "Plato fuerte",
    creadoEn: ahora,
    actualizadoEn: ahora
  }
]);

// =====================
// CUPONES (5 NUEVOS)
// =====================

dbChef.cupones.insertMany([
  {
    codigo: "DESAYUNO15",
    tipo: "porcentaje",
    valor: 15,
    subtotalMinimo: 100,
    iniciaEn: ahora,
    expiraEn: new Date(ahora.getTime() + 20 * 24 * 60 * 60 * 1000),
    redencionesMaximas: 300,
    redimidos: 0,
    activo: true
  },
  {
    codigo: "BURGER20",
    tipo: "porcentaje",
    valor: 20,
    subtotalMinimo: 150,
    iniciaEn: ahora,
    expiraEn: new Date(ahora.getTime() + 30 * 24 * 60 * 60 * 1000),
    redencionesMaximas: 200,
    redimidos: 0,
    activo: true
  },
  {
    codigo: "MARISCOS10",
    tipo: "porcentaje",
    valor: 10,
    subtotalMinimo: 180,
    iniciaEn: ahora,
    expiraEn: new Date(ahora.getTime() + 25 * 24 * 60 * 60 * 1000),
    redencionesMaximas: 150,
    redimidos: 0,
    activo: true
  },
  {
    codigo: "CASERO50",
    tipo: "fijo",
    valor: 50,
    subtotalMinimo: 200,
    iniciaEn: ahora,
    expiraEn: new Date(ahora.getTime() + 40 * 24 * 60 * 60 * 1000),
    redencionesMaximas: 250,
    redimidos: 0,
    activo: true
  },
  {
    codigo: "CAFECITO",
    tipo: "fijo",
    valor: 20,
    subtotalMinimo: 80,
    iniciaEn: ahora,
    expiraEn: new Date(ahora.getTime() + 60 * 24 * 60 * 60 * 1000),
    redencionesMaximas: 500,
    redimidos: 0,
    activo: true
  }
]);

// =====================
// CARRITOS (5 NUEVOS)
// =====================

dbChef.carritos.insertMany([
  {
    usuarioId: usuarioId6,
    items: [
      {
        restauranteId: restauranteId6,
        productoId: productoId11,
        nombre: "Chilaquiles verdes con pollo",
        precio: 95,
        cantidad: 1,
        subtotal: 95
      },
      {
        restauranteId: restauranteId6,
        productoId: productoId12,
        nombre: "Hot cakes con fruta",
        precio: 85,
        cantidad: 1,
        subtotal: 85
      }
    ],
    cuponAplicado: { codigo: "DESAYUNO15", descuento: 27 }, // 15% de 180
    moneda: "MXN",
    subtotal: 180,
    tarifaEnvio: 20,
    total: 173,
    actualizadoEn: ahora
  },
  {
    usuarioId: usuarioId7,
    items: [
      {
        restauranteId: restauranteId7,
        productoId: productoId13,
        nombre: "Hamburguesa clásica",
        precio: 140,
        cantidad: 1,
        subtotal: 140
      },
      {
        restauranteId: restauranteId7,
        productoId: productoId14,
        nombre: "Hamburguesa BBQ",
        precio: 160,
        cantidad: 1,
        subtotal: 160
      }
    ],
    cuponAplicado: { codigo: "BURGER20", descuento: 60 }, // 20% de 300
    moneda: "MXN",
    subtotal: 300,
    tarifaEnvio: 30,
    total: 270,
    actualizadoEn: ahora
  },
  {
    usuarioId: usuarioId8,
    items: [
      {
        restauranteId: restauranteId8,
        productoId: productoId15,
        nombre: "Ceviche de pescado",
        precio: 130,
        cantidad: 1,
        subtotal: 130
      },
      {
        restauranteId: restauranteId8,
        productoId: productoId16,
        nombre: "Coctel de camarón",
        precio: 150,
        cantidad: 1,
        subtotal: 150
      }
    ],
    cuponAplicado: { codigo: "MARISCOS10", descuento: 28 }, // 10% de 280
    moneda: "MXN",
    subtotal: 280,
    tarifaEnvio: 35,
    total: 287,
    actualizadoEn: ahora
  },
  {
    usuarioId: usuarioId9,
    items: [
      {
        restauranteId: restauranteId9,
        productoId: productoId17,
        nombre: "Milanesa de pollo",
        precio: 110,
        cantidad: 1,
        subtotal: 110
      },
      {
        restauranteId: restauranteId9,
        productoId: productoId18,
        nombre: "Carne de res en pasilla",
        precio: 120,
        cantidad: 1,
        subtotal: 120
      }
    ],
    cuponAplicado: { codigo: "CASERO50", descuento: 50 },
    moneda: "MXN",
    subtotal: 230,
    tarifaEnvio: 20,
    total: 200,
    actualizadoEn: ahora
  },
  {
    usuarioId: usuarioId10,
    items: [
      {
        restauranteId: restauranteId10,
        productoId: productoId19,
        nombre: "Latte grande",
        precio: 55,
        cantidad: 2,
        subtotal: 110
      },
      {
        restauranteId: restauranteId10,
        productoId: productoId20,
        nombre: "Sándwich de pavo",
        precio: 75,
        cantidad: 1,
        subtotal: 75
      }
    ],
    cuponAplicado: { codigo: "CAFECITO", descuento: 20 },
    moneda: "MXN",
    subtotal: 185,
    tarifaEnvio: 15,
    total: 180,
    actualizadoEn: ahora
  }
]);

// =====================
// PEDIDOS (5 NUEVOS)
// =====================

dbChef.pedidos.insertMany([
  {
    _id: pedidoId6,
    folio: "CY-2025-000007",
    usuarioId: usuarioId6,
    restauranteId: restauranteId6,
    items: [
      {
        productoId: productoId11,
        nombre: "Chilaquiles verdes con pollo",
        precio: 95,
        cantidad: 1,
        subtotal: 95
      },
      {
        productoId: productoId12,
        nombre: "Hot cakes con fruta",
        precio: 85,
        cantidad: 1,
        subtotal: 85
      }
    ],
    direccionEntrega: {
      etiqueta: "Casa",
      calle: "Av. Juárez 10",
      ciudad: "CDMX",
      estado: "CDMX",
      cp: "06000"
    },
    cupon: { codigo: "DESAYUNO15", descuento: 27 },
    montos: { subtotal: 180, tarifaEnvio: 20, total: 173 },
    estado: "entregado",
    realizadoEn: ahora,
    cronologia: [
      { estado: "recibido", en: ahora },
      { estado: "preparando", en: new Date(ahora.getTime() + 5 * 60000) },
      { estado: "en_camino", en: new Date(ahora.getTime() + 15 * 60000) },
      { estado: "entregado", en: new Date(ahora.getTime() + 30 * 60000) }
    ],
    pago: { modo: "simulado", estado: "autorizado", referencia: "SIM-007" },
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    _id: pedidoId7,
    folio: "CY-2025-000008",
    usuarioId: usuarioId7,
    restauranteId: restauranteId7,
    items: [
      {
        productoId: productoId13,
        nombre: "Hamburguesa clásica",
        precio: 140,
        cantidad: 1,
        subtotal: 140
      },
      {
        productoId: productoId14,
        nombre: "Hamburguesa BBQ",
        precio: 160,
        cantidad: 1,
        subtotal: 160
      }
    ],
    direccionEntrega: {
      etiqueta: "Oficina",
      calle: "Av. Reforma 350",
      ciudad: "CDMX",
      estado: "CDMX",
      cp: "06600"
    },
    cupon: { codigo: "BURGER20", descuento: 60 },
    montos: { subtotal: 300, tarifaEnvio: 30, total: 270 },
    estado: "en_camino",
    realizadoEn: ahora,
    cronologia: [
      { estado: "recibido", en: ahora },
      { estado: "preparando", en: new Date(ahora.getTime() + 10 * 60000) },
      { estado: "en_camino", en: new Date(ahora.getTime() + 35 * 60000) }
    ],
    pago: { modo: "simulado", estado: "autorizado", referencia: "SIM-008" },
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    _id: pedidoId8,
    folio: "CY-2025-000009",
    usuarioId: usuarioId8,
    restauranteId: restauranteId8,
    items: [
      {
        productoId: productoId15,
        nombre: "Ceviche de pescado",
        precio: 130,
        cantidad: 1,
        subtotal: 130
      },
      {
        productoId: productoId16,
        nombre: "Coctel de camarón",
        precio: 150,
        cantidad: 1,
        subtotal: 150
      }
    ],
    direccionEntrega: {
      etiqueta: "Casa",
      calle: "Calle Hamburgo 80",
      ciudad: "CDMX",
      estado: "CDMX",
      cp: "06600"
    },
    cupon: { codigo: "MARISCOS10", descuento: 28 },
    montos: { subtotal: 280, tarifaEnvio: 35, total: 287 },
    estado: "preparando",
    realizadoEn: ahora,
    cronologia: [
      { estado: "recibido", en: ahora },
      { estado: "preparando", en: new Date(ahora.getTime() + 8 * 60000) }
    ],
    pago: { modo: "simulado", estado: "autorizado", referencia: "SIM-009" },
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    _id: pedidoId9,
    folio: "CY-2025-000010",
    usuarioId: usuarioId9,
    restauranteId: restauranteId9,
    items: [
      {
        productoId: productoId17,
        nombre: "Milanesa de pollo",
        precio: 110,
        cantidad: 1,
        subtotal: 110
      },
      {
        productoId: productoId18,
        nombre: "Carne de res en pasilla",
        precio: 120,
        cantidad: 1,
        subtotal: 120
      }
    ],
    direccionEntrega: {
      etiqueta: "Casa",
      calle: "Av. División del Norte 900",
      ciudad: "CDMX",
      estado: "CDMX",
      cp: "03300"
    },
    cupon: { codigo: "CASERO50", descuento: 50 },
    montos: { subtotal: 230, tarifaEnvio: 20, total: 200 },
    estado: "recibido",
    realizadoEn: ahora,
    cronologia: [
      { estado: "recibido", en: ahora }
    ],
    pago: { modo: "simulado", estado: "autorizado", referencia: "SIM-010" },
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    _id: pedidoId10,
    folio: "CY-2025-000011",
    usuarioId: usuarioId10,
    restauranteId: restauranteId10,
    items: [
      {
        productoId: productoId19,
        nombre: "Latte grande",
        precio: 55,
        cantidad: 2,
        subtotal: 110
      },
      {
        productoId: productoId20,
        nombre: "Sándwich de pavo",
        precio: 75,
        cantidad: 1,
        subtotal: 75
      }
    ],
    direccionEntrega: {
      etiqueta: "Trabajo",
      calle: "Calzada de Tlalpan 1200",
      ciudad: "CDMX",
      estado: "CDMX",
      cp: "03500"
    },
    cupon: { codigo: "CAFECITO", descuento: 20 },
    montos: { subtotal: 185, tarifaEnvio: 15, total: 180 },
    estado: "en_camino",
    realizadoEn: ahora,
    cronologia: [
      { estado: "recibido", en: ahora },
      { estado: "preparando", en: new Date(ahora.getTime() + 6 * 60000) },
      { estado: "en_camino", en: new Date(ahora.getTime() + 25 * 60000) }
    ],
    pago: { modo: "simulado", estado: "autorizado", referencia: "SIM-011" },
    creadoEn: ahora,
    actualizadoEn: ahora
  }
]);

// =====================
// NOTIFICACIONES (5 NUEVAS)
// =====================

dbChef.notificaciones.insertMany([
  {
    usuarioId: usuarioId6,
    pedidoId: pedidoId6,
    tipo: "estado_pedido",
    titulo: "Tu desayuno ha sido entregado",
    mensaje: "¡Disfruta tus chilaquiles y hot cakes!",
    estadoDesde: "en_camino",
    estadoHacia: "entregado",
    leida: false,
    creadoEn: ahora,
    leidaEn: null
  },
  {
    usuarioId: usuarioId7,
    pedidoId: pedidoId7,
    tipo: "estado_pedido",
    titulo: "Tu pedido de hamburguesas va en camino",
    mensaje: "Burger House ya envió tus hamburguesas.",
    estadoDesde: "preparando",
    estadoHacia: "en_camino",
    leida: false,
    creadoEn: ahora,
    leidaEn: null
  },
  {
    usuarioId: usuarioId8,
    pedidoId: pedidoId8,
    tipo: "estado_pedido",
    titulo: "Estamos preparando tus mariscos",
    mensaje: "Mariscos El Puerto está preparando tu pedido.",
    estadoDesde: "recibido",
    estadoHacia: "preparando",
    leida: false,
    creadoEn: ahora,
    leidaEn: null
  },
  {
    usuarioId: usuarioId9,
    pedidoId: pedidoId9,
    tipo: "estado_pedido",
    titulo: "Pedido recibido en Cocina Doña Rosa",
    mensaje: "Tus guisos caseros se empezarán a preparar en breve.",
    estadoDesde: null,
    estadoHacia: "recibido",
    leida: false,
    creadoEn: ahora,
    leidaEn: null
  },
  {
    usuarioId: usuarioId10,
    pedidoId: pedidoId10,
    tipo: "estado_pedido",
    titulo: "Tu café y sándwich van en camino",
    mensaje: "Café Central ya envió tu orden.",
    estadoDesde: "preparando",
    estadoHacia: "en_camino",
    leida: false,
    creadoEn: ahora,
    leidaEn: null
  }
]);

// =====================
// RESEÑAS (5 NUEVAS)
// =====================

dbChef.reseñas.insertMany([
  {
    usuarioId: usuarioId6,
    restauranteId: restauranteId6,
    estrellas: 5,
    comentario: "Desayuno muy completo y llegó caliente.",
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    usuarioId: usuarioId7,
    restauranteId: restauranteId7,
    estrellas: 4,
    comentario: "Las hamburguesas están buenas, las papas podrían mejorar.",
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    usuarioId: usuarioId8,
    restauranteId: restauranteId8,
    estrellas: 5,
    comentario: "Mariscos frescos y muy buen sazón.",
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    usuarioId: usuarioId9,
    restauranteId: restauranteId9,
    estrellas: 4,
    comentario: "Se siente como comida hecha en casa.",
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    usuarioId: usuarioId10,
    restauranteId: restauranteId10,
    estrellas: 5,
    comentario: "El café está excelente y el sándwich muy bueno.",
    creadoEn: ahora,
    actualizadoEn: ahora
  }
]);

// =====================
// ACTUALIZAR CALIFICACIONES
// =====================

const aggMulti3 = dbChef.reseñas.aggregate([
  { $group: { _id: "$restauranteId", promedio: { $avg: "$estrellas" }, conteo: { $sum: 1 } } }
]).toArray();

aggMulti3.forEach(function (doc) {
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
