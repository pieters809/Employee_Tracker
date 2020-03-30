const mysql = require("mysql");
const inquirer = require("inquirer");
var express = require('express');

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

function view(type) {
	const query = `SELECT * FROM ${type}`;

	connection.query(query, (error, response) => {
		if (error) throw error;

		console.table(response);
		runApp();
	});
}

function addDepartment() {
	inquirer
		.prompt({
			name: "action",
			type: "input",
			message: "What department you would like to add?"
		})
		.then((answer) => {
			const query = `INSERT INTO departments SET ?`;

			connection.query(
				query,
				{ name: answer.action },
				(error, response) => {
					if (error) throw error;

					return response;
				}
			);
			view("departments");
		});
}

function addRole() {
	inquirer
		.prompt([
			{
				name: "title",
				type: "input",
				message: "What is the the new role?"
			},
			{
				name: "salary",
				type: "input",
				message: "What is the salary for this role?"
			},
			{
				name: "manager_id",
				type: "list",
				message: "Which department is this role being added to?",
				choices: ["1", "2", "3", "4"]
			}
		])
		.then((answer) => {
			const query =
				"INSERT INTO roles (title, salary, department_id) VALUES ?";

			connection.query(
				query,
				[[[answer.title, answer.salary, answer.department_id]]],
				(error, response) => {
					if (error) throw error;

					return response;
				}
			);
			view("roles");
		});
}

function addEmployee() {
	inquirer
		.prompt([
			{
				name: "first",
				type: "input",
				message: "What's the first name of the new employee?"
			},
			{
				name: "last",
				type: "input",
				message: "What's the last name of the new employee?"
			},
			{
				name: "role_id",
				type: "input",
				message: "What's the new employee's role ID?"
			},
			{
				name: "manager_id",
				type: "input",
				message:
					"What's the new employee's manager's ID?"
			}
		])
		.then((answer) => {
			const query =
				"INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ?";

			connection.query(
				query,
				[
					[
						[
							answer.first,
							answer.last,
							answer.role_id,
							answer.manager_id
						]
					]
				],
				(error, response) => {
					if (error) throw error;

					return response;
				}
			);
			view("employees");
		});
}

function updateEmployee() {
	inquirer
		.prompt([
			{
				name: "id",
				type: "input",
				message:
					"Which employee would you like to update? (Enter ID)"
			},
			{
				name: "new",
				type: "input",
				message: "What's the new role ID for this employee?"
			}
		])
		.then((answer) => {
			const query = "UPDATE employees SET role_id=? WHERE id=?";

			connection.query(
				query,
				[answer.new, answer.id],
				(error, response) => {
					if (error) throw error;

					return response;
				}
			);
			view("employees");
		});
}