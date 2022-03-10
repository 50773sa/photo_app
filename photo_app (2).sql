-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Värd: localhost:8889
-- Tid vid skapande: 10 mars 2022 kl 18:18
-- Serverversion: 5.7.34
-- PHP-version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databas: `photo_app`
--

-- --------------------------------------------------------

--
-- Tabellstruktur `albums`
--

CREATE TABLE `albums` (
  `id` int(11) NOT NULL,
  `title` varchar(20) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumpning av Data i tabell `albums`
--

INSERT INTO `albums` (`id`, `title`, `user_id`) VALUES
(1, 'Confetti Album', 6),
(2, 'Updated Party Album', 6),
(3, 'Cats Album', 7),
(4, 'My Awesome photo', 7);

-- --------------------------------------------------------

--
-- Tabellstruktur `albums_photos`
--

CREATE TABLE `albums_photos` (
  `id` int(11) UNSIGNED NOT NULL,
  `photo_id` int(11) UNSIGNED NOT NULL,
  `album_id` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumpning av Data i tabell `albums_photos`
--

INSERT INTO `albums_photos` (`id`, `photo_id`, `album_id`) VALUES
(1, 3, 1),
(2, 3, 1),
(3, 3, 2);

-- --------------------------------------------------------

--
-- Tabellstruktur `photos`
--

CREATE TABLE `photos` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `url` varchar(250) NOT NULL,
  `comment` varchar(250) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumpning av Data i tabell `photos`
--

INSERT INTO `photos` (`id`, `title`, `url`, `comment`, `user_id`) VALUES
(1, 'Confetti Photo #1', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', 'Confetti', 6),
(2, 'Update photo', 'https://images.unsplash.com/photo-1454486837617-ce8e1ba5ebfe', 'Confetti #2', 6),
(3, 'Confetti Photo #3', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819', 'Confetti #3', 6),
(4, 'Happy Photo', 'https://images.unsplash.com/photo-1454486837617-ce8e1ba5ebfe', 'So happy', 6);

-- --------------------------------------------------------

--
-- Tabellstruktur `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumpning av Data i tabell `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `first_name`, `last_name`) VALUES
(6, 'jn@badcameraphotography.com', '$2b$10$C9vWYdZDMvbZd.DncHWgiODO96j0wEemV4JFWgKTlCna9QOlemAT.', 'Johan', 'Nordström'),
(7, 'sara@email.com', '$2b$10$7DZukDKNgLExKrfTdvMJ1e1v1ParmhTUbe4jeF7TWAB7Iv2mUo/TC', 'Sara', 'Almqvist'),
(8, 'ella@email.com', '$2b$10$mHHkHFYbrXXLsdds.2PzrugpzCT6x1c4jlCmpCzovfGt8gSzTpnl6', 'Ella', 'Catson'),
(9, 'shelly@email.com', '$2b$10$j/QMecBLV06DaxD9mWSbHOk/7Oay3vkss991djgffpx4A.GA5czde', 'Shelly', 'Catson'),
(10, 'duhartagitkålpånästanhelaklassen.mayourbrainsrestinpeace@email.com', '$2b$10$z4wgCyX74F4BRqd5QxyAQOrbc4atLlBvVxvHonZMzK68uhjm9obau', 'zzzzzz', 'zzzzzzz');

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `albums`
--
ALTER TABLE `albums`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index för tabell `albums_photos`
--
ALTER TABLE `albums_photos`
  ADD PRIMARY KEY (`id`);

--
-- Index för tabell `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index för tabell `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT för dumpade tabeller
--

--
-- AUTO_INCREMENT för tabell `albums`
--
ALTER TABLE `albums`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT för tabell `albums_photos`
--
ALTER TABLE `albums_photos`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT för tabell `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT för tabell `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restriktioner för dumpade tabeller
--

--
-- Restriktioner för tabell `albums`
--
ALTER TABLE `albums`
  ADD CONSTRAINT `albums_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Restriktioner för tabell `photos`
--
ALTER TABLE `photos`
  ADD CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
