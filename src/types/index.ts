export type AuthFormType = "signin" | "signup";

export type AuthFormProps = {
  type: AuthFormType;
  className?: string;
};

export type AuthFormState = {
  name: string;
  email: string;
  password: string;
};

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export type AuthStoreState = {
  isAuthenticated: boolean;
  user?: UserProfile | null;
  signIn: (user: UserProfile) => void;
  signOut: () => void;
};

export type User = {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
  emailVerified?: string | Date | null;
  hashedPassword?: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  isActive: boolean;
};

export type UserProfile = Pick<User, "id" | "name" | "email" | "image">;
