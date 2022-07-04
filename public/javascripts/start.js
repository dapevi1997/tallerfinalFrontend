/**
 * Referencia a la etiqueta que contiene el id del juego.
 */
const labelId = document.getElementById('labelId');
/**
 * Referencia a la etiqueta que contiene el id del jugador.
 */
const labelIdGamer = document.getElementById('labelIdGamer');
/**
 * Referencia a la etiqueta que contiene el id del lobby.
 */
const labelIdLobby = document.getElementById('labelIdLobby');
/**
 * Referencia al botón que saca una balota.
 */
const btnBallot = document.getElementById('btnBallot');
/**
 * Referencia al botón que pulsa un usuario al percatarse que ganó.
 */
const btnWinner = document.getElementById('btnWinner');
/**
 * Referencia al campo que contiene la lista de jugadores en el lobby.
 */
const lobbyList = document.getElementById('lobbyList');
/**
 * Ocultar el label que contiene el id del juego.
 */
labelId.style.display = 'none';
/**
 * Ocultar el label que contiene el id del jugador.
 */
labelIdGamer.style.display = 'none';
/**
 * Ocultar el label que contiene el id del lobby.
 */
labelIdLobby.style.display = 'none';
/**
* Guardado el id del juego.
*/
const id = labelId.innerHTML;
/**
* Guardado el id del jugador.
*/
var idGamer = labelIdGamer.innerHTML;
/**
* Guardado el id del lobby.
*/
const idLobby = labelIdLobby.innerHTML; // id del lobby
/**
 * Variable para almacenar las posiciones de los números marcados por el usuario.
 */
var markedNumbers = [];

/**
 * Función para extraer los números que han salido en el tablero.
 * @returns Arreglo con números del tablero.
 */
const numbersBlackboardInDB = async () => {
    const res = await fetch(`http://localhost:8080/numbersBlackboard/game/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },

    });

    const result = await res.json();
    return result
};
/**
 * Función para llenar el tablero con los número salidos.
 */
const fillBlackboard = async () => {
    let result = await numbersBlackboardInDB();

    for (let index = 0; index < result.length; index++) {


        const element = result[index];
        let elementWithoutLetter = removeLetter(element);
        const numberInBlackboard = document.getElementById(`${element}`);
        numberInBlackboard.innerHTML = `${elementWithoutLetter}`;

    }


};
/**
 * Llenar el tablero al renderizar la página de inicio.
 */
const interval1 = setInterval(async () => {
    await fillBlackboard();

    let numbers = await numbersBlackboardInDB();
    

    let numberInPaper = await fillPaperboard();
    let { numberInPaperboard } = numberInPaper;
    let { locationInPaperboard } = numberInPaper;

    for (let j = 0; j < numbers.length; j++) {
        const element = removeLetter (numbers[j]);

        for (let index = 0; index < numberInPaperboard.length; index++) {
            if (numberInPaperboard[index] == element) {
    
    
                let id = locationInPaperboard[index] + 'P';
    
                const btn = document.getElementById(`${id}`);
                btn.addEventListener('click', () => {
                    btn.disabled = true;
                    markedNumbers.push(locationInPaperboard[index]);
    
                });
    
    
            }
    
        }
    }





}, 1000);

//fillBlackboard();
/**
 * Función para extraer los números que han salido y se encuentran en los cartones.
 * @returns Números en los cartones.
 */
const numberPaperboardInDB = async () => {

    const res = await fetch(`http://localhost:8080/numbersPaperboard/gamer/${idGamer}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },

    });

    const result = await res.json();
    return result
};
/**
 * Función para llenar el cartón con los diferentes números.
 * @returns Objeto con número y ubicación el mismo en el cartón.
 */
const fillPaperboard = async () => {
    let result = await numberPaperboardInDB();
    let justNumber = [];
    let justLocation = []

    for (let index = 0; index < result.length; index++) {

        const element = result[index];
        let array = element.split(".");
        let number = array[0];
        justNumber[index] = number;
        let location = array[1];
        justLocation[index] = location;

        const numberInPaperboard = document.getElementById(`${location + 'P'}`);
        if (location == 'N3') {
            numberInPaperboard.innerHTML = 'Libre';

        } else {
            numberInPaperboard.innerHTML = `${number}`;
        }


    }

    return {
        numberInPaperboard: justNumber,
        locationInPaperboard: justLocation
    };

};
/**
 * Generar números para la columna B
 */
