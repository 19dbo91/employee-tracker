const Department = {
    all:            "SELECT * FROM departments",
    selectName:     "SELECT name FROM departments",
    promptsName:    "What is the name of the department?",
    queryInsert:    function(newDepartment) {
        return `INSERT INTO departments (name) VALUE ("${newDepartment}")`
    },
};

module.exports = Department;