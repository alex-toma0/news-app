import login from "../actions/auth/login";
import { Input, Button } from "@nextui-org/react";
export default function LoginForm() {
  return (
    <form action={login}>
      <div className="flex flex-col items-center justify-center">
        <h1 className="my-2">Login </h1>

        <Input name="email" className="my-2" type="email" label="Email" />
        <Input
          name="password"
          className="my-2"
          type="password"
          label="Password"
        />
        <Button className="my-2" type="submit">
          Login
        </Button>
      </div>
    </form>
  );
}
