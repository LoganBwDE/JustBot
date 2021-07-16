import { useState } from "react";
import { TwitchAuth } from "../../components/TwitchAuth/TwitchAuth";
import { NoPermScreen } from "../NoPermScreen/NoPermScreen";
import { TwitchBot } from "../TwitchBot/TwitchBot";
import "./LoginScreen.css";

export enum USERSTATE {
  NOT_LOGGED_IN,
  LOGGED_IN,
  LOGGED_IN_NO_PERM,
}

export function LoginScreen() {
  const [loggedIn, setLoggedIn] = useState<USERSTATE>(USERSTATE.NOT_LOGGED_IN);
  const [userName, setUserName] = useState("");

  const handleLogin = (user: string, loginState: USERSTATE) => {
    if (loginState === USERSTATE.LOGGED_IN) {
    } else if (loginState === USERSTATE.LOGGED_IN_NO_PERM) {
    }
    setUserName(user);
    setLoggedIn(loginState);
  };

  return (
    <>
      <div>
        {loggedIn === USERSTATE.LOGGED_IN ? (
          <TwitchBot user={userName} />
        ) : loggedIn === USERSTATE.LOGGED_IN_NO_PERM ? (
          <NoPermScreen />
        ) : (
          <>
            <h3>Login with Twitch</h3>
            <TwitchAuth handleLogin={handleLogin} />
          </>
        )}
      </div>
    </>
  );
}
