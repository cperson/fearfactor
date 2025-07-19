import React, { useState } from 'react';

export default function PlayerSearch({ players, onSelect }) {
  const [query, setQuery] = useState('');
    const filtered = players.filter(p =>
    typeof p?.PLAYER_NAME === 'string' &&
    p.PLAYER_NAME.toLowerCase().includes(query.toLowerCase())
    );



  return (
    <div style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Search players..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ padding: '8px', width: '100%', fontSize: '1rem' }}
      />

      {query.length > 1 && (
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {filtered.slice(0, 8).map(player => (
            <li
              key={player.PLAYER_ID}
              onClick={() => {
                setQuery('');
                onSelect(player);
              }}
              style={{
                padding: '8px',
                cursor: 'pointer',
                borderBottom: '1px solid #eee',
              }}
            >
              {player.PLAYER_NAME}
            </li>
          ))}
          {filtered.length === 0 && <li>No match found.</li>}
        </ul>
      )}
    </div>
  );
}