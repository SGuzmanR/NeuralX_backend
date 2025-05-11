CREATE TABLE catalogoUniversal (
    idCatalogo INT IDENTITY(1,1) PRIMARY KEY,
    tipoCatalogo INT NULL,
    denominacionCatalogo VARCHAR(50) NOT NULL
);

INSERT INTO catalogoUniversal 
(tipoCatalogo, denominacionCatalogo) 
VALUES
(NULL, 'tipoDocumento'),
(NULL, 'nacionalidadHuesped'),
(NULL, 'generoHuesped'),
(NULL, 'estadoReserva'),
(NULL, 'modoPagoServicio'),
(NULL, 'claseServicio'),
(NULL, 'tipoServicio'),
(NULL, 'zonaHabitacion'),
(NULL, 'capacidadHabitacion'),
(NULL, 'tipoHabitacion'),
(NULL, 'tipoContacto'),
(1, 'Cédula de Ciudadanía'),
(1, 'Cédula de Extranjería'),
(1, 'Pasaporte'),
(1, 'Tarjeta de Identidad'),
(1, 'Numero de Identificacion Tributaria (NIT)'),
(1, 'Permiso Especial de Permanencia (PEP)'),
(2, 'Colombia'),
(2, 'Chile'),
(2, 'Mexico'),
(2, 'Argentina'),
(2, 'Ecuador'),
(2, 'Peru'),
(3, 'Masculino'),
(3, 'Femenino'),
(3, 'No Binario'),
(3, 'Otro'),
(4, 'Pendiente'),
(4, 'Cancelado'),
(4, 'Reservado'),
(4, 'Confirmado'),
(4, 'Rechazado'),
(4, 'Pagado'),
(4, 'Consulta'),
(5, 'Efectivo'),
(5, 'Daviplata'),
(5, 'Tarjeta de Credito'),
(5, 'Tarjeta de Debito'),
(5, 'Transferencia Bancaria'),
(5, 'Nequi'),
(5, 'Paypal'),
(6, 'Economico'),
(6, 'Ejecutivo'),
(6, 'Primera Clase'),
(6, 'Lujo'),
(7, 'Alojamiento'),
(7, 'Tour Guiado'),
(7, 'Limpieza Diaria'),
(7, 'Transporte'),
(8, 'Vista al mar'),
(8, 'Interior'),
(8, 'Cerca al lobby'),
(9, '1'),
(9, '2'),
(9, '+3	'),
(10, 'Habitacion Matrimonial'),
(10, 'Suite'),
(10, 'Junior Suite'),
(10, 'Penthouse'),
(10, 'Estudio'),
(10, 'Villa'),
(11, 'WhatsApp'),
(11, 'Contacto Emergencia'),
(11, 'Telefono'),
(11, 'Instagram'),
(11, 'Correo Electronico'),
(11, 'Fax'),
(11, 'Direccion');

CREATE TABLE huesped (
    idHuesped INT IDENTITY(1,1) PRIMARY KEY,
    primerNombre VARCHAR(25) NOT NULL,
    segundoNombre VARCHAR(25),
    primerApellido VARCHAR(25) NOT NULL,
    segundoApellido VARCHAR(25),
    tipoDocumento INT NOT NULL,
    numeroDocumento VARCHAR(50) NOT NULL,
    fechaNacimiento DATE NOT NULL,
    generoHuesped INT NOT NULL,
    nacionalidadHuesped INT NOT NULL
);

INSERT INTO huesped
(primerNombre, segundoNombre, primerApellido, segundoApellido, tipoDocumento, numeroDocumento, fechaNacimiento, generoHuesped, nacionalidadHuesped) 
VALUES
('Juan', 'Santiago', 'Pérez', 'Alfonzo', 14, '1234567890', '1990-05-10', 24, 18),
('María', 'Luisa', 'Gómez', 'Ríos', 15, '9876543210', '1985-08-22', 25, 20),
('Pedro', 'Ignacio', 'López', 'Martínez', 14, '1122334455', '1992-03-15', 24, 22),
('Ana', 'Carolina', 'Ramírez', 'Aroca', 17, '5566778899', '1995-12-01', 25, 19),
('Luis', 'Mauro', 'Torres', 'García', 16, '6677889900', '1988-07-19', 24, 23),
('Jose', 'Maria', 'Rondon', 'Diaz', 14, '3222623535', '2005-04-25', 24, 21);

