CREATE DATABASE IF NOT EXISTS hairdresser;
USE hairdresser;

/* 
	Host: localhost
	Database: hairdresser
*/

	-- Table structure for table 'appointments' --

DROP TABLE IF EXISTS `appointments`;
CREATE TABLE `appointments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `appointment_date` datetime DEFAULT NULL,
  `service` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
  /*KEY `fk_user_id_idx` (`user_id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE*/
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `appointments` WRITE;
UNLOCK TABLES;

	-- Table structure for table 'users' --

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `nickname` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `role` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table `users` --

LOCK TABLES `users` WRITE;
INSERT INTO `users` VALUES 
(1, 'Ensar', 'Krehmić', 'krehmiicjr', 'krehmiicjr@gmail.com', 'Ensar123', 'admin', 'active'),
(2, 'Kemal', 'Muminović', 'moka', 'moka@gmail.com', 'Kemal123', 'admin', 'active'),
(3, 'Harun', 'Smriko', 'smriko', 'smriko@gmail.com', 'Harun123', 'admin', 'active');
UNLOCK TABLES;

	-- Table structure for table 'contacts' --

DROP TABLE IF EXISTS `contacts`;
CREATE TABLE `contacts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `message` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `contacts` WRITE;
UNLOCK TABLES;