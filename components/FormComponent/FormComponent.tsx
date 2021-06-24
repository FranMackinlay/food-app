import React, { MouseEventHandler, useEffect, useState } from 'react'
import styles from '../../styles/FormComponent.module.css'
import {
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  Box,
  Button,
  Badge
} from "@chakra-ui/react"
import { Formik, Field, Form, FormikHelpers, FormikState } from 'formik';
import Value from '../../interfaces/ValueInterface';
import Emitter from '../../services/EventEmitterSrv';


export default function FormComponent() {

  const [recipesHistory, setRecipesHistory] = useState<Value[]>([]);



  const updateQueryHistory = (value: Value) => {
    const localHistory = localStorage.getItem('queryHistory');

    if (localHistory) {
      const searchHistory = JSON.parse(localHistory);

      const queryHistory = Array.isArray(searchHistory) ? searchHistory : [searchHistory];
      queryHistory.push(value);

      localStorage.setItem('queryHistory', JSON.stringify(queryHistory));
      setRecipesHistory(queryHistory.reverse());
    } else {
      localStorage.setItem('queryHistory', JSON.stringify([value]));
    }
  }

  const onFormikSubmit = async (value: Value, { setSubmitting, resetForm }: FormikHelpers<Value>) => {
    Emitter.emit('FORM-SUBMITTED', value);
    updateQueryHistory(value);
    setSubmitting(false);
    resetForm();
  }

  const onClickSelectOldQuery = (value: Value) => {
    Emitter.emit('FORM-SUBMITTED', value);
    updateQueryHistory(value);
  }

  const clearHistory = () => {
    localStorage.removeItem('queryHistory');
    setRecipesHistory([]);
  }

  useEffect(() => {
    const localHistory = localStorage.getItem('queryHistory');

    if (localHistory) {

      const parsedHistory = JSON.parse(localHistory);

      const queryHistory = Array.isArray(parsedHistory) ? parsedHistory : [parsedHistory];

      if (queryHistory.length) {
        setRecipesHistory(queryHistory.reverse());
      }
    }
  }, []);

  return (
    <div>
      <Box bg="whitesmoke" w={{ base: "80%", md: "50%" }} m={{ base: "50px auto" }} py={4} px={2} color="black" borderRadius=".5em">
        <Formik initialValues={{ query: '' }} onSubmit={onFormikSubmit}>
          <Form className={styles.formikForm}>
            <Field id="query" name="query" placeholder="Pasta">
              {(item: any) => (
                <FormControl isInvalid={item.form.errors.name && item.form.touched.name} d="flex" alignItems="center">
                  <Input {...item.field} id="query-input" placeholder="Pasta" m={15} />
                  <FormErrorMessage>{item.form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button type="submit" colorScheme="teal" variant="solid">
              Search
            </Button>
          </Form>
        </Formik>
        <Box ml={15} d="flex" alignItems="center" justifyContent={recipesHistory?.length ? 'space-between' : 'flex-end'}>
          <Box>
            {recipesHistory.slice(0, 10).map((oldQuery, index) => (
              <Badge mr={3} className={styles.badge} onClick={() => onClickSelectOldQuery(oldQuery)} key={index} colorScheme="green">{oldQuery.query}</Badge>
            ))}
          </Box>
          <Button onClick={clearHistory} colorScheme="teal" size="xs" variant="outline">
            Clear history
          </Button>
        </Box>
      </Box>
    </div>
  )
}
