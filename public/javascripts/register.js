const btnRegister = document.getElementById('btnRegister');
const txtPassword = document.getElementById('password');
const txtEmail = document.getElementById('email');


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

btnRegister.addEventListener('click', eventb);