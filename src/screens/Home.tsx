import { Box } from 'components/molecules/Box';
import { Typography } from 'components/molecules/Typography';
import { Button } from 'components/molecules/Button';
import React, { useCallback, useEffect, useRef } from 'react';
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

type ProfileScreenNavigationProp = StackNavigationProp<
  CommonStackParamList,
  'Home'
>;

const HomeScreen = () => {
  const [response, setResponse] = React.useState<IPeople[]>([]);

  const isMount = useRef<boolean>(false);

  const { status, data, error, isFetching, fetchNextPage, hasNextPage } =
    useInfiniteReactQuery<{
      results: IPeople[];
      count: number;
      next: string;
      previous: string;
    }>({
      path: `people/`,
      queryName: 'allPeoples',
    });

  const isLoading = status === 'loading';

  useEffect(() => {
    if (!isMount.current && data) {
      isMount.current = true;
      setResponse(data.pages[0].results);
    }
  }, [data]);

  const handleMore = useCallback(async () => {
    if (hasNextPage) {
      try {
        const responseNextPage = await fetchNextPage();

        const pages = responseNextPage.data?.pages.map((result) =>
          result.results.map((result) => result),
        );
        const lastResponse = pages && pages[pages?.length - 1];
        setResponse((preview) => {
          if (lastResponse) {
            return [...preview, ...lastResponse];
          }
          return [...preview];
        });
      } catch (error) {
        log(error);
      }
    }
  }, [fetchNextPage, hasNextPage]);

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
          justifyContent={isLoading ? 'center' : 'flex-start'}
          flex={1}>
          {isLoading && (
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
            data={response?.sort((a, b) =>
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
            onEndReached={() => {
              hasNextPage && handleMore();
            }}
            onEndReachedThreshold={0.1}
            ListFooterComponent={() => {
              return (
                <Button
                  flexDirection="row"
                  width={WINDOW_DEVICE_WIDTH * 0.8}
                  backgroundColor={
                    !hasNextPage
                      ? myTheme.colors.secondary
                      : myTheme.colors.primary
                  }
                  onPress={() => {
                    hasNextPage && handleMore();
                  }}>
                  {isFetching ? (
                    <LottieView
                      source={require('../../assets/spinner.json')}
                      autoPlay
                      hardwareAccelerationAndroid
                      loop
                      style={{
                        height: 30,
                        width: 30,
                      }}
                    />
                  ) : (
                    <Typography
                      color={
                        !hasNextPage
                          ? myTheme.colors.primary
                          : myTheme.colors.secondary
                      }>
                      All list is loaded
                    </Typography>
                  )}
                </Button>
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
