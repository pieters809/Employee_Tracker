const mysql = require("mysql");
const inquirer = require("inquirer");
var express = require('express');
var app = express();



const connection = mysql.createConnection({
	host: "localhost",
	port: 1008,
	user: "root",
	password: "",
	database: "employeesDB"
});

connection.connect((err) => {
	if (err) throw err;

	runApp();
});

function runApp() {
	inquirer
		.prompt({
			name: "action",
			type: "list",
			message: "What would you like to do?",
			choices: [
				"Departments",
				"Roles",
				"Employees",
				"Add department",
				"Add role",
				"Add employee",
				"Update current employee",
				"Exit"
			]
		})
		.then((answer) => {
			switch (answer.action) {
				case "View departments":
					view("departments");
					break;
				case "View roles":
					view("roles");
					break;
				case "View employees":
					view("employees");
					break;
				case "Add a department":
					addDepartment();
					break;
				case "Add a role":
					addRole();
					break;
				case "Add an employee":
					addEmployee();
					break;
				case "Update existing employee":
					updateEmployee();
					break;
				case "Exit":
					connection.end();
					console.log("Goodbye");
			}
		});
}

