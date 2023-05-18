import { getServerSession } from "next-auth";
import { authOptions } from "../auth";


export default async function getSession() {
  return await getServerSession(authOptions);
}