-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Jan 11. 19:21
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
  `idopont` date NOT NULL,
  `pontszam` int(11) NOT NULL,
  `szoveg` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `ertekeles`
--

INSERT INTO `ertekeles` (`ertek_id`, `rendeles_id`, `idopont`, `pontszam`, `szoveg`) VALUES
(1, 1, '2025-11-02', 5, 'Nagyon finom volt'),
(2, 2, '2025-11-02', 4, 'Gyors kiszolgálás'),
(3, 3, '2025-11-02', 5, 'Szuper élmény'),
(4, 4, '2025-11-02', 3, 'Kicsit lassú'),
(5, 5, '2025-11-02', 4, 'Finom ételek'),
(6, 6, '2025-11-02', 5, 'Kiváló'),
(7, 7, '2025-11-02', 4, 'Ajánlom'),
(8, 8, '2025-11-02', 2, 'Hideg volt az étel'),
(9, 9, '2025-11-02', 5, 'Minden tökéletes'),
(10, 10, '2025-11-02', 4, 'Visszatérünk');

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
-- Tábla szerkezet ehhez a táblához `rendeles`
--

CREATE TABLE `rendeles` (
  `rendeles_id` int(11) NOT NULL,
  `pincer_id` int(11) NOT NULL,
  `asztal_id` int(11) NOT NULL,
  `idopont` date NOT NULL,
  `statusz` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `rendeles`
--

INSERT INTO `rendeles` (`rendeles_id`, `pincer_id`, `asztal_id`, `idopont`, `statusz`) VALUES
(1, 1, 1, '2025-11-01', 1),
(2, 2, 2, '2025-11-01', 1),
(3, 3, 3, '2025-11-01', 2),
(4, 4, 4, '2025-11-02', 1),
(5, 5, 5, '2025-11-02', 2),
(6, 6, 6, '2025-11-02', 1),
(7, 7, 7, '2025-11-02', 1),
(8, 8, 8, '2025-11-02', 2),
(9, 9, 9, '2025-11-02', 1),
(10, 10, 10, '2025-11-02', 2);

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
(9, 9, 9, 3),
(10, 10, 10, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `termek`
--

CREATE TABLE `termek` (
  `termek_id` int(11) NOT NULL,
  `eteltipus_id` int(11) NOT NULL,
  `termek_nev` text NOT NULL,
  `ar` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `termek`
--

INSERT INTO `termek` (`termek_id`, `eteltipus_id`, `termek_nev`, `ar`) VALUES
(1, 1, 'Margherita pizza', 2790),
(2, 1, 'Pepperoni pizza', 2990),
(3, 1, 'Sonkás pizza', 2890),
(4, 1, 'Négysajtos pizza', 3190),
(5, 1, 'BBQ csirkés pizza', 3290),
(6, 2, 'Sajtburger', 3290),
(7, 2, 'Dupla burger', 3690),
(8, 2, 'Bacon burger', 3490),
(9, 2, 'Csirkeburger', 3190),
(10, 2, 'Vegán burger', 3390),
(11, 3, 'Coca-Cola 0.5l', 790),
(12, 3, 'Coca-Cola Zero 0.5l', 790),
(13, 3, 'Ásványvíz 0.5l', 590),
(14, 3, 'Narancslé 0.3l', 890),
(15, 3, 'Házi limonádé', 990),
(16, 4, 'Csokoládétorta', 1490),
(17, 4, 'Somlói galuska', 1590),
(18, 4, 'Palacsinta (2 db)', 1290),
(19, 4, 'Sajttorta', 1690),
(20, 4, 'Brownie', 1390),
(21, 5, 'Cézár saláta', 2190),
(22, 5, 'Görög saláta', 1990),
(23, 5, 'Tonhalsaláta', 2390),
(24, 5, 'Csirkés saláta', 2290),
(25, 5, 'Vegán saláta', 2090),
(26, 6, 'Gulyásleves', 1890),
(27, 6, 'Húsleves', 1690),
(28, 6, 'Paradicsomleves', 1490),
(29, 6, 'Brokkolikrémleves', 1590),
(30, 6, 'Halászlé', 2190),
(31, 7, 'Spaghetti Carbonara', 2590),
(32, 7, 'Bolognai spagetti', 2490),
(33, 7, 'Penne Arrabiata', 2390),
(34, 7, 'Lasagne', 2790),
(35, 7, 'Tejszínes csirkés tészta', 2690),
(36, 8, 'Grillezett csirkemell', 2990),
(37, 8, 'Grill kolbász', 2790),
(38, 8, 'BBQ oldalas', 3490),
(39, 8, 'Grill zöldségtál', 2590),
(40, 8, 'Grill lazac', 3890),
(41, 9, 'Rántott hekk', 2890),
(42, 9, 'Grillezett pisztráng', 3390),
(43, 9, 'Lazac steak', 3990),
(44, 9, 'Harcsa paprikás', 3190),
(45, 9, 'Tőkehal filé', 2990),
(46, 10, 'Vegán Buddha tál', 2490),
(47, 10, 'Vegán curry', 2590),
(48, 10, 'Falafel tál', 2390),
(49, 10, 'Vegán wrap', 2290),
(50, 10, 'Sült zöldségek hummusszal', 2190);

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
  ADD UNIQUE KEY `rendeles_id` (`rendeles_id`);

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
-- A tábla indexei `rendeles`
--
ALTER TABLE `rendeles`
  ADD PRIMARY KEY (`rendeles_id`),
  ADD UNIQUE KEY `pincer_id` (`pincer_id`),
  ADD UNIQUE KEY `asztal_id` (`asztal_id`);

--
-- A tábla indexei `rendeles_tetel`
--
ALTER TABLE `rendeles_tetel`
  ADD PRIMARY KEY (`tetel_id`),
  ADD UNIQUE KEY `rendeles_id` (`rendeles_id`),
  ADD UNIQUE KEY `termek_id` (`termek_id`);

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
  MODIFY `ertek_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
-- AUTO_INCREMENT a táblához `rendeles`
--
ALTER TABLE `rendeles`
  MODIFY `rendeles_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `rendeles_tetel`
--
ALTER TABLE `rendeles_tetel`
  MODIFY `tetel_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `termek`
--
ALTER TABLE `termek`
  MODIFY `termek_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `ertekeles`
--
ALTER TABLE `ertekeles`
  ADD CONSTRAINT `ertekeles_rendeles_fk` FOREIGN KEY (`rendeles_id`) REFERENCES `rendeles` (`rendeles_id`);

--
-- Megkötések a táblához `rendeles`
--
ALTER TABLE `rendeles`
  ADD CONSTRAINT `rendeles_ibfk_1` FOREIGN KEY (`asztal_id`) REFERENCES `asztal` (`asztal_id`),
  ADD CONSTRAINT `rendeles_pincer_fk` FOREIGN KEY (`pincer_id`) REFERENCES `pincer` (`pincer_id`);

--
-- Megkötések a táblához `rendeles_tetel`
--
ALTER TABLE `rendeles_tetel`
  ADD CONSTRAINT `rendeles_tetel_ibfk_1` FOREIGN KEY (`termek_id`) REFERENCES `termek` (`termek_id`),
  ADD CONSTRAINT `rendeles_tetel_ibfk_2` FOREIGN KEY (`rendeles_id`) REFERENCES `rendeles` (`rendeles_id`);

--
-- Megkötések a táblához `termek`
--
ALTER TABLE `termek`
  ADD CONSTRAINT `termek_ibfk_1` FOREIGN KEY (`eteltipus_id`) REFERENCES `etel_tipus` (`eteltipus_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
