import React from 'react';
import {render} from '@testing-library/react-native';

import {Header} from './Header';

jest.mock('react-native-vector-icons/Entypo', () => 'Icon');

describe('Home screen', () => {
  test('component rendered', () => {
    const {getByText} = render(<Header location="Rio de Janeiro" />);

    expect(getByText('Rio de Janeiro')).toBeTruthy();
  });
});
