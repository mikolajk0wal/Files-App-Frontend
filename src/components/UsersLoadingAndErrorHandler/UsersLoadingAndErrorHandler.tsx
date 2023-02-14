import useModal, { ShowModalProps } from "../../hooks/useModal";
import CustomLoader from "../CustomLoader/CustomLoader";
import React from "react";
import { ApiError } from "../../types/ApiError";
import { isFetchBaseQueryErrorType } from "../../services/files";

interface Props {
  error: any;
  isLoading: boolean;
  refetch: () => void;
  firstModalProps?: Partial<ShowModalProps>;
}

const UsersLoadingAndErrorHandler: React.FC<Props> = ({
  error,
  isLoading,
  refetch,
  firstModalProps,
}) => {
  const showModal = useModal();
  const errorData =
    error && isFetchBaseQueryErrorType(error) ? (error.data as ApiError) : null;

  if (errorData || error) {
    const SERVER_ERROR_REGEX = /50[0-9]/;
    if (errorData?.status && errorData.status === 404) {
      showModal({
        text: "Nie znaleziono użytkowników",
        icon: "error",
        confirm: false,
        ...firstModalProps,
      });
    } else if (
      errorData?.status &&
      SERVER_ERROR_REGEX.test(errorData.status.toString())
    ) {
      showModal({
        text: "Wystąpił błąd po stronie serwera",
        icon: "error",
        confirm: false,
      });
    } else {
      (async () => {
        const isConfirmed = await showModal({
          text: "Dane nie zostały pobrane. Może być to wina twojego połączenia. Ponowić próbę?",
          icon: "error",
          confirm: true,
        });
        isConfirmed && refetch();
      })();
    }
  } else if (isLoading) {
    return <CustomLoader />;
  }
  return null;
};

export default UsersLoadingAndErrorHandler;
