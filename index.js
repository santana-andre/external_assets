'use strict';
var express = require("express");
var bodyParser = require("body-parser");
var db = require("./database.js");
var conf = require("./config.js");
var cors = require('cors')

var path = require('path');

var app = (module.exports = express());
app.use(cors());
app.use(bodyParser.urlencoded({ limit: "9mb", extended: false }));
app.use(bodyParser.json({ limit: "9mb" }));

const auth = require('basic-auth')

// app.listen(process.env.PORT || 3000, function () {
//   console.log("NSH_External_Assets Running.");
// });


const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

// https.createServer(options, function (req, res) {
//   // res.writeHead(200);
//   // res.end("hello world\n");
// }).listen(process.env.PORT || 3000, function () {
//   console.log("NSH_External_Assets Running.");
// });

const httpsServer = https.createServer(options, app);

httpsServer.listen(3000, () => {
  console.log('HTTPS Server running on port 443');
});

app.get("/v1/external_assets/status", function (req, res) {
  res.status(200).send("SSE NSH_External_Assets running, v_01.01");
  return;
});

var campos = conf.campos;
console.log(1, campos);
//Inserir um novo cliente
app.post("/v1/external_assets/costumer", function (req, res) {
  let dbo = db.getConnection();
  if (dbo) {
    let data = []
    campos.forEach(element => {
      data.push(req.body[element])
    });

    // let sql = 'INSERT INTO customer'

    let sql = 'INSERT INTO customer (';

    campos.forEach(element => {
      sql += element + ",";
    });
    sql = sql.substring(0, sql.length - 1)

    sql += ") VALUES ("

    campos.forEach(element => {
      sql += "'',";
    });
    sql = sql.substring(0, sql.length - 1)

    sql += ")"

    let resp = {};

    dbo.run(sql, data, function (err) {
      if (err) {
        resp = {
          "message": "error",
          "data": err.message
        };
        db.closeConnection();
      } else {
        resp = {
          "message": "sucess"
        };
        db.closeConnection();
      }
    });
    res.json(resp);
  } else {
    res.json({
      "message": "error",
      "detail": "Failed to retrieve connection to the database."
    })
  }
  return;
});

//Inserir um novo cliente com dados
app.post("/v1/external_assets/costumer_with_data", function (req, res) {
  let dbo = db.getConnection();
  if (dbo) {
    let data = []
    campos.forEach(element => {
      data.push(req.body[element])
    });

    // let sql = 'INSERT INTO customer'

    let sql = 'INSERT INTO customer (';

    campos.forEach(element => {
      sql += element + ",";
    });
    sql = sql.substring(0, sql.length - 1)

    sql += ") VALUES ("

    campos.forEach(element => {
      sql += "?,";
    });
    sql = sql.substring(0, sql.length - 1)

    sql += ")"

    let resp = {};

    dbo.run(sql, data, function (err) {
      if (err) {
        resp = {
          "message": "error",
          "data": err.message
        };
        db.closeConnection();
      } else {
        resp = {
          "message": "sucess"
        };
        db.closeConnection();
      }
    });
    res.json(resp);
  } else {
    res.json({
      "message": "error",
      "detail": "Failed to retrieve connection to the database."
    })
  }
  return;
});

//Atualizar informações de cliente
app.put("/v1/external_assets/costumer", function (req, res) {
  let dbo = db.getConnection();
  if (dbo) {
    let data = []
    campos.forEach(element => {
      data.push(req.body[element])
    });
    data.push(req.body.id)

    let sql = 'UPDATE customer SET ';
    campos.forEach(element => {
      sql += element + " = ?,";
    });
    sql = sql.substring(0, sql.length - 1)

    sql += ' WHERE id = ?'

    let resp = {};
    dbo.run(sql, data, function (err) {
      if (err) {
        resp = {
          "message": "error",
          "data": err.message
        };
        db.closeConnection();
      } else {
        resp = {
          "message": "sucess"
        };
        db.closeConnection();
      }
    });
    res.json(resp);
  } else {
    res.json({
      "message": "error",
      "detail": "Failed to retrieve connection to the database."
    })
  }
  return;
});

