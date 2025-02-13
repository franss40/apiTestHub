# testHub API

Este proyecto representa la API para la aplicación **testHub**. Está construida con **Node.js**, **Express** y **TypeScript**, y utiliza **MySQL2** como sistema de gestión de base de datos. 

## Descripción

La API de **testHub** está diseñada para interactuar con la base de datos y manejar solicitudes de los usuarios a través de rutas REST con un enfoque en escalabilidad y robustez.

## Base de datos

Para la conexión a la base de datos **MySQL** se utiliza la libreria **MySQL2**. La base de datos se conecta a través de un archivo de configuración **.env**. Para la creación de la base de datos, puedes usar el script **testhub.sql** que se encuentra en la raíz del proyecto.

## Pruebas

Para las pruebas se ha utilizado Supertest con Jest. Las pruebas se llevan a cabo en una base de datos imagen a la real con el nombre de test_testhub en un espacio controlado para la ejecución de las pruebas. Las constantes estan en el archivo .env.

## Archivo de configuración

El archivo de configuración **.env** se encuentra en la raíz del proyecto y contiene las credenciales de la base de datos y el puerto de la aplicación **node**:

- PORT=<tu_puerto>
- HOST=127.0.0.1
- USER=<tu_usuario_mysql>
- PASSWORD=<tu_contraseña_mysql>
- DATABASE=<tu_base_de_datos_mysql>
- JWT_SECRET=<tu_secret_jwt>

## Instalación

Para instalar el proyecto en tu máquina local, siga estos pasos:

1. Clona el repositorio:
  https://github.com/franss40/apiTestHub.git
2. Entra en la carpeta del proyecto:
  cd apiTestHub
3. Instala las dependencias:
  npm install
4. Configura las variables de entorno en el archivo .env:  
  - PORT=<tu_puerto>
  - HOST=127.0.0.1
  - USER=<tu_usuario_mysql>
  - PASSWORD=<tu_contraseña_mysql>
  - DATABASE=<tu_base_de_datos_mysql>
  - JWT_SECRET=<tu_secret_jwt>

## Scripts

El proyecto tiene varios scripts útiles definidos en el package.json:

1. npm run dev: 
  Inicia el servidor en modo de desarrollo utilizando ts-node-dev.
2. npm run start: 
  Inicia el servidor en modo de producción utilizando los archivos JavaScript generados en el directorio /build.
3. npm run build: 
  Compila el código TypeScript en JavaScript y coloca los archivos resultantes en la carpeta /build.

## Estructura del proyecto

/tests
|
/src
  ├── /middleware      # Middlewares
  ├── /routes          # Rutas de la API
  ├── /services        # Lógica de negocio y acceso a datos
  ├── /types   
  ├── /utils         
  ├── app.ts           # Archivo principal de configuración de Express
  ├── index.ts         # Punto de entrada de la aplicación
/build                 # Compilación del código TypeScript

## Configuración de TypeScript

La configuración de TypeScript está en el archivo tsconfig.json y está optimizada para compilar a ES2022 utilizando CommonJS como el sistema de módulos.

El código fuente se encuentra en la carpeta /src y los archivos generados se colocan en el directorio /build.

Asimismo se ha creado un par de alias para facilitar las importaciones:
- @ = Equivale a la raíz del proyecto
- @src = Equivale a la carpeta src

## Dependencias

**Dependencias principales:**
1. Express: Framework para construir APIs y aplicaciones web.
2. MySQL2: Cliente de base de datos MySQL.
3. Morgan: Middleware para logging de solicitudes HTTP.
4. CORS: Middleware para habilitar solicitudes de origen cruzado.
5. Bcrypt: Funciones para encriptar y desencriptar contraseñas.
6. Express-rate-limit: Middleware para limitar el número de solicitudes de un usuario.
7. Jsonwebtoken: Funciones para crear y verificar tokens de autenticación.
8. Dotenv: Cargar variables de entorno desde un archivo.

**Dependencias de desarrollo:**
1. TypeScript: Superconjunto de JavaScript con tipado estático.
2. ESLint: Herramienta para garantizar la calidad del código.
3. ts-node-dev: Herramienta para ejecutar código TypeScript en desarrollo con recarga rápida.
4. Jest: Herramienta para escribir tests.
5. Supertest: Herramienta para realizar peticiones HTTP.

