const insertColumns = "first_name, last_name, role_id, manager_id"

const Employee = {
    all:            "SELECT * FROM employees",
    selectManager:  "SELECT CONCAT (first_name, ' ', last_name) AS fullName FROM employees",
    promptsFirst:   "What is the new employee's first name?",
    promptsLast:    "What is their last name?",
    promptsRole:    "What is the their role?",
    promptsManager: "Who is their manager?",
    queryInsert:    function(firstName, lastName, roleId, managerId){
        return `INSERT INTO employees (${insertColumns}) VALUE ("${firstName}","${lastName}",${roleId},${managerId})`
    }
};

module.exports = Employee;