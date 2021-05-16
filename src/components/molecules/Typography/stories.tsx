import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Box from '../Box/Box';
import Typography from './Typography';

storiesOf('Typography', module)
  .add('Background Color', () => (
    <Typography bgVariant="primary" width={'100%'} height={100} />
  ))
  .add('Bordered', () => {
    return (
      <Box>
        <Typography bg="blue" size={50} />
      </Box>
    );
  });
