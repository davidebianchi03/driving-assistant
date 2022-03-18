-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Mar 18, 2022 alle 19:07
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
  `UserIdentifier` int(11) NOT NULL,
  `Titolo` varchar(100) NOT NULL,
  `Descrizione` text DEFAULT NULL,
  `Latitudine` double NOT NULL,
  `Longitudine` double NOT NULL,
  `Date Time` datetime DEFAULT current_timestamp(),
  `Accettato` bit(1) NOT NULL DEFAULT b'0',
  `Date Time Accepted` datetime DEFAULT NULL,
  `Completato` bit(1) NOT NULL DEFAULT b'0',
  `Date Time Completed` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `segnalazioni`
--

INSERT INTO `segnalazioni` (`ID`, `UserIdentifier`, `Titolo`, `Descrizione`, `Latitudine`, `Longitudine`, `Date Time`, `Accettato`, `Date Time Accepted`, `Completato`, `Date Time Completed`) VALUES
(1, 1, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'eeh volevi', 0, 0, '2022-03-18 19:01:35', b'0', NULL, b'0', NULL),
(2, 1, 'Incidente', 'desc', 0, 0, '2022-03-18 19:05:31', b'0', NULL, b'0', NULL);

-- --------------------------------------------------------

--
-- Struttura della tabella `users`
--

CREATE TABLE `users` (
  `UserID` int(11) NOT NULL,
  `Nome` varchar(255) NOT NULL,
  `Cognome` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `UserLevel` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `users`
--

INSERT INTO `users` (`UserID`, `Nome`, `Cognome`, `Password`, `UserLevel`) VALUES
(1, 'Davide', 'Bianchi', '', 0),
(2, 'Emanuele', 'Paci', '', 0),
(3, 'Gabriele', 'Ginisi', 'prova', 1),
(4, 'Giovanni', 'Breviario', '$2y$10$94xsNrfEfBSsA3bnI20SB.dzW6iP086.Ke8q494qw0g3CDFrdWpNC', 0);

-- --------------------------------------------------------

--
-- Struttura della tabella `veicoli`
--

CREATE TABLE `veicoli` (
  `IDVeicolo` int(11) NOT NULL,
  `Marca` varchar(255) NOT NULL,
  `Modello` varchar(255) NOT NULL,
  `Targa` varchar(7) NOT NULL,
  `IDProprietario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `acquisti`
--
ALTER TABLE `acquisti`
  ADD PRIMARY KEY (`PurchaseID`),
  ADD KEY `IDuser` (`UserID`);

--
-- Indici per le tabelle `segnalazioni`
--
ALTER TABLE `segnalazioni`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `UserIdentifier` (`UserIdentifier`);

--
-- Indici per le tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`);

--
-- Indici per le tabelle `veicoli`
--
ALTER TABLE `veicoli`
  ADD PRIMARY KEY (`IDVeicolo`,`Targa`),
  ADD KEY `IDProprietario` (`IDProprietario`);

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT per la tabella `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT per la tabella `veicoli`
--
ALTER TABLE `veicoli`
  MODIFY `IDVeicolo` int(11) NOT NULL AUTO_INCREMENT;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `acquisti`
--
ALTER TABLE `acquisti`
  ADD CONSTRAINT `acquisti_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`);

--
-- Limiti per la tabella `segnalazioni`
--
ALTER TABLE `segnalazioni`
  ADD CONSTRAINT `segnalazioni_ibfk_1` FOREIGN KEY (`UserIdentifier`) REFERENCES `users` (`UserID`);

--
-- Limiti per la tabella `veicoli`
--
ALTER TABLE `veicoli`
  ADD CONSTRAINT `veicoli_ibfk_1` FOREIGN KEY (`IDProprietario`) REFERENCES `users` (`UserID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
