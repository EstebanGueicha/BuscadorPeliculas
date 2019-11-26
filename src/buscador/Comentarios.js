import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import { Button, Grid, Paper } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import db from '../index';
import firebase from 'firebase/firebase'

const styles = theme => ({
  root: {
    margin: theme.spacing(2),
  },
  boton:{
    margin: theme.spacing(1),
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
  coment:{
    marginTop:theme.spacing(4)
  },
  paper:{
    margin: theme.spacing(3),
    background: theme.palette.primary.main,
    padding: theme.spacing(2, 1),
  }
});

class Comentarios extends React.Component{

  constructor(props){
    super(props);
    this.state={
      titulo:props.titulo,
      item:[],
      texto:"",
      user:null,
      nombre:"",
      avatar:[],
    }
  }



  componentDidMount(){
    const pelicula=this.state.titulo;
    
    db.collection(pelicula).onSnapshot((snapShots)=>{
      this.setState({
        item:snapShots.docs.map(doc=>{
          console.log(doc.data())
          return{id:doc.id,data:doc.data()}
        })
      })
    },error=>{
      console.log(error)
    });

    firebase.auth().onAuthStateChanged(user =>{
      this.setState({
        user:user
      });
    });
  }

  handleChange=(e)=>{
    this.setState({
      texto:e.target.value
    })
  };

  handleChangeParadespues(e) {
    this.state({ [e.target.name]: e.target.value });
  }


  agregarComent=()=>{
    const texto=this.state.texto;
    const pelicula=this.state.titulo;
    const nom=this.state.user.displayName;
    const ava=this.state.user.photoURL;
    db.collection(pelicula).add({
      item:texto,
      nombre:nom,
      avatar:ava
    }).then(()=>{
      console.log("Agregado")
    }).catch(()=>{
      console.log("error")
    })
  }

  sihayusu(){
    const { classes } = this.props;   

    if(this.state.user){
      return(
        <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.root}>
          <Grid item xs={2}>
            <Avatar img src={this.state.user.photoURL} alt={this.state.user.displayName}>{this.state.user.displayName.charAt(0)}</Avatar>
            <Typography>{this.state.user.displayName}</Typography>
          </Grid>
          <Grid item xs ={10}>
            <Input
             placeholder="Que te parecio la pelicula?" 
             fullWidth
             value={this.state.texto}
             onChange={this.handleChange}
             />  
            <Button color="primary" variant="contained" className={classes.boton} onClick={this.agregarComent}>Enviar</Button>
            
          </Grid>
        </Grid>
      )

    }else{
      return(
        <Grid>
          <Typography variant="h5">Inicia sesion para comentar la pelicula {this.state.titulo}</Typography>
        </Grid>
      )
    }

  }


  render(){
    const { classes } = this.props;   
    const items=this.state.item;

    return (
      <Grid 
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.root}
      >
          <Grid item xs={12}>
            <Typography color="primary" variant="h4" component="h3" align="left">
            Comentarios de {this.state.titulo}<br/><br/>
            </Typography>
          </Grid>

          {this.sihayusu()}

          <Grid item xs={12} className={classes.coment}>
              {items.map(item=>(
                <Paper className={classes.paper}>
                <Grid container
                direction="row"
                justify="center"
                alignItems="center"
                key={item.id}
                >
                  <Grid item xs={2}>
                  
                    <Avatar img src={item.data.avatar} alt={item.data.nombre}>{item.data.nombre.charAt(0)}</Avatar>
                    <Typography color="secondary" >{item.data.nombre}</Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography color="secondary" align="left" variant="h5">  {item.data.item} </Typography>
                  </Grid>
                  
                </Grid>
                </Paper>
                
              ))}
          </Grid>
          
      </Grid>        
    )
  }


}
  
export default withStyles(styles)(Comentarios);
