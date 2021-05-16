import HomeScreen from 'screens/Home';
import CustomWebView from 'screens/CharacterDetail';
import { StackNavigationOptions } from '@react-navigation/stack';

export type CommonStackParamList = {
  CharacterDetail: { url: string; title: string };
  Home: undefined;
};

const options: StackNavigationOptions = { gestureEnabled: true };

export const commonScreens = {
  Home: { component: HomeScreen, options },
  CharacterDetail: { component: CustomWebView },
};
