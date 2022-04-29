CREATE DATABASE IF NOT EXISTS KAICHOKU_CONNECT;
USE KAICHOKU_CONNECT;
CREATE TABLE IF NOT EXISTS sample_table (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sample` text,
  PRIMARY KEY (`id`)
);
INSERT INTO
  sample_table (sample)
VALUES
  ("sample3");
INSERT INTO
  sample_table (sample)
VALUES
  ("sample4");