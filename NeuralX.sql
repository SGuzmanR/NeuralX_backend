SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `catalogoUniversal` CASCADE;
DROP TABLE IF EXISTS `contacto` CASCADE;
DROP TABLE IF EXISTS `habitacion` CASCADE;
DROP TABLE IF EXISTS `habitacionXservicios` CASCADE;
DROP TABLE IF EXISTS `huesped` CASCADE;
DROP TABLE IF EXISTS `reserva` CASCADE;
DROP TABLE IF EXISTS `servicio` CASCADE;

CREATE TABLE `catalogoUniversal` (
	`idCatalogo` INT NOT NULL AUTO_INCREMENT,
	`tipoCatalogo` INT NOT NULL,
	`denominacionCatalogo` VARCHAR(50) NOT NULL,
	CONSTRAINT `PK_catalogoUniversal` PRIMARY KEY (`idCatalogo` ASC)
) Engine InnoDB;

INSERT INTO `catalogoUniversal` 
(`idCatalogo`, `tipoCatalogo`, `denominacionCatalogo`) 
VALUES
(1, NULL, 'tipoDocumento'),
(2, NULL, 'nacionalidadHuesped'),
(3, NULL, 'generoHuesped'),
(4, NULL, 'estadoReserva'),
(5, NULL, 'modoPagoServicio'),
(6, NULL, 'claseServicio'),
(7, NULL, 'tipoServicio'),
(8, NULL, 'zonaHabitacion'),
(9, NULL, 'capacidadHabitacion'),
(10, NULL, 'tipoHabitacion'),
(11, NULL, 'tipoContacto'),
(12, 1, 'Cédula de Ciudadanía'),
(13, 1, 'Cédula de Extranjería'),
(14, 1, 'Pasaporte'),
(15, 1, 'Tarjeta de Identidad'),
(16, 1, 'Numero de Identificacion Tributaria (NIT)'),
(17, 1, 'Permiso Especial de Permanencia (PEP)'),
(18, 2, 'Colombia'),
(19, 2, 'Chile'),
(20, 2, 'Mexico'),
(21, 2, 'Argentina'),
(22, 2, 'Ecuador'),
(23, 2, 'Peru'),
(24, 3, 'Masculino'),
(25, 3, 'Femenino'),
(26, 3, 'No Binario'),
(27, 3, 'Otro'),
(28, 4, 'Pendiente'),
(29, 4, 'Cancelado'),
(30, 4, 'Reservado'),
(31, 4, 'Confirmado'),
(32, 4, 'Rechazado'),
(33, 4, 'Pagado'),
(34, 4, 'Consulta'),
(35, 5, 'Efectivo'),
(36, 5, 'Daviplata'),
(37, 5, 'Tarjeta de Credito'),
(38, 5, 'Tarjeta de Debito'),
(39, 5, 'Transferencia Bancaria'),
(40, 5, 'Nequi'),
(41, 5, 'Paypal'),
(42, 6, 'Economico'),
(43, 6, 'Ejecutivo'),
(44, 6, 'Primera Clase'),
(45, 6, 'Lujo'),
(46, 7, 'Alojamiento'),
(47, 7, 'Tour Guiado'),
(48, 7, 'Limpieza Diaria'),
(49, 7, 'Transporte'),
(50, 8, 'Vista al mar'),
(51, 8, 'Interior'),
(52, 8, 'Cerca al lobby'),
(53, 9, '1'),
(54, 9, '2'),
(55, 9, '+3'),
(56, 10, 'Habitacion Matrimonial'),
(57, 10, 'Suite'),
(58, 10, 'Junior Suite'),
(59, 10, 'Penthouse'),
(60, 10, 'Estudio'),
(61, 10, 'Villa'),
(62, 11, 'WhatsApp'),
(63, 11, 'Contacto Emergencia'),
(64, 11, 'Telefono'),
(65, 11, 'Instagram'),
(66, 11, 'Correo Electronico'),
(67, 11, 'Fax'),
(68, 11, 'Direccion');

CREATE TABLE `contacto` (
	`IdContacto` INT NOT NULL AUTO_INCREMENT,
	`huespedContacto` INT NOT NULL,
	`datoContacto` VARCHAR(120) NOT NULL,
	`tipoContacto` INT NOT NULL,
	CONSTRAINT `PK_Contactos` PRIMARY KEY (`IdContacto` ASC)
) Engine InnoDB;

