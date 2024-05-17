//login
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

//registro
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
//orden
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
//comprobacion numeros comentario
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
//Esta parte controla las funciones del video
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

  function toggleMute() {
    video.muted = !video.muted;
  }

  function togglePlay() {
    if (video.paused) {
      video.play(); 
    } else {
      video.pause();
    }
  }