const numberForBColumn = async () => {
    let number;
    let numbers = []
    let locations = ['B1', 'B2', 'B3', 'B4', 'B5'];

    for (let index = 0; index < 5; index++) {

        do {
            number = Math.round(Math.random() * (16 - 1) + 1);

        } while (numbers.includes(number));

        numbers[index] = number;

        const numberDB = number + '.' + locations[index];


        await fetch('http://localhost:8080/numberPaperboard', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                'number': numberDB,
                'gamerId': idGamer,

            })

        });



    }



};
/**
 * Generar números para la columna I
 */
const numberForIColumn = async () => {
    let number;
    let numbers = []
    let locations = ['I1', 'I2', 'I3', 'I4', 'I5'];

    for (let index = 0; index < 5; index++) {

        do {
            number = Math.round(Math.random() * (31 - 16) + 16);

        } while (numbers.includes(number));

        numbers[index] = number;

        const numberDB = number + '.' + locations[index];


        await fetch('http://localhost:8080/numberPaperboard', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                'number': numberDB,
                'gamerId': idGamer,

            })

        });



    }




};
/**
 * Generar números para la columna N
 */
const numberForNColumn = async () => {
    let number;
    let numbers = []
    let locations = ['N1', 'N2', 'N3', 'N4', 'N5'];

    for (let index = 0; index < 5; index++) {

        do {
            number = Math.round(Math.random() * (46 - 31) + 31);

        } while (numbers.includes(number));

        numbers[index] = number;

        const numberDB = number + '.' + locations[index];


        await fetch('http://localhost:8080/numberPaperboard', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                'number': numberDB,
                'gamerId': idGamer,

            })

        });



    }




};
/**
 * Generar números para la columna G
 */
const numberForGColumn = async () => {
    let number;
    let numbers = []
    let locations = ['G1', 'G2', 'G3', 'G4', 'G5'];

    for (let index = 0; index < 5; index++) {

        do {
            number = Math.round(Math.random() * (61 - 46) + 46);

        } while (numbers.includes(number));

        numbers[index] = number;

        const numberDB = number + '.' + locations[index];


        await fetch('http://localhost:8080/numberPaperboard', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                'number': numberDB,
                'gamerId': idGamer,

            })

        });



    }




};
/**
 * Generar números para la columna O
 */
const numberForOColumn = async () => {
    let number;
    let numbers = []
    let locations = ['O1', 'O2', 'O3', 'O4', 'O5'];

    for (let index = 0; index < 5; index++) {

        do {
            number = Math.round(Math.random() * (76 - 61) + 61);

        } while (numbers.includes(number));

        numbers[index] = number;

        const numberDB = number + '.' + locations[index];


        await fetch('http://localhost:8080/numberPaperboard', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                'number': numberDB,
                'gamerId': idGamer,

            })

        });



    }




};
/**
 * Funcion para llenar por completo el cartón del jugador.
 */
const numbersForPaperboard = async () => {
    await numberForBColumn();
    await numberForIColumn();
    await numberForNColumn();
    await numberForGColumn()
    await numberForOColumn();

    await fillPaperboard();

};
/**
 * Llamado de la función para llenar el cartón en cuento se renderise la página de inicio.
 */
numbersForPaperboard();

/**
 * Función para generar un número para el tablero.
 * @returns 
 */
const numberForBlackboard = async () => {
    let result = await numbersBlackboardInDB();
    //let numbersDB = [];
    let number = '';
    let letter = '';



    // for (let index = 0; index < result.length; index++) {
    //     const element = result[index];
    //     let elementWithoutLetter = removeLetter(element);

    //     numbersDB[index] = elementWithoutLetter;

    // }

    do {
        number = Math.floor(Math.random() * (76 - 1) + 1)
        letter = '';
        if (number >= 1 && number <= 15) letter = "B";
        if (number >= 16 && number <= 30) letter = "I";
        if (number >= 31 && number <= 45) letter = "N";
        if (number >= 46 && number <= 60) letter = "G";
        if (number >= 61 && number <= 75) letter = "O";

    } while (result.includes(letter + number));

    return letter + number;



};
/**
 * Callback para el botón que escoge una balota.
 * @param {String} e Variable para manejar el evento click. 
 */
const eventBtnBallot = async (e) => {
    e.preventDefault();

    let there = await thereWinner();

    if (there == null) {
        let number = await numberForBlackboard();
        let numberInBlackboard = removeLetter(number);


        await fetch('http://localhost:8080/numberBlackboard', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                'number': number,
                'gameId': id,

            })

        });

        let numberInPaper = await fillPaperboard();
        let { numberInPaperboard } = numberInPaper;
        let { locationInPaperboard } = numberInPaper;

        for (let index = 0; index < numberInPaperboard.length; index++) {
            if (numberInPaperboard[index] == numberInBlackboard) {


                let id = locationInPaperboard[index] + 'P';

                const btn = document.getElementById(`${id}`);
                btn.addEventListener('click', () => {
                    btn.disabled = true;
                    markedNumbers.push(locationInPaperboard[index]);

                });


            }

        }

        await fillBlackboard();
    } else {
        alert('Ya hay un ganador');
        idGamer = there;
        await fillGamers(1);
        clearInterval(interval1);

    }






};

