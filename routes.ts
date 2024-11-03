import { FEATURES } from "./feature";

const addLocalePrefix = (route: string) => {
    if (!FEATURES.i18n) return route;
    return route === '/' ? '/:locale' : `/:locale${route}`;
};

export const publicRoutes = [
    addLocalePrefix("/"),
    addLocalePrefix("/auth/new-verification")
];

export const authRoutes = [
    addLocalePrefix("/auth/login"),
    addLocalePrefix("/auth/register"),
    addLocalePrefix("/auth/error"),
    addLocalePrefix("/auth/reset"),
    addLocalePrefix("/auth/new-password")
];

export const adminRoutes = [
    addLocalePrefix("/admin")
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes 
 * @type {string}
 */
export const apiAuthPrefix = addLocalePrefix("/api/auth");

export const DEFAULT_LOGIN_REDIRECT = addLocalePrefix("/dashboard");