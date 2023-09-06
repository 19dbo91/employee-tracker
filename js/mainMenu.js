const { Question, MultiChoice, ShortAnswer } = require('./questions.js');
const Department = require('./classes/Department.js')
const Employee = require('./classes/Employee.js')
const Role = require('./classes/Role.js')
const { prompt } = require('inquirer');
const db = require('../config/connection.js')

const iran = ()=>{console.log("iran")};

const optionsMainMenu = [
    "View All Departments",
    "Add Department",
    "View All Roles",        
    "Add Role",
    "View All Employees",
    "Add Employee",
    "Update an Employee Role",
    "Update an Employee Manager",
    "Quit"
]

const promptsMainMenu = [
    new MultiChoice("nextMenu", "What would you like to do?", optionsMainMenu)
];

const getMainMenu = async () => {
    const userResponse = await prompt(promptsMainMenu);
    console.log(`\n`)
    console.log(`You chose ${userResponse.nextMenu}!`);
    
    switch(userResponse.nextMenu){
        case "View All Departments":    view(Department.all); break;
        case "View All Roles":          view(Role.all); break;
        case "View All Employees":      view(Employee.all); break;
        case "Add Department":          addDepartment();break;
        case "Add Role":                addRole();break;
        case "Add Employee":            addEmployee();break;
        case "Update an Employee Role":    updateEmployeeRole();break;
        case "Update an Employee Manager": updateEmployeeManager();break;
        case 'quit':
        default:
            console.log("Thank you! We hope to see you soon :)");
            process.exit(0);
    }
}

const promisifyQuery = (query) =>{
    return new Promise((resolve,reject) => {
        db.query(query, (err,result) => { err
            ? reject(err)
            : resolve(result)
        })
    })
}//Credit:cgpt-assist

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
    const [roles, otherEmployees] = await Promise.all([
        promisifyQuery(Role.selectTitle),
        promisifyQuery(Employee.selectFullName),
    ]);

    const chooseRole = roles.map( (role) => role.title );
    const chooseManger = otherEmployees.map( (employee) => employee.fullName );
    console.log(chooseRole, chooseManger);

    const responseAdd = await prompt([
        new ShortAnswer( 'firstName', Employee.promptsFirst ),
        new ShortAnswer( 'lastName', Employee.promptsLast ),
        new MultiChoice( 'role', Role.promptsTitle, chooseRole), //note: id needed, string recieved as displayed
        new MultiChoice( 'manager', Employee.promptsDepartment, chooseManger) //note: id needed, string recieved  as displayed
    ]);

    const {firstName, lastName, role, manager} = responseAdd;
    const roleId = chooseRole.indexOf(role);
    const managerId = chooseManger.indexOf(manager);

    const sqlInsert = Employee.queryInsert(firstName, lastName, roleId, managerId);
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
                new MultiChoice ( 'department' , Role.promptsDepartment, updatedList) //note: id needed, string recieved
            ]);
            
            const { title, salary } = responseAdd;
            const departmentId = updatedList.indexOf(responseAdd.department)+1
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


const updateEmployeeRole = async() => {
    const [roles, employees] = await Promise.all([
        promisifyQuery(Role.selectTitle),
        promisifyQuery(Employee.selectFullName),
    ]);

    const chooseRole = roles.map( (role) => role.title );
    const chooseEmployee = employees.map( (employee) => employee.fullName );
    console.log(chooseRole, chooseEmployee);

    const responseUpdate = await prompt([
        new MultiChoice( 'employee', Employee.promptsChangeRole, chooseEmployee), //note: id needed, string recieved  as displayed
        new MultiChoice( 'role', Role.promptsTitle, chooseRole) //note: id needed, string recieved as displayed
    ]);

    const { role, employee } = responseUpdate;

    const roleId = chooseRole.indexOf(role)+1;
    const employeeId = chooseEmployee.indexOf(employee)+1;

    console.log(employeeId, roleId );


    const sqlUpdate = Employee.queryUpRole(employeeId, roleId);
    console.log(`Querying...${sqlUpdate}`);
    db.query(sqlUpdate, (err,result)=>{
        console.table(result);
        getMainMenu();
    });
}
// const updateEmployeeManager = async() => {
//     let responseUpdate;
//     console.log(responseUpdate);

//     const sqlUpdate = Employee.queryUpManager();
//     console.log(`Querying...${sqlUpdate}`);
//     db.query(sqlUpdate, (err,result)=>{
//         console.table(result);
//         getMainMenu();
//     });
// }

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
