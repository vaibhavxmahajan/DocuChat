const RoutePaths = {
  HOME: "/",
  LOGIN: "/auth/login",
  SIGNUP : '/auth/signup'
} as const;

export const ProtectedRoutes = [
  RoutePaths.HOME,
] as const;

export const PublicRoutes = [
  RoutePaths.LOGIN,
  RoutePaths.SIGNUP,
] as const;

export default RoutePaths