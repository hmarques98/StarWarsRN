import React, { Suspense } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import CustomText from 'components/CustomText';
import { CommonStackParamList } from 'screens';
import CustomScreen from 'components/CustomScreen';

type ScreenRouteProp = RouteProp<CommonStackParamList, 'CharacterDetail'>;

const CustomWebView = () => {
  const { params } = useRoute<ScreenRouteProp>();

  return (
    <CustomScreen>
      <Suspense fallback={<CustomText>Loading</CustomText>}></Suspense>
    </CustomScreen>
  );
};

export default CustomWebView;
