import useModal from "../../hooks/useModal";
import { FC } from "react";
import { isFetchBaseQueryErrorType } from "../../services/files";
import { ApiError } from "../../types/ApiError";
import NotFoundError from "../NotFoundError/NotFoundError";
import CustomLoader from "../CustomLoader/CustomLoader";
import { isDashboard } from "../../utils/isDashboard";

interface Props {
  error: any;
  isLoading: boolean;
  refetch: () => void;
}

const FilesLoadingAndErrorHandler: FC<Props> = ({
  error,
  isLoading,
  refetch,
}) => {
  const showModal = useModal();
  const errorData =
    error && isFetchBaseQueryErrorType(error) ? (error.data as ApiError) : null;

  const dashboard = isDashboard();
  if (errorData || error) {
    const SERVER_ERROR_REGEX = /50[0-9]/;
    if (errorData?.status && errorData.status === 404) {
      return (
        <NotFoundError centered={!dashboard}>
          Nie znaleziono plików
        </NotFoundError>
      );
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

export default FilesLoadingAndErrorHandler;