## Rutas de la API

La API está compuesta por las siguientes rutas:

1. `GET /api/test`
    Esto es una ruta pública. Devuelve todos los tests, junto con el nombre de usuario en este formato:

    >{
      idTest: number;
      name: string;
      description: string;
      category: string;
      date: date;
      userEmail: string;
      username: string;
    }

2. `GET /api/test/:idTest`
    Esto es una ruta pública. Devuelve un test específico. Si no existe el test, devuelve un array vacío.
    Si el parámetro es un string, devuelve un error 400. El formato es el siguiente:
    
    >{
      idTest: number;
      name: string;
      description: string;
      category: string;
      date: date;
      userEmail: string;
      username: string;
    }

3. `POST /api/test`
    Esto es una ruta privada y sólo los que esten registrados podrán acceder a esta ruta. Agrega un nuevo test. La petición debe de contener los siguientes datos obligatorios:
    
    >{
      name: string,
      description: string,
      category: string
    }
    
    Si falta algun dato devuelve un error 400. Si es satisfactoria la petición responde con un estado de 201.

4. `PUT /api/test/:idTest`
    Esto es una ruta privada y sólo los que esten registrados podrán acceder a esta ruta. Actualiza un test determinado. La petición debe de contener los siguientes datos obligatorios:

    >{
      name: string,
      description: string,
      category: string
    }

    Si falta algun dato o el test con idTest no existe devuelve un error 400. Si es satisfactoria la petición responde con un estado 200.

5. `DELETE /api/test/:idTest`
    Esto es una ruta privada y sólo los que esten registrados podrán acceder a esta ruta. Elimina un test determinado. Si el test con idTest no existe devuelve un error 400. Si es satisfactoria la petición responde con un estado 204.

6. `POST /api/user/register`
    Crea un nuevo usuario. La petición debe de contener los siguientes datos obligatorios:

    >{
      email: string,
      password: string
    }

    Si falta algun dato o la contraseña no está validada correctamente devuelve un error 400. Si es satisfactoria la petición responde con un estado de 201.
    La contraseña se encripta y tiene que contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un caracter especial (-_+*@#%&!).

7. `POST /api/user/login`
    Hace login al usuario. La petición debe de contener los siguientes datos obligatorios:

    >{
      email: string,
      password: string
    }

    Si falta algun dato o la contraseña no está validada correctamente devuelve un error 400. Si es satisfactoria la petición responde con un estado de 201 con el token de autenticación.
   
8. `GET /api/ask/:idTest`
    Ruta pública que permite obtener las preguntas de un test dado. La respuesta sigue el siguiente formato:

    >{
      info: { idTest: number, name: string, username: string },
      asks: [
        {
          idAsk: number, 
          ask: number, 
          answer1: number, 
          answer2: number,
          answer3: number, 
          answer4: number,
          sol: number,
          multi: boolean
          image: string
          reference: string
        },
        ...
      ]
    }

    Si no existe el test devuelve {info: null, asks: []}.

9. `POST /api/ask/:idTest`
    Ruta privada que permite crear una nueva pregunta de un determinado test. La petición debe de contener los siguientes datos:

    >{
      ask: string,
      answer1: string,
      answer2: string,
      answer3: string,
      answer4: string,
      sol: number,
      multi: boolean,
      image: string,
      reference: string
    }

    El campo ask, answer1 y 2, sol y multi son obligatorios.
    Si falta algun dato o la solución no es correcta devuelve un error 400. Si es satisfactoria la petición responde con un estado de 201.

10. `PUT /api/ask/:idAsk`
    Ruta privada que permite actualizar una pregunta en un determinado test. La petición debe de contener los siguientes datos obligatorios:

    >{
      ask: string,
      answer1: string,
      answer2: string,
      answer3: string,
      answer4: string,
      sol: number,
      multi: boolean,
      image: string,
      reference: string
    }

    Si falta algun dato o la solución no es correcta devuelve un error 400. Si es satisfactoria la petición responde con un estado de 200.

11. `DELETE /api/ask/:idAsk`
    Ruta privada que permite eliminar una pregunta en un determinado test. Si no existe la pregunta devuelve un error 404. Si es satisfactoria la petición responde con un estado de 204.

## Licencia

Este proyecto está bajo la Licencia GPL-3.0-only.