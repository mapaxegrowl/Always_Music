-- Active: 1713566143574@@127.0.0.1@5432@music@public

-- Paso 1. se crea base de datos music


-- Paso 2. se crea la tabla alumnos:

CREATE TABLE alumnos (
    rut VARCHAR (20) PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    curso VARCHAR(255) NOT NULL,
    nivel INT
);
