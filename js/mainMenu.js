const { Question, MultiChoice, ShortAnswer } = require('./questions.js');
const Department = require('./classes/Department.js')
const Employee = require('./classes/Employee.js')
const Role = require('./classes/Role.js')
const { prompt } = require('inquirer');
const db = require('../config/connection.js')

const optionsMainMenu = [
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
    new MultiChoice("nextMenu", "What would you like to do?", optionsMainMenu)
];

const getMainMenu = async () => {
    const userResponse = await prompt(promptsMainMenu);
    console.log(`You chose ${userResponse.nextMenu}!`);
    
    switch(userResponse.nextMenu){
        case "View All Departments":    view(Department.all); break;
        case "View All Roles":          view(Role.all); break;
        case "View All Employees":      view(Employee.all); break;
        case "Add Department":          addDepartment();break;
        case "Add Role":                addRole();break;
        case 'quit':
        default:
            console.log("Thank you! We hope to see you soon :)");
            process.exit(0);
    }
}

const view = (sqlQuery)=> {
    console.log(`Querying...${sqlQuery}`);
    db.query(sqlQuery, (err,result)=>{
        console.table(result);
        getMainMenu();
    });
};


const addDepartment = async () => {
    const responseAdd = await prompt([
        new ShortAnswer( 'name', Department.promptsName )
    ]);
    const sqlInsert = Department.queryInsert(responseAdd.name)
    
    console.log(`Querying...${sqlInsert}`);
    db.query(sqlInsert, (err,result)=>{
        console.table(result);
        getMainMenu();
    });
}

const addEmployee = async ()=>{
    // query other users
    // query roles
    
    // combine

    const responseAdd = await prompt([
        new ShortAnswer( 'firstName', Role.promptsTitle ),
        new ShortAnswer( 'lastName', Role.promptsTitle ),
        new Question( 'salary', 'number', Role.promptsSalary, ),
        new MultiChoice ( 'manager' , Role.promptsDepartment, updatedList)
    ]);

    console.log(responseAdd)

    const sqlInsert = 0;
    console.log(`Querying...${sqlInsert}`);
    db.query(sqlInsert, (err,result)=>{
        console.table(result);
        getMainMenu();
    });
};


const addRole = async()=>{
    db.query( "SELECT * from departments", 
        async (err,result) => { //console.table(result);
            const updatedList = result.map((row) => row.name); //console.log(updatedList)
            const responseAdd = await prompt([
                new ShortAnswer( 'title', Role.promptsTitle ),
                new Question( 'salary', 'number', Role.promptsSalary, ),
                new MultiChoice ( 'department' , Role.promptsDepartment, updatedList)
            ]);
            
            const { title, salary } = responseAdd;
            const departmentId = updatedList.indexOf(responseAdd.department)
            if(!title || !salary){
                console.error("Error in title or salary; please try again")
                console.log(`\n`)
                getMainMenu()
            }
            const sqlInsert = Role.queryInsert(title, salary, departmentId );
            
            console.log(`Querying...${sqlInsert}`);
            db.query( sqlInsert,(err, result)=>{
                console.table(result);
                getMainMenu();
            })

        }
    );
}



const update = async (field)=>{
    let responseUpdate, sqlUpdate;
    switch(field){
        case 'department':
            break;
        case 'employee':
            break;
        case 'role':
            break;
        default:
            console.error("Invalid field, returning to main menu");
            getMainMenu();
    }
    console.log(responseUpdate);
    console.log(`Querying...${sqlUpdate}`);
    db.query(sqlUpdate, (err,result)=>{
        console.table(result);
        getMainMenu();
    });
}

const remove = async (field)=>{
    let responseRemove, sqlDelete;
    switch(field){
        case 'department':
            break;
        case 'employee':
            break;
        case 'role':
            break;
        default:
            console.error("Invalid field, returning to main menu");
            getMainMenu();
    }
    console.log(responseRemove);
    console.log(`Querying...${sqlDelete}`);
    db.query(sqlDelete, (err,result)=>{
        console.table(result);
        getMainMenu();
    });
}


module.exports = { getMainMenu }
