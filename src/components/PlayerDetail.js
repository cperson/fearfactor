import React from 'react';
import './PlayerDetail.css'; // Optional if you want custom CSS

export default function PlayerDetail({ player }) {
  const traits = [
    { key: 'Fear_Factor', label: '🌟 Fear Factor Score' }, // Now leads the list
    { key: 'PTS', label: 'Scoring (Per Game)' },
    { key: 'EFG_PCT', label: 'Efficiency' },
    { key: 'USG_PCT', label: 'Usage Rate' },
    { key: 'STL', label: 'Steals (Per Game)' },
    { key: 'BLK', label: 'Blocks (Per Game)' },
    { key: 'DREB', label: 'Def. Rebounds (Per Game)' },
  ];

  const fearScore = player.Fear_Factor?.toFixed(3);
  const badge =
    /*player.Fear_Factor > 0.85
      ? '🔥 Certified Menace'
      : player.Fear_Factor > 0.65
      ? '⚡ Problem Defender'
      : player.Fear_Factor < 0.3
      ? '😐 Low Fear Impact'
      : '🧊 Solid Contributor';
    */

    player.Fear_Factor > 8.5
    ? '🔥 Certified Menace'
    : player.Fear_Factor > 6.5
    ? '⚡ Problem Defender'
    : player.Fear_Factor < 3.0
    ? '😐 Low Fear Impact'
    : '🧊 Solid Contributor';
  return (
    <div className="player-detail">
      <h2>{player.PLAYER_NAME}</h2>

      <div className="fear-factor-badge">
        <span>Fear Factor:</span>
        <strong>{fearScore}</strong>
        <span className="badge-label">{badge}</span>
      </div>

      <ul className="stat-list">
        {traits.slice(1).map(({ key, label }) => {
          const value = player[key]?.toFixed(3);
          return (
            <li key={key}>
              <span className="stat-label">{label}</span>: {value}
            </li>
          );
        })}
      </ul>

      <small className="note">All statistics shown are per-game averages for the 2023–24 season</small>
    </div>
  );
}