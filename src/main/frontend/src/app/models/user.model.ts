import {Role} from "./role.enum";

export class UserModel {

    id:number;
    username: string;
    email: string;
    password: string;
    repeatPassword: string;
    role: Role;
    score:number;
    token: string;


  constructor(init?: Partial<UserModel>) {
    Object.assign(this, init);
  }
}
