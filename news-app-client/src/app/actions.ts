"use server";
import { cookies } from "next/headers";
export async function signup(formData: FormData) {
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

export async function login(formData: FormData) {
  const cookieStore = cookies();
  const email = formData.get("email");
  const password = formData.get("password");
  if (!email || !password) {
    return null;
  }
  try {
    const res = await fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
      cache: "no-cache",
    });
    if (!res.ok) {
      throw new Error("Login failed");
    }

    const data = await res.json();
    if (res.headers.getSetCookie()) {
      let testCookie = cookieStore.get("access_token");
      console.log(testCookie);
    }

    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
