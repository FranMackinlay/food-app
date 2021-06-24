import React, { useEffect, useState } from 'react';
import RecipeInterface from '../../interfaces/RecipeInterface';
import { Recipe } from '../../interfaces/RecipeInterface';
import RecipesComponentProps from '../../interfaces/RecipesComponentProps';
import {
  Box,
  Image,
} from "@chakra-ui/react"


export default function RecipesComponent(props: RecipesComponentProps) {

  const [recipes, setRecipes] = useState<RecipeInterface[]>([]);

  useEffect(() => {
    setRecipes(props.recipes)
  }, [props])
  return (
    <Box d="flex" justifyContent="space-betweet" alignItems="center">
      {recipes.results?.map((recipe: Recipe) => (
        <Box key={recipe.id} flexBasis="25%" maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Image src={recipe.image} alt="recipe_image" />

          <Box p="6">
            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {recipe.title}
            </Box>

            <Box>
              {recipe.likes}
              <Box as="span" color="gray.600" fontSize="sm" ml={2}>
                likes
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  )
}
