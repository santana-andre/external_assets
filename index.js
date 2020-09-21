'use strict';
var express = require("express");
var bodyParser = require("body-parser");
var db = require("./database.js");
var cors = require('cors')

var path = require('path');

var app = (module.exports = express());
app.use(cors());
app.use(bodyParser.urlencoded({ limit: "9mb", extended: false }));
app.use(bodyParser.json({ limit: "9mb" }));

app.listen(process.env.PORT || 3000, function () {
  console.log("NSH_External_Assets Running.");
});

app.get("/v1/external_assets/status", function (req, res) {
  res.status(200).send("SSE NSH_External_Assets running, v_01.01");
  return;
});

//Inserir um novo cliente
app.post("/v1/external_assets/costumer", function (req, res) {
  let data = [
    req.body.name,
    req.body.logo,
    req.body.cor_link,
    req.body.cor_btn_txt,
    req.body.cor_btn_back,
    req.body.cor_btn_borda,
    req.body.banner,
    req.body.font,
    req.body.linkfont,
    req.body.customcss
  ];

  let sql = 'INSERT INTO customer (name, logo, cor_link, cor_btn_txt, cor_btn_back, cor_btn_borda, banner, font, linkfont, customcss) VALUES (?,?,?,?,?,?,?,?,?,?)';
  let resp = {};

  db.run(sql, data, function (err) {
    if (err) {
      resp = {
        "message": "error",
        "data": err.message
      };
    } else {
      resp = {
        "message": "sucess"
      };
    }
  });
  res.json(resp);
  return;
});

//Atualizar informações de cliente
app.put("/v1/external_assets/costumer", function (req, res) {
  let data = [
    req.body.name,
    req.body.logo,
    req.body.cor_link,
    req.body.cor_btn_txt,
    req.body.cor_btn_back,
    req.body.cor_btn_borda,
    req.body.banner,
    req.body.font,
    req.body.linkfont,
    req.body.customcss,
    req.body.id
  ];
  let sql = 'UPDATE customer SET name = ?, logo = ?, cor_link = ?, cor_btn_txt = ?, cor_btn_back = ?, cor_btn_borda = ?, banner = ?, font = ?, linkfont = ?, customcss = ? WHERE id = ?';

  let resp = {};
  db.run(sql, data, function (err) {
    if (err) {
      resp = {
        "message": "error",
        "data": err.message
      };
    } else {
      resp = {
        "message": "sucess"
      };
    }
  });
  res.json(resp);
  return;
});

//Remover informações de cliente
app.delete("/v1/external_assets/costumer", function (req, res) {
  let data = req.body.id;
  let sql = 'DELETE FROM customer WHERE rowid=?';
  let resp = {};
  db.run(sql, data, function (err) {
    if (err) {
      resp = {
        "message": "error",
        "data": err.message
      };
    } else {
      resp = {
        "message": "sucess"
      };
    }
  });
  res.json(resp);
  return;
});

//Recuperar informacoes de todos clientes
app.get("/v1/external_assets/costumer", (req, res, next) => {
  var sql = "select * from customer";
  var params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": rows
    })
  });
  return;
});

//Recuperar informacoes de apenas um cliente
app.get("/v1/external_assets/costumer_id/:id", (req, res, next) => {
  var sql = "select * from customer where id = ?"
  var params = [req.params.id]
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": row
    })
  });
  return;
});

//Recuperar informacoes de apenas um cliente
app.get("/v1/external_assets/costumer_name/:name", (req, res, next) => {
  var sql = "select * from customer where name = ?"
  var params = [req.params.name]
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": row
    })
  });
  return;
});

app.get("/admin", (req, res, next) => {
  res.sendFile(path.join(__dirname + '/index.html'));
  return;
});

app.get("/occjs", (req, res, next) => {
  res.sendFile(path.join(__dirname + '/occ.js'));
  return;
});