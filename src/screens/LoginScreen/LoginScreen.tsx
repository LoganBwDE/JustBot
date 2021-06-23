import { useState } from "react";
import { TwitchAuth } from "../../components/TwitchAuth/TwitchAuth";
import "./LoginScreen.css";

export enum USERSTATE {
  NOT_LOGGED_IN,
  LOGGED_IN,
  LOGGED_IN_NO_PERM,
}

export function LoginScreen() {
  const [loggedIn, setLoggedIn] = useState<USERSTATE>(USERSTATE.NOT_LOGGED_IN);

  const handleLogin = () => {
    if (loggedIn === USERSTATE.LOGGED_IN) {
    } else if (loggedIn === USERSTATE.LOGGED_IN_NO_PERM) {
    }
  };

  return (
    <>
      <div>
        {loggedIn === USERSTATE.LOGGED_IN ? (
          <h2>You Logged In!</h2>
        ) : loggedIn === USERSTATE.LOGGED_IN_NO_PERM ? (
          <h2>You Logged In but u got no perm!</h2>
        ) : (
          <>
            <h3>Login with Twitch</h3>
            <TwitchAuth setLoggedIn={setLoggedIn} handleLogin={handleLogin} />
          </>
        )}
      </div>
    </>
  );
}
