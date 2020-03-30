INSERT INTO departments
    (name)
VALUES
    ("Sales"),
    ("Engineering"),
    ("Finance"),
    ("Legal");

INSERT INTO roles
    (title, salary, department_id)
VALUES
    ("Sales Lead", 70000, 1),
    ("Sales Rep", 65000, 1),
    ("Lead Engineer", 120000, 2),
    ("Software Engineer", 112000, 2),
    ("Lead Accountant", 105000, 3),
    ("Accountant", 85000, 3),
    ("Legal Team Lead", 150000, 4),
    ("Attorney", 112000, 4);

INSERT INTO employees
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Joe", "Han", 1, NULL),
    ("Josh", "Joyce", 2, 1),
    ("John", "Smith", 3, NULL),
    ("Rudy", "Sierra", 4, 3),
    ("Phillipa", "Portillo", 5, NULL),
    ("Danni", "Wilcox", 6, 5),
    ("Taiba", "Kerr", 7, NULL),
    ("Barry", "Allen", 8, 7);
