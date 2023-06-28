/* //! USER STORY
:: BUSINESS OWNER
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
*/
/* //! ACCEPTANCE CRITERIA
:. command-line application that accepts user input
@ STARTED app
>> PRESENT with the following options
    view all departments
    view all roles
    view all employees
    add a department
    add a role
    add an employee
    update an employee role

@ CHOSE view all departments
    >> PRESENT with a formatted table 
        department name
        department ID

@ CHOSE view all roles
    >> PRESENT
        job title
        role id
        department that role belongs to
        salary for that role

@ CHOSE view all employees
    >> PRESENT with a formatted table showing employee data
        employee ids
        first names
        last names
        job titles
        departments
        salaries
        managers that the employees report to

@ CHOSE add a department
    >> PROMPT the name of the department
        >> ADD prompted response to the DB

@ CHOSE add a role
    >> PROMPT
        role name
        role salary
        role department
        >> ADD prompted response to the DB

@ CHOSE add an employee
    >> PROMPT 
        employee’s first name
        last name
        role
        manager
        >> ADD prompted response to the DB

@ CHOSE update an employee role
    >> PROMPT 
        select employee to update
        select new role for employee
        >> UPDATE prompted response to the DB
*/