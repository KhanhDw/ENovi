export interface User {
    id: number;
    email: string;
    username: string,
    rememeberPassword: boolean;
    role: string;
    avatar: string,
}


export interface UserAdmin {
    avatar:string;
    createdAt:Date;
    email:string;
    googleId:string;
    id:number;
    password:string;
    reset_expires:string;
    reset_token:string;
    role:string;
    username:string;
}


