import { observer } from 'mobx-react-lite';
import React from 'react';

import './player-board-actions.css';

export const PlayerBoardActions = observer(({
  onRedraw,
  onRestart,
  canRedraw,
}: {
  canRedraw: boolean,
  onRestart?: () => void;
  onRedraw?: () => void;
}) => (
  <div
    className="player-board-actions"
  >
    {onRedraw
      ? (
        <input
          type="button"
          value="Redraw"
          onClick={onRedraw}
          disabled={!canRedraw}
        />
      )
      : null}
    {onRestart
      ? (
        <input
          type="button"
          value="Restart"
          onClick={onRestart}
        />
      )
      : null}
  </div>
));
