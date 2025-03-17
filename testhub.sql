-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-03-2025 a las 12:06:54
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
(11, '¿Qué método se utiliza para mostrar un mensaje emergente en JavaScript?', 'alertBox()', 'popup()', 'alert()', 'message()', '3', 0, NULL, 'Para mostrar un texto en mensaje emergente se usa alert(\'Esto es un mensaje\')', 19),
(12, '¿Qué palabra clave se utiliza para declarar una variable en JavaScript?', 'let', 'declare', 'variable', 'new', '1', 0, NULL, 'Las variables se pueden declarar con var o let. Las constantes con const.', 19),
(13, '¿Cuál es el operador de concatenación en JavaScript?', '+', '&', '-', '*', '1', 0, NULL, 'Para concatenar cadenas se usa el operador +', 19),
(16, '¿Qué devuelve la expresión typeof 42 en JavaScript?', 'number', 'string', 'integer', 'float', '1', 0, NULL, 'Type <...> nos devuelve el tipo de datos.', 19),
(17, '¿Cómo defines una función en JavaScript?', 'function myFunction() { }', 'define myFunction() { }', 'create myFunction() { }', 'make myFunction() { }', '1', 0, NULL, NULL, 19),
(18, '¿Qué propiedad de CSS se utiliza para cambiar el color de fondo de un elemento?', 'color', 'background-color', 'background', 'border-color', '2', 0, NULL, 'Para la propiedad de fondo se utiliza background-color y para el color color.', 21),
(19, '¿Cuál es el valor predeterminado de la propiedad position en CSS?\r\n\r\n', 'absolute', 'fixed', 'static', 'relative', '3', 0, NULL, NULL, 21);

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
  `idUser` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Volcado de datos para la tabla `test`
--

INSERT INTO `test` (`idTest`, `name`, `description`, `category`, `date`, `idUser`) VALUES
(19, 'javaScript', 'Preguntas sobre el lenguaje JavaScript', 'javascript', '2025-03-17', 4),
(20, 'Literatura contemporánea de España', 'Literatura', 'Literatura', '2025-03-17', 1),
(21, 'Todo sobre CSS', 'Preguntas sobre css', 'CSS, programación', '2025-03-17', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUser` bigint(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUser`, `email`, `username`, `password`) VALUES
(1, 'test2@test.com', 'Pedro', '$2b$10$LiUtpO5XobcMUtfCVj5V0uQDd8GL/Tryua3PXBL8cfoYB0O9vqPuG'),
(2, 'test4@test.com', 'Pedro', '$2b$10$KYXV2b8KuuRGw.OZELJSZ.nqNy1Oq6RdbjXO0DQ67h/8m/hg4zm82'),
(3, 'test5@test.com', 'Pedro', '$2b$10$5tJxnlQ4xaHGt8YnZ6hBm.rWFRPCWTzW04pGs6PYVw7lWUVIJpBVK'),
(4, 'test@test.com', 'dsd', '$2b$10$QQDQw6JMKdoceExeT43fAe..yRsdAYDeGMPXxsEogCqs4y7u6T9ky');

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
  ADD KEY `idUser` (`idUser`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUser`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ask`
--
ALTER TABLE `ask`
  MODIFY `idAsk` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `test`
--
ALTER TABLE `test`
  MODIFY `idTest` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUser` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
  ADD CONSTRAINT `test_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `usuario` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
