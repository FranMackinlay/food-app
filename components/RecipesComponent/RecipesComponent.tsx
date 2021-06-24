import React, { useEffect, useState } from 'react';
import styles from '../../styles/RecipesComponent.module.css'
import RecipeInterface from '../../interfaces/RecipeInterface';
import { Recipe } from '../../interfaces/RecipeInterface';
import RecipesComponentProps from '../../interfaces/RecipesComponentProps';
import { MdCheckCircle } from 'react-icons/md'
import {
  Box,
  Image,
  Spinner,
  List,
  ListItem,
  ListIcon,
  Button,
  Collapse
} from "@chakra-ui/react"


export default function RecipesComponent(props: any) {

  const [recipes, setRecipes] = useState<RecipeInterface>();
  const [loading, setLoading] = useState<Boolean>(false);

  const [show, setShow] = useState<number>(0);

  const handleToggle = (i: number) => setShow(i === show ? 0 : i);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setRecipes(props!.recipes)
      setLoading(false);
    }, 1000)
  }, [props])
  return (
    <Box d="flex" justifyContent="center" p={2}>
      {
        loading ? (<Spinner textAlign="center" size="xl" />) :
          !recipes?.results?.length ? (
            <Box>There are no recipes available yet.</Box>
          ) :
            (
              <Box d="flex" justifyContent={{ base: "center", md: "flex-start" }} alignItems="flex-start" flexWrap="wrap">
                {recipes?.results?.map((recipe: Recipe) => (
                  <Box className={styles.foodCard} key={recipe.id} m={{ base: "5px 0", md: "5px" }} maxW={{ base: "", md: "345px" }} flex={{ base: "1 1 auto", md: "" }} textAlign="center" borderWidth="1px" borderRadius="lg" overflow="hidden">
                    <Image m="10px auto" borderRadius="lg" src={recipe.image} alt="recipe_image" />
                    <Box p="6">
                      <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                        {recipe.title}
                      </Box>
                      <Box>
                        {recipe.likes}
                        <Box as="span" color="gray.600" fontSize="sm" ml={2}>
                          likes
                        </Box>
                      </Box>
                    </Box>
                    <Box textAlign="left" pl={2} pb={3}>
                      <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                        Ingredients
                      </Box>
                      <Collapse startingHeight={20} in={show === recipe.id}>
                        <List spacing={3}>
                          {recipe.missedIngredients?.map((ingredient, index) => (
                            <ListItem key={index} className={styles.ingredient}>
                              <ListIcon as={MdCheckCircle} color="green.500" />
                              {ingredient.name}
                            </ListItem>
                          ))}
                        </List>
                      </Collapse>
                      <Button size="sm" onClick={() => handleToggle(recipe.id)} mt="1rem">
                        Show {show ? "Less" : "More"}
                      </Button>
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
