import { Component, inject, signal } from '@angular/core'
import { ComponentCardComponent } from '../../shared/component-card/component-card.component'
import { InputComponent } from './input/input.component'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { SingleSelectComponent } from './single-select/single-select.component'

@Component({
	selector: 'app-form-components',
	standalone: true,
	imports: [ReactiveFormsModule, FormsModule, ComponentCardComponent, InputComponent, SingleSelectComponent],
	templateUrl: './form-components.component.html',
	styleUrl: './form-components.component.scss',
})
export class FormComponents {
	public fb = inject(FormBuilder)
	public isDisabled = signal<boolean>(false)
	public useFloatingLabel = signal<boolean>(false)

	public form: FormGroup = this.fb.group({
		appInput: this.fb.control('', [Validators.required, Validators.minLength(3)]),
		appSingleSelect: this.fb.control('', [Validators.required]),
	})

	public onDisabledChanged(event: any): void {
		const disabled = event.target.checked
		this.isDisabled.set(disabled)
		this.form.controls['appInput'][this.isDisabled() ? 'disable' : 'enable']()
		this.form.controls['appSingleSelect'][this.isDisabled() ? 'disable' : 'enable']()
	}

	public onFloatingLabelChanged(event: any): void {
		const useFloatingLabel = event.target.checked
		this.useFloatingLabel.set(useFloatingLabel)
	}
}
