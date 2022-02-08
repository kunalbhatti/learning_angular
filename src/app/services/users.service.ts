import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { User } from "../models/user.model";

@Injectable({providedIn: 'root'})
export class UsersService{
    
    private users: User[] = [];

    usersArr: Subject<User[]> = new Subject();

    getUsers(): User[]{
        return [...this.users];
    }

    addUser(user: User): void{
        this.users.push(user);
    }

    updateUser(userData: User, id: number): void{
        this.users[id] = userData;
        this.usersArr.next([...this.users]);
    }

    deleteUser(id: number): void{
        this.users.splice(id, 1);
        this.usersArr.next([...this.users]);
    }
}