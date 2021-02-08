INSERT INTO department (deptName) 
VALUES ("Human Resources"), ("Accounting"), ("Insurance"), ("Reception");

INSERT INTO roles (title, salary, department_id)
VALUES ("Company Newsletter Publisher", 45000, 1);

INSERT INTO roles (title, salary, department_id)
VALUES ("Lead Recruitment Officer", 62000, 1);

INSERT INTO roles (title, salary, department_id)
VALUES ("Accounting Team Lead", 85000, 2);

INSERT INTO roles (title, salary, department_id)
VALUES ("Accountant", 55000, 2);

INSERT INTO roles (title, salary, department_id)
VALUES ("Adjuster", 50000, 3);

INSERT INTO roles (title, salary, department_id)
VALUES ("Account Manager", 90000, 3);

INSERT INTO roles (title, salary, department_id)
VALUES ("Receptionist", 44000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Buzz", "Lightyear", 1, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Woody", "DaCowboy", 2, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sleeping", "Beauty", 3, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Snow", "White", 4, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Cinderella", "Glass", 5, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Moana", "Aloha", 6, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Prince", "Charming", 7, null);