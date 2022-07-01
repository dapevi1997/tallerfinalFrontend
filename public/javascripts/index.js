const txtEmail = document.getElementById('email');
const txtPassword = document.getElementById('password');
const btnLogIn = document.getElementById('btnLogIn');

const isLobbyActived = async()=>{
    const res = await fetch('http://localhost:8080/isLobbieActived', {
        method: 'GET',
        mode: 'cors',

    });
    const result = await res.json();
    return result;
    
};

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
        //mandar para el lobby
        const {password} = result;
        const {email} = result;
        const {_id} = result;
        if (password === passwordIn) {
            
            let isLobbieActived = await isLobbyActived();
          

            if (isLobbieActived == null) {
                let lobby =  await toCreateLobby();
                console.log(lobby); // funciona 
                console.log(lobby.id); //funciona
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

