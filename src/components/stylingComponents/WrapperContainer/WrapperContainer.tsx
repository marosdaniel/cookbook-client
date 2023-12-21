import { PropsWithChildren } from 'react';
import { Container } from '@mui/material';
import { IProps } from './types';
import { containerStyles } from './styles';

const WrapperContainer = ({ children, id, additionalStyles }: PropsWithChildren<IProps>) => {
  const styles = {
    ...containerStyles,
    ...additionalStyles,
  };
  return (
    <Container component="section" id={id} sx={styles}>
      {children}
    </Container>
  );
};

export default WrapperContainer;
