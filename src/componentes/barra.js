import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import firebase from 'firebase/firebase';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LogoFace from './icono/logoFacebook.png';
import LogoGoogle from './icono/logoGoogle.png';
import AuthGoogle from './Auth';
import Inicio from './Inicio';








const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    marginLeft: 'auto',
    marginRight:'auto',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
    margin:  'auto',
    width:'50%',
  },
  searchIcon: {
    width: theme.spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingLeft: theme.spacing(10),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },

  
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(0, 0, 2),
  },
  icono:{
    margin: '4px',
    width: '30px',
    height: '30px',
  },
 
});



class Barra extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      texto:'',
      user:null,
      correo:'',
      contra:'',
      open: false,
      open2:false,
      open3:false,
      nombre:'',
      apellido:'',
      showPassword: false,
    };
    this.actualizar=this.actualizar.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.pasardatos=this.pasardatos.bind(this);
    this.handleAuth =this.handleAuth.bind(this);
    this.handleAuthFace =this.handleAuthFace.bind(this);
    this.handleIniciar =this.handleIniciar.bind(this);
    this.signup =this.signup.bind(this);
    this.handleRecupero =this.handleRecupero.bind(this);

   
  }
  componentWillMount(){
    firebase.auth().onAuthStateChanged(user =>{
      this.setState({
        user:user
      });
    });
  }

  handleAuth() {
    const provider= new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(result => console.log(`${result.user.email} ha iniciado sesion`))
    .catch(error =>console.log(`Error ${error.code}: ${error.message}`));
  }
  handleAuthFace(){
    const provider =new firebase.auth.FacebookAuthProvider();
    firebase.auth().languageCode = 'es_ES';
    firebase.auth().signInWithPopup(provider)
    .then(result => console.log(`${result.user.email} ha iniciado sesion`))
    .catch(error =>console.log(`Error ${error.code}: ${error.message}`));
  }
  handleLogout(){
    firebase.auth().signOut()
    .then(result => console.log(`${result.user.email} ha cerrado sesion`))
    .catch(error =>console.log(`Error ${error.code}: ${error.message}`));
  }

  handleIniciar(e){
    this.handleClose()
    e.preventDefault()
    firebase.auth().signInWithEmailAndPassword(this.state.correo,this.state.contra)
    .then(result => console.log(`${result.user.email} ha iniciado sesion`))
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode ==='auth/weak-password') {
        alert(errorMessage);
      } else {
        alert('Contrasena Incorrecta / o Usuario inexistente');
      }
      console.log(error);
    });
  }
  signup(e){
    var user = null;
    var nom=this.state.nombre;
    var ape=this.state.apellido;
    e.preventDefault()
    firebase.auth().createUserWithEmailAndPassword(this.state.correo, this.state.contra)
    .then(result => console.log(`${result.user.email} se ha registrado`))
    .then(function () {
      user = firebase.auth().currentUser;
      user.sendEmailVerification();
      user.updateProfile({
        displayName:nom+" "+ape,
      });
      
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode ==='auth/invalid-email') {
        alert(errorMessage);
      } else {
        alert('Correo electronico Existente');
      }
      
      console.log(error);
    });
  }

  handleRecupero(){
    firebase.auth().sendPasswordResetEmail(this.state.correo)
    .then(result => console.log(`${this.state.correo} Se ha enviado el mail`))
    .then(function(){
      alert('Se ha enviado el mail a '+this.state.correo+ ', ingese para recuperar su contraseña')
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode ==='auth/user-not-found') {
        alert(errorMessage);
      } else {
        alert('Correo electronico no encontrado');
      }
      console.log(error);
    });
    this.handleClose3();
    
  }
  
  
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  handleChangeContra = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
    
  };
  

  renderLoginButton(){
    const { classes } = this.props;   
    const open2= this.state.open2;
    const open3= this.state.open3;
    const open= this.state.open;
    

   
    if (this.state.user){
      if(this.state.user.emailVerified){
        return (
          <div >
              <PopupState variant="popover" popupId="demo-popup-menu">
                {popupState => (
                  <React.Fragment>
                    <IconButton variant="contained" {...bindTrigger(popupState)}>
                      <Avatar img src={this.state.user.photoURL} alt={this.state.user.displayName}>{this.state.user.displayName.charAt(0)}</Avatar>
                    </IconButton>
                    <Menu {...bindMenu(popupState)}>
                      <MenuItem onClick={popupState.close}>{this.state.user.displayName}</MenuItem>
                      <MenuItem  onClick={this.handleLogout}>Salir</MenuItem>
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState> 
                    
            
          </div>
      );
      
      }else{
        alert('Verifica tu mail y reinicia la pagina')
      }
      
      
    }else{
      return(
        <div>
              <Button onClick={this.handleClickOpen}>Apreta</Button>
              <Dialog open={open} onClose={this.handleClose}>
                        <Inicio/>
              </Dialog>
              <PopupState variant="popover" popupId="demo-popup-menu">
                {popupState => (
                  <React.Fragment>
                    <IconButton variant="contained" color="secondary" {...bindTrigger(popupState)}>
                      <AccountCircle />
                    </IconButton>
                    <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={this.handleClickOpen}>Iniciar Sesion</MenuItem>
                         {/*<Dialog open={open} onClose={this.handleClose}>
                       
                            <Container component="main" maxWidth="xs">
                                  <CssBaseline />
                                  <div className={classes.paper}>
                                    <Avatar className={classes.avatar}>
                                      <LockOutlinedIcon />
                                    </Avatar>
                                    <Typography component="h1" variant="h5">
                                      Iniciar Sesion
                                    </Typography>
                                    <form className={classes.form}>
                                      <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Correo Electronico"
                                        name="correo"
                                        type="correo"
                                        autoComplete="email"
                                        autoFocus
                                        value={this.state.correo}
                                        onChange={this.handleChange}
                                      />
                                      <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="contra"
                                        label="Contraseña"
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        id="password"
                                        autoComplete="current-password"
                                        value={this.state.contra}
                                        onChange={this.handleChangeContra('contra')}
                                        InputProps={{
                                        endAdornment: (
                                          <InputAdornment position="end">
                                            <IconButton
                                              edge="end"
                                              aria-label="Toggle password visibility"
                                              onClick={this.handleClickShowPassword}
                                            >
                                              {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                          </InputAdornment>
                                        ),
                                      }}
                                      />
                                      <FormControlLabel
                                        control={<Checkbox value="remember" color="primary" />}
                                        label="Recuerdame"
                                      />
                                      <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        onClick={this.handleIniciar}
                                      >
                                        Iniciar Sesion
                                      </Button>
                                      <Grid container>
                                        <Grid item xs>
                                          <Link href="#" onClick={this.handleClickOpen3} variant="body2">
                                            Olvidaste tu contraseña?
                                          </Link>
                                        </Grid>
                                        <Grid item>
                                          <Link href="#" onClick={this.handleClickOpen2}   variant="body2">
                                            {"No tienes cuenta? Registrate?"}
                                          </Link>
                                        </Grid>
                                      </Grid>
                                      <Grid container>
                                        <Grid item xs>
                                            <Button  
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                            onClick={AuthGoogle.handleAuthGoogle}
                                            >
                                            <img src={LogoGoogle} alt="LogoGoogle" className={classes.icono}/>
                                              Inicia Sesion con Google
                                            </Button>
                                            <Button  
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                            onClick={this.handleAuthFace}
                                            >
                                            <img src={LogoFace} alt="LogoFacebook" className={classes.icono}/>
                                              Inicia Sesion con Facebook
                                            </Button>
                                        </Grid>
                                      </Grid>
                                    </form>
                                  </div>
                                
                                </Container>
                               

                                <Inicio/>
                        </Dialog>
                      
                      */}
                

                      <MenuItem onClick={this.handleClickOpen2} >Registrar</MenuItem>
                      <Dialog open={open2} onClose={this.handleClose2}>     
                          <Container component="main" maxWidth="xs">
                          <CssBaseline />
                          <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                              <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                              Registrate
                            </Typography>
                            <form className={classes.form} noValidate>
                              <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                  <TextField
                                    autoComplete="fname"
                                    name="nombre"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="nombre"
                                    label="Nombre"
                                    autoFocus
                                    value={this.state.nombre}
                                    onChange={this.handleChange}
                                  />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <TextField
                                    autoComplete="apellido"
                                    name="apellido"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="apellido"
                                    label="Apellido"
                                    autoFocus
                                    value={this.state.apellido}
                                    onChange={this.handleChange}
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Correo Electronico"
                                        name="correo"
                                        type="correo"
                                        autoComplete="email"
                                        autoFocus
                                        value={this.state.correo}
                                        onChange={this.handleChange}
                                      />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="contra"
                                        label="Contraseña"
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        id="password"
                                        autoComplete="current-password"
                                        value={this.state.contra}
                                        onChange={this.handleChangeContra('contra')}
                                        InputProps={{
                                        endAdornment: (
                                          <InputAdornment position="end">
                                            <IconButton
                                              edge="end"
                                              aria-label="Toggle password visibility"
                                              onClick={this.handleClickShowPassword}
                                            >
                                              {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                          </InputAdornment>
                                        ),
                                      }}
                                      />
                                </Grid>
                                
                              </Grid>
                              <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={this.signup}
                              >
                                Registrarse
                              </Button>
                              <Grid container justify="flex-end">
                                <Grid item>
                                  <Link href="#r" onClick={this.handleClickOpen}   variant="body2">
                                    {"Ya tienes cuenta? Inicia Sesion"}
                                  </Link>
                                </Grid>
                              </Grid>
                            </form>
                          </div>
                          
                        </Container>
                      </Dialog>
                    </Menu>
                    
                    
                                      
                    <Dialog open={open3} onClose={this.handleClose3} aria-labelledby="form-dialog-title">
                      <DialogTitle id="form-dialog-title">Recupero de Contraseña</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Ingrese su correo electronico para que le envien un mail y recupere su contraseña
                        </DialogContentText>
                                      <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Correo Electronico"
                                        name="correo"
                                        type="correo"
                                        autoComplete="email"
                                        autoFocus
                                        value={this.state.correo}
                                        onChange={this.handleChange}
                                      />
                        
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={this.handleClose3} color="primary">
                          Cancelar
                        </Button>
                        <Button onClick={this.handleRecupero} color="primary">
                         Enviar
                        </Button>
                      </DialogActions>
                    </Dialog>

                  </React.Fragment>
                )}
              </PopupState>       
            
        </div>
        
      );    
    }
  }



  actualizar(nuevoTitulo)
	{
		this.setState({texto : nuevoTitulo.target.value});
  }
  
  pasardatos(){
    this.props.ejecutarBusqueda(this.state.texto)
  }  

  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      this.pasardatos()
    }
  }
  
  
  handleClickOpen=() => {
    this.setState({open: true });
    this.handleClose2();
   }
  handleClose=() => {
    this.setState({open: false });
  }
  handleClickOpen2=() => {
    this.setState({open2: true });
    this.handleClose();
   }
  handleClose2=() => {
    this.setState({open2: false });

  }
  handleClickOpen3=() => {
    this.setState({open3: true });
   }
  handleClose3=() => {
    this.setState({open3: false });
  }

  render() {
    const { classes } = this.props;
   

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              Q^Peli!?
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Buscar Pelicula…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
      //textooo
                value={this.state.texto}
                onChange={this.actualizar}
                onKeyPress={this.handleKeyPress}
              />
            </div>
            <Button variant="contained" color="secondary" className={classes.button} onClick={this.pasardatos}>
               Buscar
            </Button>
            <div className={classes.grow} />
            {this.renderLoginButton()}
           
          </Toolbar>
        </AppBar>
        
        
        
        
      </div>
    );
  }
}

Barra.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Barra);
