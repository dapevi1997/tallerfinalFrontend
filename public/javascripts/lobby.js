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
 * Función para llenar el lobby con los jugadores en él.
 */
const filllobby = async () => {
    const res = await fetch(`http://localhost:8080/gamer/lobby/${idLobby}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },

    });

    const result = await res.json();

    lobbyList.innerHTML = '';

    for (let index = 0; index < result.length; index++) {

        const element = result[index];
        const array = element.split(",");
        lobbyList.innerHTML += `<li class="list-group-item">${array[0]}</li>`;

    }

};
/**
 * Llamado de la función al renderizar la página lobby.
 */
filllobby();

/**
 * Callback para el evento del botón iniciar.
 */
const eventb = async () => {
  

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


const toCreateBarProgress = async () => {
    await fetch('http://localhost:8080/barProgress', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            'idLobby': idLobby,
            'var': 0
        })

    });
};


const toGetVar = async () => {
    const res = await fetch(`http://localhost:8080/var/lobby/${idLobby}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },

    });

    const result = await res.json();
    return result;
};

const toModifyVar = async (value) => {

    await fetch(`http://localhost:8080/bar/lobby/${idLobby}`, {
        method: 'PATCH',
        mode: 'cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({

            'var': value
        })

    });


};



const isLobbyActived = async () => {
    const res = await fetch('http://localhost:8080/isLobbieActived', {
        method: 'GET',
        mode: 'cors',

    });
    const result = await res.json();
    console.log(result)
    return result;
};

const toFinishLobby = async (value) => {
    await fetch(`http://localhost:8080/activated/lobby/${idLobby}`, {
        method: 'PATCH',
        mode: 'cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({

            'actived': value
        })

    });
};

const fillBarprogress = async () => {
    let isLobbieActived = await isLobbyActived();
    if (isLobbieActived == null) {
        await toCreateBarProgress();
        const timer = setInterval(async () => {
            const value = await toGetVar();
            await toModifyVar(value + 10);
            const progressbar = document.getElementById('progressbar');
            progressbar.style = `width: ${value}%`;
            if (value == 100) {
                await toModifyVar(0);
                await toFinishLobby(0);
                clearInterval(timer);
                await eventb();

            }
            await filllobby();
        }, 3000)
    } else {
        const timer = setInterval(async () => {
            const value = await toGetVar();
            const progressbar = document.getElementById('progressbar');
            progressbar.style = `width: ${value}%`;
            if (value == 100) {
                await toFinishLobby(0);
                clearInterval(timer);
                await eventb();
                
                
            }
            await filllobby();
        }, 1000);
    }

};
fillBarprogress();



