document.addEventListener('DOMContentLoaded', () => {
    const googleSignInBtn = document.getElementById('google-signin-btn');

    /**
     * Función para simular el inicio de sesión con Google (OAuth 2.0)
     */
    async function handleGoogleSignIn() {
        console.log('Iniciando flujo de Continuar con Google...');
        
        // En un escenario real, aquí se redirigiría al usuario a la URL de autenticación de Google
        // Por ejemplo: window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?...';

        // Una vez que el usuario regresa, el backend (FastAPI) manejaría el token. 
        // Aquí simulamos el éxito.
        const apiUrl = '/api/v1/auth/google/callback'; // Endpoint de FastAPI para manejar el token

        try {
            // Simulamos la llamada final al backend para obtener el token de sesión
            // En un flujo real, el token se enviaría desde la URL o una ventana emergente
            const response = await fetch(apiUrl, {
                method: 'GET', // o POST si estamos enviando credenciales o un código
                // headers, body, etc.
            });

            if (response.ok) {
                console.log('Autenticación exitosa. Obteniendo datos de usuario...');
                // Guardar token/sesión y redirigir
                // localStorage.setItem('auth_token', result.token);
                alert('¡Inicio de sesión con Google simulado exitosamente!');
                window.location.href = 'principal.html'; 
            } else {
                console.error('Error de autenticación:', response.statusText);
                alert('Fallo en la autenticación. Intenta de nuevo.');
            }

        } catch (error) {
            console.error('Error de red:', error);
            alert('Error al conectar con el servidor de autenticación.');
        }
    }

    // Listener para el botón de Google Sign-in
    if (googleSignInBtn) {
        googleSignInBtn.addEventListener('click', (e) => {
            e.preventDefault();
            handleGoogleSignIn();
        });
    }
});