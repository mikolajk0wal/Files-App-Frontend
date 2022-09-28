import React from "react";
import {
  SubmitButton,
  FormWrapper,
  FormTitle,
  StyledInput,
  StyledNavLink,
  CentringWrapper,
} from "./AuthForms.styles";

import * as Yup from "yup";

import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik";
import { FormErrorMessage } from "../FormErrorMessage/FormErrorMessage";

import useModal from "../../hooks/useModal";
import { useSignUpMutation } from "../../services/auth";

interface Values {
  login: string;
  password: string;
  retypedPassword: string;
}

const RegisterSchema = Yup.object().shape({
  login: Yup.string()
    .min(2, "Login musi posiadać min. 2 znaki!")
    .max(50, "Login może posiadać max. 50 znaków!")
    .required("Login jest wymagany"),
  password: Yup.string()
    .min(6, "Hasło musi posiadać min. 6 znaków!")
    .max(50, "Hasło może posiadać max. 50 znaków!")
    .required("Hasło jest wymagane"),
  retypedPassword: Yup.string().oneOf(
    [Yup.ref("password", undefined)],
    "Hasła muszą się zgadzać"
  ),
});

const RegisterForm = () => {
  const showModal = useModal();
  const [signUp] = useSignUpMutation();

  return (
    <CentringWrapper>
      <Formik
        initialValues={{
          login: "",
          password: "",
          retypedPassword: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={async (
          { login, password, retypedPassword }: Values,
          { resetForm }: FormikHelpers<Values>
        ) => {
          signUp({ login, password, retypedPassword })
            .unwrap()
            .then(() => {
              showModal(
                "Zarejestrowano Pomyślnie! Od teraz możesz się zalogować",
                "success",
                false,
                "/login"
              );
            })
            .catch((err: any) => {
              const message = err?.data?.message
                ? err.data.message
                : "Błąd przy rejestracji";
              showModal(message, "error", false);
            });
        }}
      >
        <Form autoComplete="off">
          <FormWrapper>
            <FormTitle>Rejestracja</FormTitle>
            <Field
              id="login"
              name="login"
              placeholder="Login"
              as={StyledInput}
            />
            <ErrorMessage name="login" component={FormErrorMessage} />

            <Field
              id="password"
              name="password"
              placeholder="Hasło"
              type="password"
              as={StyledInput}
            />
            <ErrorMessage name="password" component={FormErrorMessage} />

            <Field
              id="retypedPassword"
              name="retypedPassword"
              placeholder="Powtórz hasło"
              type="password"
              as={StyledInput}
            />
            <ErrorMessage name="retypedPassword" component={FormErrorMessage} />

            <SubmitButton type="submit" aria-label="Sign Up">
              Zarejestruj
            </SubmitButton>
            <StyledNavLink to="/login">Logowanie</StyledNavLink>
          </FormWrapper>
        </Form>
      </Formik>
    </CentringWrapper>
  );
};

export default RegisterForm;
