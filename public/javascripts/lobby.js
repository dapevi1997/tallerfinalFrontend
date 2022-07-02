/**
 * Referencia al campo que contiene la lista de jugadores en el lobby.
 */
const lobbyList = document.getElementById('lobbyList');
/**
 * Referencia a la etiqueta que contiene el id del lobby.
 */
const labelId = document.getElementById('labelId');
/**
 * Referencia a la etiqueta que contiene el id del jugador.
 */
const labelIdGamer = document.getElementById('labelIdGamer');
/**
 * Referencia al botón que empieza el juego.
 */
const btnStart = document.getElementById('btnStart');
/**
 * Ocultar el label que contiene el id del lobby.
 */
labelId.style.display = 'none';
/**
 * Ocultar el label que contiene el id del jugador.
 */
 labelIdGamer.style.display = 'none';
/**
* Guardado el id del lobby.
*/
const idLobby = labelId.innerHTML; 
/**
* Guardado el id del jugador.
*/
const idGamer = labelIdGamer.innerHTML;
/**
 * Funciíon para llenar el lobby con los jugadores en él.
 */
const filllobby = async () => {
    const res = await fetch(`http://localhost:8080/gamer/lobby/${idLobby}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },

    });

    const result = await res.json();

    for (let index = 0; index < result.length; index++) {

        const element = result[index];
        lobbyList.innerHTML += `<li class="list-group-item">${element}</li>`;

    }
 
};
/**
 * Llamado de la función al renderizar la página lobby.
 */
filllobby();

/**
 * Callback para el evento del botón iniciar.
 */
const eventb= async(e)=>{
    e.preventDefault();

    const game = await fetch('http://localhost:8080/game', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            'finished': 0,
            'lobbyId': idLobby
        })

    });

    const result = await game.json();
    let id = result.id;


    window.location.href = `http://localhost:3000/start/game/${id}/${idGamer}/${idLobby}`;

};

btnStart.addEventListener('click',eventb);
