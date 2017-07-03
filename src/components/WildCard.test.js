import React from 'react';
import ReactDOM from 'react-dom';
import WildCard from './WildCard';
import {shallow} from 'enzyme';

describe('(Component) WildCard', () => {
  
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<WildCard/>, div);
  });

  it('renders without crashing with parameters', () => {
    const div = document.createElement('div');
    ReactDOM.render(<WildCard activeCard={{suit:"suitdiamonds", rank:"A"}}/>, div);
  });

  it("renders with 'card' class", () => {
    const wrapper = shallow(<WildCard activeCard={{suit:"suitdiamonds", rank:"A"}}/>);
    const divElement = wrapper.find('.card');
    expect(divElement.hasClass('suitdiamonds')).toBeTruthy();
  });

});