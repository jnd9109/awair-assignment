import { Button, FormControl, LinearProgress, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { FC } from 'react';
import * as yup from 'yup';

import { useAppDispatch } from '../../../hooks/storeHooks';
import { AddUserPayload, handleCreateUser } from '../../../reducers/user';

import { FormWrapper } from './styled';

const FormSchema = yup.object().shape({
  name: yup
    .string()
    .min(0, 'Please enter a name')
    .max(128, 'Name too long.')
    .required('Name is required.'),
  email: yup.string().email('Email not valid').required('Required'),
});

const UserCreateForm: FC<{}> = () => {
  const dispatch = useAppDispatch();
  return (
    <FormWrapper>
      <Typography variant="h6" component="div">
        Create
      </Typography>
      <Formik
        initialValues={{
          name: '',
          email: '',
        }}
        validationSchema={FormSchema}
        onSubmit={async ({ email, name }, { resetForm, setFieldError }) => {
          const response = await dispatch(handleCreateUser({ email, name }));
          const payload = response.payload as AddUserPayload;
          if (payload.user) {
            resetForm();
          } else if (payload.errorResponse?.status === 409) {
            setFieldError('email', 'Email already used.');
          }
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            {isSubmitting && <LinearProgress />}
            <FormControl fullWidth margin="normal">
              <Field
                component={TextField}
                name="email"
                variant="outlined"
                label="Email"
                placeholder="test@gmail.com"
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <Field
                component={TextField}
                name="name"
                variant="outlined"
                type="name"
                label="Name"
                placeholder="John Doe"
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <Button
                color="primary"
                variant="outlined"
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Submit
              </Button>
            </FormControl>
          </Form>
        )}
      </Formik>
    </FormWrapper>
  );
};

export default UserCreateForm;
