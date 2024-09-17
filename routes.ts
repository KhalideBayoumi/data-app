export const publicRoutes = [
    "/",
    "/auth/new-verification"
];

export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password"
];

export const adminRoutes = [
    "/admin"
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes 
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/dashboard";