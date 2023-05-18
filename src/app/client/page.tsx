import { Client, User } from "@prisma/client";
import getCurrentUser from "../(server-side)/services/getCurrentUser";
import { getClientOfCurrenUser } from "../(server-side)/services/getClients";
import NavBar from "../NavBar";

export default async function ClientPage() {
  const user = await getCurrentUser();
  const client = await getClientOfCurrenUser();

  return (
    <>
      <NavBar />
      <div className="flex items-center justify-center w-full mt-52">
        <div className="text-5xl font-bold">Client page</div>
      </div>

      {user && client && someComp(user, client)}
    </>
  );
}

function someComp(user: User, client: Client) {
  return (
    <div className="flex items-center justify-center w-full mt-5">
    <div className="text-3xl font-bold">
      <p>{user.email}</p>
      <p>role: {user.role}</p>
      <p>client name: {client.name}</p>
    </div>
  </div>
);
}