INSERT INTO `contacto` 
(`idContacto`, `huespedContacto`, `datoContacto`, `tipoContacto`) 
VALUES
(1, 1, 'juan.perez@email.com', 66),
(2, 2, 'maria.gomez@email.com', 66),
(3, 3, '3111234567', 64),
(4, 4, 'ana.ramirez@email.com', 66),
(5, 5, 'luis.torres@email.com', 66),
(6, 5, 'carlos.ramirez@funcionario.com', 66),
(7, 5, 'ana.martinez@funcionario.com', 66),
(8, 3, 'miguel.sanchez@funcionario.com', 66),
(9, 2, 'laura.garcia@funcionario.com', 66),
(10, 6, 'sofia.moreno@funcionario.com', 66),
(11, 6, 'joserondon@gmail.com', 66);

CREATE TABLE `habitacion` (
	`idHabitacion` INT NOT NULL AUTO_INCREMENT,
	`numeroHabitacion` VARCHAR(10) NOT NULL,
	`tipoHabitacion` INT NULL,
	`descripcionHabitacion` TEXT NULL,
	`capacidadHabitacion` INT NOT NULL,
	`precioHabitacion` DECIMAL(10,2) NOT NULL,
	`zonaHabitacion` INT NOT NULL,
	`disponibilidadHabitacion` BOOL NULL DEFAULT true,
	CONSTRAINT `PK_Habitacion` PRIMARY KEY (`idHabitacion` ASC)
) Engine InnoDB;

INSERT INTO `habitacion`
(`numeroHabitacion`, `tipoHabitacion`, `descripcionHabitacion`, `capacidadHabitacion`, `precioHabitacion`, `zonaHabitacion`) 
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

CREATE TABLE `habitacionXservicios` (
	`IdServicioHabitacion` INT NOT NULL AUTO_INCREMENT,
	`idHabitacion` INT NOT NULL,
	`idServicio` INT NOT NULL,
	`cantidad` INT NULL DEFAULT 1,
	CONSTRAINT `PK_habitacionXservicios` PRIMARY KEY (`IdServicioHabitacion` ASC)
) Engine InnoDB;

INSERT INTO `habitacionXservicios` 
(`idHabitacion`, `idServicio`, `cantidad`) 
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

CREATE TABLE `huesped` (
	`idHuesped` INT NOT NULL AUTO_INCREMENT,
	`primerNombre` VARCHAR(25) NOT NULL,
	`segundoNombre` VARCHAR(25) NULL,
	`primerApellido` VARCHAR(25) NOT NULL,
	`segundoApellido` VARCHAR(25) NULL,
	`tipoDocumento` INT NOT NULL,
	`numeroDocumento` VARCHAR(50) NOT NULL,
	`fechaNacimiento` DATE NOT NULL,
	`generoHuesped` INT NOT NULL,
	`nacionalidadHuesped` INT NOT NULL,
    `contraseñaHuesped` VARCHAR(250) NOT NULL,
    `emailHuesped` VARCHAR(250) NOT NULL UNIQUE,
	CONSTRAINT `PK_Huesped` PRIMARY KEY (`idHuesped` ASC)
) Engine InnoDB;

INSERT INTO `huesped` 
(`idHuesped`, `primerNombre`, `segundoNombre`, `primerApellido`, `segundoApellido`, 
 `tipoDocumento`, `numeroDocumento`, `fechaNacimiento`, `generoHuesped`, `nacionalidadHuesped`, 
 `contraseñaHuesped`, `emailHuesped`) 
VALUES
(1, 'Juan', 'Santiago', 'Pérez', 'Alfonzo', 14, '1234567890', '1990-05-10', 24, 18, '1234', 'juan@example.com'),
(2, 'María', 'Luisa', 'Gómez', 'Ríos', 15, '9876543210', '1985-08-22', 25, 20, '1234', 'maria@example.com'),
(3, 'Pedro', 'Ignacio', 'López', 'Martínez', 14, '1122334455', '1992-03-15', 24, 22, '1234', 'pedro@example.com'),
(4, 'Ana', 'Carolina', 'Ramírez', 'Aroca', 17, '5566778899', '1995-12-01', 25, 19, '1234', 'ana@example.com'),
(5, 'Luis', 'Mauro', 'Torres', 'García', 16, '6677889900', '1988-07-19', 24, 23, '1234', 'luis@example.com'),
(6, 'Jose', 'Maria', 'Rondon', 'Diaz', 14, '3222623535', '2005-04-25', 24, 21, '1234', 'jose@example.com');

