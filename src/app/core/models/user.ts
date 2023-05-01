export interface IUser {
    id?: number;
    username?: string;
    password?: string;
    roles?: string[];
  }
  
  export class User implements IUser {
    constructor(
      public username?: string,
      public password?: string,
      public roles?: string[],
      public id?: number
    ) {}
  }