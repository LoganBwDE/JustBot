import "./Commands.css";
import * as BS from "react-bootstrap";
import { Pencil, PlusCircle, Trash } from "react-bootstrap-icons";
import { useEffect } from "react";
import {
  addCommand,
  deleteCommand,
  initDB,
  loadCommands,
} from "../../../util/DBHandler";
import { useState } from "react";
import { Command } from "../../../util/types";
import DataTable, { RowRecord } from "react-data-table-component";
import { CommandModal } from "../../../components/CommandModal/CommandModal";

export function Commands() {
  const [commands, setCommands] = useState<Command[]>();
  const [show, setShow] = useState(false);
  let edit = false;

  const handleDelete = async (row: RowRecord) => {
    deleteCommand(row.id);
    await load();
  };

  const saveNewCommand = async (newCommand: Command) => {
    addCommand(newCommand);
    await load();
  };

  const load = async () => {
    await initDB();
    setCommands(await loadCommands());
  };

  const handleEdit = (row: RowRecord) => {
    console.log(row);
  };

  const ActionComponent = ({
    row,
    onClick,
    children,
    variant,
  }: {
    row: RowRecord;
    onClick: (row: RowRecord) => void;
    children: React.ReactNode;
    variant: string;
  }) => {
    const clickHandler = () => onClick(row);

    return (
      <BS.Button
        variant={variant}
        className="buttonMarginR"
        onClick={clickHandler}
      >
        {children}
      </BS.Button>
    );
  };

  const columns = [
    {
      cell: (row: RowRecord) => (
        <div className="flexDisplay">
          <ActionComponent
            row={row}
            onClick={handleDelete}
            variant="outline-danger"
          >
            <Trash />
          </ActionComponent>
          <ActionComponent
            row={row}
            onClick={handleEdit}
            variant="outline-info"
          >
            <Pencil />
          </ActionComponent>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "ID",
      selector: "id",
      sortable: true,
    },
    {
      name: "Command",
      selector: "cmd",
      sortable: true,
    },
    {
      name: "Typ",
      selector: "typ",
      sortable: true,
    },
    {
      name: "Nachricht",
      selector: "message",
      sortable: true,
    },
    {
      name: "Aktion",
      selector: "action",
      sortable: true,
    },
  ];

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <div className="centered">
        <div className="flexDisplay">
          <h1 className="flexAlign">Commands</h1>
          <PlusCircle
            className="addCommand"
            onClick={() => {
              setShow(true);
              edit = false;
            }}
          />
        </div>

        {commands && (
          <div>
            <DataTable columns={columns} data={commands} />
          </div>
        )}

        <CommandModal
          edit={edit}
          setShow={setShow}
          show={show}
          saveCommand={saveNewCommand}
        />
      </div>
    </>
  );
}