import "./ManageGiveaway.css";
import { Giveaway } from "../../util/types";
import * as BS from "react-bootstrap";

import Noty from "noty";

import "noty/lib/noty.css";
import "noty/lib/themes/bootstrap-v4.css";
import { useEffect } from "react";
import { useState } from "react";
import { loadKeyName } from "../../util/DBHandler";

type ManageGiveawayProps = {
  giveaway: Giveaway;
};

export function ManageGiveaway(props: ManageGiveawayProps) {
  const [remainingTime, setRemainingTime] = useState("");
  const [keyname, setKeyName] = useState("");

  const updateTimer = () => {
    setTimeout(() => {
      console.log("yes");
      const diff =
        new Date(props.giveaway.endDate).getTime() - new Date().getTime();
      console.log("diff", diff);
      setRemainingTime(fancyTimeFormat(diff));
    }, 1000);
  };

  useEffect(() => {
    const loadKey = async () => {
      if (props.giveaway.keyID !== null)
        setKeyName((await loadKeyName(props.giveaway.keyID!)).keyname);
      else setKeyName(props.giveaway.prize!);
    };
    loadKey();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateTimer();
  });

  const fancyTimeFormat = (time: number) => {
    time = time / 1000;
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    var ret = "";

    if (hrs > 0) {
      ret += hrs + " hour" + (hrs !== 1 ? "s" : "");
      if (mins > 0) {
        ret += ", ";
      }
    }

    if (mins > 0) {
      ret += mins + " minute" + (mins !== 1 ? "s" : "");
    }

    if ((hrs > 0 || mins > 0) && secs > 0) {
      ret += " and ";
    }

    if (secs > 0) {
      ret += secs + " second" + (secs !== 1 ? "s" : "");
    }

    return ret;
  };

  return (
    <>
      <span className="manageText">Manage Giveaway</span>
      <BS.Card className="manageCard">
        <BS.Card.Body>
          <BS.Card.Title>
            Type: {props.giveaway.keyID !== null ? "Key" : "Special"} Giveaway
          </BS.Card.Title>
          <BS.Card.Text>
            Giveaway Remaining Time: {remainingTime}
            <br />
            Selected Prize: {keyname}
          </BS.Card.Text>
          <BS.Button variant="danger">Cancel Giveaway</BS.Button>
          <BS.Button variant="warning" className="btnMarg">
            Stop Giveaway
          </BS.Button>
          <BS.Button variant="success">Roll Giveaway</BS.Button>
        </BS.Card.Body>
        <hr className="horizontalHR" />
        <BS.Card.Body>
          <BS.Card.Title>Users List</BS.Card.Title>
          <BS.Card.Text></BS.Card.Text>
        </BS.Card.Body>
      </BS.Card>
    </>
  );
}
