import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Comentarios from './Comentarios';

const styles = theme => ({
    appBar: {
      position: 'relative',
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  });

class MiInfoIcon extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            open: false,
            titulo: props.titulo,
            imagen: props.img,
            fecha: props.fecha,
        }
    }
    

    handleClickOpen=() => {
        this.setState({open: true });
       }
      handleClose=() => {
        this.setState({open: false });
      }
    
    render()
    {
        const { classes } = this.props;   
        const open= this.state.open;
        return(
            <div>
            
                <InfoIcon  onClick={this.handleClickOpen}   />
                <Dialog  open={open} onClose={this.handleClose} >
                <AppBar className={classes.appBar}>
                      <Toolbar>
                        
                        <Typography variant="h6" className={classes.title}>
                        {this.state.titulo}
                        </Typography>
                        <IconButton edge="end" color="inherit" onClick={this.handleClose} aria-label="Close">
                          <CloseIcon />
                        </IconButton>
                      </Toolbar>
                    </AppBar>
                    
                    <Grid container spacing={4}>
                      <Grid item>
                       <img src={this.state.imagen} alt={this.state.titulo}/>
                      </Grid>
                      <Grid item xs={12} sm 
                        container
                        direction="column"
                        justify="center"
                        alignItems="flex-start">

                      
                      <Grid item md>
                        <Typography variant="h5">
                          Titulo: {this.state.titulo}
                          <br/>
                          
                        </Typography>
                      </Grid>
                      <Grid item  md>
                        <Typography variant="h5">
                          Fecha de estreno: {this.state.fecha}
                          <br/>
                        </Typography>
                      </Grid>
                      
                      </Grid>
                    </Grid>
                    
                    <Comentarios titulo={this.state.titulo}/>
                </Dialog>
            </div>
        )
    }

}

export default withStyles(styles)(MiInfoIcon);

  
  
