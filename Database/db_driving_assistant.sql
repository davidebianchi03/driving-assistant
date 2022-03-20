-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Mar 20, 2022 alle 20:22
-- Versione del server: 10.4.21-MariaDB
-- Versione PHP: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_driving_assistant`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `acquisti`
--

CREATE TABLE `acquisti` (
  `PurchaseID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `PurchaseDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `segnalazioni`
--

CREATE TABLE `segnalazioni` (
  `ID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `Title` varchar(100) NOT NULL,
  `Description` text DEFAULT NULL,
  `Lat` double NOT NULL,
  `Lon` double NOT NULL,
  `Date Time` datetime DEFAULT current_timestamp(),
  `Accepted` bit(1) NOT NULL DEFAULT b'0',
  `Date Time Accepted` datetime DEFAULT NULL,
  `Completed` bit(1) NOT NULL DEFAULT b'0',
  `Date Time Completed` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `users`
--

CREATE TABLE `users` (
  `UserID` int(11) NOT NULL,
  `Nome` varchar(255) NOT NULL,
  `Cognome` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `UserLevel` tinyint(4) NOT NULL DEFAULT 0,
  `AccessToken` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struttura della tabella `veicoli`
--

CREATE TABLE `veicoli` (
  `VehicleID` int(11) NOT NULL,
  `Marca` varchar(255) NOT NULL,
  `Modello` varchar(255) NOT NULL,
  `Targa` varchar(7) NOT NULL,
  `UserID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `acquisti`
--
ALTER TABLE `acquisti`
  ADD PRIMARY KEY (`PurchaseID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indici per le tabelle `segnalazioni`
--
ALTER TABLE `segnalazioni`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indici per le tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`);

--
-- Indici per le tabelle `veicoli`
--
ALTER TABLE `veicoli`
  ADD PRIMARY KEY (`VehicleID`),
  ADD KEY `veicoli_ibfk_1` (`UserID`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `acquisti`
--
ALTER TABLE `acquisti`
  MODIFY `PurchaseID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `segnalazioni`
--
ALTER TABLE `segnalazioni`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `veicoli`
--
ALTER TABLE `veicoli`
  MODIFY `VehicleID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `acquisti`
--
ALTER TABLE `acquisti`
  ADD CONSTRAINT `acquisti_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`) ON UPDATE CASCADE;

--
-- Limiti per la tabella `segnalazioni`
--
ALTER TABLE `segnalazioni`
  ADD CONSTRAINT `segnalazioni_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`) ON UPDATE CASCADE;

--
-- Limiti per la tabella `veicoli`
--
ALTER TABLE `veicoli`
  ADD CONSTRAINT `veicoli_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
