-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: bd_ti37
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Comida'),(2,'Bebida'),(3,'Sobremesa'),(5,'Sobremesa'),(6,'Sobremesa');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(70) NOT NULL,
  `cpf` int NOT NULL,
  `senha` varchar(30) NOT NULL,
  `telefone` varchar(25) NOT NULL,
  `email` varchar(50) NOT NULL,
  `registro` datetime DEFAULT CURRENT_TIMESTAMP,
  `ultimo_login` datetime DEFAULT NULL,
  `usuario` varchar(45) NOT NULL,
  `cargo` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cpf_UNIQUE` (`cpf`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'Conrado',123456789,'senac123','123456789','conrado@gmail.com','2022-08-24 17:15:23',NULL,'conrado','chefe'),(4,'Marcius',101010,'senac123','1234567890','conradoo@gmail.com','2022-08-24 17:16:49',NULL,'marcius','garçom');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cupons`
--

DROP TABLE IF EXISTS `cupons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cupons` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `inicio` datetime NOT NULL,
  `termino` datetime NOT NULL,
  `quantidade` int DEFAULT NULL,
  `desconto` int NOT NULL,
  `registro` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cupons`
--

LOCK TABLES `cupons` WRITE;
/*!40000 ALTER TABLE `cupons` DISABLE KEYS */;
INSERT INTO `cupons` VALUES (1,'Cupom','2022-02-02 18:00:00','2022-03-03 18:00:00',3,10,'2022-08-26 14:53:28'),(2,'Cupom 1','2022-10-04 15:00:00','2022-10-05 15:00:00',10,5,'2022-10-04 14:45:33'),(3,'100','2022-10-04 14:00:00','2022-10-05 14:00:00',100,100,'2022-10-04 14:57:34');
/*!40000 ALTER TABLE `cupons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enderecos`
--

DROP TABLE IF EXISTS `enderecos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enderecos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `numero` varchar(30) NOT NULL,
  `complemento` varchar(45) DEFAULT NULL,
  `cep` varchar(25) NOT NULL,
  `cidade` varchar(50) DEFAULT 'São Carlos',
  `rua` varchar(50) NOT NULL,
  `bairro` varchar(70) NOT NULL,
  `uf` varchar(45) DEFAULT 'SP',
  `id_cliente` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_enderecos_clientes_idx` (`id_cliente`),
  CONSTRAINT `fk_enderecos_clientes` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enderecos`
--