CREATE TABLE `reserva` (
	`idReserva` INT NOT NULL AUTO_INCREMENT,
	`idHuesped` INT NOT NULL,
	`idHabitacion` INT NOT NULL,
	`fechaReserva` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
	`fechaEntrada` DATE NOT NULL,
	`fechaSalida` DATE NOT NULL,
	`estadoReserva` INT NOT NULL,
	CONSTRAINT `PK_Reservas` PRIMARY KEY (`idReserva` ASC)
) Engine InnoDB;

INSERT INTO `reserva` 
(`idHuesped`, `idHabitacion`, `fechaEntrada`, `fechaSalida`, `estadoReserva`) 
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

CREATE TABLE `servicio` (
	`idServicio` INT NOT NULL AUTO_INCREMENT,
	`nombreServicio` VARCHAR(50) NOT NULL,
	`descripcionServicio` TEXT NULL,
	`precioServicio` DECIMAL(10,2) NOT NULL,
	`tipoServicio` INT NOT NULL,
	`claseServicio` INT NOT NULL,
	`modoPagoServicio` INT NOT NULL,
	CONSTRAINT `PK_Servicio` PRIMARY KEY (`idServicio` ASC)
) Engine InnoDB;

INSERT INTO `servicio`
(`nombreServicio`, `descripcionServicio`, `precioServicio`, `tipoServicio`, `claseServicio`, `modoPagoServicio`) 
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

ALTER TABLE `catalogoUniversal` 
 ADD INDEX `IXFK_catalogoUniversal_catalogoUniversal` (`tipoCatalogo` ASC);

ALTER TABLE `contacto` 
 ADD INDEX `IXFK_Contactos_catalogoUniversal` (`tipoContacto` ASC);

ALTER TABLE `contacto` 
 ADD INDEX `IXFK_Contactos_huesped` (`huespedContacto` ASC);

ALTER TABLE `habitacion` 
 ADD INDEX `IXFK_habitacion_catalogoUniversal` (`tipoHabitacion` ASC);

ALTER TABLE `habitacion` 
 ADD INDEX `IXFK_habitacion_catalogoUniversal_02` (`capacidadHabitacion` ASC);

ALTER TABLE `habitacion` 
 ADD INDEX `IXFK_habitacion_catalogoUniversal_03` (`zonaHabitacion` ASC);

ALTER TABLE `habitacionXservicios` 
 ADD INDEX `IXFK_habitacionXservicios_habitacion` (`idHabitacion` ASC);

ALTER TABLE `habitacionXservicios` 
 ADD INDEX `IXFK_habitacionXservicios_servicio` (`idServicio` ASC);

ALTER TABLE `huesped` 
 ADD INDEX `IXFK_huesped_catalogoUniversal` (`tipoDocumento` ASC);

ALTER TABLE `huesped` 
 ADD INDEX `IXFK_huesped_catalogoUniversal_02` (`generoHuesped` ASC);

ALTER TABLE `huesped` 
 ADD INDEX `IXFK_huesped_catalogoUniversal_03` (`nacionalidadHuesped` ASC);

ALTER TABLE `reserva` 
 ADD INDEX `IXFK_reservas_catalogoUniversal` (`estadoReserva` ASC);

ALTER TABLE `reserva` 
 ADD INDEX `IXFK_reservas_huesped` (`idHuesped` ASC);

ALTER TABLE `servicio` 
 ADD INDEX `IXFK_servicio_catalogoUniversal` (`tipoServicio` ASC);

ALTER TABLE `servicio` 
 ADD INDEX `IXFK_servicio_catalogoUniversal_02` (`claseServicio` ASC);

ALTER TABLE `servicio` 
 ADD INDEX `IXFK_servicio_catalogoUniversal_03` (`modoPagoServicio` ASC);


ALTER TABLE `catalogoUniversal` 
 ADD CONSTRAINT `FK_catalogoUniversal_catalogoUniversal`
	FOREIGN KEY (`tipoCatalogo`) REFERENCES `catalogoUniversal` (`idCatalogo`) ON DELETE Restrict ON UPDATE Cascade;

