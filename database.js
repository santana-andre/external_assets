var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE customer (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text,
            logo text, 
            cor_link text, 
            cor_btn_txt text,
            cor_btn_back text,
            cor_btn_borda text,
            banner text,
            font text,
            linkfont text,
            customcss text
        )`,
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