import { clerkClient, auth, EmailAddress } from "@clerk/nextjs/server";
import prisma from "@/app/utils/prisma";
import Link from "next/link";
import Statistics from "@/app/components/Statistics";
import { getArticleCategories, getArticleSources } from "@/app/actions";
const getUsers = async () => {
  const { userId } = auth();
  if (!userId) return null;
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
  // Utilizatorul nu are rolul de administrator
  if (user?.roleId !== 2) return null;
  const users = await clerkClient.users.getUserList();
  return users["data"];
};
export default async function Dashboard() {
  const users = await getUsers();
  const articleCategories = await getArticleCategories();
  const articleSources = await getArticleSources();
  if (!users)
    return (
      <div className="flex flex-col place-items-center mt-10">
        You do not have access to this page
      </div>
    );
  const userList = (
    <div className="max-w-lg table">
      <div className="table-row border-b-2">
        <div className="table-cell py-2 px-2 text-left">UserId</div>
        <div className="table-cell py-2 px-2 text-left">Email</div>
      </div>
      {users.map((user) => (
        <div className="table-row even:bg-gray-600" key={user.id}>
          <Link href={`/admin/dashboard/${user.id}`}>
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
    <>
      <div className="py-10 flex flex-col place-items-center gap-7">
        <h1 className="text-xl font-semibold">User list</h1>
        {userList}
        <h1 className="text-xl font-semibold">Statistics </h1>
      </div>
      <Statistics
        articleCategories={articleCategories}
        articleSources={articleSources}
      />
    </>
  );
}
