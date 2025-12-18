const BASEURL = "http://localhost:8000/api";

export async function getEvents() {
  try {
    const response = await fetch(`${BASEURL}/events/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}
