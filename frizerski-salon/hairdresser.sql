CREATE DATABASE IF NOT EXISTS hairdresser;
USE hairdresser;

/* 
	Host: localhost
	Database: hairdresser
*/

-- Uklanjanje postojećih stranih ključeva
ALTER TABLE `questions` DROP FOREIGN KEY `FK_QuestionUser`;
ALTER TABLE `questions` DROP FOREIGN KEY `FK_QuestionWorker`;
ALTER TABLE `worker_registers` DROP FOREIGN KEY `FK_WorkerRegisterUser`;
ALTER TABLE `worker_registers` DROP FOREIGN KEY `FK_WorkerRegisterWorker`;

-- Brisanje tabela
DROP TABLE IF EXISTS `questions`;
DROP TABLE IF EXISTS `worker_registers`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `workers`;

	-- Table structure for table 'login' --

DROP TABLE IF EXISTS `login`;
CREATE TABLE `login` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `login` WRITE;
UNLOCK TABLES;

-- Table structure for table 'users'
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(20) DEFAULT NULL,
  `lastName` varchar(20) DEFAULT NULL,
  `nickname` varchar(20) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `password` varchar(30) DEFAULT NULL,
  `role` varchar(20) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `users` WRITE;
INSERT INTO `users` VALUES 
(1, 'Ensar', 'Krehmić', 'krehmiicjr', 'krehmiicjr@gmail.com', 'Ensar123', 'ADMIN', 'ACTIVE'),
(2, 'Kemal', 'Muminović', 'moka', 'moka@gmail.com', 'Kemal123', 'ADMIN', 'ACTIVE'),
(3, 'Harun', 'Smriko', 'smriko', 'smriko@gmail.com', 'Harun123', 'ADMIN', 'ACTIVE');
UNLOCK TABLES;

-- Table structure for table 'workers'
CREATE TABLE `workers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `workers` WRITE;
INSERT INTO `workers` VALUES
(1, 'Ensar', 'Kvalitetan, Profesionalan', 'Frizer'),
(2, 'Kemal', 'Moderan, Kreativan', 'Stilista'),
(3, 'Harun', 'Povjerljiv, Odgovoran', 'Pomoćni radnik');
UNLOCK TABLES;

-- Table structure for table 'worker_registers'
CREATE TABLE `worker_registers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `worker_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_WorkerRegisterUser` (`user_id`),
  KEY `FK_WorkerRegisterWorker` (`worker_id`),
  CONSTRAINT `FK_WorkerRegisterWorker` FOREIGN KEY (`worker_id`) REFERENCES `workers` (`id`),
  CONSTRAINT `FK_WorkerRegisterUser` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `worker_registers` WRITE;
UNLOCK TABLES;

-- Table structure for table 'questions'
CREATE TABLE `questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `worker_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_QuestionUser` (`user_id`),
  KEY `FK_QuestionWorker` (`worker_id`),
  CONSTRAINT `FK_QuestionWorker` FOREIGN KEY (`worker_id`) REFERENCES `workers` (`id`),
  CONSTRAINT `FK_QuestionUser` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `questions` WRITE;
UNLOCK TABLES;