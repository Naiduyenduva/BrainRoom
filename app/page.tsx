import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authoptions";

export default async function Home() {
  const session = await getServerSession(authOptions)
  console.log(session)
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Brain Room</h1>
    </div>
  );
}
