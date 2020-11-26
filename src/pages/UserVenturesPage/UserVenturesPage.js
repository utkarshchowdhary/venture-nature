import React from 'react';

import VenturesList from '../../components/VenturesList/VenturesList';

const ventures = [
  {
    id: 'u1',
    title: 'Empire State Building',
    description: 'One of the famous sky scrapers in the world ',
    imageUrl: 'https://images.alphacoders.com/302/302721.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484,
      lng: -73.9857,
    },
    creator: 'u1',
  },
  {
    id: 'u2',
    title: 'Leaning Tower Of Pisa',
    description:
      "We can't choose where we come from, but we can choose where we go",
    imageUrl: 'https://images6.alphacoders.com/409/409802.jpg',
    address: 'Piazza del Duomo, 56126 Pisa PI, Italy',
    location: {
      lat: 43.723,
      lng: 10.3966,
    },
    creator: 'u2',
  },
];

const UserVenturesPage = ({ match }) => {
  const loadedVentures = ventures.filter(
    (venture) => venture.creator === match.params.userId
  );

  return <VenturesList ventures={loadedVentures} />;
};

export default UserVenturesPage;
