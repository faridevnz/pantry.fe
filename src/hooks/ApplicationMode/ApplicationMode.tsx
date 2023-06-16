export const useApplicationMode = ():
  | "debug"
  | "development"
  | "production" => {
  return import.meta.env.VITE_APPLICATION_MODE;
};
