import { IProps } from './types';

const IngredientList = ({ ingredients }: IProps) => {
  return (
    <ul id="ingredients">
      {ingredients.map(ingredient => {
        const { name, quantity, unit } = ingredient;
        return (
          <div key={name}>
            <span>{name}</span>
            <span>{quantity}</span>
            <span>{unit}</span>
          </div>
        );
      })}
    </ul>
  );
};

export default IngredientList;
