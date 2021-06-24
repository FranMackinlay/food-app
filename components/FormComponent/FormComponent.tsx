import React from 'react'
import styles from '../../styles/FormComponent.module.css'
import {
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  Box,
  Button
} from "@chakra-ui/react"
import { Formik, Field, Form, FormikHelpers } from 'formik';
import Values from '../../interfaces/ValueInterface';
import Emitter from '../../services/EventEmitterSrv';


export default function FormComponent() {

  const onSubmit = async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
    Emitter.emit('FORM-SUBMITTED', values);
    setSubmitting(false);
  }

  return (
    <div>
      <Box bg="whitesmoke" w="45%" m={' 50px auto'} p={4} color="black" borderRadius=".5em">
        <Formik initialValues={{ query: '' }} onSubmit={onSubmit}>
          <Form className={styles.formikForm}>
            <Field id="query" name="query" placeholder="Pasta">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name} d="flex" alignItems="center">
                  <Input {...field} id="query-input" placeholder="Pasta" my={15} mx={15} />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button type="submit">Search</Button>
          </Form>
        </Formik>
      </Box>
    </div>
  )
}
