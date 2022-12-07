import { observer } from 'mobx-react-lite';
import React from 'react';
import { usePlayerStore } from '../../modules/player/use-player-store';

export const PlayerList = observer(() => {
  const playerStore = usePlayerStore();

  const players = playerStore.allPlayers;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >

      {
                players.map((player) => (
                  <div
                    key={player.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '50%',
                      padding: '0.4em 0 0.4em 0',
                    }}
                  >
                    <div>
                      {player.data?.name}
                    </div>
                    <div>
                      <button
                        onClick={() => playerStore.updateDocument({
                          session: undefined,
                        },
                        player.id)}
                        type="button"
                      >
                        kick

                      </button>
                    </div>
                  </div>
                ))
            }
    </div>
  );
});
