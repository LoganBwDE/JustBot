import { useState } from "react";
import { TwitchAuth } from "../../components/TwitchAuth/TwitchAuth";
import "./LoginScreen.css";

export function LoginScreen() {
  const [code, setCode] = useState<string>("");
  const [id, setId] = useState<string>("");

  return (
    <>
      <div>
        <h3>Login with Twitch</h3>
        <TwitchAuth code={code} setCode={setCode} id={id} setId={setId} />
      </div>
    </>
  );
}
