import { useState } from "react";
import { useEffect } from "react";
import { AddGiveaway } from "../../../components/AddGiveaway/AddGiveaway";
import { AddKey } from "../../../components/AddKey/AddKey";
import { ManageGiveaway } from "../../../components/ManageGiveaway/ManageGiveaway";
import { loadGiveaway, loadGiveawayKeys } from "../../../util/DBHandler";
import { Giveaway, Key } from "../../../util/types";
import "./Giveaway.css";

export function GiveawayRoute() {
  const [giveaway, setGiveaway] = useState<Giveaway>();
  const [loading, setLoading] = useState(true);
  const [keys, setKeys] = useState<Key[]>([]);

  useEffect(() => {
    load();
    loadKeys();
  }, []);

  const load = async () => {
    setGiveaway(await loadGiveaway());
    setLoading(false);
  };

  const loadKeys = async () => {
    setKeys(await loadGiveawayKeys());
  };

  return (
    <>
      <div className="centered">
        <h1>Giveaway</h1>
        {!loading ? (
          giveaway ? (
            <>
              <ManageGiveaway giveaway={giveaway} />
              <hr />
              <AddKey loadKeys={loadKeys} />
            </>
          ) : (
            <>
              <AddGiveaway setGiveaway={setGiveaway} keys={keys} />
              <hr />
              <AddKey loadKeys={loadKeys} />
            </>
          )
        ) : (
          <>
            <span>Loading...</span>
          </>
        )}
      </div>
    </>
  );
}
