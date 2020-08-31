import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Guards
import { LoginGuard } from './services/guards/login.guard';
import { CheckedGuard } from './services/guards/checked.guard';
//Componentes
import { PagesComponent } from './components/shared/pages/pages.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CrearusuarioComponent } from './components/usuarios/crearusuario/crearusuario.component';
import { CuentasxactivarComponent } from './components/usuarios/cuentasxactivar/cuentasxactivar.component';
import { CuentasbloqueadasComponent } from './components/usuarios/cuentasbloqueadas/cuentasbloqueadas.component';
import { CuentasactivasComponent } from './components/usuarios/cuentasactivas/cuentasactivas.component';
import { EditarUsuarioComponent } from './components/shared/usuarios/editar-usuario/editar-usuario.component';
import { AccesosComponent } from './components/accesos/accesos.component';
import { AccesosAprobadosComponent } from './components/accesos/accesos-aprobados/accesos-aprobados.component';
import { AccesosPendientesComponent } from './components/accesos/accesos-pendientes/accesos-pendientes.component';
import { MatrizComunicacionComponent } from './components/matriz-comunicacion/matriz-comunicacion.component';
import { FormulariosComponent } from './components/formularios/formularios.component';
import { DownloadComponent } from './components/shared/download/download.component';
import { EditarFormularioComponent } from './components/formularios/editar-formulario/editar-formulario.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AccesosDetallesComponent } from './components/accesos/accesos-detalles/accesos-detalles.component';
import { ChangepassComponent } from './components/changepass/changepass.component';
import { EditarmatrizComponent } from './components/shared/matriz/editarmatriz/editarmatriz.component';
import { NopagefoundComponent } from './components/shared/nopagefound/nopagefound.component';
import { ActualizarMatrizComponent } from './components/matriz-comunicacion/actualizar-matriz/actualizar-matriz.component';
import { AcesosSolicitarComponent } from './components/accesos/acesos-solicitar/acesos-solicitar.component';

const routes: Routes = [
  {path:'',component:PagesComponent,canActivate:[LoginGuard],canActivateChild:[CheckedGuard],children:[
    {path: 'home_staff', component: HomeComponent},
    {path: 'usuarios', component: UsuariosComponent},
    {path: 'cnu', component: CrearusuarioComponent},
    {path: 'acm', component: CuentasxactivarComponent},
    {path: 'cbl', component: CuentasbloqueadasComponent},
    {path: 'cat', component: CuentasactivasComponent},
    {path: 'edu/:idusuario', component: EditarUsuarioComponent},
    {path: 'mainaccesos', component: AccesosComponent},
    {path: 'acapr',component: AccesosAprobadosComponent},
    {path: 'acnapr',component: AccesosPendientesComponent},
    {path: 'sac',component: AcesosSolicitarComponent},
    {path: 'detalles/:idseguridad/:cedula_visitante/:compania_visitante',component: AccesosDetallesComponent},
    {path: 'cmdc', component: MatrizComunicacionComponent},
    {path: 'editar/:version/:idproyecto/:idusuario',component: EditarmatrizComponent},
    {path: 'camdc/:idproyecto',component:ActualizarMatrizComponent},
    {path: 'addforms', component: FormulariosComponent},
    {path: 'formularios/:form/:ext',component: DownloadComponent},
    {path: 'formulario/:doc/:ext',component:EditarFormularioComponent},
    {path: 'perfil',component: PerfilComponent},
    {path: '', pathMatch: 'full', redirectTo:'/home_staff'}
  ]},
  {path: 'login', component: LoginComponent},
  {path: 'password', component: ChangepassComponent},
  {path: '**',component: NopagefoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
