DROP DATABASE IF EXISTS employee_Tracker;
CREATE DATABASE employee_Tracker;

USE employee_Tracker;

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
    deptName VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)

);

CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id)

);