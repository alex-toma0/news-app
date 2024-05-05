import signup from "../actions/auth/signup";
import { Input, Button } from "@nextui-org/react";
export default function RegisterForm() {
  return (
    <form action={signup}>
      <div className="flex flex-col items-center justify-center">
        <h1 className="my-2">Register </h1>

        <Input name="email" className="my-2" type="email" label="Email" />
        <Input name="name" className="my-2" type="text" label="Name" />
        <Input
          name="password"
          className="my-2"
          type="password"
          label="Password"
        />
        <Button className="my-2" type="submit">
          Sign up
        </Button>
      </div>
    </form>
  );
}
