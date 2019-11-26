import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    label: 'Rapidos y Furiosos',
    imgPath:
      'http://cinemarmota.com/wp/wp-content/uploads/2017/04/TFATF-1-Poster.png',
  },
  {
    label: '+Rapido +Furioso',
    imgPath:
      'https://http2.mlstatic.com/rapido-y-furioso-2-2-fast-2-furious-dvd-original-usado-D_NQ_NP_4125-MLA141981479_5515-O.webp',
  },
  {
    label: 'Rapido y Furioso - Reto Tokio',
    imgPath:
      'https://vignette.wikia.nocookie.net/doblaje/images/b/b1/RF3CartelLatino.jpg/revision/latest?cb=20150301195449&path-prefix=es',
  },
  {
    label: 'Rapido y Furioso 4',
    imgPath:
      'http://www.descargatelotodo.com/wp-content/uploads/2017/06/rapido-y-furioso-4-2009-full-hd-latino-mega.jpg',
  },
  {
    label: 'Rapido y Furioso 5',
    imgPath:
      'https://piratasdescargando.files.wordpress.com/2016/09/rapido-y-furiosos-5.jpg?w=816',
  },
  {
    label: 'Rapido y Furioso 6',
    imgPath:
      'http://tupersonajefavorito.com/wp-content/uploads/2018/05/Rapido-y-furioso-6.jpg',
  },
  {
    label: 'Rapido y Furioso 7',
    imgPath:
      'https://www.neostuff.net/wp-content/uploads/2015/04/R%C3%A1pidos-y-furiosos-7-an%C3%A1lisis-rese%C3%B1a.jpg',
  },
  {
    label: 'Rapido y Furioso 8',
    imgPath:
      'https://www.nocreasnada.com/wp-content/uploads/2017/05/2017-05-08_590fcff01cee5_rapidos-y-furiosos-8-.jpg',
  },
  
];

const styles = theme => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.primary.main,
  },
  img: {
    height: 300,
    display: 'block',
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
  mobileStepper:{
    backgroundColor: theme.palette.primary.main,
  }
});

class SwipeableTextMobileStepper extends React.Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  handleStepChange = activeStep => {
    this.setState({ activeStep });
  };

  render() {
    const { classes, theme } = this.props;
    const { activeStep } = this.state;
    const maxSteps = tutorialSteps.length;

    return (
      <div className={classes.root}>
        <Paper square elevation={0} className={classes.header}>
          <Typography color="secondary">{tutorialSteps[activeStep].label}</Typography>
        </Paper>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={this.handleStepChange}
          enableMouseEvents
        >
          {tutorialSteps.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <img className={classes.img} src={step.imgPath} alt={step.label} />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          className={classes.mobileStepper}
          nextButton={
            <Button color="secondary"  size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
              Siguiente
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button color="secondary"  size="small" onClick={this.handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Atras
            </Button>
          }
        />
      </div>
    );
  }
}

SwipeableTextMobileStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SwipeableTextMobileStepper);
