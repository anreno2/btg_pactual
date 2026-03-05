SELECT DISTINCT c.nombre
FROM btg.clientes c
JOIN btg.cliente_productos cp ON c.cliente_id = cp.cliente_id
JOIN btg.sucursal_productos sp ON cp.producto_id = sp.producto_id
JOIN btg.visitas v ON v.sucursal_id = sp.sucursal_id
WHERE v.cliente_id = c.cliente_id;