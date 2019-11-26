import {Component} from 'react';


const url ="http://www.omdbapi.com/?i=tt3896198&apikey=";
const apiKEY="d0b64143";

class BuscarPeliculas extends Component
{
   
    createData(item,idArray) 
    {

        if (item.Poster === "N/A")
        {
            return { 
                id: idArray,
                //asi pongo una imagen de mi pc y la pongo en mi carpeta de proyecto
               
                title: item.Title,
                author: item.Year,     
                runtime: item.Runtime,
                genre:item.Genre,
                director:item.Director,
                rated:item.Rated,
                production:item.Production,
                };
        }
        else
        {
            return {  
           
            id: idArray,
            img: item.Poster,
            title: item.Title,
            author: item.Year,
            runtime: item.Runtime,
            genre:item.Genre,
            director:item.Director,
            rated:item.Rated,
            production:item.Production,
            };
        }
    }

    invocar(title,okBusqueda,failBusqueda)
    {
        const endpoint = `${url}${apiKEY}&t=${title}`;
        console.log("Buscando")
        fetch(endpoint
        ).then ((response) => {
            
            return response.json();
        }).then (responseData => {
            console.log(responseData);
            
                console.log("Entre");
                const {Title,Actors,Genre,Language,Poster,Runtime, Director,Rated,Production}= responseData;
                const newData = {Title: Title, Genre: Genre,Actors: Actors, Language: Language, Poster: Poster,Runtime:Runtime,Director:Director,Rated:Rated,Production:Production };
            //console.log(newData);
                okBusqueda(newData)
          
          
          
        });
    }
    invocarPeliculas(title,okBusqueda,failBusqueda)
    {
        const endpoint = `${url}${apiKEY}&s=${title}`;
        console.log("Buscando todas las peliculas")
        //esto te muestra el circulito que esta cargando
        fetch(endpoint
        ).then ((response) => {
            
            return response.json();
        }).then (responseData => {
            //resultado de la pelicula buscada
            console.log("response peliculas",responseData);
            //recibo el search q es de la api, la formateo y createdata con el formato mio
            var i,newArray = [];
            for (i = 0; i < responseData.Search.length; i++) 
            {
                newArray.push(this.createData(responseData.Search[i],i));
            }
          
               //muestro y ejecuto la funcion que me traje
                okBusqueda(newArray)
          
          
          
        });
    }
}
export default new BuscarPeliculas();