var mysql = require("mysql");
var inquirer = require("inquirer");
const { inherits } = require("util");
const { async } = require("rxjs");
const { allowedNodeEnvironmentFlags } = require("process");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "HankOllie2!",
  
    database: "employee_Tracker",
  });

  connection.connect(err => {
    if (err) throw err;
    console.log("you are connected to the database!"); 
    init() 
  });

  var init= async ()=> {

    
    var answer = await inquirer.prompt({
        name: "wdyWannaDo",
        type: "list",
        message: "What would you like to do?",
        choices: ["View Employees", "Add Employees", "View Roles", "Add Roles","View Departments", "Add Departments", "Update Employee Role"]
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
            break
    }  
  };
  
// Design database schema w 3 tables: department, role, employee.

// Dept: ID, DEPT NAME
// ROLE: ID, TITLE, SALARY, DEPARTMENT ID
// EMPLOYEE: ID, FIRST NAME, LAST NAME, ROLE ID, MANAGER ID