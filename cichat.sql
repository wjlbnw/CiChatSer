/*
Navicat MySQL Data Transfer

Source Server         : root
Source Server Version : 50723
Source Host           : localhost:3306
Source Database       : cichat

Target Server Type    : MYSQL
Target Server Version : 50723
File Encoding         : 65001

Date: 2019-06-19 20:54:44
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for connect
-- ----------------------------
DROP TABLE IF EXISTS `connect`;
CREATE TABLE `connect` (
  `f1` int(10) unsigned DEFAULT NULL,
  `f2` int(10) unsigned DEFAULT NULL,
  `key` int(11) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`key`),
  UNIQUE KEY `f1` (`f1`,`f2`),
  KEY `f2` (`f2`),
  CONSTRAINT `connect_ibfk_1` FOREIGN KEY (`f1`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `connect_ibfk_2` FOREIGN KEY (`f2`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of connect
-- ----------------------------
INSERT INTO `connect` VALUES ('1', '3', '10');
INSERT INTO `connect` VALUES ('1', '4', '11');
INSERT INTO `connect` VALUES ('1', '7', '19');
INSERT INTO `connect` VALUES ('1', '8', '16');
INSERT INTO `connect` VALUES ('2', '7', '27');
INSERT INTO `connect` VALUES ('3', '1', '12');
INSERT INTO `connect` VALUES ('3', '4', '13');
INSERT INTO `connect` VALUES ('3', '7', '23');
INSERT INTO `connect` VALUES ('4', '1', '14');
INSERT INTO `connect` VALUES ('4', '3', '15');
INSERT INTO `connect` VALUES ('4', '7', '31');
INSERT INTO `connect` VALUES ('7', '1', '18');
INSERT INTO `connect` VALUES ('7', '2', '26');
INSERT INTO `connect` VALUES ('7', '3', '22');
INSERT INTO `connect` VALUES ('7', '4', '30');
INSERT INTO `connect` VALUES ('8', '1', '17');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `password` char(40) NOT NULL,
  `user_name` char(20) NOT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name` (`user_name`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('000000', 'wjl', '1');
INSERT INTO `users` VALUES ('000000', 'wujiai', '2');
INSERT INTO `users` VALUES ('000000', 'tyx', '3');
INSERT INTO `users` VALUES ('000000', 'zh', '4');
INSERT INTO `users` VALUES ('000000', 'glx', '7');
INSERT INTO `users` VALUES ('000000', 'glxx', '8');