CREATE TABLE contacto (
    idContacto INT IDENTITY(1,1) PRIMARY KEY,
    huespedContacto INT NOT NULL,
    datoContacto VARCHAR(120) NOT NULL,
    tipoContacto INT NOT NULL
);

INSERT INTO contacto 
(huespedContacto, datoContacto, tipoContacto) 
VALUES
(1, 'juan.perez@email.com', 66),
(2, 'maria.gomez@email.com', 66),
(3, '3111234567', 64),
(4, 'ana.ramirez@email.com', 66),
(5, 'luis.torres@email.com', 66),
(5, 'carlos.ramirez@funcionario.com', 66),
(5, 'ana.martinez@funcionario.com', 66),
(3, 'miguel.sanchez@funcionario.com', 66),
(2, 'laura.garcia@funcionario.com', 66),
(6, 'sofia.moreno@funcionario.com', 66),
(6, 'joserondon@gmail.com', 66);

CREATE TABLE habitacion (
    idHabitacion INT IDENTITY(1,1) PRIMARY KEY,
    numeroHabitacion VARCHAR(10) NOT NULL,
    tipoHabitacion INT,
    descripcionHabitacion TEXT,
    capacidadHabitacion INT NOT NULL,
    precioHabitacion DECIMAL(10, 2) NOT NULL,
    zonaHabitacion INT NOT NULL,
    disponibilidadHabitacion BIT DEFAULT 1
);

INSERT INTO habitacion 
(numeroHabitacion, tipoHabitacion, descripcionHabitacion, capacidadHabitacion, precioHabitacion, zonaHabitacion) 
VALUES 
('101', 56, 'Habitación con cama matrimonial, vista al mar', 53, 250000, 50),
('102', 57, 'Suite con jacuzzi y terraza', 54, 480000, 52),
('103', 58, 'Junior Suite moderna', 53, 300000, 51),
('104', 59, 'Penthouse de lujo, vista 360°', 55, 1200000, 50),
('105', 60, 'Estudio económico para una persona', 53, 150000, 51),
('106', 61, 'Villa familiar con jardín', 55, 900000, 52),
('107', 57, 'Suite con doble cama y sala', 54, 450000, 52),
('108', 58, 'Junior Suite decorada con arte local', 53, 320000, 51),
('109', 60, 'Estudio compacto, ideal para viajes rápidos', 53, 140000, 51),
('110', 56, 'Habitación matrimonial con balcón', 54, 270000, 50);

CREATE TABLE habitacionXservicios (
    idServicioHabitacion INT IDENTITY(1,1) PRIMARY KEY,
    idHabitacion INT NOT NULL,
    idServicio INT NOT NULL,
    cantidad INT DEFAULT 1
);

INSERT INTO habitacionXservicios 
(idHabitacion, idServicio, cantidad) 
VALUES
(1, 1, 1),
(1, 3, 1),
(2, 2, 1),
(2, 5, 1),
(3, 4, 1),
(4, 6, 1),
(5, 1, 1),
(6, 7, 1),
(7, 8, 1),
(8, 10, 1);

CREATE TABLE servicio (
    idServicio INT IDENTITY(1,1) PRIMARY KEY,
    nombreServicio VARCHAR(50) NOT NULL,
    descripcionServicio TEXT,
    precioServicio DECIMAL(10,2) NOT NULL,
    tipoServicio INT NOT NULL,
    claseServicio INT NOT NULL,
    modoPagoServicio INT NOT NULL
);

