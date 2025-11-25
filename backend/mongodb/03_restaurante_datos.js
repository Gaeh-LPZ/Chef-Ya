const dbChef = db.getSiblingDB('chefya');

const ahora = new Date();

// ===== Buscar restaurantes existentes por slug (ya insertados) =====
const dominos      = dbChef.restaurantes.findOne({ slug: "dominos-pizza" });
const burgerKing   = dbChef.restaurantes.findOne({ slug: "burger-king" });
const elPaisa      = dbChef.restaurantes.findOne({ slug: "taqueria-el-paisa" });
const garciaPeral  = dbChef.restaurantes.findOne({ slug: "restaurant-garcia-peral" });
const donaMary     = dbChef.restaurantes.findOne({ slug: "antojitos-dona-mary" });
const sushiHaru    = dbChef.restaurantes.findOne({ slug: "sushi-haru" });
const laEstacion   = dbChef.restaurantes.findOne({ slug: "cafe-la-estacion" });
const tlayudasLupita = dbChef.restaurantes.findOne({ slug: "tlayudas-lupita" });
const cabanaGrill  = dbChef.restaurantes.findOne({ slug: "la-cabana-grill" });
const donPedro     = dbChef.restaurantes.findOne({ slug: "panes-y-cafe-don-pedro" });

const fondaDonaChica = dbChef.restaurantes.findOne({ slug: "fonda-dona-chica" });
const tlayuderiaCentro = dbChef.restaurantes.findOne({ slug: "la-tlayuderia-del-centro" });
const comedorAbuelita = dbChef.restaurantes.findOne({ slug: "comedor-la-abuelita" });
const sazonOaxaqueno  = dbChef.restaurantes.findOne({ slug: "sazon-oaxaqueno" });
const pasilloHumo     = dbChef.restaurantes.findOne({ slug: "pasillo-de-humo" });

// ===== Buscar algunos productos clave (ya insertados) =====
const pizzaPepperoni = dbChef.productos.findOne({
  restauranteId: dominos?._id,
  nombre: "Pizza Pepperoni Mediana"
});

const whopper = dbChef.productos.findOne({
  restauranteId: burgerKing?._id,
  nombre: "Whopper"
});

const tacosPastor = dbChef.productos.findOne({
  restauranteId: elPaisa?._id,
  nombre: "Tacos de Pastor"
});

const tlayudaTasajo = dbChef.productos.findOne({
  restauranteId: tlayudasLupita?._id,
  nombre: "Tlayuda con tasajo"
});

const moleNegro = dbChef.productos.findOne({
  restauranteId: sazonOaxaqueno?._id,
  nombre: "Mole negro"
});

const carneAsadaCarbon = dbChef.productos.findOne({
  restauranteId: pasilloHumo?._id,
  nombre: "Carne asada al carbón"
});


// ====== IDs de usuarios y pedidos ======
const usuarioId1 = new ObjectId();
const usuarioId2 = new ObjectId();
const usuarioId3 = new ObjectId();

const pedidoId1 = new ObjectId();
const pedidoId2 = new ObjectId();
const pedidoId3 = new ObjectId();


// ==================== USUARIOS ====================
dbChef.usuarios.insertMany([
  {
    _id: usuarioId1,
    googleId: "demo-oax-user-001",
    nombre: "María González",
    correo: "maria.gonzalez@example.com",
    telefono: "9511112233",
    direcciones: [
      {
        etiqueta: "Casa",
        calle: "Calle Independencia 123",
        ciudad: "Oaxaca de Juárez",
        estado: "Oaxaca",
        cp: "68000",
        geo: { lat: 17.0600, lng: -96.7250 }
      }
    ],
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    _id: usuarioId2,
    googleId: "demo-oax-user-002",
    nombre: "Carlos López",
    correo: "carlos.lopez@example.com",
    telefono: "9512223344",
    direcciones: [
      {
        etiqueta: "Trabajo",
        calle: "20 de Noviembre 55",
        ciudad: "Oaxaca de Juárez",
        estado: "Oaxaca",
        cp: "68000",
        geo: { lat: 17.0565, lng: -96.7245 }
      }
    ],
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    _id: usuarioId3,
    googleId: "demo-oax-user-003",
    nombre: "Ana Pérez",
    correo: "ana.perez.oaxaca@example.com",
    telefono: "9513334455",
    direcciones: [
      {
        etiqueta: "Casa",
        calle: "Colón 10",
        ciudad: "Huajuapan de León",
        estado: "Oaxaca",
        cp: "69000",
        geo: { lat: 17.8070, lng: -97.7800 }
      }
    ],
    creadoEn: ahora,
    actualizadoEn: ahora
  }
]);

