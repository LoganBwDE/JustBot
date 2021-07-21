import "./AddKey.css";
import * as BS from "react-bootstrap";
import { useState } from "react";
import { Key } from "../../util/types";
import { addGiveawayKey } from "../../util/DBHandler";

import Noty from "noty";

import "noty/lib/noty.css";
import "noty/lib/themes/bootstrap-v4.css";

export function AddKey() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const addKey = async () => {
    const key: Key = { id: 0, keyname: name, keycode: code };

    const response = await addGiveawayKey(key);

    setName("");
    setCode("");

    new Noty({
      theme: "bootstrap-v4",
      type: response.status === 200 ? "success" : "error",
      text:
        response.status === 200
          ? "Key added successfully!"
          : "Key could not be added!",
      timeout: 5000,
    }).show();
  };

  return (
    <>
      <span className="addKey">Add Key</span>
      <BS.Form className="formAdjust">
        <BS.Form.Group as={BS.Row} className="mb-3" controlId="formKeyName">
          <BS.Form.Label column sm="2">
            Key Name
          </BS.Form.Label>
          <BS.Col sm="10">
            <BS.Form.Control
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Key Name"
              value={name}
            />
          </BS.Col>
        </BS.Form.Group>
        <BS.Form.Group as={BS.Row} className="mb-3" controlId="formKeyCode">
          <BS.Form.Label column sm="2">
            Key Code
          </BS.Form.Label>
          <BS.Col sm="10">
            <BS.Form.Control
              onChange={(e) => setCode(e.target.value)}
              type="text"
              placeholder="Key Code"
              value={code}
            />
          </BS.Col>
        </BS.Form.Group>
        <div>
          <BS.Button
            onClick={() => addKey()}
            variant="success"
            className="addKeyBtn"
          >
            Add Key
          </BS.Button>
        </div>
      </BS.Form>
    </>
  );
}
