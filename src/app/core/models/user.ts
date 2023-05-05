export interface IUser {
    id?: number;
    userId?: string;
    password?: string;
    roles?: string[];
  }
  
  export class User implements IUser {
    constructor(
      public userId?: string,
      public password?: string,
      public roles?: string[],
      public id?: number
    ) {}
  }