import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';

describe('(Application) Start', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Home match={{params:{noOfPlayers:2}}}/>, div);
  });
});