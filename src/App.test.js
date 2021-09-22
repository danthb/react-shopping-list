import App from './App'
import React from 'react';
import {describe, expect, test} from '@jest/globals'
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import userEvent from '@testing-library/user-event'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {screen, render, debug} from '@testing-library/react'

import axios from './axios'

jest.disableAutomock();

Enzyme.configure({ adapter: new Adapter() });
jest.mock('axios')

describe('Just for fun', () => {
  test('renders learn react link', async () => {
    const getSpy = jest.spyOn(axios, 'get');
      const productsInstance = render(
        <App/>
      );
      const button = productsInstance.getByText('ReStock Products')
      userEvent.click(button)
      expect(getSpy).toBeCalled();
    
  });

  
    
})