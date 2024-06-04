# [EmpathyShop](https://github.com/Iglesias0714/EmpathyShop_Proyectofinal_DMH) - [React Native](https://reactnative.dev)

EmpathyShop es una aplicación movil  desarrollada con React, TypeScript. La aplicación permite a los usuarios ver una lista de productos con sus nombres, precios y descripciones, así como añadir y eliminar productos. 
## Tabla de Contenido

- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
  - [Clona el repositorio](#clona-el-repositorio)
  - [Navega al directorio del proyecto](#navega-al-directorio-del-proyecto)
  - [Instala las dependencias](#instala-las-dependencias)
  - [Inicia el servidor de desarrollo](#inicia-el-servidor-de-desarrollo)
  - [Servidor o Backend de la aplicación](#servidor-o-backend-de-la-aplicación)
  - [Para Iniciar sesión en la aplicación o Logín](#para-iniciar-sesión-en-la-aplicación-o-logín)
- [Componentes del Proyecto](#componentes-del-proyecto)
- [Enlaces externos](#enlaces-externos)

## Tecnologías Utilizadas

- React Native
- TypeScript
- Adroid Studio
- Visual Studio Code
- Javascript


## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Iglesias0714/EmpathyShop_Movil 
   
2. Navega al directorio del proyecto:
   ```bash
   cd EmpathyShop_DMH

3. Instala las dependencias:
   ```bash
   npm install

4.  Inicia el servidor de desarrollo:
   ```bash
    npm run android
   ```
Importante para el paso anterior es necesario tener abierto y emulando Android Studio

5.  Servidor o Backend de la aplicación
   [EmpathyShop_Proyectofinal_DMH_Back](https://github.com/Iglesias0714/EmpathyShop_Proyectofinal_DMH_Back)

6. Para Iniciar sesión en la aplicación o Logín:

   
   Usuario:
    ```bash
    Polla
   ```
    Contraseña:
    ```bash
    12345
   ```


# Componentes del Proyecto


| Componente | Descripción | Enlace |
|------------|-------------|--------|
| `AboutUs.tsx` | Componente que muestra la información sobre la empresa EmpathyShop. | [AboutUs.tsx](./app/screens/AboutUs.tsx) |
| `Home.tsx` | Componente principal que muestra la lista de productos y un menú de navegación. | [Home.tsx](./app/screens/Home.tsx) |
| `Login.tsx` | Componente de inicio de sesión para la aplicación. | [Login.tsx](./app/screens/Login.tsx) |
| `MovimientosScreen.tsx` | Componente para registrar entradas y salidas de productos. | [MovimientosScreen.tsx](./app/screens/MovimientosScreen.tsx) |
| `ProductAdd.tsx` | Componente para agregar nuevos productos a la base de datos. | [ProductAdd.tsx](./app/screens/ProductAdd.tsx) |
| `ProductDetails.tsx` | Componente que muestra los detalles de un producto específico. | [ProductDetails.tsx](./app/screens/ProductDetails.tsx) |
| `style.ts` | Archivo de estilos compartidos entre varios componentes. | [style.ts](./app/style.ts) |
| `WebServiceParams.ts` | Archivo que define los parámetros para la conexión al servicio web. | [WebServiceParams.ts](./app/WebServiceParams.ts) |
| `localdb.ts` | Archivo que maneja la conexión y la inicialización de la base de datos local SQLite. | [localdb.ts](./app/persistance/localdb.ts) |
| `Product.ts` | Interfaz que define la estructura de un producto. | [Product.ts](./app/model/Product.ts) |
| `RoundButton.tsx` | Componente de botón redondo reutilizable. | [RoundButton.tsx](./app/controls/RoundButton.tsx) |
| `App.tsx` | Archivo principal de la aplicación que configura la navegación. | [App.tsx](./App.tsx) |


## Enlaces externos

- [React Native](https://reactnative.dev)
- [Typescript](https://www.typescriptlang.org)
- [Android Studio](https://developer.android.com/studio?hl=es-419)
- [Visual Studio Code](https://code.visualstudio.com)
- [JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript)
