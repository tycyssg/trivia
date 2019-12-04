import {Role} from "./role.enum";

export class UserModel {

    id:number;
    username: string;
    email: string;
    password: string;
    repeatPassword: string;
    role: Role;
    score:number;
    private _token: string;
    private _tokenExpirationDate: number;


  constructor(init?: Partial<UserModel>) {
    Object.assign(this, init);
  }

  get token() {
    if (!this._tokenExpirationDate || new Date().getTime() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }


  get tokenExpirationDate(): number {
    return this._tokenExpirationDate;
  }


  set tokenExpirationDate(value: number) {
    this._tokenExpirationDate = value;
  }


  set token(value: string) {
    this._token = value;
  }
}
