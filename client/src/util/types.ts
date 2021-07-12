export enum CommandTyp {
  NONE = "NONE",
  TWITCH = "TWITCH",
  RIOT = "RIOT",
  GIVEAWAY = "GIVEAWAY",
}

export interface Command {
  id: number;
  cmd: string;
  name: string;
  typ: CommandTyp;
  message: string;
  action: string;
}
