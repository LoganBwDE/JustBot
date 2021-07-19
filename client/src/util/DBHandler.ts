import { Command, Giveaway } from "./types";

export async function loadCommands(): Promise<Command[]> {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  return await (
    await fetch("http://localhost:9000/commands", requestOptions)
  ).json();
}

export async function deleteCommand(id: number) {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  await fetch("http://localhost:9000/commands/" + id, requestOptions);
}

export async function addCommand(cmd: Command) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", cmd: JSON.stringify(cmd) },
  };
  await fetch("http://localhost:9000/commands/", requestOptions);
}

export async function loadGiveaway(): Promise<Giveaway> {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  return (
    (await (
      await fetch("http://localhost:9000/giveaway", requestOptions)
    ).json()) as Array<Giveaway>
  )[0];
}
