

const API_BASE = "http://127.0.0.1:8000/api";

export async function createUser(userData) {
  try {
    console.log("is it even getting bruh")
    const res = await fetch("/api/users/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { error: errorData.message || "Failed to create user" };
    }

    const data = await res.json();
    console.log("User created:", data);
    return data;

  } catch (err) {
    console.error("Error creating user:", err);
    return { error: "Network error or server unavailable" };
  }
}


export async function loginUser(credentials) {
  try {
    const res = await fetch("/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { error: errorData.message || "Failed to create user" };
    }

    const data = await res.json();
    console.log("User Logged in:", data);
    return data;

  } catch (err) {
    console.error("Error logging in user:", err);
    return { error: "Network error or server unavailable" };
  }
}
