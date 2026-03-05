ALTER TABLE btg.sucursal_productos
ADD CONSTRAINT fk_sucursal
FOREIGN KEY (sucursal_id)
REFERENCES btg.sucursales(sucursal_id);

ALTER TABLE btg.sucursal_productos
ADD CONSTRAINT fk_producto
FOREIGN KEY (producto_id)
REFERENCES btg.productos(producto_id);

ALTER TABLE btg.visitas
ADD CONSTRAINT fk_cliente
FOREIGN KEY (cliente_id)
REFERENCES btg.clientes(cliente_id);

ALTER TABLE btg.visitas
ADD CONSTRAINT fk_sucursal_visita
FOREIGN KEY (sucursal_id)
REFERENCES btg.sucursales(sucursal_id);

ALTER TABLE btg.cliente_productos
ADD CONSTRAINT fk_cliente_producto
FOREIGN KEY (cliente_id)
REFERENCES btg.clientes(cliente_id);

ALTER TABLE btg.cliente_productos
ADD CONSTRAINT fk_producto_cliente
FOREIGN KEY (producto_id)
REFERENCES btg.productos(producto_id);