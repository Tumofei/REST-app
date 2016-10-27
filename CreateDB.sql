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

-- Дамп структуры базы данных recipes
CREATE DATABASE IF NOT EXISTS `recipes` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `recipes`;


-- Дамп структуры для таблица recipes.Dish
CREATE TABLE IF NOT EXISTS `Dish` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `ingridients` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы recipes.Dish: ~6 rows (приблизительно)
/*!40000 ALTER TABLE `Dish` DISABLE KEYS */;
INSERT INTO `Dish` (`id`, `name`, `ingridients`) VALUES
	(1, 'Bread', 'Eggs, Flour'),
	(2, 'Americano', 'Coffee, Water, Sugar'),
	(3, 'Good Chicken', 'Chicken, Bread'),
	(4, 'Cake', 'Eggs, Flour, Milk'),
	(5, 'Espresso', 'Coffee, Sugar'),
	(6, 'Super Chicken', 'Chicken, Ananas');
/*!40000 ALTER TABLE `Dish` ENABLE KEYS */;


-- Дамп структуры базы данных restouranes
CREATE DATABASE IF NOT EXISTS `restouranes` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `restouranes`;


-- Дамп структуры для таблица restouranes.Restouranes
CREATE TABLE IF NOT EXISTS `Restouranes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(50) DEFAULT NULL,
  `price_category` enum('small','medium','big') DEFAULT NULL,
  `adress` varchar(50) DEFAULT NULL,
  `necessary_dish` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы restouranes.Restouranes: ~3 rows (приблизительно)
/*!40000 ALTER TABLE `Restouranes` DISABLE KEYS */;
INSERT INTO `Restouranes` (`id`, `name`, `description`, `price_category`, `adress`, `necessary_dish`) VALUES
	(1, 'Curacuma', 'Chinesee', 'medium', 'Chinees str', 'Bread, Americano'),
	(2, 'Pelmen\'', 'Russian', 'small', 'Russusan 1', 'Cake, Espresso'),
	(3, 'Rest++', 'Rich bithc', 'big', 'street Arbat', 'Super Chicken, Good Chicken');
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы shop.Product: ~9 rows (приблизительно)
/*!40000 ALTER TABLE `Product` DISABLE KEYS */;
INSERT INTO `Product` (`id`, `name`, `cost`) VALUES
	(1, 'Chicken', 5),
	(2, 'Bread', 2),
	(3, 'Eggs', 2.5),
	(4, 'Flour', 3),
	(5, 'Coffee', 2),
	(6, 'Water', 0.5),
	(7, 'Sugar', 1),
	(8, 'Milk', 2),
	(9, 'Ananas', 10);
/*!40000 ALTER TABLE `Product` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