INSERT INTO servicio 
(nombreServicio, descripcionServicio, precioServicio, tipoServicio, claseServicio, modoPagoServicio) 
VALUES
('Alojamiento Básico', 'Incluye cama, baño y desayuno', 200000, 46, 42, 35),
('Tour Guiado al Centro Histórico', 'Recorrido guiado por la ciudad', 150000, 47, 43, 39),
('Servicio de Limpieza Diaria', 'Limpieza y orden de habitación', 80000, 48, 42, 36),
('Transporte Aeropuerto-Hotel', 'Traslado en vehículo privado', 120000, 49, 43, 38),
('Alojamiento VIP', 'Incluye suite, minibar y balcón', 600000, 46, 45, 37),
('Tour a la Playa', 'Excursión a la playa con almuerzo incluido', 180000, 47, 44, 40),
('Servicio Premium de Limpieza', 'Limpieza profunda y aromatización', 100000, 48, 43, 35),
('Transporte Nocturno', 'Traslados entre 8pm y 6am', 160000, 49, 44, 41),
('Alojamiento Ejecutivo', 'Pensado para viajeros de negocios', 350000, 46, 43, 38),
('Tour Cultural', 'Visita a museos y actividades locales', 170000, 47, 42, 36);

CREATE TABLE reserva (
    idReserva INT IDENTITY(1,1) PRIMARY KEY,
    idHuesped INT NOT NULL,
    idHabitacion INT NOT NULL,
    fechaReserva DATETIME DEFAULT GETDATE(),
    fechaEntrada DATE NOT NULL,
    fechaSalida DATE NOT NULL,
    estadoReserva INT NOT NULL
);

INSERT INTO reserva 
(idHuesped, idHabitacion, fechaEntrada, fechaSalida, estadoReserva) 
VALUES
(1, 1, '2025-05-15', '2025-05-20', 30),
(2, 2, '2025-06-01', '2025-06-05', 31),
(3, 3, '2025-05-12', '2025-05-14', 33),
(4, 4, '2025-06-10', '2025-06-15', 28),
(5, 4, '2025-07-01', '2025-07-03', 30),
(1, 5, '2025-07-10', '2025-07-12', 34),
(2, 6, '2025-06-18', '2025-06-20', 33),
(3, 7, '2025-08-01', '2025-08-03', 29),
(4, 8, '2025-09-05', '2025-09-07', 31),
(5, 9, '2025-10-10', '2025-10-15', 33);


-- Index y Foreign Keys
-- catalogoUniversal
CREATE INDEX IX_catalogoUniversal_tipoCatalogo ON catalogoUniversal(tipoCatalogo);

-- contacto
CREATE INDEX IX_contacto_tipoContacto ON contacto(tipoContacto);
CREATE INDEX IX_contacto_huespedContacto ON contacto(huespedContacto);

-- habitacion
CREATE INDEX IX_habitacion_tipoHabitacion ON habitacion(tipoHabitacion);
CREATE INDEX IX_habitacion_capacidadHabitacion ON habitacion(capacidadHabitacion);
CREATE INDEX IX_habitacion_zonaHabitacion ON habitacion(zonaHabitacion);

-- habitacionXservicios
CREATE INDEX IX_hxs_idHabitacion ON habitacionXservicios(idHabitacion);
CREATE INDEX IX_hxs_idServicio ON habitacionXservicios(idServicio);

-- huesped
CREATE INDEX IX_huesped_tipoDocumento ON huesped(tipoDocumento);
CREATE INDEX IX_huesped_generoHuesped ON huesped(generoHuesped);
CREATE INDEX IX_huesped_nacionalidadHuesped ON huesped(nacionalidadHuesped);

-- reserva
CREATE INDEX IX_reserva_estadoReserva ON reserva(estadoReserva);
CREATE INDEX IX_reserva_idHuesped ON reserva(idHuesped);

