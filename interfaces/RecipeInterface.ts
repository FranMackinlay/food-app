export default interface RecipeInterface {
  results: Recipe[];
  offset: number;
  number: number;
  totalResults: number;
}

interface MissedIngredient {
  id: number;
  amount: number;
  unit: string;
  unitLong: string;
  unitShort: string;
  aisle: string;
  name: string;
  original: string;
  originalString: string;
  originalName: string;
  metaInformation: string[];
  meta: string[];
  image: string;
  extendedName: string;
}

interface Nutrient {
  title: string;
  name: string;
  amount: number;
  unit: string;
}

interface Nutrition {
  nutrients: Nutrient[];
}

export interface Recipe {
  id: number;
  usedIngredientCount: number;
  missedIngredientCount: number;
  missedIngredients: MissedIngredient[];
  likes: number;
  usedIngredients: any[];
  unusedIngredients: any[];
  title: string;
  image: string;
  imageType: string;
  nutrition: Nutrition;
}
