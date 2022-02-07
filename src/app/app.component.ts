import {
  Component
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  name!: string;
  age!: number;
  gender!: string;

  submitted: boolean = false;

  reactiveForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required])
  })

  onSubmit(): void {
    this.submitted = true;
    let value: {
      name: string,
      age: number,
      gender: string
    } = this.reactiveForm.value;

    this.name = value.name;
    this.age = value.age;
    this.gender = value.gender;

  }

}
