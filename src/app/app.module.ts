import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PagesComponent } from './components/shared/pages/pages.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CrearusuarioComponent } from './components/usuarios/crearusuario/crearusuario.component';
import { CuentasxactivarComponent } from './components/usuarios/cuentasxactivar/cuentasxactivar.component';
import { CuentasactivasComponent } from './components/usuarios/cuentasactivas/cuentasactivas.component';
import { CuentasbloqueadasComponent } from './components/usuarios/cuentasbloqueadas/cuentasbloqueadas.component';
import { CheckusuariosComponent } from './components/shared/usuarios/checkusuarios/checkusuarios.component';
import { EditarUsuarioComponent } from './components/shared/usuarios/editar-usuario/editar-usuario.component';
import { AccesosComponent } from './components/accesos/accesos.component';
import { AccesosAprobadosComponent } from './components/accesos/accesos-aprobados/accesos-aprobados.component';
import { AccesosPendientesComponent } from './components/accesos/accesos-pendientes/accesos-pendientes.component';
import { MatrizComunicacionComponent } from './components/matriz-comunicacion/matriz-comunicacion.component';
import { EscogerProyectoComponent } from './components/shared/escoger-proyecto/escoger-proyecto.component';
import { MatrizComponent } from './components/shared/matriz/matriz/matriz.component';
import { FormulariosComponent } from './components/formularios/formularios.component';
import { DownloadComponent } from './components/shared/download/download.component';
import { EditarFormularioComponent } from './components/formularios/editar-formulario/editar-formulario.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AccesosDetallesComponent } from './components/accesos/accesos-detalles/accesos-detalles.component';
import { ChangepassComponent } from './components/changepass/changepass.component';
import { NopagefoundComponent } from './components/shared/nopagefound/nopagefound.component';
import { EditarmatrizComponent } from './components/shared/matriz/editarmatriz/editarmatriz.component';
import { TablaMatrizComponent } from './components/shared/matriz/tabla-matriz/tabla-matriz.component';
import { ActualizarMatrizComponent } from './components/matriz-comunicacion/actualizar-matriz/actualizar-matriz.component';
import { AcesosSolicitarComponent } from './components/accesos/acesos-solicitar/acesos-solicitar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PagesComponent,
    HomeComponent,
    NavbarComponent,
    UsuariosComponent,
    CrearusuarioComponent,
    CuentasxactivarComponent,
    CuentasactivasComponent,
    CuentasbloqueadasComponent,
    CheckusuariosComponent,
    EditarUsuarioComponent,
    AccesosComponent,
    AccesosAprobadosComponent,
    AccesosPendientesComponent,
    MatrizComunicacionComponent,
    EscogerProyectoComponent,
    MatrizComponent,
    FormulariosComponent,
    DownloadComponent,
    EditarFormularioComponent,
    PerfilComponent,
    AccesosDetallesComponent,
    ChangepassComponent,
    NopagefoundComponent,
    EditarmatrizComponent,
    TablaMatrizComponent,
    ActualizarMatrizComponent,
    AcesosSolicitarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
