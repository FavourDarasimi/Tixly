import Cookies from "js-cookie";
import axios from "axios";
const BASEURL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: "http://localhost:8000", // or your API URL
  withCredentials: true, // CRITICAL: This sends cookies with requests
});

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

export async function getFeaturedEvents() {
  try {
    const response = await fetch(`${BASEURL}/events/featured/`, {
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

export async function getTrendingEvents() {
  try {
    const response = await fetch(`${BASEURL}/events/trending/`, {
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

export async function getUpcomingEvents(cookieString?: string) {
  try {
    const response = await fetch(`${BASEURL}/events/upcoming/`, {
      method: "GET",
      credentials: "include", // ✅ Always include for authenticated requests
      headers: {
        ...(cookieString ? { Cookie: cookieString } : {}),
        "Content-Type": "application/json",
      },
      cache: "no-store",
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
export async function getNewEvents() {
  try {
    // Get events created in the last 7 days
    const response = await fetch(`${BASEURL}/events/new/`, {
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

export async function getEventDetails(id: string) {
  try {
    const response = await fetch(`${BASEURL}/event/${id}/`, {
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

export async function getAttendeeEvents(cookieString?: string) {
  try {
    const response = await fetch(`${BASEURL}/attendee/events/`, {
      method: "GET",
      credentials: "include", // ✅ Always include for authenticated requests
      headers: {
        ...(cookieString ? { Cookie: cookieString } : {}),
        "Content-Type": "application/json",
      },
      cache: "no-store",
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

export async function getUserEventTicket(id: number, cookieString?: string) {
  try {
    const response = await fetch(`${BASEURL}/event/${id}/ticket/`, {
      method: "GET",
      credentials: "include", // ✅ Always include for authenticated requests
      headers: {
        ...(cookieString ? { Cookie: cookieString } : {}),
        "Content-Type": "application/json",
      },
      cache: "no-store",
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
