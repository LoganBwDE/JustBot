import "./AddGiveaway.css";
import * as BS from "react-bootstrap";
import { useState } from "react";
import { Giveaway, Key, RewardTyp } from "../../util/types";
import { useEffect } from "react";
import { loadGiveawayKeys } from "../../util/DBHandler";

export function AddGiveaway() {
  const [joinCmd, setJoinCmd] = useState("");
  const [rewardTyp, setRewardTyp] = useState<RewardTyp>(RewardTyp.KEY);
  const [selectedKey, setSelectedKey] = useState<Key>();
  const [prize, setPrize] = useState("");
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [keys, setKeys] = useState<Key[]>([]);

  useEffect(() => {
    loadKeys();
  }, []);

  const addKey = () => {};

  const loadKeys = async () => {
    setKeys(await loadGiveawayKeys());
  };

  const createGiveaway = () => {
    if (rewardTyp === RewardTyp.KEY) {
      const giveaway: Giveaway = {
        id: 0,
        cmd: joinCmd,
        keyID: selectedKey?.id,
        endDate: endDate,
      };
    } else {
      const giveaway: Giveaway = {
        id: 0,
        cmd: joinCmd,
        prize: prize,
        endDate: endDate,
      };
    }
  };

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
        {rewardTyp === RewardTyp.KEY ? (
          <BS.Form.Group as={BS.Row} className="mb-3" controlId="formKeySelect">
            <BS.Form.Label column sm="2">
              Select the Key
            </BS.Form.Label>
            <BS.Col sm="10">
              <BS.Form.Select
                onChange={(e) => {
                  setSelectedKey(
                    keys.find(({ id }) => {
                      return id === parseInt(e.currentTarget.value);
                    })
                  );
                }}
                aria-label="RewardType"
                value={selectedKey?.keyname}
              >
                {keys.map((k) => {
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
            <BS.Form.Control
              onChange={(e) => setEndDate(new Date(e.target.value))}
              type="date"
              name="Prize"
              value={endDate.toISOString()}
            />
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
