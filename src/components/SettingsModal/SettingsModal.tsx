import {
  Backdrop,
  CloseButton,
  Wrapper,
  CloseIcon,
  ChangingProperty,
  PropertyWrapper,
  StyledInput,
  Form,
  StyledButton,
} from "./SettingsModal.styles";
import React, { useContext, useState } from "react";
import { UIContext } from "../../context/UIContext";
import { useFormik } from "formik";
import useModal from "../../hooks/useModal";
import { useUpdateUserMutation } from "../../services/users";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useHistory } from "react-router";
import { logout } from "../../slices/authSlice";
import { FormErrorMessage } from "../FormErrorMessage/FormErrorMessage";
import * as Yup from "yup";

const ChangeLoginSchema = Yup.object().shape({
  login: Yup.string()
    .min(2, "Login musi posiadać min. 2 znaki!")
    .max(50, "Login może posiadać max. 50 znaków!")
    .required("Login jest wymagany"),
  password: Yup.string()
    .min(6, "Hasło musi posiadać min. 6 znaków!")
    .max(50, "Hasło może posiadać max. 50 znaków!")
    .required("Hasło jest wymagane"),
});

const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(6, "Hasło musi posiadać min. 6 znaków!")
    .max(50, "Hasło może posiadać max. 50 znaków!")
    .required("Hasło jest wymagane"),
  newPassword: Yup.string()
    .min(6, "Hasło musi posiadać min. 6 znaków!")
    .max(50, "Hasło może posiadać max. 50 znaków!")
    .required("Hasło jest wymagane"),
  retypedNewPassword: Yup.string().oneOf(
    [Yup.ref("newPassword", undefined)],
    "Hasła muszą się zgadzać"
  ),
});

const SettingsModal = () => {
  const { userId } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  const [isPasswordChanging, setIsPasswordChanging] = useState(true);
  const { settingsModalOpened, setSettingsModalOpened } = useContext(UIContext);

  const history = useHistory();

  const setPropertyToChange = (setPasswordToChange: boolean) => {
    setIsPasswordChanging(setPasswordToChange);
  };

  const handleCloseButtonClick = () => {
    setSettingsModalOpened(false);
  };

  const [updateUser] = useUpdateUserMutation();

  const showModal = useModal();
  const changePasswordFormik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      retypedNewPassword: "",
    },
    validationSchema: ChangePasswordSchema,
    onSubmit: async ({ oldPassword, newPassword, retypedNewPassword }) => {
      const confirmed = await showModal({
        text: "Czy napewno chcesz zmienić hasło?",
        icon: "question",
        confirm: true,
      });
      if (confirmed) {
        updateUser({
          id: userId as string,
          password: oldPassword,
          newPassword,
          retypedNewPassword,
        })
          .unwrap()
          .then(async () => {
            await showModal({
              text: "Zmieniono hasło, nastąpi wylogowanie",
              icon: "success",
              confirm: false,
            });
            dispatch(logout());
            history.push(`/login`);
          })
          .catch((err) => {
            const message = err?.data?.message
              ? err.data.message
              : "Błąd przy zmianie hasła";
            showModal({ text: message, icon: "error", confirm: false });
          })
          .finally(() => {
            setSettingsModalOpened(false);
          });
      }
    },
  });

  const changeLoginFormik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validationSchema: ChangeLoginSchema,
    onSubmit: async ({ login, password }) => {
      const confirmed = await showModal({
        text: "Czy napewno chcesz zmienić login?",
        icon: "question",
        confirm: true,
      });
      if (confirmed) {
        updateUser({
          id: userId as string,
          password,
          login,
        })
          .unwrap()
          .then(() => {
            showModal({
              text: "Zmieniono login, nastąpi wylogowanie",
              icon: "success",
              confirm: false,
            });
            dispatch(logout());
            history.push(`/login`);
          })
          .catch((err) => {
            const message = err?.data?.message
              ? err.data.message
              : "Błąd przy zmianie loginu";
            showModal({ text: message, icon: "error", confirm: false });
          })
          .finally(() => {
            setSettingsModalOpened(false);
          });
      }
    },
  });

  return (
    <>
      <Backdrop opened={settingsModalOpened}>
        <Wrapper>
          <PropertyWrapper>
            <ChangingProperty
              active={isPasswordChanging}
              onClick={() => setPropertyToChange(true)}
            >
              Zmiana hasla
            </ChangingProperty>
            <ChangingProperty
              active={!isPasswordChanging}
              onClick={() => setPropertyToChange(false)}
            >
              Zmiana login'u
            </ChangingProperty>
          </PropertyWrapper>

          <Form
            onSubmit={
              isPasswordChanging
                ? changePasswordFormik.handleSubmit
                : changeLoginFormik.handleSubmit
            }
          >
            {isPasswordChanging ? (
              <>
                <StyledInput
                  name="oldPassword"
                  id="oldPassword"
                  placeholder="Stare hasło"
                  type="password"
                  onChange={changePasswordFormik.handleChange}
                  value={changePasswordFormik.values.oldPassword}
                />
                <FormErrorMessage>
                  {changePasswordFormik.errors.oldPassword}
                </FormErrorMessage>

                <StyledInput
                  name="newPassword"
                  id="newPassword"
                  placeholder="Nowe hasło"
                  type="password"
                  onChange={changePasswordFormik.handleChange}
                  value={changePasswordFormik.values.newPassword}
                />
                <FormErrorMessage>
                  {changePasswordFormik.errors.newPassword}
                </FormErrorMessage>

                <StyledInput
                  name="retypedNewPassword"
                  id="retypedNewPassword"
                  placeholder="Powtórz Nowe hasło"
                  type="password"
                  onChange={changePasswordFormik.handleChange}
                  value={changePasswordFormik.values.retypedNewPassword}
                />
                <FormErrorMessage>
                  {changePasswordFormik.errors.retypedNewPassword}
                </FormErrorMessage>

                <StyledButton type="submit">Zmień Hasło</StyledButton>
              </>
            ) : (
              <>
                <StyledInput
                  name="login"
                  id="login"
                  placeholder="Nowy Login"
                  onChange={changeLoginFormik.handleChange}
                  value={changeLoginFormik.values.login}
                />
                <FormErrorMessage>
                  {changeLoginFormik.errors.login}
                </FormErrorMessage>

                <StyledInput
                  name="password"
                  id="password"
                  placeholder="Hasło"
                  type="password"
                  onChange={changeLoginFormik.handleChange}
                  value={changeLoginFormik.values.password}
                />
                <FormErrorMessage>
                  {changeLoginFormik.errors.password}
                </FormErrorMessage>

                <StyledButton type="submit">Zmień Login</StyledButton>
              </>
            )}
          </Form>

          <CloseButton clicked onClick={handleCloseButtonClick}>
            <CloseIcon alt="Close icon" />
          </CloseButton>
        </Wrapper>
      </Backdrop>
    </>
  );
};

export default SettingsModal;
