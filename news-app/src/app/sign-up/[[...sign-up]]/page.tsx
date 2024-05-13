import { SignUp } from "@clerk/nextjs";
export default function Page() {
  return (
    <div className="py-10 flex flex-col place-items-center">
      <SignUp></SignUp>
    </div>
  );
}
