import "./AddGiveaway.css";
import * as BS from "react-bootstrap";
import { useState } from "react";
import { Giveaway, Key, RewardTyp } from "../../util/types";
import { useEffect } from "react";
import { createGiveaway } from "../../util/DBHandler";
import "react-datetime/css/react-datetime.css";
import * as moment from "moment";
import "moment/locale/de";
import DateTime from "react-datetime";

import Noty from "noty";

import "noty/lib/noty.css";
import "noty/lib/themes/bootstrap-v4.css";

type AddGiveawayProps = {
  setGiveaway: React.Dispatch<React.SetStateAction<Giveaway | undefined>>;
  keys: Key[];
};

export function AddGiveaway(props: AddGiveawayProps) {
  const [joinCmd, setJoinCmd] = useState("");
  const [rewardTyp, setRewardTyp] = useState<RewardTyp>(RewardTyp.KEY);
  const [selectedKey, setSelectedKey] = useState<Key>();
  const [prize, setPrize] = useState("");
  const [autoPickWinner, setAutoPickWinner] = useState(true);
  const [endDate, setEndDate] = useState<Date>(new Date());

  useEffect(() => {
    checkLanguage();
  }, []);

  const checkLanguage = () => {
    const locale = window.navigator.language;
    if (locale.startsWith("de")) {
      moment.locale("de");
    }
  };

  const createGiveawayObjectAndSend = async () => {
    let giveaway: Giveaway;
    if (rewardTyp === RewardTyp.KEY) {
      giveaway = {
        id: 0,
        cmd: joinCmd,
        keyID: selectedKey !== undefined ? selectedKey.id : props.keys[0].id,
        endDate: endDate,
        autopickwinner: autoPickWinner,
      };
    } else {
      giveaway = {
        id: 0,
        cmd: joinCmd,
        prize: prize,
        endDate: endDate,
        autopickwinner: autoPickWinner,
      };
    }
    const response = await createGiveaway(giveaway);
    if (response.status === 200) props.setGiveaway(giveaway);

    new Noty({
      theme: "bootstrap-v4",
      type: response.status === 200 ? "success" : "error",
      text:
        response.status === 200
          ? "Giveaway created successfully!"
          : "Giveaway could not be created",
      timeout: 5000,
    }).show();
  };

  return (
    <>
      <span className="createGiveaway">Create Giveaway</span>
      <BS.Form className="formAdjust">
        <BS.Form.Group as={BS.Row} className="mb-3" controlId="formJoinCommand">
          <BS.Form.Label column sm="2">
            Join Command
          </BS.Form.Label>
          <BS.Col sm="10">
            <BS.Form.Control
              onChange={(e) => setJoinCmd(e.target.value)}
              type="text"
              placeholder="JoinCommand"
              value={joinCmd}
            />
          </BS.Col>
        </BS.Form.Group>
        <BS.Form.Group
          as={BS.Row}
          className="mb-3"
          controlId="formRewardSelect"
        >
          <BS.Form.Label column sm="2">
            Select the Reward
          </BS.Form.Label>
          <BS.Col sm="10">
            <BS.Form.Select
              onChange={(e) => setRewardTyp(e.currentTarget.value as RewardTyp)}
              aria-label="RewardType"
              value={rewardTyp}
            >
              {Object.keys(RewardTyp).map((k) => {
                return (
                  <option value={k}>
                    {k.charAt(0).toUpperCase() + k.slice(1)}
                  </option>
                );
              })}
            </BS.Form.Select>
          </BS.Col>
        </BS.Form.Group>
        {rewardTyp === RewardTyp.KEY ? (
          <BS.Form.Group as={BS.Row} className="mb-3" controlId="formKeySelect">
            <BS.Form.Label column sm="2">
              Select the Key
            </BS.Form.Label>
            <BS.Col sm="10">
              <BS.Form.Select
                onChange={(e) => {
                  setSelectedKey(
                    props.keys.find(({ id }) => {
                      return id === parseInt(e.currentTarget.value);
                    })
                  );
                }}
                aria-label="RewardType"
                value={selectedKey?.id}
              >
                {props.keys.map((k) => {
                  return <option value={k.id}>{k.keyname}</option>;
                })}
              </BS.Form.Select>
            </BS.Col>
          </BS.Form.Group>
        ) : (
          <BS.Form.Group as={BS.Row} className="mb-3" controlId="formPrize">
            <BS.Form.Label column sm="2">
              Insert Prize
            </BS.Form.Label>
            <BS.Col sm="10">
              <BS.Form.Control
                onChange={(e) => setPrize(e.target.value)}
                type="text"
                placeholder="Prize"
                value={prize}
              />
            </BS.Col>
          </BS.Form.Group>
        )}
        <BS.Form.Group as={BS.Row} className="mb-3" controlId="formDate">
          <BS.Form.Label column sm="2">
            Select End Date & Time
          </BS.Form.Label>
          <BS.Col sm="10">
            <DateTime
              value={endDate}
              onChange={(changedDate) => {
                const date =
                  typeof changedDate === "string"
                    ? new Date(changedDate as string)
                    : (changedDate as moment.Moment).toDate();
                setEndDate(new Date(date));
              }}
            />
          </BS.Col>
        </BS.Form.Group>
        <BS.Form.Group as={BS.Row} className="mb-3" controlId="formDate">
          <BS.Form.Label column sm="2">
            Should be the winner automatically picked?
          </BS.Form.Label>
          <BS.Col sm="10">
            <BS.Form.Check
              onChange={(e) => setAutoPickWinner(e.currentTarget.checked)}
              type="switch"
              checked={autoPickWinner}
            />
          </BS.Col>
        </BS.Form.Group>
        <div>
          <BS.Button
            onClick={() => createGiveawayObjectAndSend()}
            variant="success"
            className="createGiveawayBtn"
          >
            Create Giveaway
          </BS.Button>
        </div>
      </BS.Form>
    </>
  );
}
