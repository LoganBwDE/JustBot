import { Component } from "react";
import * as crypto from "crypto";

type TwitchProps = {
  id: string;
  code: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
  setCode: React.Dispatch<React.SetStateAction<string>>;
};

export class TwitchAuth extends Component<TwitchProps> {
  getLoginUrl = () => {
    const endpoint = process.env.REACT_APP_TWITCH_ID + "oauth2/authorize?";
    this.props.setId(crypto.randomBytes(20).toString("hex"));

    return (
      endpoint +
      new URLSearchParams({
        client_id: process.env.REACT_APP_CLIENT_ID as string,
        redirect_uri: "http://localhost:3000",
        response_type: "code",
        scope: "user:read:email",
        state: this.props.id,
      })
    );
  };

  login = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    window.location.replace(this.getLoginUrl());
    const query = window.location.search.substring(
      window.location.search.indexOf("code"),
      window.location.search.indexOf("&scope")
    );
    this.props.setCode(query);
  };

  render() {
    return (
      <>
        {this.props.code ? (
          <>
            <span>Your Code: {this.props.code}</span>
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