//Remover informações de cliente
app.delete("/v1/external_assets/costumer", function (req, res) {
  let dbo = db.getConnection();
  if (dbo) {
    let data = req.body.id;
    let sql = 'DELETE FROM customer WHERE rowid=?';
    let resp = {};
    dbo.run(sql, data, function (err) {
      if (err) {
        resp = {
          "message": "error",
          "data": err.message
        };
        db.closeConnection();
      } else {
        resp = {
          "message": "sucess"
        };
        db.closeConnection();
      }
    });
    res.json(resp);
  } else {
    res.json({
      "message": "error",
      "detail": "Failed to retrieve connection to the database."
    })
  }
  return;
});

//Recuperar informacoes de todos clientes
app.get("/v1/external_assets/costumer", (req, res, next) => {
  let dbo = db.getConnection();
  if (dbo) {
    let sql = "select * from customer";
    let params = [];
    dbo.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message });
        db.closeConnection();
        return;
      }
      res.json({
        "message": "success",
        "data": rows
      })
      db.closeConnection();
    });
  } else {
    res.json({
      "message": "error",
      "detail": "Failed to retrieve connection to the database."
    })
  }
  return;
});

//Recuperar informacoes de apenas um cliente
app.get("/v1/external_assets/costumer_id/:id", (req, res, next) => {
  let dbo = db.getConnection();
  if (dbo) {
    var sql = "select * from customer where id = ?"
    var params = [req.params.id]
    dbo.get(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ "error": err.message });
        db.closeConnection();
        return;
      }
      res.json({
        "message": "success",
        "data": row
      })
      db.closeConnection();
    });
  } else {
    res.json({
      "message": "error",
      "detail": "Failed to retrieve connection to the database."
    })
  }
  return;
});

//Recuperar informacoes de apenas um cliente
app.get("/v1/external_assets/costumer_name/:name", (req, res, next) => {
  let dbo = db.getConnection();
  if (dbo) {
    var sql = "select * from customer where name = ?"
    var params = [req.params.name]
    dbo.get(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ "error": err.message });
        db.closeConnection();
        return;
      }
      res.json({
        "message": "success",
        "data": row
      })
      db.closeConnection();
    });
  } else {
    res.json({
      "message": "error",
      "detail": "Failed to retrieve connection to the database."
    })
  }
  return;
});


app.get("/assets/banner-1.png", (req, res, next) => {
  res.sendFile(path.join(__dirname + '/assets/banner-1.png'));
  return;
});
app.get("/assets/banner-2.png", (req, res, next) => {
  res.sendFile(path.join(__dirname + '/assets/banner-2.png'));
  return;
});
app.get("/assets/banner-3.png", (req, res, next) => {
  res.sendFile(path.join(__dirname + '/assets/banner-3.png'));
  return;
});


app.get("/assets/logo-1.png", (req, res, next) => {
  res.sendFile(path.join(__dirname + '/assets/logo-1.png'));
  return;
});
app.get("/assets/logo-2.png", (req, res, next) => {
  res.sendFile(path.join(__dirname + '/assets/logo-2.png'));
  return;
});
app.get("/assets/logo-3.png", (req, res, next) => {
  res.sendFile(path.join(__dirname + '/assets/logo-3.png'));
  return;
});

app.get("/occjs", (req, res, next) => {
  res.sendFile(path.join(__dirname + '/occ.js'));
  return;
});

// Ensure this is before any other middleware or routes
app.use((req, res, next) => {
  let user = auth(req)

  if (user === undefined || user['name'] !== 'admin' || user['pass'] !== 'oracle123') {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic realm="Node"')
    res.end('Unauthorized')
  } else {
    next()
  }
})

app.get("/admin", (req, res, next) => {
  res.sendFile(path.join(__dirname + '/index.html'));
  return;
});

