import { FileHandle } from "./file-handle.model";

export interface User{
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    profile: string,
    userImages: FileHandle[]
}