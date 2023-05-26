import {Injectable} from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from '@angular/fire/auth';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private auth: Auth, private angularauth: AngularFireAuth, public router: Router) {
    const provider = new GoogleAuthProvider();
  }
  register({email, password}: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
  login({email, password}: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }
  


}
