import "./Navigation.css";
import * as BS from "react-bootstrap";
import { Sidebar } from "../Sidebar/Sidebar";
import { useState } from "react";
import { ArrowLeftCircle } from "react-bootstrap-icons";
import { Route } from "../../screens/TwitchBot/TwitchBot";

type NavigationProps = {
  setRoute: React.Dispatch<React.SetStateAction<Route>>;
  user: string;
  children: React.ReactNode;
};

export function Navigation(props: NavigationProps) {
  const [toggle, setToggle] = useState<boolean>(false);
  const handleToggle = () => setToggle(!toggle);

  return (
    <>
      <div className="d-flex" id="wrapper">
        {!toggle && <Sidebar setRoute={props.setRoute} />}
        <div id="page-content-wrapper">
          <BS.Nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <div className="container-fluid">
              <BS.Button
                onClick={handleToggle}
                variant="outline-dark"
                className="btnNoActive"
                id="sidebarToggle"
              >
                <ArrowLeftCircle className="bgDark" />
              </BS.Button>
              <ul className="navbar-nav">
                <li className="nav-item">User: {props.user}</li>
              </ul>
            </div>
          </BS.Nav>
          <div className="container-fluid">{props.children}</div>
        </div>
      </div>
    </>
  );
}
