import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {UsuariosService} from './../../servicios/usuarios.service';
import {Router} from '@angular/router';
import {Firestore, collection, doc, getDoc, setDoc} from '@angular/fire/firestore';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  formLogin: FormGroup;
  private firestore: Firestore = inject(Firestore);
  userRole!: string;

  constructor(public usuariosService: UsuariosService, private router: Router) {
    this.userRole = localStorage.getItem('user_role') || '';
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  onSubmit() {
    this.usuariosService
      .login(this.formLogin.value)
      .then(async (response) => {
        console.log(response);
        const {
          user: {uid},
        } = response;
        const user = (await getDoc(doc(this.firestore, 'users', uid))).data() ?? {};
        localStorage.setItem('user_role', user['role']);
        localStorage.setItem('user_email', this.formLogin.value.email);
        this.router.navigate(['']);
      })
      .catch((error) => console.log(error));
  }
  google() {
    this.usuariosService
      .loginWithGoogle()
      .then((response) => {
        console.log(response);
        this.router.navigate(['']);
      })
      .catch((error) => console.log(error));
  }
  logout() {
    this.usuariosService.logout2();
  }
}
