USE org_db;

INSERT INTO departments (name)
VALUE
    ("Administration"),
    ("Human Resources"),
    ("Security"),
    ("Project Management Office"),
    ("Information Technology");


INSERT INTO roles (title, salary, department_id)
VALUE -- Salaries, mean (ZIPPIA.com as of 2023/06/28)
    ("CEO", 100000, 1),
    ("Receptionist", 30571, 1),
    ("Recruiter", 51374, 2),
    ("Security Officer", 31101, 3),
    ("Project Manager", 91578, 4),
    ("Quality Analyst", 71957, 5),
    ("Software Engineer", 100260, 5);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUE
    ("Steven", "Shwimmer", 1 , NULL),
    ("Dustin", "Vanilla", 5 , 1),
    ("Daniel", "Radcliffe", 4, 1),
    ("Marinah", "Bay", 7, 1),
    ("Johnathan", "PasCena", 7, 4),
    ("Baby", "Yoda", 6, 4),
    ("Kebert", "Xela", 2, 2);


SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;
