# Frontend del Taller final.

Nota: el frontend se debe montar en el puerto 3000 para no tener problemas 
con los cors al hacer llamado de APIs.

Video: https://youtu.be/4hpodG8q2f8

Figuras para ganar el bingo (cada color es una opción para ganar): 

![](https://i.ibb.co/VJfHgqf/ganar.png)

Funcionamiento del juego:

Al Para comenzar el juego es necesario dirigirse a la dirección:
http://localhost:3000/

![](https://i.ibb.co/0hQpmcZ/P-gina-de-inicio.png)

Si se está registrado puede ingresar con el correo y la contraseña
que utilizó al momento del registro, en caso contrario, debe registrarse
haciendo clic en el link "Registrarse".


![](https://i.ibb.co/SsHtjD0/pagina-registro.png)


Luego de que el usuario registrado entre se ingresa al lobby que esté en curso,
si no hay lobby en curso, el sistema creará uno nuevo con el usuario que 
acaba de ingresar.

![](https://i.ibb.co/JFKL1nw/lobby.png)


Una vez en el lobby, comienza la espera de los demás jugadores, al llenarse
la barra de espera el juego comienza y se remite a la página de inicio del
mismo.

![](https://i.ibb.co/jGBFkxQ/inicio.png)


Cada jugador tiene un cartón con números distintos. El tablero es el mismo
para cada juego en particular.

Al hacer click en el botón "Sacar balota" se escoge un número al azar entre
1 y 75 no repetido y se muestra en el tablero, por tanto se habilita un evento
click en el cartón del jugador sobre el número, en caso de que se encuentre
en el cartón. 

El usuario debe hacer clic en el número en el cartón para marcar el número
que salió en el tablero. Al completar las líneas estipuladas con el juego
el usuario puede dar click en el botón "Gané" y se muestra en negritas el
ganador.

