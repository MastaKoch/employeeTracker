var mysql = require("mysql");
var inquirer = require("inquirer");
var util = require("util");


var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "password123",
  
    database: "employee_Tracker",
  });

  connection.query=util.promisify(connection.query);
  
  connection.connect(err => {
    if (err) throw err;
    console.log("you are connected to the database!"); 
    init() 
  });

    console.table("Welcome to the Employee Tracker!");


  var init= async ()=> {

   try{ 
    var answer = await inquirer.prompt({
        name: "wdyWannaDo",
        type: "list",
        message: "What would you like to do?",
        choices: ["View Employees", "Add Employees", "View Roles", "Add Roles","View Departments", "Add Departments", "Update Employee Role", "Exit"]
    });

    switch (answer.wdyWannaDo) {
        case "View Employees":
            viewEmployees();
            break;

        case "Add Employees":
            addEmployees();
            break;

        case "View Roles":
            viewRoles();
            break;

        case "Add Roles":
            addRoles();
            break;

        case "View Departments":
            viewDepartments();
            break;

        case "Add Departments":
            addDepartments();
            break;

        case "Update Employee Role":
            updateEmployeeRole();
            break;

        case "Exit":
                connection.end();
                break;
    }  
    } catch (err) {
        console.log(err);
        init();
    }
};

// function to view employees

const viewEmployees= async () => {
    try {

        let query = 'SELECT * FROM employee';
        connection.query(query, function (err, res) {
            if (err) throw err;
            let employeeArray=[];
            res.forEach(employee=>employeeArray.push(employee));
            console.table(employeeArray);
            init();
        });
    } catch (err) {
        console.log (err);
        init();

    };
};


  
// Design database schema w 3 tables: department, role, employee.

// Dept: ID, DEPT NAME
// ROLE: ID, TITLE, SALARY, DEPARTMENT ID
// EMPLOYEE: ID, FIRST NAME, LAST NAME, ROLE ID, MANAGER ID