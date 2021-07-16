import { Component } from "react";
import { USERSTATE } from "../../screens/LoginScreen/LoginScreen";

type TwitchProps = {
  handleLogin: (user: string, loginState: USERSTATE) => void;
};

type TwitchState = {
  code: string;
  clientID: string;
};

export class TwitchAuth extends Component<TwitchProps, TwitchState> {
  state = { code: "", clientID: "" };

  constructor(props: TwitchProps | Readonly<TwitchProps>) {
    super(props);
    const query = window.location.search.substring(
      window.location.search.indexOf("code"),
      window.location.search.indexOf("&scope")
    );
    this.state = { code: query, clientID: "" };
  }

  async componentDidMount() {
    if (window.location.search.includes("code")) {
      window.history.replaceState({}, document.title, "/");
      await this.getUserData();
    }
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

  getUserData = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    const urlParams = new URLSearchParams({
      client_id: process.env.REACT_APP_CLIENT_ID as string,
      client_secret: process.env.REACT_APP_CLIENT_SECRET as string,
      code: this.state.code.replace("code=", ""),
      grant_type: "authorization_code",
      redirect_uri: "http://localhost:3000",
    });
    const response = await (
      await fetch(
        (process.env.REACT_APP_TWITCH_ID as string) +
          "oauth2/token?" +
          urlParams,
        requestOptions
      )
    ).json();

    const requestOptionsUser = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + response.access_token,
      },
    };
    const responseUser = await (
      await fetch(
        (process.env.REACT_APP_TWITCH_ID as string) + "oauth2/userinfo",
        requestOptionsUser
      )
    ).json();
    const clientID = responseUser.aud;
    this.state = { code: this.state.code, clientID: clientID };
    if (clientID === process.env.REACT_APP_CLIENT_ID) {
      this.props.handleLogin(
        responseUser.preferred_username.trim(),
        USERSTATE.LOGGED_IN
      );
    } else {
      this.props.handleLogin(
        responseUser.preferred_username.trim(),
        USERSTATE.LOGGED_IN_NO_PERM
      );
    }
  };

  render() {
    return (
      <>
        <button onClick={(e) => this.login(e)} className="twitch">
          Login with Twitch
        </button>
      </>
    );
  }
}
