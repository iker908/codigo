function buscarVideos() {
    var query = document.getElementById("searchInput").value;

    if (!query) {
        alert("Por favor, ingresa un texto de búsqueda.");
        return;
    }

    var API_KEY = 'AIzaSyD-ZeLp3hHmwdQxh4ywMgxt5SRlXY_M9CI';
    var url = 'https://www.googleapis.com/youtube/v3/search?key=' + API_KEY + '&part=snippet&q=' + query;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('La respuesta de la API no es válida.');
            }
            return response.json();
        })
        .then(data => {
            mostrarResultados(data.items);
        })
        .catch(error => console.error('Error al buscar videos:', error));
}

function mostrarResultados(videos) {
    var resultadosContainer = document.getElementById('resultados');
    resultadosContainer.innerHTML = '';

    videos.forEach(video => {
        var videoId = video.id.videoId;

        if (videoId) {
            var iframe = document.createElement('iframe');
            iframe.src = 'https://www.youtube.com/embed/' + videoId;
            iframe.width = '560';
            iframe.height = '315';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'; 
            iframe.allowFullscreen = true;

            resultadosContainer.appendChild(iframe);
        } else {
            console.error('El video no tiene un ID válido:', video);
        }
    });
}