const labelId = document.getElementById('labelId');
const btnBallot = document.getElementById('btnBallot');

/**
 * Ocultar el label que contiene el id.
 */
labelId.style.display = 'none';
/**
* Guardado el id del contacto que se quiere manipular.
*/
const id = labelId.innerHTML; // id del juego
//


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

    return  letter+number;
  


};



const eventBtnBallot = async(e)=>{
    e.preventDefault();

    let number = await numberForBlackboard();


    await fetch('http://localhost:8080/numberBlackboard', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            'number': number,
            'gameId': id,
            
        })

    });

    await fillBlackboard();
};




const removeLetter = (numberWithLetter) => {
    let number = numberWithLetter.replace(/B|I|N|G|O/gi, '')
    return number;
};

btnBallot.addEventListener('click', eventBtnBallot)
