-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Ápr 20. 20:58
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `rendelotablet`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `asztal`
--

CREATE TABLE `asztal` (
  `asztal_id` int(11) NOT NULL,
  `ferohely` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `asztal`
--

INSERT INTO `asztal` (`asztal_id`, `ferohely`) VALUES
(1, 2),
(2, 4),
(3, 6),
(4, 4),
(5, 2),
(6, 6),
(7, 4),
(8, 2),
(9, 8),
(10, 4);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ertekeles`
--

CREATE TABLE `ertekeles` (
  `ertek_id` int(11) NOT NULL,
  `rendeles_id` int(11) NOT NULL,
  `idopont` datetime NOT NULL,
  `pontszam` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `ertekeles`
--

INSERT INTO `ertekeles` (`ertek_id`, `rendeles_id`, `idopont`, `pontszam`) VALUES
(1, 1, '2025-11-02 00:00:00', 5),
(2, 2, '2025-11-02 00:00:00', 4),
(3, 3, '2025-11-02 00:00:00', 5),
(4, 4, '2025-11-02 00:00:00', 3),
(5, 5, '2025-11-02 00:00:00', 4),
(6, 6, '2025-11-02 00:00:00', 5),
(7, 7, '2025-11-02 00:00:00', 4),
(8, 8, '2025-11-02 00:00:00', 2),
(9, 9, '2025-11-02 00:00:00', 5),
(10, 10, '2025-11-02 00:00:00', 4),
(11, 15, '0001-01-01 00:00:00', 4),
(12, 16, '2026-04-20 20:44:14', 5);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `etel_tipus`
--

CREATE TABLE `etel_tipus` (
  `eteltipus_id` int(11) NOT NULL,
  `tipus_nev` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `etel_tipus`
--

INSERT INTO `etel_tipus` (`eteltipus_id`, `tipus_nev`) VALUES
(1, 'Pizza'),
(2, 'Burger'),
(3, 'Ital'),
(4, 'Desszert'),
(5, 'Saláta'),
(6, 'Leves'),
(7, 'Tészta'),
(8, 'Grill'),
(9, 'Hal'),
(10, 'Vegán');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `pincer`
--

CREATE TABLE `pincer` (
  `pincer_id` int(11) NOT NULL,
  `pincer_nev` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `pincer`
--

INSERT INTO `pincer` (`pincer_id`, `pincer_nev`) VALUES
(1, 'Kiss Péter'),
(2, 'Nagy Anna'),
(3, 'Tóth László'),
(4, 'Szabó Réka'),
(5, 'Varga Márton'),
(6, 'Horváth Luca'),
(7, 'Kovács Bence'),
(8, 'Fekete Dóra'),
(9, 'Molnár Ákos'),
(10, 'Balogh Eszter');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `pincer_hivas`
--

CREATE TABLE `pincer_hivas` (
  `hivas_id` int(11) NOT NULL,
  `asztal_id` int(11) NOT NULL,
  `idopont` datetime NOT NULL,
  `statusz` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `pincer_hivas`
--

INSERT INTO `pincer_hivas` (`hivas_id`, `asztal_id`, `idopont`, `statusz`) VALUES
(1, 2, '2025-11-02 12:15:30', 'Bankkártyás Fizetés'),
(2, 4, '2025-11-02 13:05:10', 'Készpénzes Fizetés'),
(3, 7, '2025-11-02 13:40:00', 'Segítségkérés'),
(4, 7, '2025-11-02 14:22:45', 'Teljesítve'),
(5, 1, '2026-04-19 19:05:08', 'Segítség Kérés'),
(6, 1, '2026-04-19 19:05:43', 'Segítség Kérés'),
(7, 1, '2026-04-19 19:10:48', 'Segítség Kérés'),
(8, 1, '2026-04-19 19:13:48', 'Függőben'),
(9, 1, '2026-04-19 21:16:32', 'Segítség Kérés'),
(10, 1, '2026-04-20 20:02:35', 'Készpénzes Fizetés'),
(11, 1, '2026-04-20 20:21:14', 'Készpénzes Fizetés'),
(12, 1, '2026-04-20 20:21:45', 'Pincér hívása'),
(13, 1, '2026-04-20 20:26:09', 'Pincér hívása'),
(14, 1, '2026-04-20 20:29:05', 'Pincér hívása'),
(15, 1, '2026-04-20 20:39:44', 'Készpénzes Fizetés'),
(16, 1, '2026-04-20 20:43:17', 'Készpénzes Fizetés'),
(17, 1, '2026-04-20 20:46:41', 'Bankkártyás Fizetés'),
(18, 1, '2026-04-20 20:46:55', 'Pincér hívása'),
(19, 1, '2026-04-20 20:47:26', 'Pincér hívása'),
(20, 1, '2026-04-20 20:53:08', 'Segítség Kérés');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `rendeles`
--

CREATE TABLE `rendeles` (
  `rendeles_id` int(11) NOT NULL,
  `pincer_id` int(11) NOT NULL,
  `asztal_id` int(11) NOT NULL,
  `idopont` datetime NOT NULL,
  `statusz` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `rendeles`
--

INSERT INTO `rendeles` (`rendeles_id`, `pincer_id`, `asztal_id`, `idopont`, `statusz`) VALUES
(1, 1, 1, '2025-11-01 04:04:33', 1),
(2, 2, 2, '2025-11-01 10:13:44', 1),
(3, 3, 3, '2025-11-01 03:25:13', 2),
(4, 4, 4, '2025-11-02 07:08:32', 1),
(5, 5, 5, '2025-11-02 20:11:35', 0),
(6, 6, 6, '2025-11-02 02:20:35', 2),
(7, 7, 7, '2025-11-02 13:13:36', 3),
(8, 8, 8, '2025-11-02 08:12:45', 2),
(9, 9, 9, '2025-11-02 01:29:16', 3),
(10, 10, 10, '2025-11-02 03:37:12', 2),
(13, 7, 1, '2026-04-20 20:02:35', 0),
(14, 8, 1, '2026-04-20 20:21:14', 3),
(15, 4, 1, '2026-04-20 20:39:44', 0),
(16, 6, 1, '2026-04-20 20:43:17', 3),
(17, 10, 1, '2026-04-20 20:46:41', 3);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `rendeles_tetel`
--

CREATE TABLE `rendeles_tetel` (
  `tetel_id` int(11) NOT NULL,
  `rendeles_id` int(11) NOT NULL,
  `termek_id` int(11) NOT NULL,
  `mennyiseg` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `rendeles_tetel`
--

INSERT INTO `rendeles_tetel` (`tetel_id`, `rendeles_id`, `termek_id`, `mennyiseg`) VALUES
(1, 1, 1, 2),
(2, 2, 2, 1),
(3, 3, 3, 3),
(4, 4, 4, 1),
(5, 5, 5, 2),
(6, 6, 6, 1),
(7, 7, 7, 2),
(8, 8, 8, 1),
(9, 10, 9, 3),
(10, 10, 10, 1),
(11, 13, 48, 1),
(12, 14, 45, 2),
(13, 14, 15, 1),
(14, 14, 40, 1),
(15, 15, 45, 2),
(16, 15, 9, 1),
(17, 15, 11, 1),
(18, 15, 34, 1),
(19, 15, 12, 2),
(20, 16, 11, 2),
(21, 16, 40, 1),
(22, 16, 15, 1),
(23, 16, 37, 1),
(24, 17, 3, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `termek`
--

CREATE TABLE `termek` (
  `termek_id` int(11) NOT NULL,
  `eteltipus_id` int(11) NOT NULL,
  `termek_nev` text NOT NULL,
  `ar` int(11) NOT NULL,
  `allergenek` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `termek`
--

INSERT INTO `termek` (`termek_id`, `eteltipus_id`, `termek_nev`, `ar`, `allergenek`) VALUES
(1, 1, 'Margherita pizza', 2790, '1,7'),
(2, 1, 'Pepperoni pizza', 2990, '1,7'),
(3, 1, 'Sonkás pizza', 2890, '1,7'),
(4, 1, 'Négysajtos pizza', 3190, '1,7'),
(5, 1, 'BBQ csirkés pizza', 3290, '1,7,9'),
(6, 2, 'Sajtburger', 3290, '1,3,7,11'),
(7, 2, 'Dupla burger', 3690, '1,3,7,11'),
(8, 2, 'Bacon burger', 3490, '1,3,7,11'),
(9, 2, 'Csirkeburger', 3190, '1,3,7,11'),
(10, 2, 'Vegán burger', 3390, '1,6,11'),
(11, 3, 'Coca-Cola 0.5l', 790, NULL),
(12, 3, 'Coca-Cola Zero 0.5l', 790, NULL),
(13, 3, 'Ásványvíz 0.5l', 590, NULL),
(14, 3, 'Narancslé 0.3l', 890, NULL),
(15, 3, 'Házi limonádé', 990, NULL),
(16, 4, 'Csokoládétorta', 1490, '1,3,7,8'),
(17, 4, 'Somlói galuska', 1590, '1,3,7,8'),
(18, 4, 'Palacsinta (2 db)', 1290, '1,3,7'),
(19, 4, 'Sajttorta', 1690, '1,3,7'),
(20, 4, 'Brownie', 1390, '1,3,7,8'),
(21, 5, 'Cézár saláta', 2190, '1,3,4,7,10'),
(22, 5, 'Görög saláta', 1990, '7'),
(23, 5, 'Tonhalsaláta', 2390, '4,10'),
(24, 5, 'Csirkés saláta', 2290, '10'),
(25, 5, 'Vegán saláta', 2090, '8'),
(26, 6, 'Gulyásleves', 1890, '9'),
(27, 6, 'Húsleves', 1690, '1,3,9'),
(28, 6, 'Paradicsomleves', 1490, '1,9'),
(29, 6, 'Brokkolikrémleves', 1590, '1,7'),
(30, 6, 'Halászlé', 2190, '4'),
(31, 7, 'Spaghetti Carbonara', 2590, '1,3,7'),
(32, 7, 'Bolognai spagetti', 2490, '1,3,7,9'),
(33, 7, 'Penne Arrabiata', 2390, '1'),
(34, 7, 'Lasagne', 2790, '1,3,7,9'),
(35, 7, 'Tejszínes csirkés tészta', 2690, '1,3,7'),
(36, 8, 'Grillezett csirkemell', 2990, NULL),
(37, 8, 'Grill kolbász', 2790, '10'),
(38, 8, 'BBQ oldalas', 3490, '9,10'),
(39, 8, 'Grill zöldségtál', 2590, NULL),
(40, 8, 'Grill lazac', 3890, '4'),
(41, 9, 'Rántott hekk', 2890, '1,3,4'),
(42, 9, 'Grillezett pisztráng', 3390, '4'),
(43, 9, 'Lazac steak', 3990, '4'),
(44, 9, 'Harcsa paprikás', 3190, '1,4,7'),
(45, 9, 'Tőkehal filé', 2990, '4'),
(46, 10, 'Vegán Buddha tál', 2490, '11'),
(47, 10, 'Vegán curry', 2590, NULL),
(48, 10, 'Falafel tál', 2390, '11'),
(49, 10, 'Vegán wrap', 2290, '1,10,11'),
(50, 10, 'Sült zöldségek hummusszal', 2190, '11');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `asztal`
--
ALTER TABLE `asztal`
  ADD PRIMARY KEY (`asztal_id`);

--
-- A tábla indexei `ertekeles`
--
ALTER TABLE `ertekeles`
  ADD PRIMARY KEY (`ertek_id`),
  ADD KEY `rendeles_id` (`rendeles_id`) USING BTREE;

--
-- A tábla indexei `etel_tipus`
--
ALTER TABLE `etel_tipus`
  ADD PRIMARY KEY (`eteltipus_id`);

--
-- A tábla indexei `pincer`
--
ALTER TABLE `pincer`
  ADD PRIMARY KEY (`pincer_id`);

--
-- A tábla indexei `pincer_hivas`
--
ALTER TABLE `pincer_hivas`
  ADD PRIMARY KEY (`hivas_id`),
  ADD KEY `hivas_asztal_fk` (`asztal_id`);

--
-- A tábla indexei `rendeles`
--
ALTER TABLE `rendeles`
  ADD PRIMARY KEY (`rendeles_id`),
  ADD KEY `pincer_id` (`pincer_id`) USING BTREE,
  ADD KEY `asztal_id` (`asztal_id`) USING BTREE;

--
-- A tábla indexei `rendeles_tetel`
--
ALTER TABLE `rendeles_tetel`
  ADD PRIMARY KEY (`tetel_id`),
  ADD KEY `rendeles_id` (`rendeles_id`) USING BTREE,
  ADD KEY `termek_id` (`termek_id`) USING BTREE;

--
-- A tábla indexei `termek`
--
ALTER TABLE `termek`
  ADD PRIMARY KEY (`termek_id`),
  ADD KEY `termek_ibfk_1` (`eteltipus_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `asztal`
--
ALTER TABLE `asztal`
  MODIFY `asztal_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `ertekeles`
--
ALTER TABLE `ertekeles`
  MODIFY `ertek_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT a táblához `etel_tipus`
--
ALTER TABLE `etel_tipus`
  MODIFY `eteltipus_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `pincer`
--
ALTER TABLE `pincer`
  MODIFY `pincer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `pincer_hivas`
--
ALTER TABLE `pincer_hivas`
  MODIFY `hivas_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT a táblához `rendeles`
--
ALTER TABLE `rendeles`
  MODIFY `rendeles_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT a táblához `rendeles_tetel`
--
ALTER TABLE `rendeles_tetel`
  MODIFY `tetel_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT a táblához `termek`
--
ALTER TABLE `termek`
  MODIFY `termek_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
