import { log } from '@utils/console';
import { WINDOW_DEVICE_WIDTH } from '@utils/constants';
import { Box } from 'components/molecules/Box';
import { Button } from 'components/molecules/Button';
import { Typography } from 'components/molecules/Typography';
import React from 'react';
import { IPeople } from 'src/interfaces/IPeople';
import { myTheme } from 'theme';

const CardPeoples = ({ name, homeworld }: IPeople) => {
  log(homeworld);
  return (
    <Box>
      <Button
        width={WINDOW_DEVICE_WIDTH * 0.6}
        m={2}
        key={name}
        variant="rounded"
        bg={myTheme.colors.primary}>
        <Typography color={myTheme.colors.white}>{name}</Typography>
        {/* <Typography>{homeworld}</Typography> */}
      </Button>
    </Box>
  );
};
export default CardPeoples;
