document.addEventListener('DOMContentLoaded', async () => {
    const hacerPedidoBtn = document.getElementById('hacer-pedido-btn');
    const API_BASE_URL = 'https://chef-ya-api.onrender.com';

    // === Estado global de usuario, carrito y direcciones ===
    const params = new URLSearchParams(window.location.search);

    let idUsuario = localStorage.getItem('usuario_id');
    if (!idUsuario) {
        idUsuario = params.get('id_usuario');
    }

    if (!idUsuario) {
        console.error('No se encontró usuario (ni en localStorage ni en la URL). Redirigiendo a login...');
        window.location.href = 'login.html';
        return;
    }

    const pagoExitoso = params.get('pago_exitoso');
    const carritoIdFromUrl = params.get('carritoId');
    const stripeSessionIdFromUrl = params.get('session_id');

    let carritoActual = null;

    // Direcciones del usuario
    let direccionesUsuario = [];
    let direccionSeleccionada = null; // DireccionUsuarioLeer o null

    // === 1. Utilidades ===
    function obtenerSimboloMoneda(moneda) {
        if (moneda === 'MXN') return '$';
        if (moneda === 'USD') return 'US$';
        return '$';
    }

    function renderCarrito(carrito) {
        const itemsContainer = document.getElementById('cart-items');
        const subtotalSpan = document.getElementById('subtotal-amount');
        const shippingSpan = document.getElementById('shipping-amount');
        const totalSpan = document.getElementById('total-amount');
        const itemsCountSpan = document.getElementById('cart-items-count');

        if (!itemsContainer) return;

        itemsContainer.innerHTML = ''; // limpiar items previos

        if (!carrito) {
            // Carrito nulo o indefinido --> mostrar todo en 0
            if (itemsCountSpan) itemsCountSpan.textContent = '0';
            if (subtotalSpan) subtotalSpan.textContent = '$0.00';
            if (shippingSpan) shippingSpan.textContent = '$0.00';
            if (totalSpan) totalSpan.textContent = '$0.00';
            return;
        }

        const monedaSymbol = obtenerSimboloMoneda(carrito.moneda || 'MXN');
        const totalItems = carrito.items.reduce((acc, item) => acc + item.cantidad, 0);

        carrito.items.forEach((item) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'flex gap-4 py-4 border-b border-gray-100';

            itemDiv.innerHTML = `
            <!-- Image -->
            <div class="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                <img 
                    src="${item.imagen || ''}" 
                    class="imagen-comida-carrito w-full h-full object-cover" 
                    alt="imagen comida"
                    onerror="this.style.display='none';"
                >
            </div>
            
            <!-- Details -->
            <div class="flex-1 flex justify-between">
                <div class="flex flex-col justify-center">
                    <span class="text-xs text-gray-400 mb-1">
                        Restaurante ${item.restauranteId || ''}
                    </span>
                    <h3 class="text-sm font-medium text-gray-900">${item.nombre}</h3>
                    <span class="text-sm text-gray-500 mt-1">Cantidad: ${item.cantidad}</span>
                </div>
                <div class="font-medium text-sm pt-5 md:pt-0 flex items-center">
                    ${monedaSymbol}${item.subtotal.toFixed(2)}
                </div>
            </div>
            `;

            itemsContainer.appendChild(itemDiv);
        });

        if (itemsCountSpan) {
            itemsCountSpan.textContent = totalItems.toString();
        }
        if (subtotalSpan) {
            subtotalSpan.textContent = `${monedaSymbol}${carrito.subtotal.toFixed(2)}`;
        }
        if (shippingSpan) {
            shippingSpan.textContent = `${monedaSymbol}${carrito.tarifaEnvio.toFixed(2)}`;
        }
        if (totalSpan) {
            totalSpan.textContent = `${monedaSymbol}${carrito.total.toFixed(2)}`;
        }
    }

    // === 2. DIRECCIONES: UI ===
    function renderDireccionesEnvio() {
        const container = document.getElementById('envio-detalle');
        if (!container) return;

        // formulario base
        const formularioHTML = `
            <div id="form-nueva-direccion" class="space-y-2 mt-2">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                        <label class="text-xs text-gray-600">Etiqueta</label>
                        <input id="dir-etiqueta" type="text"
                            class="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                            placeholder="Casa, Trabajo, etc.">
                    </div>
                    <div>
                        <label class="text-xs text-gray-600">Calle</label>
                        <input id="dir-calle" type="text"
                            class="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                            placeholder="Calle y número">
                    </div>
                    <div>
                        <label class="text-xs text-gray-600">Ciudad</label>
                        <input id="dir-ciudad" type="text"
                            class="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                            placeholder="Ciudad">
                    </div>
                    <div>
                        <label class="text-xs text-gray-600">Estado</label>
                        <input id="dir-estado" type="text"
                            class="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                            placeholder="Estado">
                    </div>
                    <div>
                        <label class="text-xs text-gray-600">Código Postal</label>
                        <input id="dir-cp" type="text"
                            class="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                            placeholder="CP">
                    </div>
                </div>
                <p class="text-[11px] text-gray-400 mt-1">
                    Usaremos esta dirección para tu entrega.
                </p>
            </div>
        `;

        if (!Array.isArray(direccionesUsuario) || direccionesUsuario.length === 0) {
            // No hay direcciones guardadas: mostrar directamente el formulario
            container.innerHTML = `
                <p class="text-sm text-gray-600">
                    No tienes direcciones guardadas. Agrega una nueva para tu envío:
                </p>
                ${formularioHTML}
            `;
            direccionSeleccionada = null;
            return;
        }

        // Hay direcciones guardadas
        const direccionesHTML = direccionesUsuario
            .map((dir, index) => {
                const linea = [
                    dir.calle,
                    dir.ciudad,
                    dir.estado,
                    dir.cp || ''
                ].filter(Boolean).join(', ');

                return `
                    <label class="flex items-start gap-2 text-sm cursor-pointer">
                        <input 
                            type="radio" 
                            name="direccion-envio" 
                            value="${index}" 
                            class="mt-1"
                            ${index === 0 ? 'checked' : ''}
                        >
                        <span>
                            <span class="font-medium block">${dir.etiqueta || 'Dirección ' + (index + 1)}</span>
                            <span class="text-xs text-gray-600">${linea}</span>
                        </span>
                    </label>
                `;
            })
            .join('');

        container.innerHTML = `
            <div class="mt-2 space-y-3">
                <p class="text-sm text-gray-600">
                    Selecciona una dirección de envío o agrega una nueva:
                </p>
                <div class="space-y-2">
                    ${direccionesHTML}
                </div>

                <div class="pt-3 border-t border-gray-100 mt-3">
                    <label class="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="radio" name="direccion-envio" value="nueva">
                        <span>Usar una nueva dirección</span>
                    </label>
                    ${formularioHTML.replace('mt-2', 'mt-2 hidden')}
                </div>
            </div>
        `;

        // Dirección seleccionada por defecto
        direccionSeleccionada = direccionesUsuario[0];

        // Listener de cambios en radios
        container.addEventListener('change', (e) => {
            const target = e.target;
            if (target && target.name === 'direccion-envio') {
                const value = target.value;
                const formDiv = document.getElementById('form-nueva-direccion');

                if (value === 'nueva') {
                    if (formDiv) formDiv.classList.remove('hidden');
                    direccionSeleccionada = null; // se usará lo que escriban
                } else {
                    if (formDiv) formDiv.classList.add('hidden');
                    const index = parseInt(value, 10);
                    if (!isNaN(index) && direccionesUsuario[index]) {
                        direccionSeleccionada = direccionesUsuario[index];
                    }
                }

                console.log('Dirección seleccionada para envío:', direccionSeleccionada);
            }
        });
    }

    // === 3. DIRECCIONES: cargar desde API ===
    async function cargarDireccionesUsuario() {
        try {
            const resp = await fetch(`${API_BASE_URL}/usuarios/${idUsuario}/direcciones`);
            if (!resp.ok) {
                console.error('Error al obtener direcciones del usuario:', resp.status, resp.statusText);
                return;
            }
            direccionesUsuario = await resp.json();
            console.log('Direcciones del usuario:', direccionesUsuario);
            renderDireccionesEnvio();
        } catch (error) {
            console.error('Error de red al obtener direcciones del usuario:', error);
        }
    }

    // === 4. Construir dirección de entrega y guardar si es nueva ===
    async function construirDireccionEntregaYGuardarSiEsNueva() {
        const usaNueva =
            !Array.isArray(direccionesUsuario) ||
            direccionesUsuario.length === 0 ||
            document.querySelector('input[name="direccion-envio"][value="nueva"]')?.checked;

        // Caso 1: dirección existente
        if (!usaNueva) {
            if (!direccionSeleccionada) {
                alert('Selecciona una dirección de envío.');
                return null;
            }

            const direccionEntrega = {
                etiqueta: direccionSeleccionada.etiqueta || null,
                calle: direccionSeleccionada.calle,
                ciudad: direccionSeleccionada.ciudad,
                estado: direccionSeleccionada.estado,
                cp: direccionSeleccionada.cp || null
            };

            // Guardamos en localStorage para usarla al regresar de Stripe
            localStorage.setItem('direccion_entrega_actual', JSON.stringify(direccionEntrega));

            return direccionEntrega;
        }

        // Caso 2: nueva dirección
        const etiqueta = document.getElementById('dir-etiqueta')?.value.trim();
        const calle = document.getElementById('dir-calle')?.value.trim();
        const ciudad = document.getElementById('dir-ciudad')?.value.trim();
        const estado = document.getElementById('dir-estado')?.value.trim();
        const cp = document.getElementById('dir-cp')?.value.trim();

        if (!calle || !ciudad || !estado) {
            alert('Por favor completa al menos calle, ciudad y estado.');
            return null;
        }

        const q = [calle, ciudad, estado, cp].filter(Boolean).join(', ');

        // 1) validar ubicación
        let geoUsuario = null;
        try {
            const respValidar = await fetch(
                `${API_BASE_URL}/ubicacion/validar?q=${encodeURIComponent(q)}`
            );
            if (!respValidar.ok) {
                console.error('Error al validar ubicación:', respValidar.status, respValidar.statusText);
                alert('No se pudo validar tu ubicación. Revisa la dirección.');
                return null;
            }
            const data = await respValidar.json();
            geoUsuario = {
                lat: data.lat,
                lng: data.lon
            };
        } catch (error) {
            console.error('Error de red al validar ubicación:', error);
            alert('Hubo un problema validando tu ubicación. Intenta de nuevo.');
            return null;
        }

        // 2) guardar dirección en el usuario
        const bodyDireccion = {
            etiqueta: etiqueta || 'Casa',
            calle,
            ciudad,
            estado,
            cp: cp || null,
            geo: geoUsuario
        };

        try {
            const respCrear = await fetch(`${API_BASE_URL}/usuarios/${idUsuario}/direcciones`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyDireccion)
            });

            if (!respCrear.ok) {
                console.error(
                    'Error al guardar dirección del usuario:',
                    respCrear.status,
                    respCrear.statusText
                );
                alert('No se pudo guardar tu dirección. Intenta de nuevo.');
                return null;
            }

            const direccionesActualizadas = await respCrear.json();
            direccionesUsuario = direccionesActualizadas;
            direccionSeleccionada = direccionesUsuario[direccionesUsuario.length - 1];

            const direccionEntrega = {
                etiqueta: direccionSeleccionada.etiqueta || null,
                calle: direccionSeleccionada.calle,
                ciudad: direccionSeleccionada.ciudad,
                estado: direccionSeleccionada.estado,
                cp: direccionSeleccionada.cp || null
            };

            // Guardar en localStorage para usarla al volver de Stripe
            localStorage.setItem('direccion_entrega_actual', JSON.stringify(direccionEntrega));

            return direccionEntrega;
        } catch (error) {
            console.error('Error de red al guardar dirección del usuario:', error);
            alert('No se pudo guardar tu dirección. Intenta de nuevo.');
            return null;
        }
    }

    // === 5. Crear pedido desde carrito (cuando el pago sea exitoso) ===
    async function crearPedidoDesdeCarrito(carrito, direccionEntrega, stripeSessionId) {
        if (!carrito || !carrito.items || carrito.items.length === 0) {
            alert('No hay items en el carrito para crear un pedido.');
            return null;
        }

        const restauranteId = carrito.items[0].restauranteId; // asumimos un solo restaurante por carrito
        if (!restauranteId) {
            console.error('No se encontró restauranteId en los items del carrito');
            alert('No se pudo determinar el restaurante del pedido.');
            return null;
        }

        const itemsPedido = carrito.items.map((item) => ({
            productoId: item.productoId,
            nombre: item.nombre,
            precio: item.precio,
            cantidad: item.cantidad,
            subtotal: item.subtotal
        }));

        const cupon = carrito.cuponAplicado
            ? {
                codigo: carrito.cuponAplicado.codigo,
                descuento: carrito.cuponAplicado.descuento
            }
            : null;

        const montos = {
            subtotal: carrito.subtotal,
            tarifaEnvio: carrito.tarifaEnvio,
            total: carrito.total
        };

        const pago = {
            modo: 'stripe',
            estado: 'pagado',
            referencia: stripeSessionId || null
        };

        const bodyPedido = {
            usuarioId: carrito.usuarioId || idUsuario,
            restauranteId,
            items: itemsPedido,
            direccionEntrega,
            cupon,
            montos,
            pago
        };

        try {
            const resp = await fetch(`${API_BASE_URL}/pedidos/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyPedido)
            });

            if (!resp.ok) {
                console.error('Error al crear pedido:', resp.status, resp.statusText);
                alert('No se pudo crear el pedido después del pago.');
                return null;
            }

            const pedido = await resp.json();
            console.log('Pedido creado:', pedido);
            return pedido;
        } catch (error) {
            console.error('Error de red al crear pedido:', error);
            alert('No se pudo crear el pedido por un error de red.');
            return null;
        }
    }

    // === 6. Cargar carrito desde la API ===
    async function cargarCarrito() {
        if (!idUsuario) return;

        try {
            const response = await fetch(`${API_BASE_URL}/carritos/usuario/${idUsuario}`);

            if (!response.ok) {
                console.error('Error al obtener el carrito:', response.status, response.statusText);
                return;
            }

            carritoActual = await response.json();
            console.log('Carrito cargado:', carritoActual);
            renderCarrito(carritoActual);
        } catch (error) {
            console.error('Error de red al obtener el carrito:', error);
        }
    }

    // === 7. Procesar pago exitoso: crear pedido y vaciar carrito ===
    async function procesarPagoExitoso() {
        if (pagoExitoso === '1' && carritoIdFromUrl) {
            try {
                console.log('Pago exitoso detectado. Procesando pedido para carrito:', carritoIdFromUrl);

                // 1) Obtener carrito completo por id
                const respCarrito = await fetch(`${API_BASE_URL}/carritos/${carritoIdFromUrl}`);
                if (!respCarrito.ok) {
                    console.error('Error al obtener carrito por id tras pago exitoso:', respCarrito.status, respCarrito.statusText);
                    return;
                }
                const carrito = await respCarrito.json();
                console.log('Carrito para crear pedido tras pago:', carrito);

                // 2) recuperar dirección de entrega de localStorage
                const direccionStr = localStorage.getItem('direccion_entrega_actual');
                if (!direccionStr) {
                    console.warn('No se encontró direccion_entrega_actual en localStorage.');
                    alert('El pago fue exitoso, pero no se encontró la dirección de entrega. Revisa tus pedidos.');
                }
                let direccionEntrega = null;
                try {
                    direccionEntrega = direccionStr ? JSON.parse(direccionStr) : null;
                } catch (e) {
                    console.error('Error al parsear direccion_entrega_actual:', e);
                }

                if (!direccionEntrega) {
                    // Si no hay dirección, no bloqueamos, pero avisamos
                    direccionEntrega = {
                        etiqueta: null,
                        calle: 'Sin dirección registrada',
                        ciudad: '',
                        estado: '',
                        cp: null
                    };
                }

                // 3) crear el pedido en la API con estado pagado
                const pedido = await crearPedidoDesdeCarrito(
                    carrito,
                    direccionEntrega,
                    stripeSessionIdFromUrl
                );

                // 4) vaciar carrito
                const respVaciar = await fetch(`${API_BASE_URL}/carritos/${carritoIdFromUrl}`, {
                    method: 'DELETE',
                });

                if (!respVaciar.ok) {
                    console.error('Error al vaciar carrito tras pago exitoso:', respVaciar.status, respVaciar.statusText);
                }

                const carritoVacio = await respVaciar.json();
                carritoActual = carritoVacio;
                renderCarrito(carritoVacio);

                // 5) limpiar dirección en localStorage
                localStorage.removeItem('direccion_entrega_actual');

                if (pedido) {
                    alert('¡Pago procesado y pedido creado correctamente!');
                } else {
                    alert('El pago fue exitoso, pero hubo un problema al crear el pedido.');
                }
            } catch (error) {
                console.error('Error de red al procesar pago exitoso:', error);
            }
        }
    }

    // === 8. Flujo inicial al cargar la página ===
    // 8.1. Procesar pago exitoso (crea pedido y vacía carrito)
    await procesarPagoExitoso();

    // 8.2. Si todavía no tenemos carritoActual, lo cargamos normalmente
    if (!carritoActual) {
        await cargarCarrito();
    }

    // 8.3. Cargar direcciones del usuario
    await cargarDireccionesUsuario();

    // === 9. Lógica de aplicar cupón (delegación de eventos) ===
    document.addEventListener('click', async (event) => {
        const target = event.target;

        if (target && target.id === 'apply-coupon-btn') {
            console.log('Click en botón "Aplicar cupón"');

            const couponInput = document.getElementById('coupon-code');
            if (!couponInput) {
                console.error('No se encontró el input de cupón (#coupon-code)');
                alert('No se encontró el campo para el cupón.');
                return;
            }

            if (!carritoActual || !carritoActual.id) {
                console.error('No hay carrito cargado para aplicar cupón', carritoActual);
                alert('No se encontró un carrito para aplicar el cupón.');
                return;
            }

            const codigo = couponInput.value.trim();
            if (!codigo) {
                alert('Por favor ingresa un código de cupón.');
                return;
            }

            try {
                console.log('Aplicando cupón con código:', codigo);
                const resp = await fetch(`${API_BASE_URL}/carritos/${carritoActual.id}/cupon`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ codigo }),
                });

                console.log('Respuesta al aplicar cupón, status:', resp.status);

                if (!resp.ok) {
                    console.error('Error al aplicar cupón:', resp.status, resp.statusText);
                    alert('El cupón no es válido, ha expirado o no existe.');
                    return;
                }

                const carritoActualizado = await resp.json();
                console.log('Carrito actualizado tras aplicar cupón:', carritoActualizado);

                carritoActual = carritoActualizado;
                renderCarrito(carritoActualizado);

                couponInput.value = '';
                alert('¡Cupón aplicado correctamente!');
            } catch (error) {
                console.error('Error de red al aplicar cupón:', error);
                alert('Hubo un error al aplicar el cupón. Intenta de nuevo.');
            }
        }
    });

    // === 10. Lógica de interacción en sección ENVÍO (opcional) ===
    const envioSection = document.querySelector('.checkout-section-envio');
    if (envioSection) {
        envioSection.addEventListener('click', () => {
            console.log('Click en sección ENVÍO.');
            // Aquí podrías hacer scroll o algún highlight, pero la UI ya está visible
        });
    }

    // === 11. Lógica de Finalización del Pedido con Stripe ===
    if (hacerPedidoBtn) {
        hacerPedidoBtn.addEventListener('click', async () => {
            console.log('Iniciando proceso de "Hacer pedido" con Stripe...');

            if (!carritoActual || !carritoActual.id || !Array.isArray(carritoActual.items) || carritoActual.items.length === 0) {
                alert('Tu carrito está vacío o no se pudo cargar correctamente.');
                return;
            }

            // 1) Asegurarnos de tener dirección de entrega y guardarla si es nueva
            const direccionEntrega = await construirDireccionEntregaYGuardarSiEsNueva();
            if (!direccionEntrega) {
                // hubo error o faltan datos
                return;
            }

            console.log('Dirección de entrega a usar (y guardada en localStorage):', direccionEntrega);

            // 2) Crear sesión de Stripe Checkout
            try {
                const basePath = `${window.location.origin}${window.location.pathname}`;
                const successUrl = `${basePath}?pago_exitoso=1&carritoId=${encodeURIComponent(
                    carritoActual.id
                )}&session_id={CHECKOUT_SESSION_ID}`;
                const cancelUrl = basePath;

                const response = await fetch(`${API_BASE_URL}/pagos/stripe/checkout`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        carritoId: carritoActual.id,
                        successUrl,
                        cancelUrl,
                    }),
                });

                if (!response.ok) {
                    console.error('Error al crear sesión de Stripe Checkout:', response.status, response.statusText);
                    alert('No se pudo iniciar el pago. Intenta de nuevo.');
                    return;
                }

                const data = await response.json();
                console.log('Stripe Checkout URL:', data.checkoutUrl);

                // Redirigir a Stripe Checkout
                window.location.href = data.checkoutUrl;
            } catch (error) {
                console.error('Error de red o servidor al iniciar Stripe:', error);
                alert('Error de conexión al intentar iniciar el pago.');
            }
        });
    }
});
