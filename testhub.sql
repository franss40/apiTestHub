START TRANSACTION;

--
-- Base de datos: `testhub`
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


CREATE TABLE `test` (
  `idTest` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `userEmail` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;


CREATE TABLE `usuario` (
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;


-- Indices de las tablas

ALTER TABLE `ask`
  ADD PRIMARY KEY (`idAsk`),
  ADD KEY `test` (`test`);

ALTER TABLE `test`
  ADD PRIMARY KEY (`idTest`),
  ADD KEY `userEmail` (`userEmail`);

ALTER TABLE `usuario`
  ADD PRIMARY KEY (`email`);

ALTER TABLE `ask`
  MODIFY `idAsk` bigint(20) NOT NULL AUTO_INCREMENT;

ALTER TABLE `test`
  MODIFY `idTest` bigint(20) NOT NULL AUTO_INCREMENT;


-- Restricciones para tablas volcadas

ALTER TABLE `ask`
  ADD CONSTRAINT `ask_ibfk_1` FOREIGN KEY (`test`) REFERENCES `test` (`idTest`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `test`
  ADD CONSTRAINT `test_ibfk_1` FOREIGN KEY (`userEmail`) REFERENCES `usuario` (`email`) ON DELETE CASCADE ON UPDATE CASCADE;


COMMIT;