const Department = {
    all: "SELECT * FROM departments",
    promptsName: "What is the name of the department?",
    queryInsert: function(newDepartment) {return `INSERT INTO departments (name) VALUE ("${newDepartment}")`},

};


const queryDelete = (removingDepartment) =>{
    return `DELETE FROM departments WHERE name = "${removingDepartment}"`
}


module.exports = Department;