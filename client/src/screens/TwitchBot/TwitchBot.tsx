import { useState } from "react";
import { Navigation } from "../../components/Navigation/Navigation";
import { Commands } from "../Route/Commands/Commands";
import { Dashboard } from "../Route/Dashboard/Dashhboard";
import { Giveaway } from "../Route/Giveaway/Giveaway";
import { Settings } from "../Route/Settings/Settings";

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
        return <Dashboard />;
      }
      case Route.COMMANDS: {
        return <Commands />;
      }
      case Route.GIVEAWAY: {
        return <Giveaway />;
      }
      case Route.SETTINGS: {
        return <Settings />;
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
