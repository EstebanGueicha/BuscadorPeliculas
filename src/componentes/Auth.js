import firebase from 'firebase/firebase'
import { Component } from 'react';


 class AuthController extends Component{



    handleAuthGoogle() {
        const provider= new firebase.auth.GoogleAuthProvider();
        firebase.auth().languageCode = 'es_ES';
        firebase.auth().signInWithPopup(provider)
        .then(result => console.log(`${result.user.email} ha iniciado sesion`))
        .catch(error =>console.log(`Error ${error.code}: ${error.message}`));
      }
     

}

export default new AuthController();