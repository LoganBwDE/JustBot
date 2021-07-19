import "./AddGiveaway.css";
import * as BS from "react-bootstrap";
import { useState } from "react";
import { RewardTyp } from "../../util/types";

export function AddGiveaway() {
  const [joinCmd, setJoinCmd] = useState("");
  const [rewardTyp, setRewardTyp] = useState<RewardTyp>(RewardTyp.KEY);

  const createGiveaway = () => {};

  return (
    <>
      <span className="addKey">Add Key</span>
      <hr />
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
        <div>
          <BS.Button
            onClick={() => createGiveaway()}
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
