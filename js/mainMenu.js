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
    "View Employees by Manager",
    "View Employees by Department",
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
        case "View Employees by Manager":   viewEmployeeByManager(); break;
        case "View Employees by Department":viewEmployeeByDepartment(); break;
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

//#region View Section
const view = (sqlQuery)=> {
    console.log(`Querying...${sqlQuery}`);
    db.query(sqlQuery, (err,result)=>{
        console.table(result);
        getMainMenu();
    });
};

const viewEmployeeByManager = async()=>{
    const [employees] = await Promise.all([
        promisifyQuery(Employee.selectFullName),
    ]);

    const chooseEmployee = employees.map( (employee) => employee.fullName );
    //console.log(chooseEmployee);

    const responseView = await prompt([
        new MultiChoice( 'manager', Employee.promptsEmployee, chooseEmployee), //note: id needed, string recieved  as displayed
    ]);

    const { manager } = responseView;
    const managerId = chooseEmployee.indexOf(manager)+1; //offbyOne dueTo indexVS ID
    console.log(managerId);


    const sqlView = Employee.queryByManager(managerId);
    console.log(`Querying...${sqlView}`);
    db.query(sqlView, (err,result)=>{
        console.table(result);
        getMainMenu();
    });
}

const viewEmployeeByDepartment = async() => {
    const [departments] = await Promise.all([
        promisifyQuery(Department.selectName),
    ]);

    const chooseDepartment = departments.map( (dept) => dept.name );
    //console.log(chooseDepartment);

    const responseView = await prompt([
        new MultiChoice( 'department', Department.promptsName, chooseDepartment), //note: id needed, string recieved  as displayed
    ]);

    const { department } = responseView;

    const departmentId = chooseDepartment.indexOf(department)+1; //offbyOne dueTo indexVS ID
    console.log(departmentId);


    const sqlView = Employee.queryByDepartment(departmentId);
    console.log(`Querying...${sqlView}`);
    db.query(sqlView, (err,result)=>{
        console.table(result);
        getMainMenu();
    });
}


//#endregion

//#region Add Section
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
    //console.log(chooseRole, chooseManger);

    const responseAdd = await prompt([
        new ShortAnswer( 'firstName', Employee.promptsFirst ),
        new ShortAnswer( 'lastName', Employee.promptsLast ),
        new MultiChoice( 'role', Role.promptsTitle, chooseRole), //note: id needed, string recieved as displayed
        new MultiChoice( 'manager', Employee.promptsDepartment, chooseManger) //note: id needed, string recieved  as displayed
    ]);

    const {firstName, lastName, role, manager} = responseAdd;
    const roleId = chooseRole.indexOf(role)+1; //offbyOne dueTo indexVS ID
    const managerId = chooseManger.indexOf(manager)+1; //offbyOne dueTo indexVS ID

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
            const departmentId = updatedList.indexOf(responseAdd.department)+1; //offbyOne dueTo indexVS ID
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
//#endregion

//#region Update Section
const updateEmployeeRole = async() => {
    const [roles, employees] = await Promise.all([
        promisifyQuery(Role.selectTitle),
        promisifyQuery(Employee.selectFullName),
    ]);

    const chooseRole = roles.map( (role) => role.title );
    const chooseEmployee = employees.map( (employee) => employee.fullName );
    //console.log(chooseRole, chooseEmployee);

    const responseUpdate = await prompt([
        new MultiChoice( 'employee', Employee.promptsEmployee, chooseEmployee), //note: id needed, string recieved  as displayed
        new MultiChoice( 'role', Role.promptsTitle, chooseRole) //note: id needed, string recieved as displayed
    ]);

    const { role, employee } = responseUpdate;

    const roleId = chooseRole.indexOf(role)+1; //offbyOne dueTo indexVS ID
    const employeeId = chooseEmployee.indexOf(employee)+1; //offbyOne dueTo indexVS ID

    console.log(employeeId, roleId );


    const sqlUpdate = Employee.queryUpRole(employeeId, roleId);
    console.log(`Querying...${sqlUpdate}`);
    db.query(sqlUpdate, (err,result)=>{
        console.table(result);
        getMainMenu();
    });
}

const updateEmployeeManager = async() => {
    const [employees] = await Promise.all([
        promisifyQuery(Employee.selectFullName),
    ]);

    const chooseEmployee = employees.map( (employee) => employee.fullName );
    //console.log(chooseEmployee);

    const responseUpdate = await prompt([
        new MultiChoice( 'employee', Employee.promptsEmployee, chooseEmployee), //note: id needed, string recieved  as displayed
        new MultiChoice( 'manager', Employee.promptsManager, chooseEmployee) //note: id needed, string recieved as displayed
    ]);

    const { employee, manager } = responseUpdate;
    const employeeId = chooseEmployee.indexOf(employee)+1; //offbyOne dueTo indexVS ID
    const managerId = chooseEmployee.indexOf(manager)+1; //offbyOne dueTo indexVS ID

    console.log(employeeId, managerId );


    const sqlUpdate = Employee.queryUpManager(employeeId, managerId);
    console.log(`Querying...${sqlUpdate}`);
    db.query(sqlUpdate, (err,result)=>{
        console.table(result);
        getMainMenu();
    });
}
//#endregion

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