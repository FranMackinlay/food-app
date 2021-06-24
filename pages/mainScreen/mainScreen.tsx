import React, { useEffect, useState } from 'react';
import FormComponent from '../../components/FormComponent/FormComponent';
import QueryInterface from '../../interfaces/QueryInterface';
import RecipeInterface from '../../interfaces/RecipeInterface';
import Emitter from '../../services/EventEmitterSrv';
import FoodSrv from '../../services/FoodSrv';


export default function MainScreen() {
  const [query, setQuery] = useState<string>('');
  const [recipe, setRecipe] = useState<RecipeInterface | {}>({});

  Emitter.on('FORM-SUBMITTED', ({ query }) => {
    console.log(`query recieved`, query);
    setQuery(query);
  });

  useEffect(() => {
    const getRecipe = async (query: string) => {
      const res = await FoodSrv.getRecipe(query);
      console.log(`res`, res);
      setRecipe(res);
      console.log(`recipe`, recipe);
    }

    query && getRecipe(query);
  }, [query])

  return (
    <div>
      <FormComponent></FormComponent>
    </div>
  );
}
