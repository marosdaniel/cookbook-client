import RecipeFormEditor from '../../components/Recipe/RecipeFormEditor';
import WrapperContainer from '../../components/stylingComponents/WrapperContainer';
import PageTitle from '../../components/stylingComponents/PageTitle';

const NewRecipePage = () => {
  return (
    <WrapperContainer id="new-recipe-page">
      <PageTitle title="Start Crafting" />
      <RecipeFormEditor />
    </WrapperContainer>
  );
};

export default NewRecipePage;
