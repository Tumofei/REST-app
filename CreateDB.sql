-- --------------------------------------------------------
-- Хост:                         127.0.0.1
-- Версия сервера:               5.5.41-log - MySQL Community Server (GPL)
-- ОС Сервера:                   Win32
-- HeidiSQL Версия:              9.1.0.4867
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Дамп структуры базы данных recipes
CREATE DATABASE IF NOT EXISTS `recipes` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `recipes`;


-- Дамп структуры для таблица recipes.Product
CREATE TABLE IF NOT EXISTS `Product` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Дамп данных таблицы recipes.Product: ~1 rows (приблизительно)
/*!40000 ALTER TABLE `Product` DISABLE KEYS */;
INSERT INTO `Product` (`id`, `name`) VALUES
	(1, 'Myka'),
	(3, 'Sugar'),
	(4, 'Water'),
	(5, 'Coffee'),
	(6, 'Solt'),
	(7, 'Pepper'),
	(8, 'Chiken');
/*!40000 ALTER TABLE `Product` ENABLE KEYS */;


-- Дамп структуры для таблица recipes.Recipes
CREATE TABLE IF NOT EXISTS `Recipes` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Дамп данных таблицы recipes.Recipes: ~7 rows (приблизительно)
/*!40000 ALTER TABLE `Recipes` DISABLE KEYS */;
INSERT INTO `Recipes` (`id`, `name`) VALUES
	(1, 'Breads'),
	(3, 'Good Chicken'),
	(4, 'Cake'),
	(5, 'Espresso'),
	(6, 'Super Chicken');
/*!40000 ALTER TABLE `Recipes` ENABLE KEYS */;


-- Дамп структуры для таблица recipes.Recipes_ingr
CREATE TABLE IF NOT EXISTS `Recipes_ingr` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_recipe` int(11) DEFAULT NULL,
  `id_product` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы recipes.Recipes_ingr: ~4 rows (приблизительно)
/*!40000 ALTER TABLE `Recipes_ingr` DISABLE KEYS */;
INSERT INTO `Recipes_ingr` (`id`, `id_recipe`, `id_product`) VALUES
	(17, 1, '1'),
	(18, 1, '3'),
	(20, 2, '2'),
	(21, 5, '4'),
	(22, 5, '3'),
	(23, 5, '5'),
	(24, 3, '1'),
	(27, 3, '4'),
	(28, 3, '6'),
	(29, 3, '7'),
	(30, 3, '8');
/*!40000 ALTER TABLE `Recipes_ingr` ENABLE KEYS */;


-- Дамп структуры базы данных restouranes
CREATE DATABASE IF NOT EXISTS `restouranes` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `restouranes`;


-- Дамп структуры для таблица restouranes.Dish
CREATE TABLE IF NOT EXISTS `Dish` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_restouranes` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `id_recipes` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы restouranes.Dish: ~4 rows (приблизительно)
/*!40000 ALTER TABLE `Dish` DISABLE KEYS */;
INSERT INTO `Dish` (`id`, `id_restouranes`, `name`, `id_recipes`) VALUES
	(1, 1, 'Bread', 1),
	(2, 2, 'Cake', 4),
	(3, 5, 'Espresso', 5),
	(4, 1, 'Chikens', 3);
/*!40000 ALTER TABLE `Dish` ENABLE KEYS */;


-- Дамп структуры для таблица restouranes.Restouranes
CREATE TABLE IF NOT EXISTS `Restouranes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(50) DEFAULT NULL,
  `price_category` enum('small','medium','big') DEFAULT NULL,
  `adress` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы restouranes.Restouranes: ~3 rows (приблизительно)
/*!40000 ALTER TABLE `Restouranes` DISABLE KEYS */;
INSERT INTO `Restouranes` (`id`, `name`, `description`, `price_category`, `adress`) VALUES
	(1, 'Curacuma', 'Chinesee', 'medium', 'Chinees str'),
	(2, 'Pelmen\'', 'Russian', 'small', 'Russusan 1'),
	(5, 'small', 'small', 'small', 'small');
/*!40000 ALTER TABLE `Restouranes` ENABLE KEYS */;


-- Дамп структуры базы данных shop
CREATE DATABASE IF NOT EXISTS `shop` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `shop`;


-- Дамп структуры для таблица shop.Product
CREATE TABLE IF NOT EXISTS `Product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `cost` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы shop.Product: ~10 rows (приблизительно)
/*!40000 ALTER TABLE `Product` DISABLE KEYS */;
INSERT INTO `Product` (`id`, `name`, `cost`) VALUES
	(1, 'Chicken', 5),
	(2, 'Bread', 3),
	(3, 'Eggs', 2.5),
	(4, 'Flour', 3),
	(5, 'Coffee', 2),
	(6, 'Water', 0.5),
	(7, 'Sugar', 1),
	(8, 'Milk', 2),
	(9, 'Ananas', 10),
	(13, 'Coffee 100kg', 100);
/*!40000 ALTER TABLE `Product` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
