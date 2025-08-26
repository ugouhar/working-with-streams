export const User = ({ user }) => {
  return (
    <div className="user">
      <div>Name: {user.name}</div>
      <div>Email: {user.email}</div>
    </div>
  );
};

export const UsersList = ({ users }) => {
  return users.map((user) => <User user={user} key={user.id} />);
};
