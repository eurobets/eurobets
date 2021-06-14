import React from 'react';

interface Props<T> {
  children: (item: T) => React.ReactNode
  items: T[]
}

const List = <T extends { id: string | number }>({ children, items }: Props<T>) => (
  <div>
    {items.map((item) => (
      <div key={item.id} className="item">
        {children(item)}
      </div>
    ))}
  </div>
);

const NBAPlayers = () => {
  const players = [
    {
      id: '123',
      name: 'Mike',
      thumbUrl: 'Google.com',
      shortBio: 'College than NBA',
    },
  ];

  return (
    <List items={players}>
      {(player) => (
        <section>
          <img src={player.thumbUrl} alt={player.name} />
          <h1>{player.name}</h1>
          <p>{player.shortBio}</p>
        </section>
      )}
    </List>
  );
};

export default NBAPlayers;
