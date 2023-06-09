let pagina = 1;
let peliculas = '';
let ultimaPelicula;
/* 
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
	if(pagina < 1000){
		pagina += 1;
		cargarPeliculas();
	}
});

btnAnterior.addEventListener('click', () => {
	if(pagina > 1){
		pagina -= 1;
		cargarPeliculas();
	}
});
*/

/**/

let observador = new IntersectionObserver((entradas, observador)=>{
  console.log(entradas);

  entradas.forEach(entrada =>{
     if(entrada.isIntersecting){
        pagina++;
		cargarPeliculas();
	 }
  });

},{
	rootMargin: '0px 0px 200px 0px',
	threshold: 1.0

});


const cargarPeliculas = async() => {
	try {
		const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page=${pagina}`);
	
		//console.log(respuesta);

		// Si la respuesta es correcta
		if(respuesta.status === 200){
			const datos = await respuesta.json();
			
			
			datos.results.forEach(pelicula => {
				peliculas += `
					<div class="pelicula">
						<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
						<h3 class="titulo">${pelicula.title}</h3>
					</div>
				`;
			});

			document.getElementById('contenedor').innerHTML = peliculas;

			const peliculasEnPantalla = document.querySelectorAll('.contenedor .pelicula');
			console.log(peliculasEnPantalla);

			ultimaPelicula = peliculasEnPantalla[peliculasEnPantalla.length - 1];

			console.log(ultimaPelicula);

			observador.observe(ultimaPelicula);

		} else if(respuesta.status === 401){
			console.log('Pusiste la llave mal');
		} else if(respuesta.status === 404){
			console.log('La pelicula que buscas no existe');
		} else {
			console.log('Hubo un error y no sabemos que paso');
		}

	} catch(error){
		console.log(error);
	}

}

cargarPeliculas();