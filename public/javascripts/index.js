/**
 * Referencia al campo que contiene email del usuario.
 */
const txtEmail = document.getElementById('email');
/**
 * Referencia al campo que contiene la contraseña del usuario.
 */
const txtPassword = document.getElementById('password');
/**
 * Referencia al botón que guarda las credenciales del usuario.
 */
const btnLogIn = document.getElementById('btnLogIn');
/**
 * Función para preguntar si hay algún lobby activo.
 * @returns True o false si hay o no lobby activo, respectivamente.
 */
const isLobbyActived = async()=>{
    const res = await fetch('http://localhost:8080/isLobbieActived', {
        method: 'GET',
        mode: 'cors',

    });
    const result = await res.json();
    return result;
    
};
/**
 * Función para crear lobby
 * @returns Lobby creado
 */
const toCreateLobby = async() =>{
    const res = await fetch('http://localhost:8080/lobby', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            'actived': 1,
        })

    });
    const result = await res.json();

    return result;
};
/**
 * Función para ingresar un jugador a determinado lobby.
 * @param {String} mongoId Id guardado en MongoDB. 
 * @param {String} email Email guardado en MongoDB. 
 * @param {int} lobbyId Id del lobby en donde se desea inresar al jugador.
 * @returns Jugador ingresado.
 */
const putGamerIntoLobby = async(mongoId, email, lobbyId)=>{
    const res = await fetch('http://localhost:8080/gamer', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            'mongoId': mongoId,
            'email': email,
            'lobbyId': lobbyId
        })

    });

    const result = await res.json();
    return result;
 
};

/**
 * Callback para el evento del botón ingresar.
 */
const eventb = async()=>{

    const email= txtEmail.value;
    const passwordIn= txtPassword.value;

    const res = await fetch(`http://localhost:3000/user/find/${email}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
      
    });

    const result = await res.json();

    if (result == null) {
        alert('Usuario no registrado, por favor regístrese');
    } else {
        const {password} = result;
        const {email} = result;
        const {_id} = result;
        if (password === passwordIn) {
            
            let isLobbieActived = await isLobbyActived();
          

            if (isLobbieActived == null) {
                let lobby =  await toCreateLobby();
               let gamer = await putGamerIntoLobby(_id,email,lobby.id);
                 window.location.href = `http://localhost:3000/lobby/${lobby.id}/${gamer.id}`;
               
            } else {
                let gamer = await putGamerIntoLobby(_id,email,isLobbieActived);
                 window.location.href = `http://localhost:3000/lobby/${isLobbieActived}/${gamer.id}`;
                
            }
           

           
        } else {
            alert('contraseña inválida')
        }
    
        
    }

    
};





btnLogIn.addEventListener('click',eventb)

