import { Box } from 'components/molecules/Box';
import { Typography } from 'components/molecules/Typography';
import { Button } from 'components/molecules/Button';
import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FONT_SIZE_16 } from 'styles/typography';
import { MARGIN, PADDING } from 'styles/spacing';
import { myTheme } from 'theme';
import useReactQuery from 'hooks/useReactQuery';

import { IPeople } from 'src/interfaces/IPeople';
import { FlatList } from 'react-native-gesture-handler';
import { WINDOW_DEVICE_WIDTH } from '@utils/constants';
import CardPeoples from 'components/organisms/CardPeoples';

interface HomeScreenProps {}
const tenMinutes = 1000 * 60 * 10;
const HomeScreen = ({}: HomeScreenProps) => {
  const { isLoading, data, error } = useReactQuery<{
    results: IPeople[];
  }>({
    path: 'people/',
    queryName: 'allPeoples',
    refetchInterval: tenMinutes,
  });
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <Box flex={1} alignItems="center" paddingTop={PADDING}>
        <Typography
          color={myTheme.colors.secondary}
          fontSize={FONT_SIZE_16}
          variant="bold">
          STAR WARS API
        </Typography>
        <Box mt={`${MARGIN * 2}px`} alignItems="center" flex={1}>
          {isLoading && (
            <Typography
              variant="bold"
              fontSize={FONT_SIZE_16}
              color={myTheme.colors.white}>
              We are finding information about
            </Typography>
          )}
          {error && <Typography>Something is wrong. Sorry</Typography>}
          <FlatList
            contentContainerStyle={{
              alignItems: 'center',
              width: WINDOW_DEVICE_WIDTH,
            }}
            keyExtractor={(item) => item.name}
            data={data?.results.sort((a, b) =>
              String(a.name) > String(b.name) ? 0 : -1,
            )}
            renderItem={({ item }: { item: IPeople }) => {
              return <CardPeoples name={item.name} />;
            }}
          />
        </Box>
      </Box>
    </SafeAreaView>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: myTheme.colors.black,
  },
});
