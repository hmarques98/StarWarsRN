import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Box from './Box';

storiesOf('Box', module)
  .add('Background Color', () => <Box bg="red" width={200} height={100} />)
  .add('Border', () => <Box bg="black" size={100} borderRadius={16} />);
