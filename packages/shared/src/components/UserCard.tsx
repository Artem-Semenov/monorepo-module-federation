type Props = {};
export const UserCard = ({ username }: { username?: string }) => {
  return (
    <>
      <div style={{ border: "1px solid purple", padding: "10px" }}>
        <div>{username ?? "user"}</div>
        <div>password: 123</div>
      </div>
    </>
  );
};
