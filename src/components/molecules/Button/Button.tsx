import { WINDOW_DEVICE_HEIGHT, WINDOW_DEVICE_WIDTH } from '@utils/constants';
import React from 'react';
import { Dimensions } from 'react-native';
import styled, { DefaultTheme } from 'styled-components/native';
import {
  LayoutProps,
  layout,
  compose,
  ColorProps,
  color,
  space,
  SpaceProps,
  BordersProps,
  borders,
  variant,
  FlexProps,
  flex,
  flexbox,
  FlexboxProps,
  position,
  PositionProps,
  ButtonStyleProps,
  buttonStyle,
  PaddingProps,
  padding,
} from 'styled-system';

type VariantTypes = 'outlined' | 'rounded' | 'box';

interface ButtonProps
  extends LayoutProps,
    ColorProps,
    SpaceProps,
    BordersProps,
    FlexProps,
    PositionProps,
    FlexboxProps,
    ButtonStyleProps,
    PaddingProps {
  children?: React.ReactNode;
  variant?: VariantTypes;
}

const variantStyle = (theme: DefaultTheme) => {
  return variant<ButtonProps, VariantTypes, 'variant'>({
    key: 'button',
    prop: 'variant',
    variants: {
      box: {
        width: '100%',
        height: '100%',
      },
      outlined: {
        width: '100%',
        borderColor: theme.colors.primary,
        borderWidth: theme.spacing.border,
        borderStyle: 'solid',
        backgroundColor: theme.colors.secondary,
      },
      rounded: {
        width: '100%',
        borderRadius: theme.spacing.borderRadius,
        backgroundColor: theme.colors.secondary,
      },
    },
  });
};

const Button = styled.TouchableOpacity<ButtonProps>`
  ${compose(
    color,
    layout,
    space,
    borders,
    flex,
    position,
    flexbox,
    buttonStyle,
    padding,
  )}
  background-color:${({ theme }) => theme.colors.primary}
  ${({ theme }) => variantStyle(theme)}
`;
Button.defaultProps = {
  justifyContent: 'center',
  alignItems: 'center',
  padding: 10,
};

export default Button;
