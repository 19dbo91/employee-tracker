INSERT INTO departments (name)
VALUE
    ("Administration"),
    ("Human Resources"),
    ("Security"),
    ("Project Management Office")
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
    ("Dustin", "Vanilla", 5 , 2),
    ("Steven", "Shwimmer", 1 , NULL),
    ("Daniel", "Radcliffe", 4, 4),
    ("Marinah", "Bay", 7, 2),
    ("John", "Cena", 7, 4),
    ("Baby", "Yoda", 6, ),
    ("Baby", "Groot",2, 2);