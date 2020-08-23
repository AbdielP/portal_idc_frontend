### Features

- Aplicación para administración de cuentas, solicitudes e información de clientes/usuarios.
  - Frontend desarrollado con Angular.
  - Backend Javascript hecho en NodeJS. Requiere ejecutar la aplicación @portal_idc_server
  - Estilos hechos en **CSS** y **Bootstrap 4**
- El portal IDC cuenta con las siguientes funcionalidades:
  - Creacion de cuentas de usuario para el portal de administración o portal de clientes.
    - Administrar cuentas de usuarios, contraseñas, bloquear cuentas, habilitar o deshabilitar cuentas.
  - Creación de matriz de comunicación de clientes:
    - Asigna cuentas de usuarios a la matriz de comunicación de uno (1) o más clientes.
    - Permite editar los roles del usuario sobre la matriz del cliente. **Solicitar acceso**,**Editar matriz de comunicación**, y otras.
  - Solicitud de accesos a los centros de datos.
    - Formulario para solicitud de accesos.
____________
### Inicio de sesión
Acceso por login con usuario y contraseña. El acceso se puede restringir desde la base de datos.
<img src="src/assets/img_readme/login.png" alt="" width="60%">
### Página de usuarios
Menú principal de usuarios.

<img src="src/assets/img_readme/usuarios_crear.png" alt="" width="45%"> <img src="src/assets/img_readme/usuarios_listar.png" alt="" width="49%">
<img src="src/assets/img_readme/usuarios.png" alt="" width="60%">

_________________
# Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
