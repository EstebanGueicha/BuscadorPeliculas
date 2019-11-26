import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import MiInfoIcon from './MiInfoIcon';



const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: 'rgb(0, 0, 0)',
  },
  gridList: {
    width: '100%',
    height: 'auto',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
});





function GrillaPeliculas(props) {
  const { classes } = props;
  console.log("props",props);
  
   //console.log("tileDAta", tileData); 
   //levanta el dato
   const tileData = props.grilla; 
 
   
   
  return (
    

    <div className={classes.root}>
      <GridList cellHeight={420} cols={4} className={classes.gridList}>
        
        {tileData.map(tile => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>by: {tile.author}</span>}
              actionIcon={
                <IconButton className={classes.icon} >
                  <MiInfoIcon titulo={tile.title} img={tile.img} fecha={tile.author}></MiInfoIcon>
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

GrillaPeliculas.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GrillaPeliculas);