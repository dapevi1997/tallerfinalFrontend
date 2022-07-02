/**
 * Referencia al botón registro de usuario.
 */
const btnRegister = document.getElementById('btnRegister');
/**
 * Referencia al campo que contiene la contraseña que desea registrar el usuario.
 */
const txtPassword = document.getElementById('password');
/**
 * Referencia al campo que contiene el email que desea registrar el usuario.
 */
const txtEmail = document.getElementById('email');

/**
 * Callback para el evento del botón registrar.
 */
const eventb = async () => {

    const email = txtEmail.value;
    const passwordIn = txtPassword.value;

    data = {
        "email": email,
        "password": passwordIn

    };


        const res = await fetch(`http://localhost:3000/user/save`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
    
        });
    
        result = await res.json();
        const { message } = result;
    
        if (message == 'Error') {
            alert('No se ha podido regitrar, verifique los datos.')
        } else {
            alert('Usuario registrado, puede cerrar esta pestaña.')
        }
   
};

/**
 * Creación del evento click para el botón de registro de usuario.
 */
btnRegister.addEventListener('click', eventb);