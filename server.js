const { getMainMenu } = require('./js/mainMenu.js')
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;
const db = require('./config/connection.js');



getMainMenu();
