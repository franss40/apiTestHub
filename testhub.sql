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
CREATE DATABASE IF NOT EXISTS `testhub` DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci;
USE `testhub`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ask`
--

CREATE TABLE IF NOT EXISTS `ask` (
  `idAsk` bigint(20) NOT NULL AUTO_INCREMENT,
  `ask` varchar(500) NOT NULL,
  `answer1` varchar(500) NOT NULL,
  `answer2` varchar(500) NOT NULL,
  `answer3` varchar(500) DEFAULT NULL,
  `answer4` varchar(500) DEFAULT NULL,
  `sol` varchar(250) NOT NULL,
  `multi` tinyint(1) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `reference` varchar(500) DEFAULT NULL,
  `test` bigint(20) NOT NULL,
  PRIMARY KEY (`idAsk`),
  KEY `test` (`test`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- RELACIONES PARA LA TABLA `ask`:
--   `test`
--       `test` -> `idTest`
--

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

CREATE TABLE IF NOT EXISTS `test` (
  `idTest` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `userEmail` varchar(255) NOT NULL,
  PRIMARY KEY (`idTest`),
  KEY `userEmail` (`userEmail`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- RELACIONES PARA LA TABLA `test`:
--   `userEmail`
--       `usuario` -> `email`
--

--
-- Volcado de datos para la tabla `test`
--

INSERT INTO `test` (`idTest`, `name`, `description`, `category`, `date`, `userEmail`) VALUES
(6, 'CAP DE MERCANCÍAS Y VIAJEROS', '50 PREGUNTAS REFERENTES AL CAP', 'CAP, VIAJEROS, MERCANCIAS', '2024-12-18', 'test@test.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- RELACIONES PARA LA TABLA `usuario`:
--

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`email`, `username`, `password`) VALUES
('test5@test.com', 'Juan', '$2b$10$MQ7codOL1iCeBRTEHCnjDem/noI3ewnFrYq5oBeV5Zb85aC2cUt2W'),
('test@test.com', 'dsd', '$2b$10$QQDQw6JMKdoceExeT43fAe..yRsdAYDeGMPXxsEogCqs4y7u6T9ky');

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
