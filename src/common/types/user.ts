export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type UserGoogleType = {
  name: string | null;
  email: string | null;
  photo: string | null;
};
