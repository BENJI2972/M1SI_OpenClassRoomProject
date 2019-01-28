-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le :  lun. 28 jan. 2019 à 10:52
-- Version du serveur :  10.3.9-MariaDB
-- Version de PHP :  7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `zfl3-zquillivi`
--

-- --------------------------------------------------------

--
-- Structure de la table `SuiviCour`
--

CREATE TABLE `SuiviCour` (
  `s_id` int(10) NOT NULL,
  `s_chapitre` int(10) NOT NULL,
  `s_sousChapitre` int(10) NOT NULL,
  `s_fini` int(1) NOT NULL DEFAULT 0,
  `f_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `Utilisateur`
--

CREATE TABLE `Utilisateur` (
  `u_idUtilisateur` int(11) NOT NULL,
  `u_nom` varchar(200) DEFAULT NULL,
  `u_prenom` varchar(200) DEFAULT NULL,
  `u_identifiant` int(150) NOT NULL,
  `u_actif` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `SuiviCour`
--
ALTER TABLE `SuiviCour`
  ADD PRIMARY KEY (`s_id`),
  ADD KEY `f_id` (`f_id`);

--
-- Index pour la table `Utilisateur`
--
ALTER TABLE `Utilisateur`
  ADD PRIMARY KEY (`u_idUtilisateur`);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `SuiviCour`
--
ALTER TABLE `SuiviCour`
  ADD CONSTRAINT `SuiviCour_ibfk_1` FOREIGN KEY (`f_id`) REFERENCES `Utilisateur` (`u_idUtilisateur`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
