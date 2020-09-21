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
            descricao text, 
            site_logo_1 text,
            site_logo_2 text,
            logo text, 
            cor_link text, 
            cor_btn_txt text,
            cor_btn_back text,
            cor_btn_borda text,
            banner text,
            font text,
            linkfont text
        )`,
            (err) => {
                if (err) {
                    console.log("Table customer already exists");
                } else {
                    console.log("Table customer created");
                }
            });
    }
});

module.exports = db