-- servicio
CREATE INDEX IX_servicio_tipoServicio ON servicio(tipoServicio);
CREATE INDEX IX_servicio_claseServicio ON servicio(claseServicio);
CREATE INDEX IX_servicio_modoPagoServicio ON servicio(modoPagoServicio);

-- Relationships (FKs)
ALTER TABLE catalogoUniversal 
	ADD CONSTRAINT FK_catalogoUniversal_self FOREIGN KEY (tipoCatalogo) REFERENCES catalogoUniversal(idCatalogo);

ALTER TABLE contacto 
	ADD CONSTRAINT FK_contacto_tipoContacto FOREIGN KEY (tipoContacto) REFERENCES catalogoUniversal(idCatalogo),
		CONSTRAINT FK_contacto_huesped FOREIGN KEY (huespedContacto) REFERENCES huesped(idHuesped);

ALTER TABLE habitacion 
	ADD CONSTRAINT FK_habitacion_tipo FOREIGN KEY (tipoHabitacion) REFERENCES catalogoUniversal(idCatalogo),
		CONSTRAINT FK_habitacion_capacidad FOREIGN KEY (capacidadHabitacion) REFERENCES catalogoUniversal(idCatalogo),
		CONSTRAINT FK_habitacion_zona FOREIGN KEY (zonaHabitacion) REFERENCES catalogoUniversal(idCatalogo);

ALTER TABLE habitacionXservicios 
	ADD CONSTRAINT FK_hxs_habitacion FOREIGN KEY (idHabitacion) REFERENCES habitacion(idHabitacion),
		CONSTRAINT FK_hxs_servicio FOREIGN KEY (idServicio) REFERENCES servicio(idServicio);

ALTER TABLE huesped 
	ADD CONSTRAINT FK_huesped_tipoDoc FOREIGN KEY (tipoDocumento) REFERENCES catalogoUniversal(idCatalogo),
		CONSTRAINT FK_huesped_genero FOREIGN KEY (generoHuesped) REFERENCES catalogoUniversal(idCatalogo),
		CONSTRAINT FK_huesped_nacionalidad FOREIGN KEY (nacionalidadHuesped) REFERENCES catalogoUniversal(idCatalogo);

ALTER TABLE reserva 
	ADD CONSTRAINT FK_reserva_estado FOREIGN KEY (estadoReserva) REFERENCES catalogoUniversal(idCatalogo),
		CONSTRAINT FK_reserva_huesped FOREIGN KEY (idHuesped) REFERENCES huesped(idHuesped),
		CONSTRAINT FK_reserva_habitacion FOREIGN KEY (idHabitacion) REFERENCES habitacion(idHabitacion);

ALTER TABLE servicio 
	ADD CONSTRAINT FK_servicio_tipo FOREIGN KEY (tipoServicio) REFERENCES catalogoUniversal(idCatalogo),
		CONSTRAINT FK_servicio_clase FOREIGN KEY (claseServicio) REFERENCES catalogoUniversal(idCatalogo),
		CONSTRAINT FK_servicio_pago FOREIGN KEY (modoPagoServicio) REFERENCES catalogoUniversal(idCatalogo);

-- QUERIES TEST
SELECT 
    h.idHuesped,
    h.primerNombre, 
    h.segundoNombre, 
    h.primerApellido, 
    h.segundoApellido, 
    doc.denominacionCatalogo AS tipoDocumento, 
    h.numeroDocumento, 
    h.fechaNacimiento, 
    gen.denominacionCatalogo AS generoHuesped, 
    nac.denominacionCatalogo AS nacionalidadHuesped
FROM 
    huesped h
INNER JOIN catalogoUniversal doc ON h.tipoDocumento = doc.idCatalogo
INNER JOIN catalogoUniversal gen ON h.generoHuesped = gen.idCatalogo
INNER JOIN catalogoUniversal nac ON h.nacionalidadHuesped = nac.idCatalogo
ORDER BY h.primerApellido, h.primerNombre;



