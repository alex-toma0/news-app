import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => {
  return (
    <div className="py-10 flex flex-col place-items-center">
      <UserProfile path="/user-profile" />{" "}
    </div>
  );
};

export default UserProfilePage;