const addEventTobtn = () => {

}
/**
 * Función para llenar la lista de jugadores en el juego en curso.
 */
const fillGamers = async (estado) => {
    const res = await fetch(`http://localhost:8080/gamer/lobby/${idLobby}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },

    });

    const result = await res.json();
    lobbyList.innerHTML = '';
    if (estado == -1) {
        for (let index = 0; index < result.length; index++) {

            const element = result[index];
            const array = await element.split(",");
            if (array[1] == idGamer) {
                lobbyList.innerHTML += `<li class="list-group-item" id= "${array[1]}">${array[0]}</li>`;
            } else {
                lobbyList.innerHTML += `<li class="list-group-item">${array[0]}</li>`;
            }

        }
    } else if (estado == 0) {

        for (let index = 0; index < result.length; index++) {

            const element = result[index];
            const array = await element.split(",");
            if (array[1] == idGamer) {
                lobbyList.innerHTML += `<li class="list-group-item" id= "${array[1]}"><del>${array[0]}</del></li>`;
            } else {
                lobbyList.innerHTML += `<li class="list-group-item">${array[0]}</li>`;
            }

        }
    } else if (estado == 1) {
        for (let index = 0; index < result.length; index++) {

            const element = result[index];
            const array = await element.split(",");
            if (array[1] == idGamer) {
                lobbyList.innerHTML += `<li class="list-group-item" id= "${array[1]}"><b>${array[0]} (ganador)</b></li>`;
            } else {
                lobbyList.innerHTML += `<li class="list-group-item">${array[0]}</li>`;
            }

        }
    }


};
fillGamers(-1);

/**
 * Función para eliminar la letra de un número
 * @param {String} numberWithLetter Número con la letra
 * @returns número sin la letra.
 */
const removeLetter = (numberWithLetter) => {
    let number = numberWithLetter.replace(/B|I|N|G|O/gi, '')
    return number;
};
/**
 * Función para determinar si el jugador ganó.
 * @returns True o false, si el jugador ganó o no, respectivamente.
 */
const toWin1 = () => {
    let model = ['B1', 'I2', 'G4', 'O5'];

    for (let index = 0; index < model.length; index++) {
        const element = model[index];
        if (markedNumbers.includes(element)) {
            continue
        } else {
            return false;
        }

    }
    return true;
};
/**
 * Función para determinar si el jugador ganó.
 * @returns True o false, si el jugador ganó o no, respectivamente.
 */
const toWin2 = () => {
    let model = ['B5', 'I4', 'G2', 'O1'];

    for (let index = 0; index < model.length; index++) {
        const element = model[index];
        if (markedNumbers.includes(element)) {
            continue
        } else {
            return false;
        }

    }
    return true;
};
/**
 * Creación del evento click para el botón que escoge una balota.
 */
btnBallot.addEventListener('click', eventBtnBallot);

/**
 * Función para modificar el estado del juego
 */
const toUpdateFinished = async () => {
    await fetch(`http://localhost:8080/finished/game/${id}`, {
        method: 'PATCH',
        mode: 'cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({

            'finished': 1
        })

    });
};
/**
 * Función para actualizar el id del jugador
 */
const toUpdateIdWinner = async () => {
    await fetch(`http://localhost:8080/idWinner/game/${id}`, {
        method: 'PATCH',
        mode: 'cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({

            'email': idGamer
        })

    });
};
/**
 * Función para obtener el id del ganador
 * @returns 
 */
const thereWinner = async () => {
    const res = await fetch(`http://localhost:8080/idWinner/game/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },

    });
    try {
        const result = await res.json();
        return result
    } catch (error) {
        return null;
    }




};

/**
 * Creación del evento click para el botón que pulsa el jugador al percatarse que ganó.
 */
btnWinner.addEventListener('click', async (e) => {
    e.preventDefault();

    let there = await thereWinner();

    if (there == null) {
        if (toWin1() == true || toWin2() == true) {

            await fillGamers(1);
            btnBallot.disabled = true;
            btnWinner.disabled = true;
            await toUpdateFinished();
            await toUpdateIdWinner();
            clearInterval(interval1);


        } else {
            await fillGamers(0);

            btnWinner.disabled = true;
            btnBallot.disabled = true;
            clearInterval(interval1);

        }
    } else {
        alert('Ya hay un ganador');
        idGamer = there;
        await fillGamers(1);
        clearInterval(interval1);
    }


});