import React from 'react';

import VenturesList from '../../components/VenturesList/VenturesList';

const ventures = [
  {
    id: 'u1',
    title: 'Empire State Building',
    description: 'One of the famous sky scrapers in the world',
    image: 'https://images.alphacoders.com/302/302721.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      type: 'Point',
      coordinates: [-73.985322, 40.748764],
      formattedAddress: '20 W 34th St, New York, NY 10001-3023, US',
      street: '20 W 34th St',
      city: 'New York',
      state: 'NY',
      zipcode: '10001-3023',
      country: 'US',
    },
    creator: 'u1',
  },
  {
    id: 'u2',
    title: 'Leaning Tower Of Pisa',
    description:
      "We can't choose where we come from, but we can choose where we go",
    image: 'https://images6.alphacoders.com/409/409802.jpg',
    address: 'Piazza del Duomo, 56126 Pisa PI, Italy',
    location: {
      type: 'Point',
      coordinates: [10.39455, 43.72264],
      formattedAddress: 'Piazza del Duomo, Pisa, Toscana 56126, IT',
      street: 'Piazza del Duomo',
      city: 'Pisa',
      state: 'Toscana',
      zipcode: '56126',
      country: 'IT',
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
