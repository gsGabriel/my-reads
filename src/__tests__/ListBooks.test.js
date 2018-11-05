import React from 'react';
import ReactDOM from 'react-dom';
import ListBooks from './ListBooks';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ListBooks />, div);
  ReactDOM.unmountComponentAtNode(div);
});