ALTER TABLE `contacto` 
 ADD CONSTRAINT `FK_Contactos_catalogoUniversal`
	FOREIGN KEY (`tipoContacto`) REFERENCES `catalogoUniversal` (`idCatalogo`) ON DELETE Restrict ON UPDATE Cascade;

ALTER TABLE `contacto` 
 ADD CONSTRAINT `FK_Contactos_huesped`
	FOREIGN KEY (`huespedContacto`) REFERENCES `huesped` (`idHuesped`) ON DELETE Restrict ON UPDATE Cascade;

ALTER TABLE `habitacion` 
 ADD CONSTRAINT `FK_habitacion_catalogoUniversal`
	FOREIGN KEY (`tipoHabitacion`) REFERENCES `catalogoUniversal` (`idCatalogo`) ON DELETE Restrict ON UPDATE Cascade;

ALTER TABLE `habitacion` 
 ADD CONSTRAINT `FK_habitacion_catalogoUniversal_02`
	FOREIGN KEY (`capacidadHabitacion`) REFERENCES `catalogoUniversal` (`idCatalogo`) ON DELETE Restrict ON UPDATE Cascade;

ALTER TABLE `habitacion` 
 ADD CONSTRAINT `FK_habitacion_catalogoUniversal_03`
	FOREIGN KEY (`zonaHabitacion`) REFERENCES `catalogoUniversal` (`idCatalogo`) ON DELETE Restrict ON UPDATE Cascade;

ALTER TABLE `habitacionXservicios` 
 ADD CONSTRAINT `FK_habitacionXservicios_habitacion`
	FOREIGN KEY (`idHabitacion`) REFERENCES `habitacion` (`idHabitacion`) ON DELETE Restrict ON UPDATE Cascade;

ALTER TABLE `habitacionXservicios` 
 ADD CONSTRAINT `FK_habitacionXservicios_servicio`
	FOREIGN KEY (`idServicio`) REFERENCES `servicio` (`idServicio`) ON DELETE Restrict ON UPDATE Cascade;

ALTER TABLE `huesped` 
 ADD CONSTRAINT `FK_huesped_catalogoUniversal`
	FOREIGN KEY (`tipoDocumento`) REFERENCES `catalogoUniversal` (`idCatalogo`) ON DELETE Restrict ON UPDATE Cascade;

ALTER TABLE `huesped` 
 ADD CONSTRAINT `FK_huesped_catalogoUniversal_02`
	FOREIGN KEY (`generoHuesped`) REFERENCES `catalogoUniversal` (`idCatalogo`) ON DELETE Restrict ON UPDATE Cascade;

ALTER TABLE `huesped` 
 ADD CONSTRAINT `FK_huesped_catalogoUniversal_03`
	FOREIGN KEY (`nacionalidadHuesped`) REFERENCES `catalogoUniversal` (`idCatalogo`) ON DELETE Restrict ON UPDATE Cascade;

ALTER TABLE `reserva` 
 ADD CONSTRAINT `FK_reservas_catalogoUniversal`
	FOREIGN KEY (`estadoReserva`) REFERENCES `catalogoUniversal` (`idCatalogo`) ON DELETE Restrict ON UPDATE Cascade;

ALTER TABLE `reserva` 
 ADD CONSTRAINT `FK_reservas_huesped`
	FOREIGN KEY (`idHuesped`) REFERENCES `huesped` (`idHuesped`) ON DELETE Restrict ON UPDATE Cascade;

ALTER TABLE `servicio` 
 ADD CONSTRAINT `FK_servicio_catalogoUniversal`
	FOREIGN KEY (`tipoServicio`) REFERENCES `catalogoUniversal` (`idCatalogo`) ON DELETE Restrict ON UPDATE Cascade;

ALTER TABLE `servicio` 
 ADD CONSTRAINT `FK_servicio_catalogoUniversal_02`
	FOREIGN KEY (`claseServicio`) REFERENCES `catalogoUniversal` (`idCatalogo`) ON DELETE Restrict ON UPDATE Cascade;

ALTER TABLE `servicio` 
 ADD CONSTRAINT `FK_servicio_catalogoUniversal_03`
	FOREIGN KEY (`modoPagoServicio`) REFERENCES `catalogoUniversal` (`idCatalogo`) ON DELETE Restrict ON UPDATE Cascade;

SET FOREIGN_KEY_CHECKS=1;