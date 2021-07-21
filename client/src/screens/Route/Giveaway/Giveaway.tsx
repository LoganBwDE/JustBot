import { useState } from "react";
import { useEffect } from "react";
import { AddGiveaway } from "../../../components/AddGiveaway/AddGiveaway";
import { AddKey } from "../../../components/AddKey/AddKey";
import { ManageGiveaway } from "../../../components/ManageGiveaway/ManageGiveaway";
import { loadGiveaway } from "../../../util/DBHandler";
import { Giveaway } from "../../../util/types";
import "./Giveaway.css";

export function GiveawayRoute() {
  const [giveaway, setGiveaway] = useState<Giveaway>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setGiveaway(await loadGiveaway());
    setLoading(false);
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
              <AddKey />
            </>
          ) : (
            <>
              <AddGiveaway />
              <hr />
              <AddKey />
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
