-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-02-2025 a las 12:29:37
-- Versión del servidor: 11.3.2-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `testhub`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ask`
--

CREATE TABLE `ask` (
  `idAsk` bigint(20) NOT NULL,
  `ask` varchar(500) NOT NULL,
  `answer1` varchar(500) NOT NULL,
  `answer2` varchar(500) DEFAULT NULL,
  `answer3` varchar(500) DEFAULT NULL,
  `answer4` varchar(500) DEFAULT NULL,
  `sol` varchar(250) NOT NULL,
  `multi` tinyint(1) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `reference` varchar(500) DEFAULT NULL,
  `test` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Volcado de datos para la tabla `ask`
--

INSERT INTO `ask` (`idAsk`, `ask`, `answer1`, `answer2`, `answer3`, `answer4`, `sol`, `multi`, `image`, `reference`, `test`) VALUES
(5, 'efectos de la aplicación de la normativa de extranjería, el llamado \"Espacio Schengen\" comprende países pertenecientes a:', 'Europa.\r\n', 'Europa e Iberoamérica.', 'Europa y el norte de África.', 'Hispanoamérica.', '1', 0, NULL, 'NORMA: Convenio Aplicación del Acuerdo de Schengen, Art. 140', 6),
(6, '¿Es adecuado que un vehículo venga equipado con la mayor potencia posible para la carga que puede transportar?\r\n', 'Sí, porque así puede hacer el transporte más rápidamente.\r\n', 'Sí, porque de esta forma puede subir cualquier pendiente de la carretera.\r\n', 'No, porque los consumos son más elevados.', 'No, porque no tiene importancia que el vehículo se desplace lentamente.', '3', 0, NULL, 'NORMA: Manual de gestión del combustible en las flotas de transporte. IDAE.\r\nREFERENCIA DOCTRINAL: Manual de gestión del combustible en las flotas de transporte. IDAE.', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `test`
--

CREATE TABLE `test` (
  `idTest` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `userEmail` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Volcado de datos para la tabla `test`
--

INSERT INTO `test` (`idTest`, `name`, `description`, `category`, `date`, `userEmail`) VALUES
(6, 'CAP DE MERCANCÍAS Y VIAJEROS', '50 PREGUNTAS REFERENTES AL CAP', 'CAP, VIAJEROS, MERCANCIAS', '2024-12-18', 'test@test.com'),
(14, 'Nuevo nombre', 'A ver si funciona', 'Test, prueba', '2025-02-08', 'test4@test.com'),
(15, 'Nuevo nombre', 'A ver si funciona', 'Test, prueba', '2025-02-08', 'test4@test.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`email`, `username`, `password`) VALUES
('test2@test.com', 'Pedro', '$2b$10$LiUtpO5XobcMUtfCVj5V0uQDd8GL/Tryua3PXBL8cfoYB0O9vqPuG'),
('test4@test.com', 'Pedro', '$2b$10$KYXV2b8KuuRGw.OZELJSZ.nqNy1Oq6RdbjXO0DQ67h/8m/hg4zm82'),
('test5@test.com', 'Pedro', '$2b$10$5tJxnlQ4xaHGt8YnZ6hBm.rWFRPCWTzW04pGs6PYVw7lWUVIJpBVK'),
('test@test.com', 'dsd', '$2b$10$QQDQw6JMKdoceExeT43fAe..yRsdAYDeGMPXxsEogCqs4y7u6T9ky');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ask`
--
ALTER TABLE `ask`
  ADD PRIMARY KEY (`idAsk`),
  ADD KEY `test` (`test`);

--
-- Indices de la tabla `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`idTest`),
  ADD KEY `userEmail` (`userEmail`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ask`
--
ALTER TABLE `ask`
  MODIFY `idAsk` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `test`
--
ALTER TABLE `test`
  MODIFY `idTest` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ask`
--
ALTER TABLE `ask`
  ADD CONSTRAINT `ask_ibfk_1` FOREIGN KEY (`test`) REFERENCES `test` (`idTest`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `test`
--
ALTER TABLE `test`
  ADD CONSTRAINT `test_ibfk_1` FOREIGN KEY (`userEmail`) REFERENCES `usuario` (`email`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
