import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';

import LoginForm from './LoginForm';
import TestingProvider from '../../context/TestingProvider';

describe('LoginForm Component', () => {
  test('should display a blank login form', async () => {
    const { getByTestId } = render(
      <TestingProvider>
        <LoginForm />
      </TestingProvider>
    );
    const loginForm = getByTestId('login-form');
    const headingText = screen.getByText('Logowanie');
    const loginButton = screen.getByText('Zaloguj');
    const registerLink = screen.getByText('Rejestracja');

    expect(headingText).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(registerLink).toBeInTheDocument();
    expect(loginForm).toHaveFormValues({
      login: '',
      password: '',
    });
  });

  test('Should display error when sumbit empty form', async () => {
    const { getByText } = render(
      <TestingProvider>
        <LoginForm />
      </TestingProvider>
    );

    const loginButton = getByText('Zaloguj');
    userEvent.click(loginButton);

    await waitFor(() => {
      const loginRequiredError = screen.getByText('Login jest wymagany');
      const passwordRequiredError = screen.getByText('Hasło jest wymagane');
      expect(loginRequiredError).toBeInTheDocument();
      expect(passwordRequiredError).toBeInTheDocument();
    });
  });

  test('Should display error when touched empty input', async () => {
    const { getByPlaceholderText } = render(
      <TestingProvider>
        <LoginForm />
      </TestingProvider>
    );

    const loginInput = getByPlaceholderText('Login');
    const passwordInput = getByPlaceholderText('Hasło');
    userEvent.click(loginInput);
    userEvent.click(passwordInput);
    userEvent.click(loginInput);

    await waitFor(() => {
      const loginRequiredError = screen.getByText('Login jest wymagany');
      const passwordRequiredError = screen.getByText('Hasło jest wymagane');
      expect(loginRequiredError).toBeInTheDocument();
      expect(passwordRequiredError).toBeInTheDocument();
    });
  });

  test('Should display error when sumbit with login less than 2 and password less than 6', async () => {
    const { getByText, getByPlaceholderText } = render(
      <TestingProvider>
        <LoginForm />
      </TestingProvider>
    );

    const loginButton = getByText('Zaloguj');
    const loginInput = getByPlaceholderText('Login');
    const passwordInput = getByPlaceholderText('Hasło');
    userEvent.type(loginInput, 'e');
    userEvent.type(passwordInput, 'ess');
    userEvent.click(loginButton);

    await waitFor(() => {
      const loginRequiredError = screen.getByText(
        'Login musi posiadać min. 2 znaki!'
      );
      const passwordRequiredError = screen.getByText(
        'Hasło musi posiadać min. 6 znaków!'
      );
      expect(loginRequiredError).toBeInTheDocument();
      expect(passwordRequiredError).toBeInTheDocument();
    });
  });

  test('Should display error touched input with login less than 2 and password less than 6', async () => {
    const { getByPlaceholderText } = render(
      <TestingProvider>
        <LoginForm />
      </TestingProvider>
    );

    const loginInput = getByPlaceholderText('Login');
    const passwordInput = getByPlaceholderText('Hasło');
    userEvent.click(loginInput);
    userEvent.type(loginInput, 'e');
    userEvent.click(passwordInput);
    userEvent.type(passwordInput, 'ess');
    userEvent.click(loginInput);

    await waitFor(() => {
      const loginRequiredError = screen.getByText(
        'Login musi posiadać min. 2 znaki!'
      );
      const passwordRequiredError = screen.getByText(
        'Hasło musi posiadać min. 6 znaków!'
      );
      expect(loginRequiredError).toBeInTheDocument();
      expect(passwordRequiredError).toBeInTheDocument();
    });
  });

  test('Should not display error touched input with login more than 1 and password more than 5', async () => {
    const { getByPlaceholderText, queryByText } = render(
      <TestingProvider>
        <LoginForm />
      </TestingProvider>
    );

    const loginInput = getByPlaceholderText('Login');
    const passwordInput = getByPlaceholderText('Hasło');
    userEvent.click(loginInput);
    userEvent.type(loginInput, 'longer');
    userEvent.click(passwordInput);
    userEvent.type(passwordInput, 'longer');
    userEvent.click(loginInput);

    await waitFor(() => {
      const loginRequiredError = queryByText(
        'Login musi posiadać min. 2 znaki!'
      );
      const passwordRequiredError = queryByText(
        'Hasło musi posiadać min. 6 znaków!'
      );
      expect(loginRequiredError).toBeNull();
      expect(passwordRequiredError).toBeNull();
    });
  });
});
