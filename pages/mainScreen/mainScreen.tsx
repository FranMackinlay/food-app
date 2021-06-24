import React, { useEffect, useState } from 'react';
import FormComponent from '../../components/FormComponent/FormComponent';
import RecipesComponent from '../../components/RecipesComponent/RecipesComponent';
import QueryInterface from '../../interfaces/QueryInterface';
import RecipeInterface from '../../interfaces/RecipeInterface';
import Emitter from '../../services/EventEmitterSrv';
import FoodSrv from '../../services/FoodSrv';
import { Box } from "@chakra-ui/react"


export default function MainScreen() {
  const [query, setQuery] = useState<string>('');
  const [recipes, setRecipes] = useState<RecipeInterface | {}>({});

  Emitter.on('FORM-SUBMITTED', ({ query }) => {
    setQuery(query);
  });

  useEffect(() => {
    const getRecipe = async (query: string) => {
      const res = await FoodSrv.getRecipe(query);
      setRecipes(res);
    }

    query && getRecipe(query);
  }, [query])

  return (
    <div>
      <Box mt={5} textAlign="center" fontWeight="semibold" as="h1" lineHeight="tight">
        Welcome to the <span style={{ color: '#319795' }}>Food App</span>
      </Box>
      <FormComponent></FormComponent>
      <RecipesComponent recipes={recipes}></RecipesComponent>
    </div>
  );
}
