import "./CommandModal.css";
import * as BS from "react-bootstrap";
import { Command, CommandTyp } from "../../util/types";

type CommandModalProps = {
  edit: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
  saveCommand: (newCommand: Command) => void;
};

export function CommandModal(props: CommandModalProps) {
  const handleClose = () => props.setShow(false);

  const handleNewCommand = () => {
    props.setShow(false);
    props.saveCommand({
      id: 0,
      cmd: "test",
      name: "test",
      typ: CommandTyp.RIOT,
      message: "Testo",
      action: "None.",
    });
  };

  return (
    <>
      <BS.Modal show={props.show} onHide={handleClose}>
        <BS.Modal.Header closeButton closeLabel="">
          <BS.Modal.Title>Modal heading</BS.Modal.Title>
        </BS.Modal.Header>
        <BS.Modal.Body>
          Woohoo, you're reading this text in a modal!
        </BS.Modal.Body>
        <BS.Modal.Footer>
          <BS.Button variant="secondary" onClick={handleClose}>
            Close
          </BS.Button>
          <BS.Button variant="primary" onClick={handleNewCommand}>
            Save Changes
          </BS.Button>
        </BS.Modal.Footer>
      </BS.Modal>
    </>
  );
}
