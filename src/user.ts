import { Bytes } from "@graphprotocol/graph-ts";
import { User } from "../generated/schema";

export function ensureUser(address: Bytes): User {
  let user = User.load(address);
  if (!user) {
    user = new User(address);
    user.address = address;
    user.save();
  }
  return user;
}
