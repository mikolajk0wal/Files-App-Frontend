import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import {
  ClockIcon,
  HeaderInfo,
  LoaderWrapper,
  ParagraphInfo,
} from "./CustomLoader.styles";

const CustomLoader: React.FC = () => {
  const [badConnection, setBadConnection] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setBadConnection(true);
    }, 4000);
    return () => clearTimeout(timeout);
  });

  return (
    <LoaderWrapper>
      {badConnection && (
        <>
          <ClockIcon />
          <HeaderInfo>Pobieranie danych trwa dłużej niż zwykle</HeaderInfo>
          <ParagraphInfo>Sprawdź jakość twojego połączenia</ParagraphInfo>
        </>
      )}
      <Loader type="ThreeDots" color="#00BFFF" height={200} width={200} />
    </LoaderWrapper>
  );
};

export default CustomLoader;
