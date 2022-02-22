const http = require("http");
const url = require("url");
const fs = require("fs");
const querystring = require("querystring");

// paso 1
http
  .createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "text/html" });
    // paso 2
    const params = url.parse(request.url, true).query;

    console.log(params);
    const nombre_archivo = params.archivo;
    const contenido_archivo = params.contenido;

    // paso 3 crud
    function validation(archivo) {
      const validation =
        fs.existsSync(`../CRUD/${archivo}`) &&
        fs.lstatSync(`../CRUD/${archivo}`).isFile();
      return validation;
    }

    // crear
    if (request.url.includes("/crear")) {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = today.getFullYear();

      today = mm + "/" + dd + "/" + yyyy;

      console.log(validation(nombre_archivo));
      if (validation(nombre_archivo) == false) {
        fs.writeFile(
          nombre_archivo,
          `${today} - ${contenido_archivo}/n`,
          () => {
            response.write("El archivo fue creado 😀");
            response.end();
          }
        );
      } else {
        fs.appendFile(
          nombre_archivo,

          `${today} - ${contenido_archivo}`,
          () => {
            response.write("El texto fue agregado 😀");
            response.end();
          }
        );
      }
    }

    // leer
    if (request.url.includes("/leer")) {
      fs.readFile(nombre_archivo, (err, data) => {
        if (err) {
          response.write("Error al leer el archivo 😭");
          console.log("error");
          response.end();
        }
        response.write(data);
        response.end();
      });
    }

    // renombrar
    if (request.url.includes("/renombrar")) {
      const nombre_cambiar = params.nombre;
      const nuevo_nombre = params.nuevoNombre;

      if (validation(nombre_cambiar) == true) {
        fs.rename(nombre_cambiar, nuevo_nombre, (err, data) => {
          response.write(
            `El archivo ${nombre_cambiar} fue renombrado a ${nuevo_nombre}`
          );
          response.end();
        });
      } else {
        response.write("No existe archivo con ese nombre 😥");
        response.end();
      }
    }
    // eliminar

    const resultHandler = (err) => {
      if (err) {
        response.write("El archivo que consultas no existe", () => {
          return response.end();
        });
      } else {
        response.write(
          `Tu solicitud para eliminar el archivo ${nombre_archivo} se está procesando`
        );

        setTimeout(() => {
          response.write(
            `El archivo ${nombre_archivo} fue eliminado con exito! `,
            () => {
              response.end();
            }
          );
        }, 3000);
      }
    };

    if (request.url.includes("/eliminar")) {
      try {
        setTimeout(() => {
          fs.unlinkSync(nombre_archivo);
          response.write(`Tu solicitud para eliminar el archivo ${nombre_archivo} se está
                procesando`);
          setTimeout(() => {
            response.write(`\nExito, el archivo ${nombre_archivo} fue borrado`);
            response.end();
          }, 3000);
        }, 500);
      } catch (err) {
        console.error("Algo ocurrio intentando eliminar el archivo", err);
        response.end();
      }
    }
  })
  .listen(8080, () => {
    console.log("Escuchando el puerto 8080");
    console.log("http://127.0.0.1:5500/CRUD/index.html");
  });
