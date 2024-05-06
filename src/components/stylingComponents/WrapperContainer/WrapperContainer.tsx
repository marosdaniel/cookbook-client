import { PropsWithChildren } from 'react';
import { Container } from '@mui/material';
import { IProps } from './types';
import { containerStyles } from './styles';

const WrapperContainer = ({ children, id, additionalStyles, maxWidth }: PropsWithChildren<IProps>) => {
  const styles = {
    ...containerStyles,
    ...additionalStyles,
  };
  return (
    <Container component="section" id={id} sx={styles} maxWidth={maxWidth ?? 'lg'}>
      {children}
    </Container>
  );
};

export default WrapperContainer;
