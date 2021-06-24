import React, { useEffect, useState } from 'react';
import styles from '../../styles/RecipesComponent.module.css'
import RecipeInterface from '../../interfaces/RecipeInterface';
import { Recipe } from '../../interfaces/RecipeInterface';
import RecipesComponentProps from '../../interfaces/RecipesComponentProps';
import {
  Box,
  Image,
  Spinner,
} from "@chakra-ui/react"


export default function RecipesComponent(props: RecipesComponentProps) {

  const [recipes, setRecipes] = useState<RecipeInterface[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setRecipes(props.recipes)
      setLoading(false);
    }, 1000)
  }, [props])
  return (
    <Box d="flex" justifyContent="center">
      {
        loading ? (<Spinner textAlign="center" size="xl" />) :
          !recipes.results?.length ? (
            <Box>There are no recipes available yet.</Box>
          ) :
            (
              <Box d="flex" justifyContent={{ base: "center", md: "flex-start" }} alignItems="center" flexWrap="wrap" px={5}>
                {recipes.results?.map((recipe: Recipe) => (
                  <Box className={styles.foodCard} key={recipe.id} maxW="sm" m={{ base: "5px 0", md: "5px" }} flex={{ base: "1 1 auto", md: "" }} textAlign="center" borderWidth="1px" borderRadius="lg" overflow="hidden">
                    <Image borderRadius="lg" w="100%" src={recipe.image} alt="recipe_image" />
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
                ))
                }
              </Box >
            )
      }
    </Box>

  )
}
