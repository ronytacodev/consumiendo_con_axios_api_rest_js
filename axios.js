let pagina = 1;
let peliculas = '';
let ultimaPelicula;

// Creamos el observador
let observador = new IntersectionObserver((entradas, observador) => {
    entradas.forEach(entrada => {
        if(entrada.isIntersecting){
            pagina++;
            obtenerPeliculas();
        }
    });
}, {
    rootMargin: '0px 0px 200px 0px',
    threshold: 1.0
});


const obtenerPeliculas = async() => {
    try {
        const respuesta = await axios.get(`https://api.themoviedb.org/3/movie/popular`, {
            params: {
                // api_key: '99e72897d385b0031be579f9d1a4fae3',
                language: 'es-MX',
                page: 'pagina'
            },
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OWU3Mjg5N2QzODViMDAzMWJlNTc5ZjlkMWE0ZmFlMyIsInN1YiI6IjYzYjZjYzc4MDdlMjgxMDBhZmExNjlhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6vqpRvR3676GOnHz9hQsA4Gm5ZaCrKdglynDkQQdphU'
            }
        })

    console.log(respuesta)

            // Si la respuesta es correcta
            if(respuesta.status === 200) {
                
                respuesta.data.results.forEach(pelicula => {
                    peliculas += `
                    <div class="pelicula">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                        <h3 class="titulo">${pelicula.title}</h3>
                    </div>
                    `;
                });
    
                document.getElementById('contenedor').innerHTML = peliculas;
    
                if(pagina < 1000 ){
                    if(ultimaPelicula){
                        observador.unobserve(ultimaPelicula);
                    }
        
                    const peliculasEnPantalla = document.querySelectorAll('.contenedor .pelicula');
                    ultimaPelicula = peliculasEnPantalla[peliculasEnPantalla.length - 1];
                    observador.observe(ultimaPelicula);
                }
    
    
            } else if (respuesta.status === 401) {
                console.log('Pusiste la llave mal');
    
            } else if (respuesta.status === 404) {
                console.log('La película que buscas no existe');
    
            } else {
                console.log('Hubo un error y no sabemos que pasó');
            }

            
    } catch (error) {
        console.log(error)
    }
    

}

obtenerPeliculas();

