import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import PlayerDetail from './components/PlayerDetail';
import PlayerSearch from './components/PlayerSearch';

export default function App() {
  const [data, setData] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [topPlayers, setTopPlayers] = useState([]);

  useEffect(() => {
    fetch('/data/nba_fear_factor.csv')
      .then(res => res.text())
      .then(text =>
        Papa.parse(text, {
          header: true,
          dynamicTyping: true,
          complete: results => {
            const players = results.data.filter(p => p.PLAYER_NAME);
            setData(players);

            const top = [...players]
              .sort((a, b) => b.Fear_Factor - a.Fear_Factor)
              .slice(0, 10);
            setTopPlayers(top);
          },
        })
      );
  }, []);

  const triggerRoulette = () => {
    const pool = data.filter(p => p.PLAYER_NAME);
    const randomPlayer = pool[Math.floor(Math.random() * pool.length)];
    setSelectedPlayer(randomPlayer);
  };

  const containerStyle = {
    padding: '2rem',
    fontFamily: `'Segoe UI', 'Roboto', sans-serif`,
    background: '#0a0a23',
    color: '#ffffff',
    minHeight: '100vh',
  };

  const buttonStyle = {
    marginBottom: '1rem',
    backgroundColor: '#ff4757',
    color: '#fff',
    padding: '0.6rem 1.2rem',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
  };

  const listContainer = {
    background: '#1e1e2f',
    borderRadius: '8px',
    padding: '1rem',
    marginTop: '1rem',
    boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
  };

  const listItem = {
    cursor: 'pointer',
    padding: '0.5rem',
    marginBottom: '0.5rem',
    backgroundColor: '#2f3542',
    borderRadius: '4px',
    transition: 'background 0.2s ease',
  };

  const badgeStyle = {
    background: '#ff6b81',
    borderRadius: '12px',
    padding: '2px 8px',
    marginLeft: '8px',
    fontWeight: 'bold',
    fontSize: '0.9rem',
  };

  return (
    <div style={containerStyle}>
      <div style={listContainer}>
          <h3 style={{ marginBottom: '1rem', display: 'inline' }}>👑 Top 10 Certified Menaces </h3>
          <small style={{ marginBottom: '1rem', display: 'inline' }} className="note">All statistics shown are per-game averages for the 2023–24 season</small>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {topPlayers.map(p => (
            <li
              key={p.PLAYER_ID}
              style={listItem}
              onMouseEnter={e =>
                (e.currentTarget.style.backgroundColor = '#57606f')
              }
              onMouseLeave={e =>
                (e.currentTarget.style.backgroundColor = '#2f3542')
              }
              onClick={() => setSelectedPlayer(p)}
            >
              {p.PLAYER_NAME}
              <span style={badgeStyle}>{p.Fear_Factor.toFixed(3)}</span>
            </li>
          ))}
        </ul>
      </div>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
        🧠 Fear Factor Search
      </h1>

      <PlayerSearch players={data} onSelect={setSelectedPlayer} />
      <button onClick={triggerRoulette} style={buttonStyle}>
        🎲 Fear Roulette
      </button>

      {selectedPlayer && <PlayerDetail player={selectedPlayer} />}
    </div>
  );
}