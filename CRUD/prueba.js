// function archivo_validador() {
//   const nombre_cambiar = "hola";
//   const nuevo_nombre = "params.nuevoNombre";
//   const validation = true;
//   return [nombre_cambiar, nuevo_nombre, validation];
// }

// const conceptos = archivo_validador();

// console.log(conceptos);

function archivo_validador() {
  const object = {
    nombre_cambiar: "hola",
    nuevo_nombre: "params.nuevoNombre",
    validation: true,
  };

  return object;
}

const conceptos = archivo_validador();

console.log(conceptos);
console.log(conceptos.nombre_cambiar);
