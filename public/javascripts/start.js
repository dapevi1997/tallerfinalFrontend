

const fillBlackboard = async()=>{
    //OJO el id pasado se pasa por variable
    const res = await fetch(`http://localhost:8080/numbersBlackboard/game/1`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },

    });

    const result = await res.json();
    for (let index = 0; index < result.length; index++) {
       

        const element = result[index];
        const numberInBlackboard = document.getElementById(`${element}`);
        numberInBlackboard.innerHTML = `${element}`;
      


    }
   
};

fillBlackboard();