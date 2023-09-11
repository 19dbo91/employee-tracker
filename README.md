# Employee Tracker

![MIT License](https://img.shields.io/badge/license-MIT%20License-green)

## Description

The objective of this project is to create the CMS for an organization to manage their employees, departments, and roles. The goal was to create a ligthweight, easy-to-use, intuitive CLI application that only takes a couple minutes to get the hang of.

## Table of Contents

- [Employee Tracker](#employee-tracker)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Questions](#questions)

## Installation

Install the apprpriate version of SQL.
Download from [this repo](https://github.com/19dbo91/employee-tracker)
In the folder you stored it in, run 
``npm install``
This should have pulled down the following dependencies and version:

- dotenv: ^16.3.1
- inquirer: ^8.2.4
- mysql2: ^3.4.2

Rename the ``.env.EXAMPLE`` to ``.env``
Change the ``.env`` contents to match your own MySql database username and password

In mysql shell, 
  -  ``USE org_db;``
  -  ``SOURCE db/schema.sql``
  -  ``SOURCE db/seeds.sql`` (optional; for dummy data to play with)

## Usage

- From the folder you stored the application on, open GitBash there.
- Start with ``npm start``
- Follow the prompts as desired

- Check out this [demo video](https://drive.google.com/file/d/133keVLozQrFgn75NG2jveycT67otv6T3/view?usp=drive_link)

## License

[MIT License](https://choosealicense.com/licenses/mit/)

## Questions

Contact me via sites below
- Github: [19dbo91](https://github.com/19dbo91)
- Email: [bonilla.dustin+github@gmail.com](mailto:bonilla.dustin+github@gmail.com)
