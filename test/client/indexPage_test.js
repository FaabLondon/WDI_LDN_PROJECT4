/* global describe, it */
import React from 'react';
import { expect } from 'Chai';
//shallow render to render fake components with fake DOM- see docs
import { shallow } from 'enzyme';

//to test IndexRoute omponents
import IndexRoute from '../../src/components/items/IndexRoute';

//visual test
describe('Filter, sorting tests and nav', () => {
  it('should render 5 forms for filtering, searching, sorting and 1 nav', done => {
    //render components in fake DOM
    const wrapper = shallow(<IndexRoute />); //mocked up / fake component
    expect(wrapper.find('form').length).to.equal(5);
    expect(wrapper.find('nav').length).to.equal(1);
    done();
  });

  //visual test
  it('should display Search by, Sort by and Filter by', done => {
    const wrapper = shallow(<IndexRoute />);
    expect(wrapper.childAt(0).childAt(0).childAt(0).childAt(0).text()).to.equal('Search by');
    expect(wrapper.childAt(0).childAt(0).childAt(1).childAt(0).text()).to.equal('Sort by');
    expect(wrapper.childAt(0).childAt(0).childAt(2).childAt(0).text()).to.equal('Filter by');
    done();
  });
});
