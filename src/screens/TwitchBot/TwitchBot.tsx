import { useState } from "react";
import { Navigation } from "../../components/Navigation/Navigation";

export enum Route {
  DASHBOARD,
  COMMANDS,
  GIVEAWAY,
  SETTINGS,
}

type TwitchBotProps = {
  user: string;
};

export function TwitchBot(props: TwitchBotProps) {
  const [route, setRoute] = useState<Route>(Route.DASHBOARD);

  const renderSwitch = (route: Route) => {
    switch (route) {
      case Route.DASHBOARD: {
        return (
          <>
            <h1>Dashboard</h1>
          </>
        );
      }
      case Route.COMMANDS: {
        return (
          <>
            <h1>Commands</h1>
          </>
        );
      }
      case Route.GIVEAWAY: {
        return (
          <>
            <h1>Giveaway</h1>
          </>
        );
      }
      case Route.SETTINGS: {
        return (
          <>
            <h1>Settings</h1>
          </>
        );
      }
    }
  };

  return (
    <>
      <Navigation setRoute={setRoute} user={props.user}>
        {renderSwitch(route)}
      </Navigation>
    </>
  );
}
