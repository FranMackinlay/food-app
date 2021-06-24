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
    <Box d="flex" justifyContent="flex-start" alignItems="center" flexWrap="wrap" px={5}>
      {recipes.results?.map((recipe: Recipe) => (
        <Box key={recipe.id} maxW="sm" m={4} textAlign="center" flex="1 1 auto" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Image w="100%" src={recipe.image} alt="recipe_image" />

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
