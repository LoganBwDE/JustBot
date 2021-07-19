import "./Commands.css";
import * as BS from "react-bootstrap";
import { Pencil, PlusCircle, Trash } from "react-bootstrap-icons";
import { useEffect } from "react";
import {
  addCommand,
  deleteCommand,
  loadCommands,
} from "../../../util/DBHandler";
import { useState } from "react";
import { Command } from "../../../util/types";
import DataTable, { RowRecord } from "react-data-table-component";
import { CommandModal } from "../../../components/CommandModal/CommandModal";

export function CommandRoute() {
  const [commands, setCommands] = useState<Command[]>();
  const [show, setShow] = useState(false);
  const [row, setRow] = useState<RowRecord>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!show) {
      setRow([]);
    }
  }, [show]);

  const handleDelete = async (row: RowRecord) => {
    deleteCommand(row.id);
    await load();
  };

  const saveNewCommand = async (newCommand: Command) => {
    addCommand(newCommand);
    await load();
  };

  const load = async () => {
    setCommands(await loadCommands());
    setLoading(false);
  };

  const handleEdit = (editRow: RowRecord) => {
    setRow(editRow);
    setShow(true);
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
      name: "Description",
      selector: "name",
      sortable: true,
    },
    {
      name: "Type",
      selector: "typ",
      sortable: true,
    },
    {
      name: "Message",
      selector: "message",
      sortable: true,
    },
    {
      name: "Action",
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
          <h1 className="flexAlign headingPL">Commands</h1>
          <PlusCircle
            className="addCommand"
            onClick={() => {
              setRow([]);
              setShow(true);
            }}
          />
        </div>

        {!loading ? (
          commands && (
            <div>
              <DataTable columns={columns} data={commands} />
            </div>
          )
        ) : (
          <>
            <span>Loading...</span>
          </>
        )}

        <CommandModal
          setShow={setShow}
          show={show}
          saveCommand={saveNewCommand}
          editCmd={row as Command}
        />
      </div>
    </>
  );
}
