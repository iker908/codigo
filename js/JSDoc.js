/**
 * Funció per gestionar l'inici de sessió de l'usuari.
 * @version 1.0
 * @author Iker
 * @param {string} usuario - El nom d'usuari introduït.
 * @param {string} contraseña - La contrasenya introduïda.
 * @returns {void} Redirigeix a l'usuari a una nova pàgina si l'inici de sessió és exitos, sino mostra un error.
 */
$(document).ready(function() {
    $('#form2').submit(function(e) {
        e.preventDefault(); 

        var usuario = $('#usuario').val();
        var contraseña = $('#contraseña').val();


        $.ajax({
            type: 'POST',
            url: 'login.php',
            data: { usuario: usuario, contraseña: contraseña},
            success: function(response) {

                if (response === 'no') {
                    $('#mensajeError').text('¡El usuario o la contraseña no son correctos!');
                    $('#mensajeError').show();
                }else if(response === 'unknown'){
                    $('#mensajeError').text('Hay un error en la conexion');
                    $('#mensajeError').show();
                } else {
                    window.location.href = 'index.php';
                }
            }
        });
    });
});

/**
 * Funció per gestionar el registre d'un nou usuari.
 * @version 1.0
 * @author Iker
 * @param {string} usuario - El nom d'usuari introduït.
 * @param {string} correo - El correu electrònic introduït.
 * @param {string} contraseña - La contrasenya introduïda.
 * @returns {void} Mostra missatges d'error o redirigeix a l'usuari a una nova pàgina segons el cas.
 */
$(document).ready(function() {
    $('#form').submit(function(e) {
        e.preventDefault(); 

        var usuario = $('#usuario').val();
        var correo = $('#correo').val();
        var contraseña = $('#contraseña').val();

        $.ajax({
            type: 'POST',
            url: 'registro.php',
            data: { usuario: usuario, correo: correo, contraseña: contraseña},
            success: function(response) {
                if (response === 'usuario') {
                    $('#mensajeError').text('¡El nombre de usuario ya está en uso!');
                    $('#mensajeError').show();
                }else if(response === 'correo'){
                    $('#mensajeError').text('¡El correo ya está en uso!');
                    $('#mensajeError').show();
                }else if(response === 'unknown'){
                    $('#mensajeError').text('Hay un error en la conexion');
                    $('#mensajeError').show();
                } else {
                    alert('¡Usuario creado exitosamente!');
                    window.location.href = 'login.html';
                }
            }
        });
    });
});

/**
 * Funció per canviar variables de sessió d'uns filtres.
 * @version 1.0
 * @author Iker
 * @param {string} selector1_val - Valor del primer selector.
 * @param {string} selector2_val - Valor del segon selector.
 * @returns {void} Recarrega la pàgina després de canviar les variables de sessió.
 */
$(document).ready(function() {
    $('#selector1, #selector2').change(function() {
      var selector1_val = $('#selector1').val();
      var selector2_val = $('#selector2').val();
      $.ajax({
        url: 'cambiar_session.php',
        method: 'POST',
        data: { selector1_val: selector1_val, selector2_val: selector2_val },
        success: function(response) {
          console.log('Variable de sesión cambiada correctamente.');
          location.reload(); 
        }
      });
    });
  });

/**
 * Funció per validar si a introduït un numero valid i enviar una opinió de l'usuari.
 * @version 1.0
 * @author Iker
 * @param {number} valoracion - Valoració de l'usuari (del 0 al 5).
 * @param {string} message - Missatge d'opinió de l'usuari.
 * @returns {void} Mostrar missatges d'error o recarregar la pàgina segons el cas.
 */
$(document).ready(function() {
    $('#opinion_usuario').submit(function(e) {
        e.preventDefault(); 

        var valoracion = $('#valoracion').val();
        var message = $('#message').val();

        $.ajax({
            type: 'POST',
            url: 'comprobacion.php',
            data: { valoracion: valoracion, message: message},
            success: function(response) {
                if (response === 'no') {
                    $('#numeroIncorrecto').text('¡Introduce un numero del 0 al 5!');
                    $('#numeroIncorrecto').show();
                }else if(response === 'unknown'){
                    $('#numeroIncorrecto').text('Hay un error en la conexion');
                    $('#numeroIncorrecto').show();
                } else {
                    location.reload(); 
                }
            }
        });
    });
});

/**
 * Funció per gestionar l'acció de "like" o "dislike" en un element.
 * @version 1.0
 * @author Iker
 * @param {HTMLElement} button - Botó que ha estat clicat.
 * @param {string} id - Identificador de l'element a què es refereix el botó.
 * @returns {void} Actualitza l'estat de l'element segons l'acció de l'usuari.
 */
function toggleLike(button,id) {
    const likeCountElement = document.getElementById(id);
    let count = parseInt(likeCountElement.innerText);
    if(button.classList=="like-btn"){
        button.classList="like-btn_liked";
        count++;
        var liked = "si";
    }else{
        button.classList="like-btn";
        count--;
        var liked = "no";
    }
    likeCountElement.innerText = count;
    callPHPAction(liked,id);
};

/**
 * Funció per cridar una acció PHP a través d'AJAX.
 * @version 1.0
 * @author Iker
 * @param {string} variable1 - Valor de la primera variable a enviar.
 * @param {string} variable2 - Valor de la segona variable a enviar.
 * @returns {void} Envia una petició AJAX amb els paràmetres especificats.
 */
function callPHPAction(variable1, variable2) {
    const xhr = new XMLHttpRequest();
    const url = 'cambiar_like.php';
    const params = `variable1=${variable1}&variable2=${variable2}`;
    
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        console.log(xhr.responseText);
      }
    }
  
    xhr.send(params);
}
/**
 * Funció per canviar la mida d'un vídeo.
 * @version 1.0
 * @author Iker
 * @returns {void} Canvia la mida del vídeo quan és cridada.
 */
var video = document.getElementById("miVideo");
var videoGrande = false;
function cambiarTamaño() {
    if (!videoGrande) {
      video.style.width = "100%";
      videoGrande = true;
    } else {
      video.style.width = ""; 
      videoGrande = false;
    }
  }

/**
 * Funció per alternar el so del vídeo entre mutejat i no mutejat.
 * @version 1.0
 * @author Iker
 * @returns {void} Alterna l'estat de silenci del vídeo quan és cridada.
 */
var video = document.getElementById("miVideo");
function toggleMute() {
    video.muted = !video.muted;
  }

/**
 * Funció per alternar la reproducció/pausa del vídeo.
 * @version 1.0
 * @author Iker
 * @returns {void} Alterna l'estat de reproducció del vídeo quan és cridada.
 */
var video = document.getElementById("miVideo");
function togglePlay() {
    if (video.paused) {
      video.play(); 
    } else {
      video.pause();
    }
  }