import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { User } from "src/app/models/user.model";
import { UsersService } from "src/app/services/users.service";

@Component({
    selector: 'app-edit-users',
    templateUrl: './edit-users.component.html',
    styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnChanges{
    constructor(private usersService: UsersService) {}

  users: User[] = [];

  foodTypes: string[] = ['pizza', 'burger', 'noodles'];

  @Input() userId!: number;

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

  ngOnChanges(changes: SimpleChanges): void {
    console.log('called')
    if(this.userId != -1){
        const userData: User = this.usersService.getUsers()[this.userId];
        
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

    this.usersService.updateUser(userUpdate, this.userId);
  }
}