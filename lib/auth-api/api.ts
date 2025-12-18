const BASEURL = "http://localhost:8000/api";

export async function signup(formData: any) {
  try {
    const response = await fetch(`${BASEURL}/auth/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }
    return await response.json();
  } catch (error) {
    console.error("Signup Error:", error);
    throw error;
  }
}

export async function login(formData: any) {
  try {
    const response = await fetch(`${BASEURL}/auth/jwt/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }
    return await response.json();
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
}

export async function activateAccount(uid: string, token: string) {
  try {
    const response = await fetch(`${BASEURL}/auth/users/activation/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid, token }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }
    return true;
  } catch (error) {
    console.error("Activation Error:", error);
    throw error;
  }
}

export async function resendActivation(email: string) {
  try {
    const response = await fetch(`${BASEURL}/auth/users/resend_activation/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }
    return true;
  } catch (error) {
    console.error("Activation error Error:", error);
    throw error;
  }
}
