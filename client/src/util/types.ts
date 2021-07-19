export enum CommandTyp {
  NONE = "NONE",
  TWITCH = "TWITCH",
  RIOT = "RIOT",
  GIVEAWAY = "GIVEAWAY",
}

export enum CommandAction {
  MESSAGE = "MESSAGE",
  RIOT_ELO = "RIOT_ELO",
  RIOT_WINLOSE = "RIOT_WINLOSE",
  TWITCH_FOLLOWDATE = "TWITCH_FOLLOWDATE",
  TWITCH_FOLLOWAGE = "TWITCH_FOLLOWAGE",
  TWITCH_FOLLOWING = "TWITCH_FOLLOWING",
  TWITCH_SUBS = "TWITCH_SUBS",
  TWITCH_UPTIME = "TWITCH_UPTIME",
  GIVEAWAY_INFO = "GIVEAWAY_INFO",
  GIVEAWAY_TIME = "GIVEAWAY_TIME",
}

export interface Command {
  id: number;
  cmd: string;
  name: string;
  typ: CommandTyp;
  message: string;
  action: CommandAction;
}

export interface Giveaway {
  id: number;
  cmd: string;
  endDate: Date;
}

export enum RewardTyp {
  KEY = "KEY",
  OTHER = "OTHER",
}
