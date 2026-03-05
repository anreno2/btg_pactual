CREATE TABLE btg.visitas (
    id SERIAL PRIMARY KEY,
    cliente_id INT,
    sucursal_id INT,
    fecha_visita DATE
);