import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core'
import firebase from 'firebase/firebase';

firebase.initializeApp({
    apiKey: "AIzaSyDqGPTfNqaML4iGs72UJZ8-DDlY47z6dvU",
  authDomain: "proyectofacupelis.firebaseapp.com",
  databaseURL: "https://proyectofacupelis.firebaseio.com",
  projectId: "proyectofacupelis",
  storageBucket: "proyectofacupelis.appspot.com",
  messagingSenderId: "118695446297",
  appId: "1:118695446297:web:7a7bced984395a82"
});

let db=firebase.firestore();

export default db;

const theme=createMuiTheme({
    palette:{
        primary: {
            light: '#4f83cc',
            main: '#01579b',
            dark: '#002f6c',
            contrastText: '#fff',
          },
          secondary: {
            light: '#ffffff',
            main: '#fafafa',
            dark: '#c7c7c7',
            contrastText: '#000',
            
          },
          
    }
    
})

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <App />
    </MuiThemeProvider>, 
    document.getElementById('root'));

  
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

