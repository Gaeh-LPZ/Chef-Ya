document.addEventListener('DOMContentLoaded', () => {
    const googleSignInBtn = document.getElementById('google-signin-btn');

    // 1) Inicializamos Google Identity cuando el script de Google ya cargó
    function initGoogle() {
        if (!window.google || !google.accounts || !google.accounts.id) {
            console.error('Google Identity Services no está disponible todavía');
            return;
        }

        google.accounts.id.initialize({
            client_id: document
                .querySelector('meta[name="google-signin-client_id"]')
                .getAttribute('content'),
            callback: handleGoogleCredentialResponse
        });
    }

    /**
     * 2) Esta función la llama Google cuando el usuario se autentica.
     *    response.credential es el ID token (JWT) de Google.
     */
    async function handleGoogleCredentialResponse(response) {
        const idToken = response.credential;
        console.log('ID token de Google:', idToken);

        const apiUrl = 'http://localhost:8000/auth/google'; // ajusta a tu ruta real

        try {
            const resp = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id_token: idToken })
            });

            if (!resp.ok) {
                console.error('Error de autenticación:', resp.statusText);
                alert('Fallo en la autenticación. Intenta de nuevo.');
                return;
            }

            const data = await resp.json();
            // data.access_token, data.usuario, etc.
            console.log('Respuesta backend:', data);

            // Guarda el token de tu backend (no el de Google) para futuras peticiones
            localStorage.setItem('auth_token', data.access_token);

            alert('¡Inicio de sesión exitoso!');
            window.location.href = 'principal.html';
        } catch (error) {
            console.error('Error al llamar al backend:', error);
            alert('Error al conectar con el servidor de autenticación.');
        }
    }

    /**
     * 3) Cuando el usuario hace click en tu botón,
     *    lanzamos el prompt de Google (ventana de selección de cuenta).
     */
    if (googleSignInBtn) {
        googleSignInBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Mostrar prompt de Google...');
            google.accounts.id.prompt(); // abre el diálogo de Google
        });
    }

    // Esperamos un poco a que cargue el script de Google y luego inicializamos
    window.onload = () => {
        initGoogle();
    };
});
