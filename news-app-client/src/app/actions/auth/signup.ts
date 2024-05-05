import { redirect } from "next/navigation";
export default async function signup(formData: FormData) {
  "use server";
  const email = formData.get("email");
  const name = formData.get("name");
  const password = formData.get("password");
  if (!email || !name || !password) {
    return null;
  }
  try {
    const response = await fetch("http://localhost:8080/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name, password }),
    });
    if (!response.ok) {
      throw new Error("Registration failed!");
    }
    const user = await response.json();
    console.log(user);
  } catch (err) {
    console.log(err);
    return null;
  }
}
