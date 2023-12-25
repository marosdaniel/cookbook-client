import UnderConstruction from '../../components/UnderConstruction/UnderConstruction';
import WrapperContainer from '../../components/stylingComponents/WrapperContainer';

const HomePage = () => {
  const tempStyles = {
    margin: '0 auto',
  };
  return (
    <WrapperContainer id="home-page" additionalStyles={tempStyles}>
      {/* TODO: recently added recipes */}
      <UnderConstruction />
    </WrapperContainer>
  );
};

export default HomePage;
