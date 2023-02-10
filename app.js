// List the dependencies here.
const mysql = require('mysql');
const inquirer = require('inquirer');
const tableConsole = require('console.table');
const util = require('util');

// Creates connection to MySQL 
let connection = mysql.initConnection({
    host: 'localhost',
    port: 3001,
    user: 'root',
    password: '',
    database: 'associate_DB'
});

connection.query = util.promisify(connection.query);

// Begin the application after establishing the connection.
connection.connect(function (err) {
    if (err) throw err;
    init();
})

// Generates message at top of program upon start.
console.table(
    "\n------------ Business Overview ------------\n"
)

// Ask the user initial action question to figure out what they would like to do.
const init = async () => {
    try {
        let answer = await inquirer.prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View associates',
                'View Departments',
                'View Roles',
                'Add Associates',
                'Add Departments',
                'Add Roles',
                'Update associate Role',
                'Exit'
            ]
        });
        switch (answer.action) {
            case 'View associates':
                viewAssociate();
                break;

            case 'View Departments':
                viewDepartment();
                break;

            case 'View Roles':
                viewRole();
                break;

            case 'Add associates':
                addAssociate();
                break

            case 'Add Departments':
                addDepartment();
                break

            case 'Add Roles':
                addRole();
                break

            case 'Update associate Role':
                updateAssociate();
                break

            case 'Exit':
                connection.end();
                break;
        };
    } catch (err) {
        console.log(err);
        init();
    };
}

// Selection to view all of the associates.
const viewAssociate = async () => {
    console.log('associate View');
    try {
        let query = 'SELECT * FROM associate';
        connection.query(query, function (err, res) {
            if (err) throw err;
            let associateArray = [];
            res.forEach(associate => associateArray.push(associate));
            console.table(associateArray);
            init();
        });
    } catch (err) {
        console.log(err);
        init();
    };
}

// Selection to view all of the departments.
const viewDepartment = async () => {
    console.log('Department View');
    try {
        let query = 'SELECT * FROM department';
        connection.query(query, function (err, res) {
            if (err) throw err;
            let departmentArray = [];
            res.forEach(department => departmentArray.push(department));
            console.table(departmentArray);
            init();
        });
    } catch (err) {
        console.log(err);
        init();
    };
}

// Selection to view all of the roles.
const viewRole = async () => {
    console.log('Role View');
    try {
        let query = 'SELECT * FROM role';
        connection.query(query, function (err, res) {
            if (err) throw err;
            let roleArray = [];
            res.forEach(role => roleArray.push(role));
            console.table(roleArray);
            init();
        });
    } catch (err) {
        console.log(err);
        init();
    };
}

// Selection to add a new associate.
const addAssociate = async () => {
    try {
        console.log('associate Add');

        let roles = await connection.query("SELECT * FROM role");

        let managers = await connection.query("SELECT * FROM associate");

        let answer = await inquirer.prompt([
            {
                name: 'firstName',
                type: 'input',
                message: 'What is the first name of this associate?'
            },
            {
                name: 'lastName',
                type: 'input',
                message: 'What is the last name of this associate?'
            },
            {
                name: 'associateRoleId',
                type: 'list',
                choices: roles.map((role) => {
                    return {
                        name: role.title,
                        value: role.id
                    }
                }),
                message: "What is this associate's role id?"
            },
            {
                name: 'associateManagerId',
                type: 'list',
                choices: managers.map((manager) => {
                    return {
                        name: manager.first_name + " " + manager.last_name,
                        value: manager.id
                    }
                }),
                message: "What is the associate Manager's Id?"
            }
        ])

        let result = await connection.query("INSERT INTO associate SET ?", {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: (answer.associateRoleId),
            manager_id: (answer.associateManagerId)
        });

        console.log(`${answer.firstName} ${answer.lastName} added successfully.\n`);
        init();

    } catch (err) {
        console.log(err);
        init();
    };
}

// Selection to add a new department.
const addDepartment = async () => {
    try {
        console.log('Department Add');

        let answer = await inquirer.prompt([
            {
                name: 'deptName',
                type: 'input',
                message: 'What is the name of the new department?'
            }
        ]);

        let result = await connection.query("INSERT INTO department SET ?", {
            department_name: answer.deptName
        });

        console.log(`${answer.deptName} added successfully to departments.\n`)
        init();

    } catch (err) {
        console.log(err);
        init();
    };
}

// Selection to add a new role.
const addRole = async () => {
    try {
        console.log('Role Add');

        let departments = await connection.query("SELECT * FROM department")

        let answer = await inquirer.prompt([
            {
                name: 'title',
                type: 'input',
                message: 'What is the name of your new role?'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What salary will this role provide?'
            },
            {
                name: 'departmentId',
                type: 'list',
                choices: departments.map((departmentId) => {
                    return {
                        name: departmentId.department_name,
                        value: departmentId.id
                    }
                }),
                message: 'What department ID is this role associated with?',
            }
        ]);
        
        let chosenDepartment;
        for (i = 0; i < departments.length; i++) {
            if(departments[i].department_id === answer.choice) {
                chosenDepartment = departments[i];
            };
        }
        let result = await connection.query("INSERT INTO role SET ?", {
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

// Selection to update a roll for a specific associate.
const updateAssociate = async () => {
    try {
        console.log('associate Update');
        
        let associates = await connection.query("SELECT * FROM associate");

        let associateSelection = await inquirer.prompt([
            {
                name: 'associate',
                type: 'list',
                choices: associates.map((associateName) => {
                    return {
                        name: associateName.first_name + " " + associateName.last_name,
                        value: associateName.id
                    }
                }),
                message: 'Please choose an associate to update.'
            }
        ]);

        let roles = await connection.query("SELECT * FROM role");

        let roleSelection = await inquirer.prompt([
            {
                name: 'role',
                type: 'list',
                choices: roles.map((roleName) => {
                    return {
                        name: roleName.title,
                        value: roleName.id
                    }
                }),
                message: 'Please select the role to update the associate with.'
            }
        ]);

        let result = await connection.query("UPDATE associate SET ? WHERE ?", [{ role_id: roleSelection.role }, { id: associateSelection.associate }]);

        console.log(`The role was successfully updated.\n`);
        init();

    } catch (err) {
        console.log(err);
        init();
    };
}