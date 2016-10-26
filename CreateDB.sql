-- --------------------------------------------------------
-- Хост:                         127.0.0.1
-- Версия сервера:               5.5.45 - MySQL Community Server (GPL)
-- ОС Сервера:                   Win32
-- HeidiSQL Версия:              9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Дамп структуры базы данных Recipes
CREATE DATABASE IF NOT EXISTS `recipes` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `Recipes`;


-- Дамп структуры для таблица Recipes.Dish
CREATE TABLE IF NOT EXISTS `Dish` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `ingridients` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы Recipes.Dish: ~3 rows (приблизительно)
/*!40000 ALTER TABLE `Dish` DISABLE KEYS */;
INSERT INTO `Dish` (`id`, `name`, `ingridients`) VALUES
	(1, 'Хлеб', 'Мука, Яйца'),
	(2, 'Макароны по флотски', 'Макароны, Тушенка'),
	(3, 'Фарш', 'Курица, Хлеб');
/*!40000 ALTER TABLE `Dish` ENABLE KEYS */;


-- Дамп структуры базы данных Restouranes
CREATE DATABASE IF NOT EXISTS `restouranes` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `Restouranes`;


-- Дамп структуры для таблица Restouranes.Restouranes
CREATE TABLE IF NOT EXISTS `Restouranes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(50) DEFAULT NULL,
  `price_category` enum('small','medium','big') DEFAULT NULL,
  `adress` varchar(50) DEFAULT NULL,
  `necessary_dish` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы Restouranes.Restouranes: ~3 rows (приблизительно)
/*!40000 ALTER TABLE `Restouranes` DISABLE KEYS */;
INSERT INTO `Restouranes` (`id`, `name`, `description`, `price_category`, `adress`) VALUES
	(1, 'Куракума', 'Китайская кухня', 'medium', 'ул. Китайская 124', 'Хлеб,Фарш'),
	(2, 'Пельмень', 'Российские национальные блюда', 'small', 'ул. Российская 1'),
	(3, 'Rest++', 'Дорого, бохато', 'big', 'ул. Арбат');
/*!40000 ALTER TABLE `Restouranes` ENABLE KEYS */;


-- Дамп структуры базы данных Shop
CREATE DATABASE IF NOT EXISTS `shop` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `Shop`;


-- Дамп структуры для таблица Shop.Product
CREATE TABLE IF NOT EXISTS `Product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `cost` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы Shop.Product: ~4 rows (приблизительно)
/*!40000 ALTER TABLE `Product` DISABLE KEYS */;
INSERT INTO `Product` (`id`, `name`, `cost`) VALUES
	(1, 'Курица', 5),
	(2, 'Хлеб', 2),
	(3, 'Яйца', 2.5),
	(4, 'Мука', 3);
/*!40000 ALTER TABLE `Product` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
