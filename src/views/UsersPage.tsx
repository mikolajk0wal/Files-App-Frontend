import { useEffect } from "react";
import { CardsWrapper } from "../components/FileCard/FileCard.styles";
import UserCard from "../components/UserCard/UserCard";
import { useGetUsersQuery } from "../services/users";
import LoadingAndErrorHandler from "../components/LoadingAndErrorHandler/LoadingAndErrorHandler";

const UsersPage = () => {
  const { data: users, error, isLoading, refetch } = useGetUsersQuery("asc");

  useEffect(() => {
    document.title = `Użytkownicy | Aplikacja do plików`;
    refetch();
  }, [refetch]);

  if (users && !isLoading) {
    return (
      <CardsWrapper>
        {users.map(({ type, login, _id }) => (
          <UserCard type={type} name={login} key={_id} />
        ))}
      </CardsWrapper>
    );
  }
  return (
    <LoadingAndErrorHandler
      error={error}
      isLoading={isLoading}
      refetch={refetch}
    />
  );
};

export default UsersPage;
