import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {UsuariosService} from './../../servicios/usuarios.service';
import {Router} from '@angular/router';
import {Firestore, collection, doc, addDoc, setDoc} from '@angular/fire/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  formGroup: FormGroup;
  private firestore: Firestore = inject(Firestore);
  userRole!: string;

  ngOnInit(): void {}
  constructor(private usuariosService: UsuariosService, private router: Router) {
    this.userRole = localStorage.getItem('user_role') || '';
    this.formGroup = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }
  onSubmit() {
    this.usuariosService
      .register(this.formGroup.value)
      .then((response) => {
        const {uid} = response.user;
        const {email} = this.formGroup.value;
        setDoc(doc(this.firestore, 'users/' + uid), {email: email, role: 'usuario'});
        this.router.navigate(['']);
        this.usuariosService.login(this.formGroup.value);
        localStorage.setItem('user_role', 'usuario' ?? '');
        localStorage.setItem('user_email', this.formGroup.value.email);
      })
      .catch((error) => console.log(error));
  }
  logout() {
    this.usuariosService.logout2();
  }
}
