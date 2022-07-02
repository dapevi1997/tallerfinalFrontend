const labelId = document.getElementById('labelId');
const labelIdGamer = document.getElementById('labelIdGamer');
const btnBallot = document.getElementById('btnBallot');
const btnWinner = document.getElementById('btnWinner');



/**
 * Ocultar el label que contiene el id.
 */
labelId.style.display = 'none';
/**
 * Ocultar el label que contiene el id.
 */
labelIdGamer.style.display = 'none';
/**
* Guardado el id del contacto que se quiere manipular.
*/
const id = labelId.innerHTML; // id del juego
/**
* Guardado el id del contacto que se quiere manipular.
*/
const idGamer = labelIdGamer.innerHTML; // id del jugador
//
var markedNumbers= [];


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

const fillBlackboard = async () => {
    let result = await numbersBlackboardInDB();

    for (let index = 0; index < result.length; index++) {


        const element = result[index];
        let elementWithoutLetter = removeLetter(element);
        const numberInBlackboard = document.getElementById(`${element}`);
        numberInBlackboard.innerHTML = `${elementWithoutLetter}`;

    }


};

fillBlackboard();

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
        locationInPaperboard : justLocation
    };

};



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

const numbersForPaperboard = async () => {
    //await numberForBColumn();
    //await numberForIColumn();
    //await numberForNColumn();
    //await numberForGColumn()
    //await numberForOColumn();

    await fillPaperboard();

};
numbersForPaperboard();


const numberForBlackboard = async () => {
    let result = await numbersBlackboardInDB();
    let numbersDB = [];
    let number;
    let letter = '';



    for (let index = 0; index < result.length; index++) {
        const element = result[index];
        let elementWithoutLetter = await removeLetter(element);

        numbersDB[index] = elementWithoutLetter;

    }

    do {
        number = Math.round(Math.random() * (76 - 1) + 1)
        letter = '';
        if (number >= 1 && number <= 15) letter = "B";
        if (number >= 16 && number <= 30) letter = "I";
        if (number >= 31 && number <= 45) letter = "N";
        if (number >= 46 && number <= 60) letter = "G";
        if (number >= 61 && number <= 75) letter = "O";

    } while (numbersDB.includes(number));

    return letter + number;



};



const eventBtnBallot = async (e) => {
    e.preventDefault();

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
    let {numberInPaperboard} = numberInPaper;
    let {locationInPaperboard} = numberInPaper;

    for (let index = 0; index < numberInPaperboard.length; index++) {
        if (numberInPaperboard[index] == numberInBlackboard) {
            

            let id = locationInPaperboard[index] + 'P';

            const btn = document.getElementById(`${id}`);
            btn.addEventListener('click', ()=>{
                btn.disabled = true;
                markedNumbers.push(locationInPaperboard[index]);
            
            });
            
           
        }
        
    }
  
    await fillBlackboard();




};




const removeLetter = (numberWithLetter) => {
    let number = numberWithLetter.replace(/B|I|N|G|O/gi, '')
    return number;
};

const toWin1=()=>{
    let model = ['B1','I2'];

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

btnBallot.addEventListener('click', eventBtnBallot);
btnWinner.addEventListener('click',()=>{
    if ( toWin1() == true) {
        //jugador gana, poner nombre con corona, juego finalizado, botón de balotas apagado
    }else{
        //jugador tachado, btn ganar desabilitado y sacar balota
    }

 
 
});
