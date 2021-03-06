import { TitleCasePipe } from "@angular/common";
import {
  Component,
  OnInit
} from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { User } from "src/app/models/user.model";
import {
  UsersService
} from "src/app/services/users.service";

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent{

  constructor(private usersService: UsersService) {}

  users: User[] = [];

  updateId: number = -1;

  foodTypes: string[] = ['pizza', 'burger', 'noodles'];

  //favFood checkbox validator not working

  userForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    country: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    favFood: new FormArray([
      new FormGroup({
        pizza: new FormControl(),
      }), new FormGroup({
        burger: new FormControl(),
      }), new FormGroup({
        noodles: new FormControl(),
      }),
    ], [Validators.required]),
    gender: new FormControl('male'),
    maritalStatus: new FormControl('single')
  })

  onSubmit(): void {
    const newUser: User = this.userForm.value;
    const favFoodArr: string[] = [];

    for (let i in newUser.favFood) {
      if (newUser.favFood[i][this.foodTypes[i]]) {
        favFoodArr.push(new TitleCasePipe().transform(this.foodTypes[i]));
      }
    }

    newUser.favFood = favFoodArr;

    this.usersService.addUser(newUser);
    console.log(this.usersService.getUsers());
    this.userForm.reset();
    this.userForm.get('maritalStatus') ?.setValue('single');
  }

  onEdit(id: number): void {
    this.updateId = id;
    const userData: User = this.users[id];

    this.userForm.get('name') ?.setValue(userData.name);
    this.userForm.get('email') ?.setValue(userData.email);
    this.userForm.get('country') ?.setValue(userData.country);
    this.userForm.get('state') ?.setValue(userData.state);
    this.userForm.get('city') ?.setValue(userData.city);
    this.userForm.get('gender') ?.setValue(userData.gender);
    this.userForm.get('maritalStatus') ?.setValue(userData.maritalStatus);

    //Update checkbox: how to set the value of the form array from code
    // const favFood: string[] = userData.favFood;

    // for(let fav of favFood){
    //   const index: number = this.foodTypes.findIndex(food => {
    //     return food === fav;
    //   });

    //   this.userForm.get('favFood')?.get(index.toString())?.setValue(0);

    // }

  }

  onDelete(id: number): void {
    this.users.splice(id, 1)
  }

  onUpdate(): void {
    const userUpdate: User = this.userForm.value;

    const favFoodArr: string[] = [];
    for (let i in userUpdate.favFood) {
      if (userUpdate.favFood[i][this.foodTypes[i]]) {
        favFoodArr.push(this.foodTypes[i]);
      }
    }

    userUpdate.favFood = favFoodArr;

    this.users[this.updateId] = userUpdate;
    this.userForm.reset();
    this.userForm.get('maritalStatus') ?.setValue('single');

    this.updateId = -1;
  }


}
