-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 12-11-2025 a las 10:20:19
-- Versión del servidor: 8.0.43
-- Versión de PHP: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gestoria_financiera`
--
CREATE DATABASE IF NOT EXISTS `gestoria_financiera` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `gestoria_financiera`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `currency`
--

CREATE TABLE `currency` (
  `currency_id` int NOT NULL,
  `currency_name` varchar(69) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `currency`
--

INSERT INTO `currency` (`currency_id`, `currency_name`) VALUES
(1, 'USD'),
(2, 'EUR'),
(3, 'CHF');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `customers`
--

CREATE TABLE `customers` (
  `id_customers` int NOT NULL,
  `phone` int NOT NULL,
  `customer_name` varchar(69) NOT NULL,
  `customer_active` tinyint(1) NOT NULL,
  `birthdate` date NOT NULL,
  `currency_id_FK` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stocks`
--

CREATE TABLE `stocks` (
  `id_stocks` int NOT NULL,
  `quantity` int NOT NULL,
  `stock_name` varchar(69) NOT NULL,
  `in_use` tinyint(1) NOT NULL,
  `added_date` date NOT NULL,
  `wallet_id_FK` int NOT NULL,
  `stock_type_id_FK` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stock_type`
--

CREATE TABLE `stock_type` (
  `stock_type_id` int NOT NULL,
  `stock_type_name` varchar(69) NOT NULL,
  `stock_type_quality` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `stock_type`
--

INSERT INTO `stock_type` (`stock_type_id`, `stock_type_name`, `stock_type_quality`) VALUES
(1, 'Apple Inc.', 251.37),
(2, 'Microsoft Corp.', 371.89),
(3, 'Amazon Inc.', 326.24),
(4, 'Alphabet Inc.', 157.18),
(5, 'Johnson & Johnson', 187.94),
(6, 'Nestlé', 212.37),
(7, 'Banco Santander', 268.35),
(8, 'Siemens AG', 198.54),
(9, 'Tesla Inc.', 369.74),
(10, 'Novartis', 158.46);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `wallet`
--

CREATE TABLE `wallet` (
  `id_wallet` int NOT NULL,
  `money_amount` float NOT NULL,
  `wallet_name` varchar(69) NOT NULL,
  `wallet_active` tinyint(1) NOT NULL,
  `creation_date` date NOT NULL,
  `description` varchar(69) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `wallet_type_id_FK` int NOT NULL,
  `customers_id_FK` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `wallet_type`
--

CREATE TABLE `wallet_type` (
  `wallet_type_id` int NOT NULL,
  `wallet_type_name` varchar(69) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `wallet_type`
--

INSERT INTO `wallet_type` (`wallet_type_id`, `wallet_type_name`) VALUES
(1, 'Ahorro'),
(2, 'Inversion'),
(3, 'Mixta');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `currency`
--
ALTER TABLE `currency`
  ADD PRIMARY KEY (`currency_id`);

--
-- Indices de la tabla `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id_customers`),
  ADD KEY `currency_id_fk` (`currency_id_FK`);

--
-- Indices de la tabla `stocks`
--
ALTER TABLE `stocks`
  ADD PRIMARY KEY (`id_stocks`),
  ADD KEY `wallet_id_fk` (`wallet_id_FK`),
  ADD KEY `stock_type_id_fk` (`stock_type_id_FK`);

--
-- Indices de la tabla `stock_type`
--
ALTER TABLE `stock_type`
  ADD PRIMARY KEY (`stock_type_id`);

--
-- Indices de la tabla `wallet`
--
ALTER TABLE `wallet`
  ADD PRIMARY KEY (`id_wallet`),
  ADD KEY `customers_id_fk` (`customers_id_FK`),
  ADD KEY `wallet_type_id_fk` (`wallet_type_id_FK`);

--
-- Indices de la tabla `wallet_type`
--
ALTER TABLE `wallet_type`
  ADD PRIMARY KEY (`wallet_type_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `currency`
--
ALTER TABLE `currency`
  MODIFY `currency_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `customers`
--
ALTER TABLE `customers`
  MODIFY `id_customers` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `stocks`
--
ALTER TABLE `stocks`
  MODIFY `id_stocks` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `stock_type`
--
ALTER TABLE `stock_type`
  MODIFY `stock_type_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `wallet`
--
ALTER TABLE `wallet`
  MODIFY `id_wallet` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `wallet_type`
--
ALTER TABLE `wallet_type`
  MODIFY `wallet_type_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `customers`
--
ALTER TABLE `customers`
  ADD CONSTRAINT `currency_id_fk` FOREIGN KEY (`currency_id_FK`) REFERENCES `currency` (`currency_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Filtros para la tabla `stocks`
--
ALTER TABLE `stocks`
  ADD CONSTRAINT `stock_type_id_fk` FOREIGN KEY (`stock_type_id_FK`) REFERENCES `stock_type` (`stock_type_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `wallet_id_fk` FOREIGN KEY (`wallet_id_FK`) REFERENCES `wallet` (`id_wallet`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Filtros para la tabla `wallet`
--
ALTER TABLE `wallet`
  ADD CONSTRAINT `customers_id_fk` FOREIGN KEY (`customers_id_FK`) REFERENCES `customers` (`id_customers`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `wallet_type_id_fk` FOREIGN KEY (`wallet_type_id_FK`) REFERENCES `wallet_type` (`wallet_type_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
