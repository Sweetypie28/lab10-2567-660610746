
import { UserCardProps } from "./types";

export const cleanUser = (user: any) => {
  const newUser: UserCardProps = {
    name: `${user.name.first} ${user.name.last}`,
    email: user.email,
    imgUrl: user.picture.large,
    address: `${user.location.city} ${user.location.state}`,
  };
  return newUser;
};
