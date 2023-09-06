const insertColumns = "first_name, last_name, role_id, manager_id"

const selectColumns ="E.id, E.first_name, E.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(managers.first_name, ' ', managers.last_name) AS manager"
const selectJoin = "JOIN roles ON E.role_id = roles.id JOIN departments ON roles.department_id = departments.id LEFT JOIN employees AS managers ON E.manager_id = managers.id"

const selectColMgr = "E.id, E.first_name, E.last_name, CONCAT(managers.first_name, ' ', managers.last_name) AS manager"
const selectJoinMgr = "LEFT JOIN employees AS managers ON E.manager_id = managers.id"

const selectColDept = "E.id, E.first_name, E.last_name, roles.title, departments.name AS department, CONCAT(managers.first_name, ' ', managers.last_name) AS manager"
const selectJoinDept = "JOIN roles ON E.role_id = roles.id JOIN departments ON roles.department_id = departments.id LEFT JOIN employees AS managers ON E.manager_id = managers.id"

const Employee = {
    all:            `SELECT ${selectColumns} FROM employees AS E ${selectJoin};`,
    selectFullName: "SELECT CONCAT (first_name, ' ', last_name) AS fullName FROM employees;",
    promptsFirst:   "What is the new employee's first name?",
    promptsLast:    "What is their last name?",
    promptsEmployee:"Whose information is being looked at?" ,
    promptsManager: "Who is their manager?",
    promptsChangeRole: "Who is changing roles?",
    queryInsert:    function(firstName, lastName, roleId, managerId){
        return `INSERT INTO employees (${insertColumns}) VALUE ("${firstName}","${lastName}",${roleId},${managerId});`
    },
    queryUpRole:    function(employeeId, roleId){
        return `UPDATE employees SET role_Id = "${roleId}" WHERE id=${employeeId}`;
    },
    queryUpManager: function(employeeId, managerId){
        return `UPDATE employees SET manager_Id = "${managerId}" WHERE id=${employeeId}`;
    },
    queryByManager: function(managerId){
        return `SELECT ${selectColMgr} FROM employees AS E ${selectJoinMgr} where E.manager_id=${managerId};`
    },
    queryByDepartment: function(departmentId){
        return `SELECT ${selectColDept} FROM employees AS E ${selectJoinDept} where roles.department_id=${departmentId};`
    },
};

module.exports = Employee;