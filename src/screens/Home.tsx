import { Box } from 'components/molecules/Box';
import { Typography } from 'components/molecules/Typography';
import { Button } from 'components/molecules/Button';
import React, { useEffect } from 'react';
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
import LottieView from 'lottie-react-native';
import { CommonStackParamList } from 'src/screens';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { log } from '@utils/console';
import useInfiniteReactQuery from 'hooks/useInfiniteQuery';
const tenMinutes = 1000 * 60 * 10;

type ProfileScreenNavigationProp = StackNavigationProp<
  CommonStackParamList,
  'Home'
>;

interface IResponse {
  data: IPeople[] | undefined;
  next: boolean;
  page: number;
}

const HomeScreen = () => {
  const [response, setResponse] = React.useState<IResponse>({
    data: [],
    next: true,
    page: 1,
  });

  const { status, data, error, isFetching, fetchNextPage } =
    useInfiniteReactQuery<{
      results: IPeople[];
      count: number;
      next: string;
      previous: string;
    }>({
      path: `people/`,
      queryName: 'allPeoples',
    });

  useEffect(() => {
    setResponse((preview) => {
      return { ...preview, data: data?.pages[0].results };
    });
  }, [data]);

  const handleMore = async () => {
    const res = await fetchNextPage();
    log(res);
  };

  const { navigate } = useNavigation<ProfileScreenNavigationProp>();

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
        <Box
          mt={`${MARGIN * 2}px`}
          alignItems="center"
          justifyContent={isFetching ? 'center' : 'flex-start'}
          flex={1}>
          <Button
            onPress={() => {
              fetchNextPage();
            }}>
            <Typography>Call</Typography>
          </Button>
          {isFetching && (
            <Box height={120} width="100%" alignItems="center">
              <LottieView
                source={require('../../assets/spinner.json')}
                autoPlay
                hardwareAccelerationAndroid
                loop
                style={{
                  height: 60,
                  width: 60,
                }}
              />
              <Typography
                variant="bold"
                fontSize={FONT_SIZE_16}
                color={myTheme.colors.white}>
                We are finding information about
              </Typography>
            </Box>
          )}
          {error && <Typography>Something is wrong. Sorry</Typography>}
          <FlatList
            contentContainerStyle={{
              alignItems: 'center',
              width: WINDOW_DEVICE_WIDTH,
              paddingHorizontal: 10,
            }}
            keyExtractor={(item) => item.name}
            data={response.data?.sort((a, b) =>
              String(a.name) > String(b.name) ? 0 : -1,
            )}
            renderItem={({ item }: { item: IPeople }) => {
              return (
                <CardPeoples
                  name={item.name}
                  homeworld={item.homeworld}
                  onPress={() => {
                    navigate('CharacterDetail', {
                      character: item,
                    });
                  }}
                />
              );
            }}
            onEndReached={handleMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() => {
              return (
                <Box>
                  <LottieView
                    source={require('../../assets/spinner.json')}
                    autoPlay
                    loop
                  />
                </Box>
              );
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
