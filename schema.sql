DROP DATABASE IF EXISTS employee_Tracker;
CREATE DATABASE employee_Tracker;

USE employee_Tracker;

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);