import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import CustomLoader from "../components/CustomLoader/CustomLoader";
import useModal from "../hooks/useModal";
import { isFetchBaseQueryErrorType } from "../services/files";
import {
  useDeleteUserMutation,
  useGetUserByLoginQuery,
  useUpdateUserMutation,
} from "../services/users";
import { ApiError } from "../types/ApiError";
import dayjs from "dayjs";
import {
  ChangePermissionsButton,
  CreatedInfo,
  DeleteButton,
  InfoWrapper,
  Name,
  UserDataWrapper,
  UserIcon,
} from "./UserPage.styles";
import { UserType } from "../enums/UserType";
import FileCard from "../components/FileCard/FileCard";
import { CardsWrapper } from "../components/FileCard/FileCard.styles";

const UserPage = () => {
  const { login } = useParams<{ login: string }>();
  const { data, error, isLoading, refetch } = useGetUserByLoginQuery(login);

  const user = data?.user;
  const filesData = data?.filesData;

  console.log(filesData);
  const showModal = useModal();
  const errorData =
    error && isFetchBaseQueryErrorType(error) ? (error.data as ApiError) : null;

  useEffect(() => {
    if (user) {
      document.title = `${user.login} | Aplikacja do plików`;
    }
  }, [user]);

  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const isModerator = user?.type === UserType.moderator;
  const isAdmin = user?.type === UserType.admin;

  //@TODO Pagination bar i filterbar przy plikach danego user'a
  //@TODO Not found error component

  const handleDeleteButton = async () => {
    if (user) {
      const isConfirmed = await showModal(
        "Czy napewno chcesz usunąć tego użytkownika ?",
        "question",
        true
      );
      if (isConfirmed) {
        deleteUser(user._id)
          .unwrap()
          .then(() => {
            showModal(
              "Usunięto użytkownika",
              "success",
              false,
              "/dashboard/users"
            );
          })
          .catch((err) => {
            const message = err?.data?.message
              ? err.data.message
              : "Błąd przy logowaniu";
            showModal(message, "error", false);
          });
      }
    }
  };

  const handlePermissionButton = async () => {
    if (user) {
      const isConfirmed = await showModal(
        `Czy napewno chcesz ${
          isModerator ? "degradować" : "promować"
        } tego użytkownika ?`,
        "question",
        true
      );
      if (isConfirmed) {
        updateUser({
          id: user._id,
          newRole: isModerator ? UserType.normal : UserType.moderator,
        })
          .unwrap()
          .then(() => {
            showModal(
              "Zmieniono uprawnienia użytkownika",
              "success",
              false,
              "/dashboard/users"
            );
          })
          .catch((err) => {
            const message = err?.data?.message
              ? err.data.message
              : "Błąd przy zmienianiu uprawnień";
            showModal(message, "error", false);
          });
      }
    }
  };

  if (errorData || error) {
    const SERVER_ERROR_REGEX = /50[0-9]/;
    if (errorData?.status && errorData.status === 404) {
      showModal("Nie znaleziono użytkownika", "error", false);
    } else if (
      errorData?.status &&
      SERVER_ERROR_REGEX.test(errorData.status.toString())
    ) {
      showModal("Wystąpił błąd po stronie serwera", "error", false);
    } else {
      (async () => {
        const isConfirmed = await showModal(
          "Dane nie zostały pobrane. Może być to wina twojego połączenia. Ponowić próbę?",
          "error",
          true
        );
        isConfirmed && refetch();
      })();
    }
  } else if (isLoading) {
    return <CustomLoader />;
  } else if (user && !isLoading) {
    return (
      <>
        <InfoWrapper>
          <UserIcon />
          <UserDataWrapper>
            <Name>{login}</Name>
            <CreatedInfo>
              Konto od {dayjs(user?.createdAt).format("DD/MM/YYYY")}
            </CreatedInfo>
          </UserDataWrapper>
          <DeleteButton onClick={handleDeleteButton}>Usuń konto</DeleteButton>
          {!isAdmin && (
            <ChangePermissionsButton onClick={handlePermissionButton}>
              {isModerator ? "Degraduj" : "Promuj na moderatora"}
            </ChangePermissionsButton>
          )}
        </InfoWrapper>
        {filesData?.files.length ? (
          <>
            <CardsWrapper>
              {filesData.files.map(
                ({ _id, authorName, createdAt, subject, title, type }) => (
                  <FileCard
                    key={_id}
                    id={_id}
                    authorName={authorName}
                    createdAt={createdAt}
                    subject={subject}
                    title={title}
                    type={type}
                  />
                )
              )}
            </CardsWrapper>
          </>
        ) : (
          <h1>Not found files</h1>
        )}
      </>
    );
  }
  return <h1>Wystąpił błąd</h1>;
};

export default UserPage;
