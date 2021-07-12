import { HouseDoor } from "react-bootstrap-icons";
import { Route } from "../../screens/TwitchBot/TwitchBot";
import "./Sidebar.css";

type SidebarProps = {
  setRoute: React.Dispatch<React.SetStateAction<Route>>;
};

export function Sidebar(props: SidebarProps) {
  return (
    <>
      <div className="border-end bg-white" id="sidebar-wrapper">
        <div className="sidebar-heading border-bottom bg-light">
          JustBot - LoganBwDE
        </div>
        <div className="list-group list-group-flush">
          <ul className="list-mp">
            <li
              onClick={() => props.setRoute(Route.DASHBOARD)}
              className="list-group-item list-group-item-action list-group-item-light p-3"
            >
              <HouseDoor className="iconMargin" />
              Dashboard
            </li>
            <li
              onClick={() => props.setRoute(Route.COMMANDS)}
              className="list-group-item list-group-item-action list-group-item-light p-3"
            >
              Commands
            </li>
            <li
              onClick={() => props.setRoute(Route.GIVEAWAY)}
              className="list-group-item list-group-item-action list-group-item-light p-3"
            >
              Giveaway
            </li>
            <li
              onClick={() => props.setRoute(Route.SETTINGS)}
              className="list-group-item list-group-item-action list-group-item-light p-3"
            >
              Settings
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
