export default async function (formData: FormData) {
  "use server";
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
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log(err);
    return null;
  }
}
