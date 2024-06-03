import { clerkClient, auth, EmailAddress } from "@clerk/nextjs/server";
import prisma from "@/app/utils/prisma";
import Link from "next/link";
const getUsers = async () => {
  const { userId } = auth();
  if (!userId) return null;
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
  // User doesn't have the admin role
  if (user?.roleId !== 2) return null;
  const users = await clerkClient.users.getUserList();
  return users["data"];
};
export default async function UserList() {
  const users = await getUsers();
  if (!users) return <>You do not have access to this page</>;
  const userList = (
    <div className="max-w-lg table">
      <div className="table-row border-b-2">
        <div className="table-cell py-2 px-2 text-left">UserId</div>
        <div className="table-cell py-2 px-2 text-left">Email</div>
      </div>
      {users.map((user) => (
        <div className="table-row even:bg-gray-600" key={user.id}>
          <Link href={`/admin/userList/${user.id}`}>
            <div className="table-cell py-1 px-2">{user.id}</div>
          </Link>
          <div className="table-cell">
            {user.primaryEmailAddress?.emailAddress}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="py-10 pl-12 flex flex-col place-items-center gap-7">
      <h1 className="text-3xl font-bold">User list</h1>
      {userList}
    </div>
  );
}
