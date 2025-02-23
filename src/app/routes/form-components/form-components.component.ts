import { Component, inject } from '@angular/core'
import { ComponentCardComponent } from '../../shared/component-card/component-card.component'
import { InputComponent } from './input/input.component'
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

@Component({
	selector: 'app-form-components',
	standalone: true,
	imports: [ComponentCardComponent, InputComponent, ReactiveFormsModule],
	templateUrl: './form-components.component.html',
	styleUrl: './form-components.component.scss',
})
export class FormComponents {
	public fb = inject(FormBuilder)
	public form: FormGroup = this.fb.group({
		appInput: ['', Validators.required],
	})
}
