/* USER STORY - BUSINESS OWNER
    I WANT TO be able to view and manage the departments, roles, and employees
    SO THAT I can organize and plan my business
*/

/* ACCEPTANCE CRITERIA //TODO:(4)
    (CMD-line app <- USER_INPUT)

// @ STARTED app
    > PRESENT 
        view all departments
        view all roles
        view all employees
        add a department
        add a role
        add an employee
        update an employee role

// @ CHOSE view all departments
    > PRESENT with a formatted table\
        department name
        department ID

//@ CHOSE view all roles
    > PRESENT:
        job title
        role id
        department that role belongs to
        salary of that role


//@ CHOSE view all employees
    > PRESENT with a formatted table
        employee ids
        first names
        last names
        job titles
        departments
        salaries
        managers that the employees report to


@ CHOSE add a department
    > PROMPT the name of the department
        > ADD prompted response to the DB

@ CHOSE add a role
        role name
        role salary
        role department
        > ADD prompted response to the DB

@ CHOSE add an employee
        employee’s first name
        last name
        role
        manager
        > ADD prompted response to the DB

@ CHOSE update an employee role
        > PROMPT 
        select employee to update
        select new role for employee
        > UPDATE prompted response to the DB

*/

/* BONUS FEATURE
    UPDATE employee managers
    VIEW employees by manager
    VIEW employees by department
    DELETE departments, roles, and employees
    VIEW the total utilized budget of a department
    (   in other words, the combined salaries of all employees in that department)
*/


//#region Dependencies and Statics
const {Question, MultiChoice, ShortAnswer} = require('./js/questions.js');
const {prompt} = require('inquirer');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;
const db = require('./config/connection');
//#endregion

//#region Main Menu

const mainMenuOptions = [
    "View All Departments",
    "Add Department",
    "View All Roles",        
    "Add Role",
    "View All Employees",
    "Add Employee",
    "Update an Employee Role",
    "Quit"
]

const promptsMainMenu = [
    new MultiChoice("nextMenu", "What would you like to do?", mainMenuOptions)
];
//#endregion


//#region Query Handlers and Prompts
const Departments = {
    prompts: [new ShortAnswer("department", "What is the name of the department?")],
    selectQuery: function() { return "SELECT * FROM departments"},
    insertQuery: function(nameString) { return `INSERT INTO departments (name) VALUE (${nameString})`},
    deleteQuery: function(nameString) { return `DELETE FROM departments WHERE name = ${nameString}`}
}

const Roles = {
    prompts: [new ShortAnswer("department", "What is the name of the NEW department?")],
    
    selectColumn:   "roles.id, roles.title, departments.name AS department, roles.salary",
    selectJoin:     "JOIN departments ON roles.department_id = departments.id",
    selectQuery:    function() { return `SELECT ${this.selectColumn} FROM roles ${this.selectJoin}`},
    
    insertColumn:   "title, salary, department_id",
    insertQuery:    function(titleString, salary, department_id) { return `INSERT INTO roles (${this.insertColumn}) VALUE (${titleString}, ${salary}, ${department_id}})`},

    deleteQuery:    function(titleString) {return `DELETE FROM roles WHERE title= ${titleString}`}
}

const Employees = {
    prompts: [new ShortAnswer("department", "What is the name of the NEW department?")],
    
    selectColumn:   "E.id, E.first_name, E.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(managers.first_name, ' ', managers.last_name) AS manager",
    joinRoles:      "JOIN roles ON E.role_id = roles.id", 
    joinDepts:      "JOIN departments ON roles.department_id = departments.id",
    joinManagers:   "LEFT JOIN employees AS managers ON E.manager_id = managers.id",
    selectJoin:     function() {return `${this.joinRoles} ${this.joinDepts} ${this.joinManagers}`},
    selectQuery:    function() { return `SELECT ${this.selectColumn} FROM employees AS E ${this.selectJoin()}`},
    
    insertColumn:   "title, salary, department_id",
    insertQuery:    function(titleString, salary, department_id) { return `INSERT INTO roles (${this.insertColumn}) VALUE (${titleString}, ${salary}, ${department_id}})`},

    deleteQuery:    function(titleString) {return `DELETE FROM roles WHERE title= ${titleString}`}
}


//#endregion

let promptsNewRole = [
    new ShortAnswer("role", "What is the name of the NEW role?"),
    new Question("salary", "number", "What would be its salary?"),
    new MultiChoice("department", "What department would it belong to?", [])
];



const promptsNewEmployee = [
    new ShortAnswer("firstName", "What is the NEW employee's first name?"),
    new ShortAnswer("lastName", "What is the last name?")
    //role (choice)
    //manager(list) OR (none==null)
];


const getMainMenu = async () => {
    const userResponse = await prompt(promptsMainMenu);
    console.log(`You chose ${userResponse.nextMenu}!`);
    
    switch(userResponse.nextMenu){
        case "View All Departments":
            viewAll(Departments.selectQuery()); break;
        case "View All Roles":
            viewAll(Roles.selectQuery()); break;
        case "View All Employees":
            viewAll(Employees.selectQuery()); break;

        case "Add Department":
            const newDepartment = await prompt(Departments.prompts);
            console.log(newDepartment);
            //!Null:
                //sanitize(newDepartment)
            //!isDupe:
                //add//parse params in add 
                //update views
            //view
            //get main menu
            break;
        case "Add Role":
            getNewRole();
            break;
        case 'quit':
        default:
            console.log("Thank you! We hope to see you soon :)");
            process.exit(0);
    }
}

////DONE
const viewAll = (query)=>{
    console.log(`Querying...${query}`)
    db.query(query, (err,result)=>{
        console.table(result);
        getMainMenu();
    });
}

const isDuplicate = (table, value) => {
    //value null skip
  
   // [...objects]
   // let sql = getSelect(table)
   // let foundDuplicate = false;
  
   //db.query(sql, (err,result)=>{
       //iter thru obj
       //return true or not })
   
};


const addTo = (table, value) => {
   let sql = getInsert(table);
   console.log(sql);
   
   /*sample: INSERT INTO departments (name) VALUE ("Data Governance"); */
   //db.query(`INSERT INTO ${} VALUE `, )
}

//add:

//get new
// check if null
//sanitizeString: (trimmed and setlower then capitalize 0index remove symbols
// check if exists already


getMainMenu();