-- PROCEDURES
-- SELECT ALL THE PROCEDURES
SELECT name 
FROM sys.objects 
WHERE type = 'P'; 

-- 1
CREATE PROCEDURE ObtenerReservasPorHuesped
    @idHuesped INT
AS
BEGIN
    SELECT * FROM reserva
    WHERE idHuesped = @idHuesped;
END;
-- EXECUTE PROCEDURE
EXEC ObtenerReservasPorHuesped @idHuesped = 1;

-- 2
CREATE PROCEDURE ObtenerDetallesReserva
    @idReserva INT
AS
BEGIN
    SELECT r.idReserva, r.fechaReserva, r.fechaEntrada, r.fechaSalida, 
           h.numeroHabitacion, h.descripcionHabitacion, h.capacidadHabitacion, h.precioHabitacion,
           s.nombreServicio, s.precioServicio, s.tipoServicio
    FROM reserva r
    JOIN habitacion h ON r.idHabitacion = h.idHabitacion
    LEFT JOIN habitacionXservicios hxs ON h.idHabitacion = hxs.idHabitacion
    LEFT JOIN servicio s ON hxs.idServicio = s.idServicio
    WHERE r.idReserva = @idReserva;
END;
-- EXECUTE PROCEDURE
EXEC ObtenerDetallesReserva @idReserva = 1;

-- 3
CREATE PROCEDURE ObtenerServiciosHabitacion
    @idHabitacion INT
AS
BEGIN
    SELECT s.nombreServicio, s.descripcionServicio, s.precioServicio
    FROM servicio s
    INNER JOIN habitacionXservicios hxs ON s.idServicio = hxs.idServicio
    WHERE hxs.idHabitacion = @idHabitacion;
END;
-- EXECUTE PROCEDURE
EXEC ObtenerServiciosHabitacion @idHabitacion = 1;

-- 4
CREATE PROCEDURE CambiarEstadoReserva
    @idReserva INT,
    @nuevoEstado INT
AS
BEGIN
    UPDATE reserva
    SET estadoReserva = @nuevoEstado
    WHERE idReserva = @idReserva;
END;
-- EXECUTE PROCEDURE
EXEC CambiarEstadoReserva @idReserva = 1, @nuevoEstado =33;

-- 5
CREATE PROCEDURE ObtenerHuespedesPorNacionalidad
    @nacionalidad INT
AS
BEGIN
    SELECT h.idHuesped, h.primerNombre, h.primerApellido, h.numeroDocumento
    FROM huesped h
    WHERE h.nacionalidadHuesped = @nacionalidad;
END;
-- EXECUTE PROCEDURE
EXEC ObtenerHuespedesPorNacionalidad @nacionalidad = 20;

-- 6
CREATE PROCEDURE ObtenerServiciosPorTipo
    @tipoServicio INT
AS
BEGIN
    SELECT nombreServicio, descripcionServicio, precioServicio
    FROM servicio
    WHERE tipoServicio = @tipoServicio;
END;
-- EXECUTE PROCEDURE
EXEC ObtenerServiciosPorTipo @tipoServicio = 47;


-- VIEWS
-- 1
CREATE VIEW vistaHuespedesColombianos AS
	SELECT * FROM huesped WHERE nacionalidadHuesped = 18;
-- EXECUTE VIEW
SELECT * FROM vistaHuespedesColombianos;

-- 2
CREATE VIEW vistaHuespedesMasculinos AS
    SELECT * FROM huesped WHERE generoHuesped = 24;
-- EXECUTE VIEW
SELECT * FROM vistaHuespedesMasculinos;

-- 3
CREATE VIEW vistaHuespedesCedulaCiudadania AS
    SELECT * FROM huesped WHERE tipoDocumento = 12;
-- EXECUTE VIEW
SELECT * FROM vistaHuespedesCedulaCiudadania;

