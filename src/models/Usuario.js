// models/usuario.js

/*
  Clase Usuario que define la estructura de un objeto usuario en la aplicación frontend.
*/
class Usuario {
  /*
    Constructor de la clase Usuario.
    @param {number} id - El identificador único del usuario.
    @param {string} nombre - El nombre del usuario.
    @param {string} email - La dirección de correo electrónico del usuario.
    @param {string} password - La contraseña del usuario (generalmente no se almacena en el frontend de forma segura).
    @param {string} rol - El rol del usuario dentro de la aplicación.
  */
  constructor(id, nombre, email, password, rol) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.password = password;
    this.rol = rol;
  }
}

export default Usuario;