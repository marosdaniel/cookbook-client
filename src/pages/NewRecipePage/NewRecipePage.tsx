import RecipeFormEditor from '../../components/Recipe/RecipeFormEditor';
import WrapperContainer from '../../components/stylingComponents/WrapperContainer';

const NewRecipePage = () => {
  return (
    <WrapperContainer id="new-recipe-page">
      <RecipeFormEditor />
    </WrapperContainer>
  );
};

export default NewRecipePage;