-- 4
CREATE VIEW vistaHuespedesReservasConfirmadas AS
    SELECT h.*
    FROM huesped h
    JOIN reserva r ON h.idHuesped = r.idHuesped
    WHERE r.estadoReserva = 31;
-- EXECUTE VIEW
SELECT * FROM vistaHuespedesReservasConfirmadas;

-- 5
CREATE VIEW vistaHuespedesArgentinaConfirmados AS
    SELECT h.*
    FROM huesped h
    JOIN reserva r ON h.idHuesped = r.idHuesped
    WHERE h.nacionalidadHuesped = 19
    AND r.estadoReserva = 31;
-- EXECUTE VIEW
SELECT * FROM vistaHuespedesArgentinaConfirmados;

-- 6
CREATE VIEW vistaHuespedesJunio2025 AS
	SELECT h.idHuesped,
			h.primerNombre, 
			h.segundoNombre, 
			h.primerApellido, 
			h.segundoApellido, 
			r.idReserva, 
			r.fechaEntrada, 
			r.fechaSalida, 
			es.denominacionCatalogo AS estadoReserva
	FROM huesped h
	JOIN reserva r ON h.idHuesped = r.idHuesped
	JOIN catalogoUniversal es ON r.estadoReserva = es.idCatalogo
	WHERE r.fechaEntrada BETWEEN '2025-06-01' AND '2025-06-30';
-- EXECUTE VIEW
SELECT * FROM vistaHuespedesJunio2025;


-- SVF (Scalar Valued Functions)
-- 1
CREATE FUNCTION EdadHuesped (@fechaNacimiento DATE)
RETURNS INT
AS
BEGIN
    RETURN DATEDIFF(YEAR, @fechaNacimiento, GETDATE());
END;
-- EXECUTE SVF

-- 2
CREATE FUNCTION DiasReserva (@fechaEntrada DATE, @fechaSalida DATE)
RETURNS INT
AS
BEGIN
    RETURN DATEDIFF(DAY, @fechaEntrada, @fechaSalida);
END;
-- EXECUTE SVF

-- 3
CREATE FUNCTION PrecioTotalReserva (@idReserva INT)
RETURNS DECIMAL(10,2)
AS
BEGIN
    DECLARE @precioTotal DECIMAL(10,2);
    SELECT @precioTotal = SUM(h.precioHabitacion) 
    FROM reserva r
    JOIN habitacion h ON r.idHabitacion = h.idHabitacion
    WHERE r.idReserva = @idReserva;
    RETURN @precioTotal;
END;
-- EXECUTE SVF

-- 4
CREATE FUNCTION DiasUltimaReserva (@idHuesped INT)
RETURNS INT
AS
BEGIN
    DECLARE @ultimoDiaReserva DATE;
    SELECT @ultimoDiaReserva = MAX(fechaReserva) 
    FROM reserva 
    WHERE idHuesped = @idHuesped;

    RETURN DATEDIFF(DAY, @ultimoDiaReserva, GETDATE());
END;
-- EXECUTE SVF

-- 5
CREATE FUNCTION NumeroServiciosHabitacion (@idHabitacion INT)
RETURNS INT
AS
BEGIN
    DECLARE @numeroServicios INT;
    SELECT @numeroServicios = COUNT(*) 
    FROM habitacionXservicios 
    WHERE idHabitacion = @idHabitacion;

    RETURN @numeroServicios;
END;
-- EXECUTE SVF

-- 6
CREATE FUNCTION EstadoReservaPorId (@idReserva INT)
RETURNS VARCHAR(50)
AS
BEGIN
    DECLARE @estadoReserva VARCHAR(50);
    SELECT @estadoReserva = es.denominacionCatalogo 
    FROM reserva r
    JOIN catalogoUniversal es ON r.estadoReserva = es.idCatalogo
    WHERE r.idReserva = @idReserva;

    RETURN @estadoReserva;
END;
-- EXECUTE SVF


