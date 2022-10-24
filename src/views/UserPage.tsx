import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import CustomLoader from "../components/CustomLoader/CustomLoader";
import useModal from "../hooks/useModal";
import { isFetchBaseQueryErrorType } from "../services/files";
import {
  useDeleteUserMutation,
  useGetUserByLoginQuery,
  useChangeUsersPermissionsMutation,
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
  SettingsIcon,
  SettingsButton,
} from "./UserPage.styles";
import { UserType } from "../enums/UserType";
import FilesDisplay from "../components/FilesDisplay/FilesDisplay";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { isDashboard } from "../utils/isDashboard";
import { UIContext } from "../context/UIContext";

const UserPage = () => {
  const { setSettingsModalOpened, settingsModalOpened } = useContext(UIContext);

  const dashboard = isDashboard();
  const { login } = useParams<{ login: string }>();
  const {
    data: user,
    error,
    isLoading,
    refetch,
  } = useGetUserByLoginQuery(login);

  const { type } = useSelector((state: RootState) => state.auth);

  const showModal = useModal();
  const errorData =
    error && isFetchBaseQueryErrorType(error) ? (error.data as ApiError) : null;

  useEffect(() => {
    if (user) {
      document.title = `${user.login} | Aplikacja do plików`;
    }
  }, [user]);

  const [deleteUser] = useDeleteUserMutation();
  const [changeUsersPermissions] = useChangeUsersPermissionsMutation();

  const isModerator = user?.type === UserType.moderator;
  const isAdmin = user?.type === UserType.admin;

  const handleSettingsButtonClick = () => {
    setSettingsModalOpened(true);
  };

  const handleDeleteButton = async () => {
    if (user) {
      const isConfirmed = await showModal({
        text: "Czy napewno chcesz usunąć tego użytkownika ?",
        icon: "question",
        confirm: true,
      });
      if (isConfirmed) {
        deleteUser(user._id)
          .unwrap()
          .then(() => {
            showModal({
              text: "Usunięto użytkownika",
              icon: "success",
              confirm: false,
              redirectUrl: "/dashboard/users",
            });
          })
          .catch((err) => {
            const message = err?.data?.message
              ? err.data.message
              : "Błąd przy logowaniu";
            showModal({ text: message, icon: "error", confirm: false });
          });
      }
    }
  };

  const handlePermissionButton = async () => {
    if (user) {
      const isConfirmed = await showModal({
        text: `Czy napewno chcesz ${
          isModerator ? "degradować" : "promować"
        } tego użytkownika ?`,
        icon: "question",
        confirm: true,
      });
      if (isConfirmed) {
        changeUsersPermissions({
          id: user._id,
          newRole: isModerator ? UserType.normal : UserType.moderator,
        })
          .unwrap()
          .then(() => {
            showModal({
              text: "Zmieniono uprawnienia użytkownika",
              icon: "success",
              confirm: false,
              redirectUrl: "/dashboard/users",
            });
          })
          .catch((err) => {
            const message = err?.data?.message
              ? err.data.message
              : "Błąd przy zmienianiu uprawnień";
            showModal({ text: message, icon: "error", confirm: false });
          });
      }
    }
  };

  if (errorData || error) {
    const SERVER_ERROR_REGEX = /50[0-9]/;
    if (errorData?.status && errorData.status === 404) {
      showModal({
        text: "Nie znaleziono użytkownika",
        icon: "error",
        confirm: false,
        redirectUrl: dashboard ? "/dashboard/users" : "/pdf",
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
  } else if (user && !isLoading) {
    return (
      <>
        <InfoWrapper>
          <SettingsButton onClick={handleSettingsButtonClick}>
            <SettingsIcon alt="Settings Icon" $clicked={settingsModalOpened} />
          </SettingsButton>
          <UserIcon alt="User Icon" />
          <UserDataWrapper>
            <Name>{login}</Name>
            <CreatedInfo>
              Konto od {dayjs(user?.createdAt).format("DD/MM/YYYY")}
            </CreatedInfo>
          </UserDataWrapper>
          {(dashboard || type === UserType.admin) && (
            <DeleteButton onClick={handleDeleteButton}>Usuń konto</DeleteButton>
          )}
          {(dashboard || type === UserType.admin) && !isAdmin && (
            <ChangePermissionsButton onClick={handlePermissionButton}>
              {isModerator ? "Degraduj" : "Promuj na moderatora"}
            </ChangePermissionsButton>
          )}
        </InfoWrapper>
        <FilesDisplay type="pdf" login={login} />
      </>
    );
  }
  return null;
};

export default UserPage;
