const selectColumns = "roles.id, roles.title, departments.name AS department, roles.salary";
const selectJoin = "JOIN departments ON roles.department_id = departments.id"

const insertColumns = "title, salary, department_id";

const Role = {
    all:            `SELECT ${selectColumns} FROM roles ${selectJoin}`,
    promptsTitle:   "What is the title of the role?",
    promptsSalary:  "What would be its salary?",
    promptsDepartment:  "What department will this be under?",
    queryInsert:    function (title, salary, departmentId){
        return `INSERT INTO roles (${insertColumns}) VALUE ("${title}", ${salary}, ${departmentId})`
    }

};


module.exports = Role;