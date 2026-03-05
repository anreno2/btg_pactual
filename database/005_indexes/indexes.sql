CREATE INDEX idx_cliente_productos_cliente
ON btg.cliente_productos(cliente_id);

CREATE INDEX idx_visitas_cliente
ON btg.visitas(cliente_id);