// ==================== CUPONES ====================
dbChef.cupones.insertMany([
  {
    codigo: "OAXBIENVENIDA10",
    tipo: "fijo",
    valor: 10,
    subtotalMinimo: 100,
    iniciaEn: ahora,
    expiraEn: new Date(ahora.getTime() + 30 * 24 * 60 * 60 * 1000),
    redencionesMaximas: 500,
    redimidos: 0,
    activo: true
  },
  {
    codigo: "ENVIOGRATISOAX",
    tipo: "fijo",
    valor: 20,
    subtotalMinimo: 200,
    iniciaEn: ahora,
    expiraEn: new Date(ahora.getTime() + 45 * 24 * 60 * 60 * 1000),
    redencionesMaximas: 300,
    redimidos: 0,
    activo: true
  },
  {
    codigo: "TLAYUDA2X1",
    tipo: "fijo",
    valor: 50,
    subtotalMinimo: 150,
    iniciaEn: ahora,
    expiraEn: new Date(ahora.getTime() + 15 * 24 * 60 * 60 * 1000),
    redencionesMaximas: 100,
    redimidos: 0,
    activo: true
  }
]);

// ==================== CARRITOS ====================
// Carrito 1: María pide Domino's
const subtotal1 = pizzaPepperoni ? (pizzaPepperoni.precio * 2) : 0;
const tarifaEnvio1 = 25;
const descuento1 = 10;
const total1 = subtotal1 + tarifaEnvio1 - descuento1;

// Carrito 2: Carlos pide del Pasillo de Humo
const subtotal2 = carneAsadaCarbon ? (carneAsadaCarbon.precio * 1) : 0;
const tarifaEnvio2 = 18;
const descuento2 = 20;
const total2 = subtotal2 + tarifaEnvio2 - descuento2;

// Carrito 3: Ana pide tlayudas
const subtotal3 = tlayudaTasajo ? (tlayudaTasajo.precio * 2) : 0;
const tarifaEnvio3 = 20;
const descuento3 = 50;
const total3 = subtotal3 + tarifaEnvio3 - descuento3;

dbChef.carritos.insertMany([
  {
    usuarioId: usuarioId1,
    items: pizzaPepperoni && dominos ? [
      {
        restauranteId: dominos._id,
        productoId: pizzaPepperoni._id,
        nombre: pizzaPepperoni.nombre,
        precio: pizzaPepperoni.precio,
        cantidad: 2,
        subtotal: subtotal1
      }
    ] : [],
    cuponAplicado: { codigo: "OAXBIENVENIDA10", descuento: descuento1 },
    moneda: "MXN",
    subtotal: subtotal1,
    tarifaEnvio: tarifaEnvio1,
    total: total1,
    actualizadoEn: ahora
  },
  {
    usuarioId: usuarioId2,
    items: carneAsadaCarbon && pasilloHumo ? [
      {
        restauranteId: pasilloHumo._id,
        productoId: carneAsadaCarbon._id,
        nombre: carneAsadaCarbon.nombre,
        precio: carneAsadaCarbon.precio,
        cantidad: 1,
        subtotal: subtotal2
      }
    ] : [],
    cuponAplicado: { codigo: "ENVIOGRATISOAX", descuento: descuento2 },
    moneda: "MXN",
    subtotal: subtotal2,
    tarifaEnvio: tarifaEnvio2,
    total: total2,
    actualizadoEn: ahora
  },
  {
    usuarioId: usuarioId3,
    items: tlayudaTasajo && tlayudasLupita ? [
      {
        restauranteId: tlayudasLupita._id,
        productoId: tlayudaTasajo._id,
        nombre: tlayudaTasajo.nombre,
        precio: tlayudaTasajo.precio,
        cantidad: 2,
        subtotal: subtotal3
      }
    ] : [],
    cuponAplicado: { codigo: "TLAYUDA2X1", descuento: descuento3 },
    moneda: "MXN",
    subtotal: subtotal3,
    tarifaEnvio: tarifaEnvio3,
    total: total3,
    actualizadoEn: ahora
  }
]);

