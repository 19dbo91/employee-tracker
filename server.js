/* USER STORY - BUSINESS OWNER
    I WANT TO be able to view and manage the departments, roles, and employees
    SO THAT I can organize and plan my business
*/

/* ACCEPTANCE CRITERIA //TODO:(7)
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

@ CHOSE view all departments
    > PRESENT with a formatted table
        department name
        department ID

@ CHOSE view all roles
    > PRESENT:
        job title
        role id
        department that role belongs to
        salary of that role


@ CHOSE view all employees
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

require('dotenv').config();
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    console.log(`Connected to the org_db database.`)
);

//#endregion

//#region Inquirer

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

const promptsNewDepartment = [
    new ShortAnswer("department","What is the name of the NEW department?")
];

const promptsNewRole = [
    new ShortAnswer("role","What is the name of the NEW role?"),
    //salary (number)
    //department (list)
];
 

const promptsNewEmployee = [
    new ShortAnswer("name","What is your name")
    //last name
    //role (choice)
    //manager+(none==null)
];



const runMainMenu = async () => {
    const userResponse = await prompt(promptsMainMenu)
    console.log(`You chose ${userResponse.nextMenu}!`);
    
    switch(userResponse.nextMenu){
        case "View All Departments":
            //console.log("Show all departments");
            showAll("departments");
            break;
        case 'quit':
        default:
            console.log("Thank you! We hope to see you soon :)");
            process.exit(0);
    }
}


const showAll = (table) => {
    console.log("Checking table: "+table)
    const sql = "SELECT * FROM ?";
    db.query(sql, table, function (err, results){
        try{console.log(results);  }
        catch{ throw err; }
        finally{
            console.log(`\n`);
            runMainMenu();
        }
    });    
}


runMainMenu();

//#endregion