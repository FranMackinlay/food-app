import axios from 'axios';
import QueryInterface from '../interfaces/QueryInterface';

const API_URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&illIngredients=true`;

const FoodSrv = {
  getRecipe: async (query: QueryInterface) => {
    const { data } = await axios({
      method: 'get',
      url: `${API_URL}&query=${query}`,
    });
    return data;
  },

}

export default FoodSrv;
