import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  try {

    const token = request.cookies.get("accessToken")?.value;
    console.log(token);
    if (!token) {
      // If access token is missing, return an error response
      return NextResponse.redirect( new URL("/admin-dashboard", request.nextUrl));
    }

    // Make a GET request to your server endpoint to get user role
    const response = await fetch(
       "https://backend.expertbusiness.com.np//api/users/get-user-from-token",
            // "http://localhost:5007/api/users/get-user-from-token",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Add the authorization header with the bearer token
          authorization: `Bearer ${token}`,
        },
      }
    );

    // Check if the response is successful
    if (response.ok) {
      // Parse the response JSON
      const data = await response.json();
      console.log(data);
      // Check if the user has the required role for authentication
      const userRole = data.data.role;
      console.log(userRole);
      if (userRole === "admin" || userRole === "super-admin") {
        // User is authorized, continue processing the request
        return NextResponse.next();
      } else {
        // User is not authorized, redirect or send an error response
        return NextResponse.redirect(
          new URL("/admin-dashboard", request.nextUrl)
        );
      }
    } else {
      // Handle non-successful responses
      console.error("Error:", response.statusText);
      return NextResponse.redirect( new URL("/admin-dashboard", request.nextUrl));
    }
  } catch (error) {
    // Handle errors, such as network issues or server errors
    console.error("Error:", error);
    return NextResponse.error();
  }
}

// Matcher only applies middleware to specified paths
export const config = {
  matcher: "/admin-dashboard/:path+",
};