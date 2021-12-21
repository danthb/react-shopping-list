import React from 'react';
import Enzyme , { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Products from './products';
import axios from 'axios';
Enzyme.configure({ adapter: new Adapter() });
jest.mock('axios');
describe('Product component', () => {
  describe('when rendered', () => {
    it('should fetch a list of products', () => {
      const getSpy = jest.spyOn(axios, 'get');
      const productInstance = shallow(<Products/>);
      /* expect(getSpy).toBe('Bananas'); */
      productInstance.find('Pitajayas');
      productInstance.find('#Bananas');
    });
  });
});