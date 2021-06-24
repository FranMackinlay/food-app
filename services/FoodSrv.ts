import axios from 'axios';

const API_URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.apiKey}&illIngredients=true`;
// const API_URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=c0d6985c8fa247ea9dca496cb71c5d9d&fillIngredients=true`;

const FoodSrv = {
  getRecipe: async (query: string) => {
    const { data } = await axios({
      method: 'get',
      url: `${API_URL}&query=${query}`,
    });
    return data;
  },

}

export default FoodSrv;