// ==================== PEDIDOS ====================

dbChef.pedidos.insertMany([
  {
    _id: pedidoId1,
    folio: "CY-OAX-000001",
    usuarioId: usuarioId1,
    restauranteId: dominos?._id,
    items: pizzaPepperoni && dominos ? [
      {
        productoId: pizzaPepperoni._id,
        nombre: pizzaPepperoni.nombre,
        precio: pizzaPepperoni.precio,
        cantidad: 2,
        subtotal: subtotal1
      }
    ] : [],
    direccionEntrega: {
      etiqueta: "Casa",
      calle: "Calle Independencia 123",
      ciudad: "Oaxaca de Juárez",
      estado: "Oaxaca",
      cp: "68000"
    },
    cupon: { codigo: "OAXBIENVENIDA10", descuento: descuento1 },
    montos: { subtotal: subtotal1, tarifaEnvio: tarifaEnvio1, total: total1 },
    estado: "entregado",
    realizadoEn: ahora,
    cronologia: [
      { estado: "recibido", en: ahora },
      { estado: "en_preparacion", en: new Date(ahora.getTime() + 5 * 60000) },
      { estado: "en_camino", en: new Date(ahora.getTime() + 20 * 60000) },
      { estado: "entregado", en: new Date(ahora.getTime() + 40 * 60000) }
    ],
    pago: { modo: "simulado", estado: "autorizado", referencia: "SIM-OAX-001" },
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    _id: pedidoId2,
    folio: "CY-OAX-000002",
    usuarioId: usuarioId2,
    restauranteId: pasilloHumo?._id,
    items: carneAsadaCarbon && pasilloHumo ? [
      {
        productoId: carneAsadaCarbon._id,
        nombre: carneAsadaCarbon.nombre,
        precio: carneAsadaCarbon.precio,
        cantidad: 1,
        subtotal: subtotal2
      }
    ] : [],
    direccionEntrega: {
      etiqueta: "Trabajo",
      calle: "20 de Noviembre 55",
      ciudad: "Oaxaca de Juárez",
      estado: "Oaxaca",
      cp: "68000"
    },
    cupon: { codigo: "ENVIOGRATISOAX", descuento: descuento2 },
    montos: { subtotal: subtotal2, tarifaEnvio: tarifaEnvio2, total: total2 },
    estado: "en_camino",
    realizadoEn: ahora,
    cronologia: [
      { estado: "recibido", en: ahora },
      { estado: "en_preparacion", en: new Date(ahora.getTime() + 10 * 60000) },
      { estado: "en_camino", en: new Date(ahora.getTime() + 25 * 60000) }
    ],
    pago: { modo: "simulado", estado: "autorizado", referencia: "SIM-OAX-002" },
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    _id: pedidoId3,
    folio: "CY-OAX-000003",
    usuarioId: usuarioId3,
    restauranteId: tlayudasLupita?._id,
    items: tlayudaTasajo && tlayudasLupita ? [
      {
        productoId: tlayudaTasajo._id,
        nombre: tlayudaTasajo.nombre,
        precio: tlayudaTasajo.precio,
        cantidad: 2,
        subtotal: subtotal3
      }
    ] : [],
    direccionEntrega: {
      etiqueta: "Casa",
      calle: "Colón 10",
      ciudad: "Huajuapan de León",
      estado: "Oaxaca",
      cp: "69000"
    },
    cupon: { codigo: "TLAYUDA2X1", descuento: descuento3 },
    montos: { subtotal: subtotal3, tarifaEnvio: tarifaEnvio3, total: total3 },
    estado: "recibido",
    realizadoEn: ahora,
    cronologia: [
      { estado: "recibido", en: ahora }
    ],
    pago: { modo: "simulado", estado: "autorizado", referencia: "SIM-OAX-003" },
    creadoEn: ahora,
    actualizadoEn: ahora
  }
]);

