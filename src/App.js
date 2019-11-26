import React, { Component } from 'react';
import './App.css';
import BuscarPeliculas from './buscador/BuscarPeliculas';
import GrillaPeliculas from './buscador/GrillaPeliculas';
import Barra from './componentes/barra';
import Fot from './componentes/imagenes-des';
import Pun from './componentes/puntuadas';
import Rec from './componentes/recomendadas';




class App extends Component {



  constructor ()
	{
		//esto es lo que cargo y cambio
		super();
		this.state = { 
			grilla : [],
		}	
		//linkear funciones es lo que hace blind, hay que hacerlo siempre para que la app ecuentre la funcion que defini
		this.ejecutarBusqueda = this.ejecutarBusqueda.bind(this);
		this.okBusquedaPeli = this.okBusquedaPeli.bind(this);
		this.failBusqueda = this.failBusqueda.bind(this);
		
	}
// esta funcion hace que apenas entro a la pagina ya busque lo que quiero

	

	
	ejecutarBusqueda(nuevotitulo)
	{
		console.log("entre a buscar");
		BuscarPeliculas.invocarPeliculas(nuevotitulo,this.okBusquedaPeli,this.failBusqueda);
		
	}
	okBusquedaPeli(newData)
	{
		console.log("newData peli",newData);
		//refresca la pagina y la cambia con mi busqueda
		this.setState({grilla : newData});
	}
	

	failBusqueda(newData)
	{
		this.setState ({data : 'noData'});
	}
  
  render() {
    return (
      <div className="App">

			
            <Barra ejecutarBusqueda={this.ejecutarBusqueda}/>
            
			<GrillaPeliculas grilla={this.state.grilla}/>

           <section className="App-section">
                <div className="comp">
                  <div className="img">
                    <Fot/>
                  </div>
                  <div className="img">
                    <Pun/>
                  </div>  
                  <div className="img">
                    <Rec/>
                  </div>
                </div>                
            </section>
			
           
           
           
      </div>
    );
  }
}

export default App;
