import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import AuthController from './Auth';





const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
    margin: theme.spacing(3, 0, 2),
  },
  
});

class IniciarSesion extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      texto:'',
      correo:'',
      contra:'',
      showPassword: false,
    };
    this.handleChange=this.handleChange.bind(this);
    this.loginCorreo=this.loginCorreo.bind(this);
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

  
  loginCorreo(correo,contra){
    AuthController.handleIniciar(correo,contra);
  }

  

  render(){
    const { classes } = this.props;  

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar Sesion
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
           
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
            label="Recordarme"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => {
              this.loginCorreo(this.state.correo,this.state.contra);
              }}
          >
            Iniciar Sesion
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Olvidaste la contraseña?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"No tenes Cuenta? Registrate"}
              </Link>
            </Grid>
          </Grid>
          <Grid container>
          <Grid item xs>
              <Button onClick={AuthController.handleAuthGoogle}>golllldasldlsa</Button>
          </Grid>
        </Grid>
        </form>
      </div>
      
    </Container>
  );
}
}

IniciarSesion.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IniciarSesion);
