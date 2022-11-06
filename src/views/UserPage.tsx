import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import useModal from "../hooks/useModal";
import {
  useDeleteUserMutation,
  useGetUserByLoginQuery,
  useChangeUsersPermissionsMutation,
} from "../services/users";
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
import LoadingAndErrorHandler from "../components/LoadingAndErrorHandler/LoadingAndErrorHandler";

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

  if (user && !isLoading) {
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
  return (
    <LoadingAndErrorHandler
      error={error}
      isLoading={isLoading}
      refetch={refetch}
      firstModalProps={{
        text: "Nie znaleziono użytkownika",
        redirectUrl: dashboard ? "/dashboard/users" : "/pdf",
      }}
    />
  );
};

export default UserPage;
