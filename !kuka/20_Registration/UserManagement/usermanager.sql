-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Jan 28. 14:12
-- Kiszolgáló verziója: 9.9.0
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `usermanager`
--
CREATE DATABASE IF NOT EXISTS `usermanager` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `usermanager`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `applicationuser`
--

CREATE TABLE `applicationuser` (
  `id` int(11) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `role` varchar(30) NOT NULL,
  `passwd_hash` blob NOT NULL,
  `passwd_salt` blob NOT NULL,
  `birthdate` date DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `applicationuser`
--

INSERT INTO `applicationuser` (`id`, `name`, `email`, `role`, `passwd_hash`, `passwd_salt`, `birthdate`, `gender`) VALUES
(6, 'admin', 'admin@hbsz.hu', 'Admin', 0x5440e3cf727582d781c8fd4f6b2db0886e3f5fa6dcaf5ea3d3280572e9a93ea2f310a98e14633857eee69ce46abd2d11207403190846ebb8f38bd23fb99e2d44, 0xcedfde297d625f4dbf87df0cfe4dcb03bc5ad8793feea7d953dde4f1a6ebd22e1ff12c8039d28d850b7bea33d7e303c53b07eb164d62f6dd28d9c43b63a4038164170b3ada70d025b3687fbf226a382e9250466bedd8aaec88b4310d6041c5262e81fc8d625225e7ef85567a8204225c8afc074951a339de48dff57b2808acdc, NULL, NULL),
(7, 'TestUser', 'testuser@hbsz.hu', 'User', 0xf498abf3caa7226b65c86fd8192acba55f826a5bfc6d2e876ca4b9ea77aba71caeb3bc64571ee0543a521d8549457595cf7a4c6bb72e1e0b36dbc0dcfe4fc4d2, 0xbec32077d9328812a1b21cceab432094fa996756c3b23752427312aa071a43245f0ba7a16ffc72ab8d12c1c6a59530fb516d4d60e4f2b6f0cff15fc99a040dbcc670eee8ca748028173b6213491bd51b5156475849f83de80132dce406f1f5d511332e54610bc58e6c2a7e9b253888edebabc8e87a70fc20b85a02bffb369d8f, NULL, NULL),
(8, 'Gipsz Jakab', 'gj@hbsz.hu', 'User', 0x81022083d424a59be80b90ef1b539644d4fd34dfe4af8018ed4972a8e56f47bdecd8e497cc89b4f255d5fba7def846122070c0802ee5b8552879113a3a6ae483, 0x21e5aa9e28f980724897acc3d76c4bd690130093318e0489d09ff0b3f4c6afb3e208e2ddd15bd60a8eeba149738e578a161c9cf58636ef579d8acab01d8075655383f1454dc5b05824232decd2d492df9eac065f170fd4c8c0f2bbb14188d630fd9ab6142c58f972e407feeff35f8985a4cc264b560cb7952b13b9a3ebf44d8c, '2000-01-01', 'férfi'),
(9, 'Gipsz Jakab', 'jakab@gmail.com', 'User', 0x3c46cef2a0b0d02b7086faf0a99adcbb26a03df0eef94992ea0b857bd54756340f2575e3863b5f5f0ff42a4038321a24fc565c2edcbb6723469749a5d801e8ba, 0x2fb5de1e9c30dd22b5c7d1689c2f3d99d7a30441cd1f7f92d5e961687c883a1fafa96eb05afeca9faa2cdc54a2198084ab126668c32b493697dcab3ce138ea6e7e75c8397146f28f4df3cab1c8626a6e13b9631f99302bb2fe0d067d18249c809920e3de115718ebf9148a5fb35cece4355c3789059aa484caa885307e7a494a, '2000-01-01', 'férfi');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `applicationuser`
--
ALTER TABLE `applicationuser`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `applicationuser`
--
ALTER TABLE `applicationuser`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
