import React from 'react';
import styled from 'styled-components/native';
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
} from 'styled-system';

interface Props extends LayoutProps, ColorProps, SpaceProps, BordersProps {
  children?: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Box = ({ children, ...props }: Props) => {
  return <Container {...props}>{children}</Container>;
};

const Container = styled.View`
  ${compose(color, layout, space, borders)}
  border-radius:${({ theme }) => theme.borderRadius}px;
`;

export default Box;
