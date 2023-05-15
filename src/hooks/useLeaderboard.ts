import { useConnection } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { getAllPlayers } from "@builderz/sporting-f1-sdk";
import { ParsedAccountData } from "@solana/web3.js";
import axios from "axios";
import { getAssets } from "../utils/nfts";

export const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { connection } = useConnection();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      setError(false);

      try {
        let leaderboard = await getAllPlayers(connection);

        leaderboard = await Promise.all(
          leaderboard.splice(0, 10).map(async (player) => {
            const nft = await getAssets(player.data.carMint.toBase58());

            return {
              ...player,
              owner: nft?.ownership.owner,
            };
          })
        );

        leaderboard = await Promise.all(
          leaderboard.map(async (player) => {
            try {
              const backpackUsername = await axios.get(
                // @ts-ignore
                `https://xnft-api-server.xnfts.dev/v1/users/fromPubkey?publicKey=${player.owner}&blockchain=solana`
              );
              return {
                ...player,
                username: backpackUsername.data.user.username,
              };
            } catch (error) {
              return player;
            }
          })
        );

        setLeaderboard(leaderboard);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(true);
        setLoading(false);
      }
    };

    console.log("fetching leaderboard");
    fetchLeaderboard();
  }, [connection]);

  return { leaderboard, loading, error };
};
