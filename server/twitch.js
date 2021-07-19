const tmi = require("tmi.js");
const fetch = require("node-fetch");

async function getRequestDataTwitch(url, data, user) {
  url = url.replace("<c>", "loganbwde").replace("<u>", user);

  const requestOptions = {
    method: "GET",
  };
  const urlParams = new URLSearchParams(data);
  const response = await (
    await fetch(
      "https://decapi.me/twitch/" + url + "?" + urlParams,
      requestOptions
    )
  ).text();
  return response;
}

async function getRequestDataRiot(url) {
  const requestOptions = {
    method: "GET",
  };
  const urlParams = new URLSearchParams({
    api_key: process.env.RIOT_API_KEY,
  });
  const response = await (
    await fetch(
      "https://euw1.api.riotgames.com/lol/" + url + "?" + urlParams,
      requestOptions
    )
  ).json();
  return response;
}

async function loadRiotElo() {
  const data = await getRequestDataRiot(
    "summoner/v4/summoners/by-name/loganbwde"
  );
  const id = data.id;
  const summonerData = await getRequestDataRiot(
    "league/v4/entries/by-summoner/" + id
  );
  return summonerData;
}

async function loadWinLose() {
  const requestOptions = {
    method: "GET",
  };
  const response = await (
    await fetch("http://localhost:9000/settings/winlose", requestOptions)
  ).json();
  const splitResponse = response[0].value.split(";");
  const winLoseResponse =
    splitResponse[0] + "Wins and " + splitResponse[1] + "Losses";
  return winLoseResponse;
}

async function loadGiveawayInfo() {
  const requestOptions = {
    method: "GET",
  };
  const response = await (
    await fetch("http://localhost:9000/giveaway/", requestOptions)
  ).json();
  if (response.length > 0) {
    return "!" + response[0].cmd;
  } else {
    return "NOGV";
  }
}

async function loadGiveawayTime() {
  const requestOptions = {
    method: "GET",
  };
  const response = await (
    await fetch("http://localhost:9000/giveaway/", requestOptions)
  ).json();
  if (response.length > 0) {
    const dateString =
      new Date(response[0].endDate).getTime() - new Date().getTime();
    return fancyTimeFormat(dateString);
  } else {
    return "NOGV";
  }
}

function fancyTimeFormat(time) {
  time = time / 1000;
  var hrs = ~~(time / 3600);
  var mins = ~~((time % 3600) / 60);
  var secs = ~~time % 60;

  var ret = "";

  if (hrs > 0) {
    ret += hrs + " hour" + (hrs != 1 ? "s" : "");
    if (mins > 0) {
      ret += ", ";
    }
  }

  if (mins > 0) {
    ret += mins + " minute" + (mins != 1 ? "s" : "");
  }

  if ((hrs > 0 || mins > 0) && secs > 0) {
    ret += " and ";
  }

  if (secs > 0) {
    ret += secs + " second" + (secs != 1 ? "s" : "");
  }

  return ret;
}

async function handleTwitchCmd(cmdAction, user) {
  let data = "";
  let url = "";
  switch (cmdAction) {
    case "TWITCH_FOLLOWDATE": {
      data = {
        tz: "Europe/Berlin",
        format: "d-m-Y h:i:s",
      };
      url = "followed/<c>/<u>";
      break;
    }
    case "TWITCH_FOLLOWAGE": {
      data = {
        precision: 7,
      };
      url = "followage/<c>/<u>";
      break;
    }
    case "TWITCH_FOLLOWING": {
      url = "followcount/<c>";
      break;
    }
    case "TWITCH_SUBS": {
      data = {
        subtract: 1,
      };
      url = "subcount/<c>";
      break;
    }
    case "TWITCH_UPTIME": {
      data = {
        precision: 7,
        offline_msg: "im offline, sorry :(",
      };
      url = "uptime/<c>";
    }
  }
  return await getRequestDataTwitch(url, data, user);
}

async function handleRiotCmd(cmdAction) {
  switch (cmdAction) {
    case "RIOT_ELO": {
      return await loadRiotElo();
    }
    case "RIOT_WINLOSE": {
      return await loadWinLose();
    }
  }
}

async function handleGiveawayCmd(cmdAction) {
  switch (cmdAction) {
    case "GIVEAWAY_INFO": {
      return await loadGiveawayInfo();
    }
    case "GIVEAWAY_TIME": {
      return await loadGiveawayTime();
    }
  }
}

async function loadCommandsAndCheckCommand(
  client,
  channel,
  tags,
  message,
  callback
) {
  const requestOptions = {
    method: "GET",
  };
  const response = await (
    await fetch("http://localhost:9000/commands/", requestOptions)
  ).json();
  callback(client, channel, tags, message, response);
}

async function handleCMDResult(client, channel, tags, message, commands) {
  const cmds = [];

  for (const d of commands) {
    cmds.push("!" + d.cmd.toLowerCase());
  }

  const sendCmd = message.split(" ")[0].toLowerCase();
  const userMessage = message.replace(sendCmd, "").trim();
  if (cmds.includes(sendCmd)) {
    const cmd = commands.filter((c) =>
      sendCmd.includes(c.cmd.toLowerCase())
    )[0];
    const cmdTyp = cmd.typ;
    const cmdAction = cmd.action;
    let data = null;
    let riotData = null;

    switch (cmdTyp) {
      case "TWITCH": {
        data = await handleTwitchCmd(cmdAction, tags.username);
        break;
      }
      case "RIOT": {
        const responseData = await handleRiotCmd(cmdAction);
        if (cmdAction !== "RIOT_WINLOSE") riotData = responseData;
        else data = responseData;
        break;
      }
      case "GIVEAWAY": {
        data = await handleGiveawayCmd(cmdAction);
        if (data === "NOGV") {
          data = "";
          cmd.message = "%user%, there is no active giveaway!";
        }
      }
    }

    sendClientMessage(
      client,
      channel,
      tags.username,
      cmds,
      data,
      riotData,
      cmd.message,
      userMessage
    );
  }
}

function startClientChat(client) {
  //New Chat Message
  client.on("message", (channel, tags, message, self) => {
    //Load Commands And Check Command
    if (message.startsWith("!")) {
      loadCommandsAndCheckCommand(
        client,
        channel,
        tags,
        message,
        handleCMDResult
      );
    }
  });
}

function sendClientMessage(
  client,
  channel,
  username,
  commands,
  apiData,
  riotApiData,
  cmdMessage,
  message
) {
  let replacedCmdMsg = cmdMessage
    .replace("%user%", "@" + username)
    .replace("%message%", message)
    .replace("%commands%", commands.join(", ").replace(/, ([^,]*)$/, " and $1"))
    .replace("%apidata%", apiData);
  if (riotApiData) {
    replacedCmdMsg = replacedCmdMsg
      .replace(
        "%riotdata1%",
        riotApiData[1].tier +
          " " +
          riotApiData[1].rank +
          " " +
          riotApiData[1].leaguePoints
      )
      .replace(
        "%riotdata2%",
        riotApiData[0].tier +
          " " +
          riotApiData[0].rank +
          " " +
          riotApiData[0].leaguePoints
      );
  }

  client.say(channel, replacedCmdMsg);
}

function twitch() {
  //initDB
  const requestOptions = {
    method: "POST",
  };
  fetch("http://localhost:9000/initDB", requestOptions);

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

  startClientChat(client);
}

module.exports = twitch;
