var mysql = require("mysql");
var inquirer = require("inquirer");
var util = require("util");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password123",
    database: "employee_Tracker",
  });

  connection.query=util.promisify(connection.query);

  connection.connect(err => {
    if (err) throw err; 
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

const addEmployees = async () => {
    try {

        let roles = await connection.query("SELECT * FROM roles");
        let managers= await connection.query("SELECT * FROM employee");
        let answer= await inquirer.prompt([
        {
                name: "firstName",
                type: "input",
                message: "What is the first name of this employee?"
        },
        {
                name: "lastName",
                type: "input",
                message: "What is the last name of the employee?"
        },
        {
                name: "roleId",
                type: "list",
                choices: roles.map((role)=> {
                    return {
                        name: role.title,
                        value: role.id
                    }
                }),
                message: "What is this employee's role ID?"
        },
        {
                name: "managerId",
                type: "list",
                choices: managers.map((manager) => {
                    return {
                        name: manager.first_name+ " " + manager.last_name,
                        value: manager.roleId
                    }
                }),
                message: "What is this employee's manager's ID?"
        }

    ])

    let result = await connection.query("INSERT INTO employee SET ?", {
        first_name: answer.firstName,
        last_name: answer.lastName,
        role_id: answer.roleId,
        manager_id: answer.managerId
    });

    console.log(`${answer.firstName} ${answer.lastName} added successfully.\n`);
    init();
    } catch (err) {
        console.log(err);
        init();

    };
}

const viewDepartments = async () => {
    try {
        let query= 'SELECT * FROM department';
        connection.query(query, function (err, res) {
            if (err) throw err;
            let departmentArray=[];
            res.forEach(department => departmentArray.push(department));
            console.table(departmentArray);
            init();
        });

    } catch (err) {
        console.log(err);
        init();

    }
}

const addDepartments = async () => {

    try{
        let answer= await inquirer.prompt([{

            name: 'deptName',
            type: "input",
            message: "What is the name of your new department?"
        }
        
    ]);
        let result = await connection.query("INSERT INTO department SET ?", {
            deptName: answer.deptName
        });

        console.log(`${answer.deptName} added successfully to departments.\n`)
        init();
    } catch (err) {
        console.log(err);
        init();
    }

}


const viewRoles = async () => {
    try {
        let query= 'SELECT * FROM roles';
        connection.query(query, function (err, res) {
            if (err) throw err;
            let roleArray=[];
            res.forEach(role=> roleArray.push(role));
            console.table(roleArray);
            init();
        })
    } catch {
        console.log(err);
        init();
    }
}

const addRoles = async () => {

    try {
        let departments = await connection.query("SELECT * FROM department")
        let answer= await inquirer.prompt([
            {
                name: "title",
                type: "input",
                message: "What is the name of your new role?"
            },
            {
                name: "salary",
                type: "input",
                message: "What salary will this role provide?"
            },
            {
                name: "departmentId",
                type: "list",
                choices: departments.map((departmentId) =>{
                    return {
                        name: departmentId.deptName,
                        value: departmentId.id
                    }
                }),
                message: "What department ID is this role associated with?",
            }
        ]);
        let departmentChoice;
        for (i=-0; i<departments.length; i ++) {
            if (departments[i].departmentId === answer.choice) {
                departmentChoice=departments[i];
            };
        }
        let result = await connection.query("INSERT INTO roles SET ?", {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.departmentId
        })
        console.log(`${answer.title} role added successfully.\n`)
        init();
    } catch (err) {
        console.log(err);
        init();
    };
}

const updateEmployeeRole = async () => {
    try {
        let employees = await connection.query("SELECT * FROM employee");

        let employeeSelection = await inquirer.prompt([
            {
                name: "employee",
                type: "list",
                choices: employees.map((employeeName) => {
                    return {
                        name: employeeName.first_name + " " + employeeName.last_name,
                        value: employeeName.id
                    };
                }),
                message: "Please choose an employee to update." 
            }
        ]);

        let roles = await connection.query("SELECT * FROM roles");

        let roleSelection = await inquirer.prompt([
            {
                name: "role",
                type: "list",
                choices: roles.map((roleName) => {
                    return {
                        name: roleName.title,
                        value: roleName.id
                    }
                }),
                message: "Please select the role to update the employee with."
            }
        ]);
        let result = await connection.query("UPDATE employee SET ? WHERE ?", [{ role_id: roleSelection.role}, { id: employeeSelection.employee }]);

        console.log("The role was successfully updated.\n");
        init();
    } catch (err) {
        console.log(err);
        init();

    }
};