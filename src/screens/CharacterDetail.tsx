import React, { Suspense } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import CustomText from 'components/CustomText';
import { CommonStackParamList } from 'screens';
import CustomScreen from 'components/CustomScreen';
import { Box } from 'components/molecules/Box';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PADDING } from 'styles/spacing';
import { StatusBar, StyleSheet } from 'react-native';
import { myTheme } from 'theme';
import { Typography } from 'components/molecules/Typography';
import UserAvatar from 'react-native-user-avatar';
import { FONT_SIZE_16 } from 'styles/typography';

type ScreenRouteProp = RouteProp<CommonStackParamList, 'CharacterDetail'>;

const CustomWebView = () => {
  const { params } = useRoute<ScreenRouteProp>();
  const { name, ...restProperties } = params.character;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <Box flex={1} alignItems="center" paddingTop={PADDING}>
        <AvatarComponent name={name} />
        <Typography variant="bold" color={myTheme.colors.white} mt="16px">
          {name}
        </Typography>
        <Box my={'8px'}>
          <Typography
            variant="bold"
            color={myTheme.colors.white}
            fontSize={FONT_SIZE_16}>
            Gender - {restProperties.gender}
          </Typography>
          <Typography
            variant="bold"
            color={myTheme.colors.white}
            fontSize={FONT_SIZE_16}>
            Hair color - {restProperties.hair_color}
          </Typography>
          <Typography
            variant="bold"
            color={myTheme.colors.white}
            fontSize={FONT_SIZE_16}>
            Eye color - {restProperties.eye_color}
          </Typography>
          <Typography
            variant="bold"
            color={myTheme.colors.white}
            fontSize={FONT_SIZE_16}>
            Skin color - {restProperties.skin_color}
          </Typography>
        </Box>
      </Box>
    </SafeAreaView>
  );
};

export default CustomWebView;
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: myTheme.colors.black,
  },
});

const AvatarComponent = ({ name }: { name?: string }) => (
  <UserAvatar size={100} name={name} />
);
