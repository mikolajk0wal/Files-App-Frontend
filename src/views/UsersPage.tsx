import React, { useEffect } from "react";
import CustomLoader from "../components/CustomLoader/CustomLoader";
import { CardsWrapper } from "../components/FileCard/FileCard.styles";
import UserCard from "../components/UserCard/UserCard";
import useModal from "../hooks/useModal";
import { isFetchBaseQueryErrorType } from "../services/files";
import { useGetUsersQuery } from "../services/users";
import { ApiError } from "../types/ApiError";

const UsersPage = () => {
  const showModal = useModal();
  const { data: users, error, isLoading, refetch } = useGetUsersQuery("asc");
  const errorData =
    error && isFetchBaseQueryErrorType(error) ? (error.data as ApiError) : null;

  useEffect(() => {
    document.title = `Użytkownicy | Aplikacja do plików`;
    refetch();
  }, [refetch]);

  if (errorData || error) {
    const SERVER_ERROR_REGEX = /50[0-9]/;
    if (errorData?.status && errorData.status === 404) {
      showModal({
        text: "Nie znaleziono użytkowników",
        icon: "error",
        confirm: false,
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
  } else if (users && !isLoading) {
    return (
      <CardsWrapper>
        {users.map(({ type, login, createdAt, _id }) => (
          <UserCard type={type} name={login} key={_id} />
        ))}
      </CardsWrapper>
    );
  }
  return <h1>Wystąpił błąd</h1>;
};

export default UsersPage;
