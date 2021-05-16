import React from 'react';
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
} from 'styled-system';

type VariantTypes = 'primary' | 'secondary';

interface TypographyProps
  extends LayoutProps,
    ColorProps,
    SpaceProps,
    BordersProps,
    FlexProps,
    PositionProps,
    FlexboxProps {
  children?: React.ReactNode;
  bgVariant?: VariantTypes;
}

const variantStyle = (theme: DefaultTheme) => {
  return variant<TypographyProps, VariantTypes, 'bgVariant'>({
    key: 'typography',
    prop: 'bgVariant',
    variants: {
      primary: {
        backgroundColor: theme.colors.primary,
      },
      secondary: {
        backgroundColor: theme.colors.secondary,
      },
    },
  });
};

const Typography = styled.View<TypographyProps>`
  ${compose(color, layout, space, borders, flex, position, flexbox)}
  ${({ theme }) => variantStyle(theme)}
`;

export default Typography;