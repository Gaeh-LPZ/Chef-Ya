const dbChef = db.getSiblingDB('chefya');

const usuarioId     = new ObjectId();
const categoriaId   = new ObjectId();
const restauranteId = new ObjectId();
const productoId    = new ObjectId();
const pedidoId      = new ObjectId();

const ahora = new Date();

dbChef.usuarios.insertOne({
  _id: usuarioId,
  googleId: "demo-oax-001",
  nombre: "Juan López",
  correo: "juan.lopez.oax@example.com",
  telefono: "9511234567",
  direcciones: [
    {
      etiqueta: "Casa",
      calle: "Emilio Carranza 210, Col. Reforma",
      ciudad: "Oaxaca de Juárez",
      estado: "Oaxaca",
      cp: "68050",
      geo: { lat: 17.079, lng: -96.716 }
    }
  ],
  creadoEn: ahora,
  actualizadoEn: ahora
});

dbChef.categorias.insertOne({
  _id: categoriaId,
  slug: "mexicana",
  nombre: "Mexicana"
});

dbChef.restaurantes.insertOne({
  _id: restauranteId,
  nombre: "Mixtacos",
  slug: "mixtacos-oaxaca",
  descripcion: "Taquería en Oaxaca de Juárez con tacos al pastor, gringas y alambres.",
  categorias: ["mexicana"],
  // Deja estas en blanco para que tú pongas la URL real del restaurante
  imagen: "https://birria-02.b-cdn.net/content/img-o-19488-mixtacos-reforma.jpg",
  imagen_banner: "https://birriatresdeoros.com/wp-content/uploads/portada_.jpg",
  calificacion: { promedio: 5.0, conteo: 1 },
  entrega: { minutosPromedio: 40, tarifa: 25 },
  direccion: {
    calle: "Emilio Carranza 210, Col. Reforma",
    ciudad: "Oaxaca de Juárez",
    estado: "Oaxaca",
    geo: { lat: 17.079, lng: -96.716 }
  },
  // 🔹 Nuevo: horario y días de servicio
  horario: {
    lunes:     { abre: "14:00", cierra: "00:00" },
    martes:    { abre: "14:00", cierra: "00:00" },
    miercoles: { abre: "14:00", cierra: "00:00" },
    jueves:    { abre: "14:00", cierra: "00:00" },
    viernes:   { abre: "14:00", cierra: "01:00" },
    sabado:    { abre: "14:00", cierra: "01:00" },
    domingo:   { abre: "14:00", cierra: "00:00" }
  },
  diasServicio: [
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado",
    "domingo"
  ],
  url_localizacion: "https://www.google.com/maps?q=17.07204,-96.71645",
  activo: true,
  creadoEn: ahora,
  actualizadoEn: ahora
});

dbChef.productos.insertOne({
  _id: productoId,
  restauranteId: restauranteId,
  nombre: "Taco al birria",
  descripcion: "Taco de birria al estilo Oaxaca con piña, cebollitas y salsa de la casa.",
  precio: 35,
  // Imagen a completar a mano
  imagen: "https://birriatresdeoros.com/wp-content/uploads/birrierias-5.jpg",
  disponible: true,
  etiquetas: ["taco", "cerdo", "pastor"],
  categoriaMenu: "Plato fuerte",
  creadoEn: ahora,
  actualizadoEn: ahora
});

dbChef.cupones.insertOne({
  codigo: "BIENVENIDA10",
  tipo: "fijo",
  valor: 10,
  subtotalMinimo: 80,
  iniciaEn: ahora,
  expiraEn: new Date(ahora.getTime() + 30 * 24 * 60 * 60 * 1000),
  redencionesMaximas: 1000,
  redimidos: 0,
  activo: true
});

dbChef.carritos.insertOne({
  usuarioId: usuarioId,
  items: [
    {
      restauranteId: restauranteId,
      productoId: productoId,
      nombre: "Taco al pastor",
      precio: 35,
      cantidad: 2,
      subtotal: 70
    }
  ],
  cuponAplicado: { codigo: "BIENVENIDA10", descuento: 10 },
  moneda: "MXN",
  subtotal: 70,
  tarifaEnvio: 25,
  total: 85,
  actualizadoEn: ahora
});

dbChef.pedidos.insertOne({
  _id: pedidoId,
  folio: "CY-2025-000001",
  usuarioId: usuarioId,
  restauranteId: restauranteId,
  items: [
    {
      productoId: productoId,
      nombre: "Taco al pastor",
      precio: 35,
      cantidad: 2,
      subtotal: 70
    }
  ],
  direccionEntrega: {
    etiqueta: "Casa",
    calle: "Emilio Carranza 210, Col. Reforma",
    ciudad: "Oaxaca de Juárez",
    estado: "Oaxaca",
    cp: "68050"
  },
  cupon: { codigo: "BIENVENIDA10", descuento: 10 },
  montos: { subtotal: 70, tarifaEnvio: 25, total: 85 },
  estado: "recibido",
  realizadoEn: ahora,
  cronologia: [{ estado: "recibido", en: ahora }],
  pago: { modo: "simulado", estado: "autorizado", referencia: "SIM-001" },
  creadoEn: ahora,
  actualizadoEn: ahora
});

dbChef.notificaciones.insertOne({
  usuarioId: usuarioId,
  pedidoId: pedidoId,
  tipo: "estado_pedido",
  titulo: "Pedido recibido",
  mensaje: "¡Hemos recibido tu pedido en Mixtacos y empezaremos a prepararlo!",
  estadoDesde: null,
  estadoHacia: "recibido",
  leida: false,
  creadoEn: ahora,
  leidaEn: null
});

dbChef.reseñas.insertOne({
  usuarioId: usuarioId,
  restauranteId: restauranteId,
  estrellas: 5,
  comentario: "Excelentes tacos al pastor en Oaxaca, súper recomendados.",
  creadoEn: ahora,
  actualizadoEn: ahora
});

const agg = dbChef.reseñas.aggregate([
  { $match: { restauranteId: restauranteId } },
  { $group: { _id: "$restauranteId", promedio: { $avg: "$estrellas" }, conteo: { $sum: 1 } } }
]).toArray();

if (agg.length > 0) {
  dbChef.restaurantes.updateOne(
    { _id: restauranteId },
    { $set: { "calificacion.promedio": agg[0].promedio, "calificacion.conteo": agg[0].conteo, actualizadoEn: new Date() } }
  );
}
