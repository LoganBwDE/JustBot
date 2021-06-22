import { useState } from "react";
import { TwitchAuth } from "../../components/TwitchAuth/TwitchAuth";
import "./LoginScreen.css";

export function LoginScreen() {
  return (
    <>
      <div>
        <h3>Login with Twitch</h3>
        <TwitchAuth />
      </div>
    </>
  );
}
