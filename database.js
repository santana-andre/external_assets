var conf = require("./config.js");
var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"


let db = new sqlite3.Database(DBSOURCE, (err) => {

    var campos = conf.campos;


    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')

        var sqlCreate = "CREATE TABLE customer ( id INTEGER PRIMARY KEY AUTOINCREMENT, ";

        campos.forEach(element => {
            sqlCreate += element + " text,";
        });
        sqlCreate = sqlCreate.substring(0, sqlCreate.length - 1)

        sqlCreate += ")"

        db.run(sqlCreate,
            (err) => {
                if (err) {
                    console.log("Table customer already exists");
                } else {
                    console.log("Table customer created");
                }
            });

        db.close((err) => {
            if (err) {
                console.log(err.message);
            }
            console.log('Close the database connection.');
        });
    }
});

let getConnection = () => {
    return db = new sqlite3.Database('./db.sqlite', (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Create database connection.');
    });
}

let closeConnection = () => {
    return db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
}

module.exports = {
    db,
    getConnection,
    closeConnection
}