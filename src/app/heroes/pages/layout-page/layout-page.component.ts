import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Route, Router } from '@angular/router';
import { User } from '../../../auth/interfaces/user.interface';

@Component({
  selector: 'heroes-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {

  public sideBarItems = [
    {label:'Listado',icon:'label' ,url:'./list'},
    {label:'Añadir' ,icon:'add'   ,url:'./new-hero'},
    {label:'Buscar' ,icon:'search',url:'./search'},
  ]

  constructor(
      private authService: AuthService,
      private router: Router,
  ){}

  get user():User | undefined {
    return this.authService.currentUser;
  }

  onLogout(){
    this.authService.logOut();
    this.router.navigate(['/auth/login']);
  }
}