// ==================== NOTIFICACIONES ====================

dbChef.notificaciones.insertMany([
  {
    usuarioId: usuarioId1,
    pedidoId: pedidoId1,
    tipo: "estado_pedido",
    titulo: "Tu pedido de Domino's ha sido entregado",
    mensaje: "¡Disfruta tu pizza Pepperoni Mediana!",
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
    mensaje: "Tu carne asada del Pasillo de Humo va en camino.",
    estadoDesde: "en_preparacion",
    estadoHacia: "en_camino",
    leida: false,
    creadoEn: ahora,
    leidaEn: null
  },
  {
    usuarioId: usuarioId3,
    pedidoId: pedidoId3,
    tipo: "estado_pedido",
    titulo: "Hemos recibido tu pedido",
    mensaje: "Tlayudas Lupita está preparando tus tlayudas.",
    estadoDesde: null,
    estadoHacia: "recibido",
    leida: false,
    creadoEn: ahora,
    leidaEn: null
  }
]);

// ==================== RESEÑAS ====================

dbChef.reseñas.insertMany([
  // Domino's
  {
    usuarioId: usuarioId1,
    restauranteId: dominos?._id,
    estrellas: 4,
    comentario: "Llegó caliente y a tiempo.",
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    usuarioId: usuarioId2,
    restauranteId: dominos?._id,
    estrellas: 5,
    comentario: "La pizza estaba excelente.",
    creadoEn: ahora,
    actualizadoEn: ahora
  },

  // Pasillo de Humo
  {
    usuarioId: usuarioId2,
    restauranteId: pasilloHumo?._id,
    estrellas: 5,
    comentario: "La carne asada increíble, muy buen sazón.",
    creadoEn: ahora,
    actualizadoEn: ahora
  },
  {
    usuarioId: usuarioId3,
    restauranteId: pasilloHumo?._id,
    estrellas: 4,
    comentario: "Muy rico, solo un poco llena el área del pasillo.",
    creadoEn: ahora,
    actualizadoEn: ahora
  },

  // Tlayudas Lupita
  {
    usuarioId: usuarioId3,
    restauranteId: tlayudasLupita?._id,
    estrellas: 5,
    comentario: "De las mejores tlayudas que he probado.",
    creadoEn: ahora,
    actualizadoEn: ahora
  },

  // Sazón Oaxaqueño
  {
    usuarioId: usuarioId1,
    restauranteId: sazonOaxaqueno?._id,
    estrellas: 5,
    comentario: "El mole negro está espectacular.",
    creadoEn: ahora,
    actualizadoEn: ahora
  },

  // Fonda Doña Chica
  {
    usuarioId: usuarioId1,
    restauranteId: fondaDonaChica?._id,
    estrellas: 4,
    comentario: "Comida casera rica y bien servida.",
    creadoEn: ahora,
    actualizadoEn: ahora
  },

  // Taquería El Paisa
  {
    usuarioId: usuarioId3,
    restauranteId: elPaisa?._id,
    estrellas: 5,
    comentario: "Tacos de pastor muy buenos y bien servidos.",
    creadoEn: ahora,
    actualizadoEn: ahora
  }
]);

// ==================== RECALCULAR CALIFICACIONES ====================

const agg = dbChef.reseñas.aggregate([
  {
    $group: {
      _id: "$restauranteId",
      promedio: { $avg: "$estrellas" },
      conteo: { $sum: 1 }
    }
  }
]).toArray();

agg.forEach(r => {
  dbChef.restaurantes.updateOne(
    { _id: r._id },
    {
      $set: {
        "calificacion.promedio": r.promedio,
        "calificacion.conteo": r.conteo,
        actualizadoEn: new Date()
      }
    }
  );
});
