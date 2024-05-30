const { Pool } = require('pg');

// Configuración de la conexión a la base de datos
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'music', //se creo la base de datos llamada music
  password: 'postgres',
  port: 5432,
});

console.log(" ");
console.log("***** Academy Always Music *****");

// Obtener los parámetros de entrada: Cuando ejecutas el comando: node server.js registrar 12345678-9 "Juan Pernia" g70 1,
const funcion = process.argv[2];
const rut = process.argv[3];
const nombre = process.argv[4];
const curso = process.argv[5];
const nivel = process.argv[6];

// Registrar un alumno nuevo
const nuevoAlumno = async ({ rut, nombre, curso, nivel }) => {
  try {
    const res = await pool.query(
      `INSERT INTO alumnos (rut, nombre, curso, nivel) VALUES ($1, $2, $3, $4) RETURNING *`,
      [rut, nombre, curso, nivel]
    );
    console.log(`Alumno ${nombre} rut: ${rut} fué registrado con éxito!`);
    console.log("Alumno Registrado: ", res.rows[0]);
  } catch (error) {
    console.error("Error al agregar el alumno:", error.message);
  }
};
// Consultar un alumno
const consultaRut = async ({ rut }) => {
  try {
    const res = await pool.query(
      `SELECT * FROM alumnos WHERE rut=$1`,
      [rut]
    );
    if (res.rows.length > 0) {
      console.log("Alumno consultado: ", res.rows[0]);
    } else {
      console.log(`No se encontró ningún alumno con el rut ${rut}`);
    }
  } catch (error) {
    console.error("Error al consultar por rut:", error.message);
  }
};
// Obtener todos los alumnos registrados
const getAlumno = async () => {
  try {
    const res = await pool.query("SELECT * FROM alumnos");
    if (res.rows.length > 0) {
      console.log("Alumnos registrados:", res.rows);
    } else {
      console.log("No hay alumnos registrados en la base de datos.");
    }
  } catch (error) {
    console.error("Error al obtener todos los alumnos:", error.message);
  }
};
// Actualizar datos de un alumno en la base de datos
const actualizarAlumno = async ({ rut, nombre, curso, nivel }) => {
  try {
    const res = await pool.query(
      `UPDATE alumnos SET nombre=$1, curso=$2, nivel=$3 WHERE rut=$4 RETURNING *`,
      [nombre, curso, nivel, rut]
    );
    if (res.rows.length > 0) {
      console.log(`Alumno con rut ${rut} actualizado con éxito`);
      console.log("Alumno Actualizado: ", res.rows[0]);
    } else {
      console.log(`No hay ningún Alumno con el rut ${rut}`);
    }
  } catch (error) {
    console.error("Error al actualizar el Alumno:", error.message);
  }
};
// Eliminar un alumno de la base de datos
const eliminarAlumno = async ({ rut }) => {
  try {
    const res = await pool.query(
      `DELETE FROM alumnos WHERE rut=$1 RETURNING *`,
      [rut]
    );
    if (res.rows.length > 0) {
      console.log(`Alumno con rut ${rut} eliminado con éxito`);
      console.log("Alumno Eliminado: ", res.rows[0]);
    } else {
      console.log(`No hay ningún Alumno con el rut ${rut}`);
    }
  } catch (error) {
    console.error("Error al eliminar el Alumno:", error.message);
  }
};


// Función principal que ejecuta la acción solicitada
const main = async () => {
  try {
    switch (funcion) {
      case 'registrar':
        await nuevoAlumno({ rut, nombre, curso, nivel });
        break;
      case 'rut':
        await consultaRut({ rut });
        break;
      case 'consulta':
        await getAlumno();
        break;
      case 'actualizar':
        await actualizarAlumno({ rut, nombre, curso, nivel });
        break;
      case 'eliminar':
        await eliminarAlumno({ rut });
        break;
      default:
        console.log("Funcion: " + funcion + " no es válida");
        break;
    }
  } catch (error) {
    console.error("Error al ejecutar:", error.message);
  } finally {
    await pool.end();
  }
};
// Ejecutar o llamar la función principal
main();
