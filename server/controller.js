var mysql = require("mysql");
var express = require("express");
var router = express.Router();
const tmi = require("tmi.js");
let ajax = require("superagent");

let sqlList = [
  "CREATE TABLE IF NOT EXISTS `commands` (`id` int(11) NOT NULL AUTO_INCREMENT, `cmd` varchar(50) NOT NULL, `name` varchar(50) NOT NULL, `typ` enum('NONE','TWITCH','RIOT','GIVEAWAY') NOT NULL DEFAULT 'NONE', `message` varchar(1000) NOT NULL, `action` varchar(1000) DEFAULT NULL, PRIMARY KEY (id));",
  "CREATE TABLE IF NOT EXISTS `giveaway` (`id` int(11) NOT NULL AUTO_INCREMENT,`cmd` varchar(50) NOT NULL,`typ` enum('KEY','ITEM') NOT NULL DEFAULT 'KEY',`endDate` date NOT NULL, PRIMARY KEY (id)) ;",
  "CREATE TABLE IF NOT EXISTS `person` (`id` int(11) NOT NULL AUTO_INCREMENT,`name` int(11) NOT NULL, PRIMARY KEY (id)) ;",
  "CREATE TABLE IF NOT EXISTS `personGiveaway` (`id` int(11) NOT NULL AUTO_INCREMENT,`giveawayID` int(11) NOT NULL,`personID` int(11) NOT NULL, PRIMARY KEY (id)) ;",
  "CREATE TABLE IF NOT EXISTS `settings` (`id` int(11) NOT NULL AUTO_INCREMENT,`name` varchar(50) NOT NULL,`value` varchar(50) NOT NULL, PRIMARY KEY (id)) ;",
  "ALTER TABLE `commands`ADD KEY `CmdID` (`id`);",
  "ALTER TABLE `giveaway`ADD KEY `GiveawayID` (`id`);",
  "ALTER TABLE `person`ADD KEY `PersonID` (`id`);",
  "ALTER TABLE `personGiveaway`ADD KEY `personGiveawayID` (`id`),ADD KEY `personID` (`personID`),ADD KEY `giveawayID` (`giveawayID`);",
  "ALTER TABLE `settings`ADD KEY `settingID` (`id`);",
  "ALTER TABLE `personGiveaway`ADD CONSTRAINT `giveawayID` FOREIGN KEY (`giveawayID`) REFERENCES `giveaway` (`id`),ADD CONSTRAINT `personID` FOREIGN KEY (`personID`) REFERENCES `person` (`id`);",
];

router.post("/initDB", function (req, res, next) {
  let con = getConnection();
  con.connect(function (err) {
    if (err) throw err;
    createTablesIfNE(con);
    res.status(200);
    res.send();
  });
});

router.get("/commands", function (req, res, next) {
  let con = getConnection();
  con.connect(function (err) {
    if (err) throw err;
    let sql = "SELECT * FROM commands;";
    con.query(sql, function (err, result) {
      if (err) throw err;
      con.end();
      res.status(200);
      res.send(result);
    });
  });
});

router.delete("/commands/:commandId", function (req, res, next) {
  let con = getConnection();
  con.connect(function (err) {
    if (err) throw err;
    let sql = "DELETE FROM commands where id ='" + req.params.commandId + "';";
    con.query(sql, function (err, result) {
      if (err) throw err;
      con.end();
      res.status(200);
      res.send();
    });
  });
});

router.put("/commands", function (req, res, next) {
  const cmd = JSON.parse(req.headers.cmd);
  let con = getConnection();
  con.connect(function (err) {
    if (err) throw err;
    let sql = "";
    if (cmd.id === 0) {
      sql =
        "INSERT INTO commands VALUES (" +
        "NULL" +
        ",'" +
        cmd.cmd +
        "','" +
        cmd.name +
        "','" +
        cmd.typ +
        "','" +
        cmd.message +
        "','" +
        cmd.action +
        "');";
    } else {
      sql =
        "UPDATE commands SET cmd='" +
        cmd.cmd +
        "',name='" +
        cmd.name +
        "',typ='" +
        cmd.typ +
        "',message='" +
        cmd.message +
        "',action='" +
        cmd.action +
        "' where id='" +
        cmd.id +
        "';";
    }

    con.query(sql, function (err, result) {
      if (err) throw err;
      con.end();
      res.status(200);
      res.send();
    });
  });
});

function createTablesIfNE(con) {
  for (let sql of sqlList) {
    con.query(sql, function (err, result) {});
  }
  con.end();
}

function getConnection() {
  return mysql.createConnection({
    host: "loganbw.de",
    user: "justbot",
    password: process.env.DB_PW,
    database: "justbot",
  });
}

function handleCMDResult(commands, client) {
  //New Chat Message
  const cmds = [];

  for (const d of commands) {
    cmds.push(d.cmd);
  }
  client.on("message", (channel, tags, message, self) => {
    const sendCmd = message.split(" ")[0].toLowerCase();
    if (cmds.includes(sendCmd)) {
      console.log("geht zumindest", sendCmd);
    }
  });
}

function twitch() {
  //Setup Chat Client

  const client = new tmi.Client({
    options: { debug: true },
    connection: {
      reconnect: true,
      secure: true,
    },
    identity: {
      username: "loganbwdebot",
      password: process.env.TWITCH_AUTH,
    },
    channels: ["loganbwde"],
  });

  client.connect();

  //Load Commands
  let con = getConnection();
  con.connect(function (err) {
    if (err) throw err;
    let sql = "SELECT * FROM commands;";
    con.query(sql, function (err, result) {
      if (err) throw err;
      con.end();
      handleCMDResult(result, client);
    });
  });
}

module.exports.router = router;
module.exports.twitch = twitch;