-- TABLE FUNCTIONS
-- 1
CREATE FUNCTION ReservasPorEstado (@estado INT)
RETURNS TABLE
AS
RETURN
    SELECT * FROM reserva 
    WHERE estadoReserva = @estado;
-- EXECUTE TABLE

-- 2
CREATE FUNCTION HuespedesPorNacionalidad (@nacionalidad INT)
RETURNS TABLE
AS
RETURN
    SELECT idHuesped, primerNombre, primerApellido 
    FROM huesped
    WHERE nacionalidadHuesped = @nacionalidad;
-- EXECUTE TABLE

-- 3
CREATE FUNCTION ServiciosPorHabitacion (@idHabitacion INT)
RETURNS TABLE
AS
RETURN
    SELECT s.nombreServicio, hs.cantidad
    FROM habitacionXservicios hs
    JOIN servicio s ON hs.idServicio = s.idServicio
    WHERE hs.idHabitacion = @idHabitacion;

-- 4
CREATE FUNCTION ReservasPorFecha (@fechaInicio DATE, @fechaFin DATE)
RETURNS TABLE
AS
RETURN
    SELECT * FROM reserva
    WHERE fechaEntrada BETWEEN @fechaInicio AND @fechaFin;

-- 5
CREATE FUNCTION HuespedesConHabitacionesDisponibles()
RETURNS TABLE
AS
RETURN
    SELECT h.idHuesped, h.primerNombre, h.primerApellido, r.idHabitacion
    FROM huesped h
    JOIN reserva r ON h.idHuesped = r.idHuesped
    JOIN habitacion ha ON r.idHabitacion = ha.idHabitacion
    WHERE ha.disponibilidadHabitacion = 1;

-- 6
CREATE FUNCTION HabitacionesPorServicio (@idServicio INT)
RETURNS TABLE
AS
RETURN
    SELECT h.idHabitacion, h.numeroHabitacion, hs.cantidad
    FROM habitacionXservicios hs
    JOIN habitacion h ON hs.idHabitacion = h.idHabitacion
    WHERE hs.idServicio = @idServicio;



-- TRIGGERS
-- 1
CREATE TRIGGER tr_AuditoriaReservas
ON reserva
AFTER INSERT
AS
BEGIN
    PRINT 'Nueva reserva registrada';
END;

-- 2
CREATE TRIGGER tr_ActualizarDisponibilidadHabitacion
ON reserva
AFTER INSERT
AS
BEGIN
    UPDATE habitacion
    SET disponibilidadHabitacion = 0
    WHERE idHabitacion IN (SELECT idHabitacion FROM inserted);
END;

-- 3
CREATE TRIGGER tr_AuditoriaEstadoReserva
ON reserva
AFTER UPDATE
AS
BEGIN
    IF UPDATE(estadoReserva)
    BEGIN
        PRINT 'El estado de la reserva ha cambiado';
    END
END;

-- 4
CREATE TRIGGER tr_ActualizarPrecioReserva
ON reserva
AFTER UPDATE
AS
BEGIN
    IF UPDATE(idHabitacion)
    BEGIN
        DECLARE @precio DECIMAL(10,2);
        SELECT @precio = precioHabitacion 
        FROM habitacion 
        WHERE idHabitacion IN (SELECT idHabitacion FROM inserted);
        
        UPDATE reserva
        SET precioReserva = @precio
        WHERE idReserva IN (SELECT idReserva FROM inserted);
    END
END;

-- 5
CREATE TRIGGER tr_AuditoriaHuespedes
ON huesped
AFTER INSERT
AS
BEGIN
    PRINT 'Nuevo huesped registrado';
END;

-- 6
CREATE TRIGGER tr_AuditoriaDisponibilidadHabitacion
ON habitacion
AFTER UPDATE
AS
BEGIN
    IF UPDATE(disponibilidadHabitacion)
    BEGIN
        PRINT 'La disponibilidad de la habitación ha cambiado';
    END
END;