LOCK TABLES `enderecos` WRITE;
/*!40000 ALTER TABLE `enderecos` DISABLE KEYS */;
INSERT INTO `enderecos` VALUES (1,'70','Casa Branca','131313-13','São Carlos','Senac São Carlos','Centro','SP',1),(2,'70','Casa Branca','131313-13','São Carlos','Senac São Carlos','Centro','SP',1);
/*!40000 ALTER TABLE `enderecos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `registro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `mesa` int NOT NULL,
  `observacao` longtext,
  `id_cliente` int NOT NULL,
  `status` varchar(45) NOT NULL DEFAULT 'aguardando' COMMENT 'Status:\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\naguardando, confirmado, preparando, enviado, concluido',
  `id_venda` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_pedidos_clientes_idx` (`id_cliente`),
  KEY `fk_pedidos_vendas_idx` (`id_venda`),
  CONSTRAINT `fk_pedidos_clientes` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_pedidos_vendas` FOREIGN KEY (`id_venda`) REFERENCES `vendas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` VALUES (5,'2022-10-27 16:52:56',1,'Sem Azeitona, sou Alérgico',4,'aguardando',NULL),(6,'2022-10-27 16:55:08',9,'Testando o pedido 9, sou Alérgico',4,'preparando',NULL),(8,'2022-10-27 16:58:37',6,'Testando o pedido 6, sou Alérgico',4,'concluido',NULL),(9,'2022-10-27 17:00:47',6,'Testando o pedido 6, sou Alérgico',4,'concluido',NULL),(10,'2022-10-27 17:02:45',6,'Testando o pedido 6, sou Alérgico',4,'concluido',NULL),(11,'2022-10-27 17:03:05',6,'Testando o pedido 6, sou Alérgico',4,'concluido',NULL),(12,'2022-10-27 17:03:33',6,'Testando o pedido 6, sou Alérgico',4,'concluido',NULL),(13,'2022-10-27 17:03:37',6,'Testando o pedido 6, sou Alérgico',4,'concluido',NULL),(14,'2022-10-27 17:06:05',6,'Testando o pedido 6, sou Alérgico',4,'concluido',NULL),(15,'2022-10-27 17:07:51',6,'Testando o pedido 6, sou Alérgico',4,'concluido',NULL),(16,'2022-10-27 17:15:43',6,'Testando o pedido 6, sou Alérgico',4,'concluido',NULL),(17,'2022-10-27 17:16:48',6,'Testando o pedido 6, sou Alérgico',4,'concluido',NULL),(18,'2022-10-27 17:16:54',6,'Testando o pedido 6, sou Alérgico',4,'concluido',NULL),(19,'2022-10-27 17:17:19',6,'Testando o pedido 6, sou Alérgico',4,'concluido',NULL),(20,'2022-10-27 17:18:16',6,'Testando o pedido 6, sou Alérgico',4,'concluido',NULL),(21,'2022-10-27 17:18:47',6,'Testando o pedido 6, sou Alérgico',4,'concluido',NULL),(22,'2022-10-27 17:19:56',6,'Testando o pedido 6, sou Alérgico',4,'concluido',NULL),(23,'2022-10-27 17:20:51',6,'Testando o pedido 6, sou Alérgico',4,'concluido',NULL),(24,'2022-10-27 17:21:10',6,'Testando o pedido 6, sou Alérgico',4,'concluido',NULL),(25,'2022-10-27 17:21:51',6,'Testando o pedido 6, sou Alérgico',4,'concluido',NULL),(26,'2022-10-27 17:22:36',6,'Testando o pedido 6, sou Alérgico',4,'concluido',NULL),(27,'2022-10-27 17:23:09',6,'Testando o pedido 6, sou Alérgico',4,'concluido',NULL),(28,'2022-10-27 17:24:03',6,'Testando o pedido 6, sou Alérgico',4,'concluido',NULL),(29,'2022-10-27 17:26:35',6,'Testando o pedido 6, sou Alérgico',4,'concluido',NULL),(30,'2022-10-27 17:42:47',6,'Testando o pedido 6, sou Alérgico',4,'concluido',NULL),(31,'2022-10-27 17:45:12',6,'Testando o pedido 6, sou Alérgico',4,'concluido',NULL),(32,'2022-10-27 17:46:12',6,'Testando o pedido 6, sou Alérgico',4,'concluido',NULL),(33,'2022-10-27 17:46:38',6,'Testando o pedido 6, sou Alérgico',4,'concluido',3),(34,'2022-10-31 14:04:33',8,'Testando o pedido 8, sou Alérgico',4,'preparando',NULL),(36,'2022-11-10 16:52:34',3,'undefined',1,'\"aguardando\"',NULL),(37,'2022-11-10 16:58:43',3,'undefined',1,'\"aguardando\"',NULL),(38,'2022-11-10 17:02:53',3,'',1,'aguardando',NULL),(39,'2022-11-10 17:04:05',3,'testando',1,'aguardando',NULL),(40,'2022-11-10 17:06:08',6,' ',1,'aguardando',NULL),(41,'2022-11-10 17:07:55',20,'',1,'aguardando',NULL),(42,'2022-11-10 17:08:24',20,'',1,'aguardando',NULL),(43,'2022-11-10 17:28:15',20,'',1,'aguardando',NULL),(44,'2022-11-11 13:45:44',20,'',1,'aguardando',NULL),(45,'2022-11-11 14:10:01',20,'',1,'aguardando',NULL),(46,'2022-11-11 14:15:59',20,'',1,'aguardando',NULL),(47,'2022-11-11 14:16:19',20,'',1,'aguardando',NULL),(48,'2022-11-11 14:16:56',20,'',1,'aguardando',NULL),(49,'2022-11-11 14:23:27',20,'',1,'aguardando',NULL),(50,'2022-11-11 14:28:20',20,'',1,'aguardando',NULL),(51,'2022-11-11 14:28:33',20,'',1,'aguardando',NULL),(52,'2022-11-11 14:29:56',20,'',1,'aguardando',NULL),(53,'2022-11-11 14:30:08',20,'',1,'aguardando',NULL),(54,'2022-11-11 14:30:11',20,'',1,'aguardando',NULL),(55,'2022-11-11 14:30:14',20,'',1,'aguardando',NULL),(56,'2022-11-11 14:30:54',20,'',1,'aguardando',NULL),(57,'2022-11-11 14:34:47',20,'',1,'aguardando',NULL),(58,'2022-11-11 14:42:23',20,'',1,'aguardando',NULL),(59,'2022-11-11 14:42:28',20,'',1,'aguardando',NULL),(60,'2022-11-11 14:42:40',20,'',1,'aguardando',NULL),(61,'2022-11-11 14:48:51',20,'',1,'aguardando',NULL),(62,'2022-11-11 14:49:37',20,'',1,'aguardando',NULL),(63,'2022-11-11 14:52:21',20,'',1,'aguardando',NULL),(64,'2022-11-11 14:55:57',20,'',1,'aguardando',NULL),(65,'2022-11-11 15:13:37',20,'',1,'aguardando',NULL),(66,'2022-11-11 15:13:56',20,'',1,'aguardando',NULL),(67,'2022-11-11 15:30:09',20,'',1,'aguardando',NULL),(68,'2022-11-11 15:45:21',20,'',1,'aguardando',NULL),(69,'2022-11-16 14:06:34',20,'',1,'aguardando',NULL),(70,'2022-11-16 14:15:54',20,'',1,'aguardando',NULL),(71,'2022-11-16 14:28:34',20,'',1,'aguardando',NULL),(72,'2022-11-16 14:31:23',20,'',1,'aguardando',NULL),(73,'2022-11-16 14:35:40',20,'',1,'aguardando',NULL),(74,'2022-11-16 14:37:45',20,'',1,'aguardando',NULL),(75,'2022-11-16 14:38:27',20,'',1,'aguardando',NULL),(76,'2022-11-16 16:36:08',20,'',1,'aguardando',NULL),(77,'2022-11-16 17:03:35',20,'',1,'aguardando',NULL),(78,'2022-11-16 17:13:10',20,'',1,'aguardando',NULL);
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos_produtos`
--

DROP TABLE IF EXISTS `pedidos_produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos_produtos` (
  `id_pedidos_produtos` int NOT NULL AUTO_INCREMENT,
  `id_pedidos` int NOT NULL,
  `id_produtos` int NOT NULL,
  `quantidade` int NOT NULL,
  PRIMARY KEY (`id_pedidos_produtos`),
  KEY `fk_pedidos_produtos_produtos_idx` (`id_produtos`),
  KEY `fk_pedidos_produtos_pedidos_idx` (`id_pedidos`),
  CONSTRAINT `fk_pedidos_produtos_pedidos` FOREIGN KEY (`id_pedidos`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_pedidos_produtos_produtos` FOREIGN KEY (`id_produtos`) REFERENCES `produtos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos_produtos`
--

LOCK TABLES `pedidos_produtos` WRITE;
/*!40000 ALTER TABLE `pedidos_produtos` DISABLE KEYS */;
INSERT INTO `pedidos_produtos` VALUES (1,6,9,4),(2,6,13,3),(3,6,9,4),(4,6,13,3),(5,6,9,4),(6,6,13,3),(7,69,9,4),(8,33,13,3);
/*!40000 ALTER TABLE `pedidos_produtos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produtos`
--

DROP TABLE IF EXISTS `produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produtos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(40) NOT NULL,
  `descricao` varchar(120) NOT NULL,
  `registro` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint NOT NULL DEFAULT '1',
  `id_categoria` int DEFAULT NULL,
  `imagem_url` varchar(600) DEFAULT NULL,
  `preco_custo` decimal(5,2) DEFAULT NULL,
  `preco_venda` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_produtos_categoria_idx` (`id_categoria`),
  KEY `fk_produtos_categorias_idx` (`id_categoria`),
  CONSTRAINT `fk_produtos_categorias` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produtos`
--

LOCK TABLES `produtos` WRITE;
/*!40000 ALTER TABLE `produtos` DISABLE KEYS */;
INSERT INTO `produtos` VALUES (9,'Strogonoff de Filé',' Strogonoff de Filé, com\nArroz e Batata Palha','2022-09-27 15:32:02',1,1,'https://i.imgur.com/fG9YDMv.jpg',40.00,55.80),(13,'Feijoada','Feijoada caseira ','2022-09-27 16:58:56',1,1,'https://i.imgur.com/W8MLdCJ.jpg',20.00,30.55),(16,'Água com gás','Água gaseficada','2022-09-28 16:07:14',1,2,'https://i.imgur.com/JVFpnvl.png',2.50,5.00),(17,'Caipirinha','Vodka com limão','2022-09-28 16:08:12',1,2,'https://i.imgur.com/jAq1gP9.png',5.00,10.00),(18,'Torta paulista','Torta paulista de amendoim ','2022-09-28 16:09:06',1,3,'https://i.imgur.com/Hei7zD3.jpg',6.00,12.50),(19,'Agua ','','2022-09-28 16:09:37',1,2,'https://i.imgur.com/0vJ30Sw.jpg',2.50,5.00),(22,'Milk Shake','De morango, chocolate e ovomaltinu','2022-09-30 16:48:37',1,3,'https://i.imgur.com/cAosoKm.jpg',25.99,15.00),(23,'Pudim','Chocolate','2022-09-30 16:48:52',1,3,'https://i.imgur.com/jAq1gP9.png',11.00,16.80),(29,'Mousse de limão','O melhor da região ','2022-10-05 14:51:13',1,3,'https://i.imgur.com/zcI3w4k.jpg',8.00,15.00),(30,'Cuscuz Paulista','O melhor cuscuz da região ','2022-10-05 14:52:38',1,1,'https://i.imgur.com/PtluHNq.jpg',25.00,35.00),(33,'Batata frita','Acompanha catchup de goiabada cascão','2022-10-05 15:30:58',1,1,'https://i.imgur.com/Sx6Vi2x.jpg',25.00,36.00),(34,' Hamburguinho blend ','Acompanha vinagrete, farofa e pães','2022-10-05 15:33:06',1,1,'https://i.imgur.com/BfVed7S.jpg',40.00,66.80),(35,'Petit Gâteau','Servido com sorvete de creme, calda de chocolate e castanhas crocantes','2022-10-05 15:34:15',1,3,'https://i.imgur.com/yG31kqu.jpg',10.00,22.80),(36,'Pudim de leite condensado','Servido com calda de caramelo','2022-10-05 15:36:53',1,3,'https://i.imgur.com/gvTVxBU.jpg',8.00,16.80),(37,'Sorvete de Creme',' Taça de sorvete de creme (2 bolas e calda de chocolate)','2022-10-05 15:39:17',1,3,'https://i.imgur.com/bGgTRxL.jpg',8.00,16.80),(38,' Sorvete de chocolate','Taça de sorvete de chocolate (2 bolas e calda de chocolate)','2022-10-05 15:40:52',1,3,'https://i.imgur.com/DJYYCjl.jpg',8.00,16.80),(39,'Chopp Brahma Black','Mais leve, muito mais cremoso e levemente adocicado.','2022-10-05 15:43:10',1,2,'https://i.imgur.com/PWZbo29.jpg',14.50,7.00),(41,'Cerveja Original ','Lager 600ml - 5% Vol.','2022-10-05 16:03:57',1,2,'https://i.imgur.com/J4T0Zmd.jpg',10.00,17.00),(42,'Coca-cola','Coca-cola 350ml','2022-10-05 16:39:53',1,2,'https://i.imgur.com/Wh4UDLA.png',2.00,6.00),(43,'Guaraná','Guaraná 350ml','2022-10-05 16:40:36',1,2,'https://i.imgur.com/gFLITdB.png',2.00,6.00),(44,'Fanta','Fanta 350ml','2022-10-05 16:41:32',1,2,'https://i.imgur.com/9LHLRjF.png',2.50,6.00),(45,'Pepsi','Pepsi 350ml','2022-10-05 16:42:56',1,2,'https://i.imgur.com/JproQzV.png',2.50,6.00);
/*!40000 ALTER TABLE `produtos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservas`
--

DROP TABLE IF EXISTS `reservas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` tinyint DEFAULT '0',
  `registro` datetime DEFAULT CURRENT_TIMESTAMP,
  `id_cliente` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_reservas_clientes_idx` (`id_cliente`),
  CONSTRAINT `fk_reservas_clientes` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservas`
--

LOCK TABLES `reservas` WRITE;
/*!40000 ALTER TABLE `reservas` DISABLE KEYS */;
/*!40000 ALTER TABLE `reservas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendas`
--

DROP TABLE IF EXISTS `vendas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `total_custo` decimal(5,2) NOT NULL,
  `total_venda` decimal(5,2) NOT NULL,
  `registro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `forma_de_pagamento` varchar(40) NOT NULL,
  `entrega` int DEFAULT '0',
  `observacao` varchar(150) DEFAULT NULL,
  `id_cliente` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_vendas_clientes_idx` (`id_cliente`),
  CONSTRAINT `id_vendas_clientes` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='				';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendas`
--

LOCK TABLES `vendas` WRITE;
/*!40000 ALTER TABLE `vendas` DISABLE KEYS */;
INSERT INTO `vendas` VALUES (1,10.00,15.00,'2022-08-26 14:41:31','Cartão de Crédito',1,'Pão com Queijo',1),(2,0.00,0.00,'2022-08-26 16:37:48','?',0,'?',1),(3,10.00,10.00,'2022-11-11 15:55:53','Cartão',0,'Lanche',4);
/*!40000 ALTER TABLE `vendas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-18 13:40:50
