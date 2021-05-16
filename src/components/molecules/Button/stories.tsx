import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Box } from 'components/molecules/Box';
import Button from './Button';
import { Typography } from 'components/molecules/Typography';
import { myTheme } from 'theme';

storiesOf('Button', module)
  .add('Button Box', () => (
    <Button variant="box" justifyContent="center" alignItems="center">
      <Typography variant="bold" fontSize={16}>
        Button Box
      </Typography>
    </Button>
  ))
  .add('Button Outlined', () => {
    return (
      <Button variant="outlined">
        <Typography
          variant="regular"
          fontSize={16}
          color={myTheme.colors.primary}>
          Button outlined
        </Typography>
      </Button>
    );
  })
  .add('Button Rounded', () => {
    return (
      <Button variant="rounded">
        <Typography
          variant="regular"
          fontSize={16}
          color={myTheme.colors.primary}>
          Button rounded
        </Typography>
      </Button>
    );
  });
