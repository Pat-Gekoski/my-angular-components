import { Component, inject, signal } from '@angular/core'
import { ComponentCardComponent } from '../../shared/component-card/component-card.component'
import { InputComponent } from './input/input.component'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'

@Component({
	selector: 'app-form-components',
	standalone: true,
	imports: [ComponentCardComponent, InputComponent, ReactiveFormsModule, FormsModule],
	templateUrl: './form-components.component.html',
	styleUrl: './form-components.component.scss',
})
export class FormComponents {
	public fb = inject(FormBuilder)
	public isDisabled = signal<boolean>(false)
	public useFloatingLabel = signal<boolean>(false)

	public form: FormGroup = this.fb.group({
		appInput: this.fb.control('', [Validators.required, Validators.minLength(3)]),
	})

	public onDisabledChanged(event: any): void {
		const disabled = event.target.checked
		this.isDisabled.set(disabled)
		this.form.controls['appInput'][this.isDisabled() ? 'disable' : 'enable']()
	}

	public onFloatingLabelChanged(event: any): void {
		const useFloatingLabel = event.target.checked
		this.useFloatingLabel.set(useFloatingLabel)
	}
}
