import { Component } from "react";
import * as crypto from "crypto";

type TwitchProps = {};

type TwitchState = {
  code: string;
};

export class TwitchAuth extends Component<TwitchProps, TwitchState> {
  state = { code: "" };

  constructor(props: TwitchProps | Readonly<TwitchProps>) {
    super(props);
    const query = window.location.search.substring(
      window.location.search.indexOf("code"),
      window.location.search.indexOf("&scope")
    );
    this.state = { code: query };
  }

  getLoginUrl = () => {
    if (this.state.code.length === 0) {
      const endpoint = process.env.REACT_APP_TWITCH_ID + "oauth2/authorize?";
      return (
        endpoint +
        new URLSearchParams({
          client_id: process.env.REACT_APP_CLIENT_ID as string,
          redirect_uri: "http://localhost:3000",
          response_type: "code",
          scope: "user:read:email",
          state: "",
        })
      );
    }
  };

  login = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    window.location.href = this.getLoginUrl() as string;
  };

  render() {
    return (
      <>
        {this.state.code ? (
          <>
            <span>Your Code: {this.state.code}</span>
          </>
        ) : (
          <button onClick={(e) => this.login(e)} className="twitch">
            Login with Twitch
          </button>
        )}
      </>
    );
  }
}
