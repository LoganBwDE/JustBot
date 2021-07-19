import { useState } from "react";
import { Navigation } from "../../components/Navigation/Navigation";
import { CommandRoute } from "../Route/Commands/Commands";
import { DashboardRoute } from "../Route/Dashboard/Dashboard";
import { GiveawayRoute } from "../Route/Giveaway/Giveaway";
import { SettingsRoute } from "../Route/Settings/Settings";

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
        return <DashboardRoute />;
      }
      case Route.COMMANDS: {
        return <CommandRoute />;
      }
      case Route.GIVEAWAY: {
        return <GiveawayRoute />;
      }
      case Route.SETTINGS: {
        return <SettingsRoute />;
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
