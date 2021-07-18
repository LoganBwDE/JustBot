import "./CommandModal.css";
import * as BS from "react-bootstrap";
import { Command, CommandAction, CommandTyp } from "../../util/types";
import { useState } from "react";
import { useEffect } from "react";

type CommandModalProps = {
  edit: boolean;
  editCmd?: Command;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
  saveCommand: (newCommand: Command) => void;
};

export function CommandModal(props: CommandModalProps) {
  const [cmd, setCmd] = useState("");
  const [name, setName] = useState("");
  const [typ, setTyp] = useState<CommandTyp>(CommandTyp.NONE);
  const [message, setMessage] = useState("");
  const [action, setAction] = useState<CommandAction>(CommandAction.MESSAGE);

  useEffect(() => {
    if (props.editCmd !== undefined) {
      setCmd(props.editCmd.cmd);
      setName(props.editCmd.name);
      setTyp(props.editCmd.typ);
      setMessage(props.editCmd.message);
      setAction(props.editCmd.action);
    }
  }, [props.editCmd]);

  const handleClose = () => props.setShow(false);

  const handleSaveCommand = () => {
    props.setShow(false);
    props.saveCommand({
      id: props.editCmd?.id !== undefined ? props.editCmd?.id : 0,
      cmd: cmd,
      name: name,
      typ: typ,
      message: message,
      action: action,
    });
  };

  return (
    <>
      <BS.Modal
        dialogClassName="modalWidth"
        show={props.show}
        onHide={handleClose}
      >
        <BS.Modal.Header closeButton closeLabel="">
          <BS.Modal.Title>
            Command {props.edit ? "bearbeiten" : "hinzufügen"}
          </BS.Modal.Title>
        </BS.Modal.Header>
        <BS.Modal.Body>
          <div className="divTextCenter">Bitte jede Spalte ausfüllen!</div>
          <BS.Form className="formMargin">
            {props.editCmd?.id && (
              <BS.Form.Group as={BS.Row} className="mb-3" controlId="formID">
                <BS.Form.Label column sm="2">
                  ID
                </BS.Form.Label>
                <BS.Col sm="10">
                  <BS.Form.Control
                    disabled
                    type="text"
                    placeholder="ID"
                    value={props.editCmd?.id}
                  />
                </BS.Col>
              </BS.Form.Group>
            )}
            <BS.Form.Group as={BS.Row} className="mb-3" controlId="formCommand">
              <BS.Form.Label column sm="2">
                Command
              </BS.Form.Label>
              <BS.Col sm="10">
                <BS.Form.Control
                  onChange={(e) => setCmd(e.target.value)}
                  type="text"
                  placeholder="Command"
                  value={cmd}
                />
              </BS.Col>
            </BS.Form.Group>
            <BS.Form.Group
              as={BS.Row}
              className="mb-3"
              controlId="formCommandName"
            >
              <BS.Form.Label column sm="2">
                Command Name
              </BS.Form.Label>
              <BS.Col sm="10">
                <BS.Form.Control
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="CommandName"
                  value={name}
                />
              </BS.Col>
            </BS.Form.Group>
            <BS.Form.Group
              as={BS.Row}
              className="mb-3"
              controlId="formCommandTyp"
            >
              <BS.Form.Label column sm="2">
                Command Typ
              </BS.Form.Label>
              <BS.Col sm="10">
                <BS.Form.Select
                  onChange={(e) => setTyp(e.currentTarget.value as CommandTyp)}
                  aria-label="CommandTyp"
                  value={typ}
                >
                  <option hidden selected disabled>
                    CommandTyp
                  </option>
                  {Object.keys(CommandTyp).map((k) => {
                    return (
                      <option value={k}>
                        {k.charAt(0).toUpperCase() + k.slice(1)}
                      </option>
                    );
                  })}
                </BS.Form.Select>
              </BS.Col>
            </BS.Form.Group>
            <BS.Form.Group
              as={BS.Row}
              className="mb-3"
              controlId="formCommandMessage"
            >
              <BS.Form.Label column sm="2">
                Command Nachricht
              </BS.Form.Label>
              <BS.Col sm="10">
                <BS.Form.Control
                  onChange={(e) => setMessage(e.target.value)}
                  type="text"
                  placeholder="CommandMessage"
                  value={message}
                />
              </BS.Col>
            </BS.Form.Group>
            <BS.Form.Group
              as={BS.Row}
              className="mb-3"
              controlId="formCommandAction"
            >
              <BS.Form.Label column sm="2">
                Command Aktion
              </BS.Form.Label>
              <BS.Col sm="10">
                <BS.Form.Select
                  onChange={(e) =>
                    setAction(e.currentTarget.value as CommandAction)
                  }
                  aria-label="CommandAction"
                  value={action}
                >
                  <option hidden selected disabled>
                    CommandAction
                  </option>
                  {Object.keys(CommandAction)
                    .filter((k) => {
                      if (typ !== CommandTyp.NONE)
                        return k.startsWith(typ as string);
                      else return k === CommandAction.MESSAGE;
                    })
                    .map((k) => {
                      return (
                        <option value={k}>
                          {k.charAt(0).toUpperCase() + k.slice(1)}
                        </option>
                      );
                    })}
                </BS.Form.Select>
              </BS.Col>
            </BS.Form.Group>
          </BS.Form>
        </BS.Modal.Body>
        <BS.Modal.Footer>
          <BS.Button variant="danger" onClick={handleClose}>
            Schließen
          </BS.Button>
          <BS.Button variant="success" onClick={handleSaveCommand}>
            Speichern
          </BS.Button>
        </BS.Modal.Footer>
      </BS.Modal>
    </>
  );
}
