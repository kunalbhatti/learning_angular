import {
  Component
} from '@angular/core';
import {
  FormControl,
  FormGroup
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  name!: string;
  age!: number;

  reactiveForm = new FormGroup({
    name: new FormControl(''),
    age: new FormControl('')
  })

  onSubmit(): void {
    let value: {
      name: string,
      age: number
    } = this.reactiveForm.value;

    this.name = value.name;
    this.age = value.age;

  }

}
