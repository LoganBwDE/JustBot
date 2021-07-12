import "./Commands.css";
import * as BS from "react-bootstrap";
import { PlusCircle } from "react-bootstrap-icons";
import { useCallback, useEffect } from "react";
import { initDB, loadCommands } from "../../../util/DBHandler";
import { useState } from "react";
import { Command, CommandTyp } from "../../../util/types";
import DataTable, { RowRecord } from "react-data-table-component";

export function Commands() {
  const [commands, setCommands] = useState<Command[]>();

  const handleDelete = (row: RowRecord) => {
    console.log(row);
  };

  const handleEdit = (row: RowRecord) => {
    console.log(row);
  };

  const ActionComponent = ({
    row,
    onClick,
    text,
  }: {
    row: RowRecord;
    onClick: (row: RowRecord) => void;
    text: string;
  }) => {
    const clickHandler = () => onClick(row);

    return <BS.Button onClick={clickHandler}>{text}</BS.Button>;
  };

  const columns = [
    {
      cell: (row: RowRecord) => (
        <div>
          <ActionComponent row={row} onClick={handleDelete} text="Löschen" />
          <ActionComponent row={row} onClick={handleEdit} text="Editieren" />
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
    const load = async () => {
      await initDB();
      setCommands(await loadCommands());
    };
    load();
  }, []);

  return (
    <>
      <div className="centered">
        <div className="flexDisplay">
          <h1 className="flexAlign">Commands</h1>
          <PlusCircle className="addCommand" />
        </div>

        {commands && (
          <div>
            <DataTable columns={columns} data={commands} />
          </div>
        )}
      </div>
    </>
  );
}
