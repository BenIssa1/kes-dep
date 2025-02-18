/** 
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
*/
export const publicRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/new-verification",
  "/auth/new-password"
];

/** 
 * An array of routes that are used for authentification
 * These routes will redirect logged i  users to / settings
 * @type  {string[]}
*/
export const authRoutes = [
  "/",
  "/auth/login",
  "/auth/error",
  "/auth/reset"
];

/** 
 * ATHe prefix for API authentication routes
 * ROutes that start with this prefix are used for API authentication purposes
 * @type{string}
*/
export const apiAuthPrefix = "api/auth";

/** 
 * The default redirect path after logging in
 * @type {string}
*/
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";