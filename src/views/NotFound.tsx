import React, { useEffect } from 'react';
import {
  ErrorHeader,
  ErrorParagraph,
  GoBackLink,
  InfoWrapper,
} from './NotFound.styles';

const NotFound = () => {
  useEffect(() => {
    document.title = `Błąd 404 | Aplikacja do plików`;
  }, []);
  return (
    <InfoWrapper>
      <ErrorHeader>Błąd 404</ErrorHeader>
      <ErrorParagraph>Nie znaleziono strony z podanym adresem </ErrorParagraph>
      <GoBackLink to="pdf">Strona główna</GoBackLink>
    </InfoWrapper>
  );
};

export default NotFound;
