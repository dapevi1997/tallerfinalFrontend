const lobbyList = document.getElementById('lobbyList');
const labelId = document.getElementById('labelId');
const btnStart = document.getElementById('btnStart');


/**
 * Ocultar el label que contiene el id.
 */
labelId.style.display = 'none';
/**
* Guardado el id del contacto que se quiere manipular.
*/
const id = labelId.innerHTML;

const filllobby = async () => {
    const res = await fetch(`http://localhost:8080/gamer/lobby/${id}`, {
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

filllobby();

const eventb= async(e)=>{
    e.preventDefault();
    await fetch('http://localhost:8080/game', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            'finished': 0,
            'lobbyId': id
        })

    });

    window.location.href = "http://localhost:3000/start/";

};

btnStart.addEventListener('click',eventb);
