import { Component, ElementRef, inject, input, OnInit, output, signal } from '@angular/core'
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { HostControlDirective } from '../directives/host-control-directive.directive'
import { InputErrorMessages } from '../interfaces/input-error-messages.interface'
import { InputLabelComponent } from '../input-label/input-label.component'

@Component({
	selector: 'app-input',
	imports: [ReactiveFormsModule, InputLabelComponent],
	standalone: true,
	templateUrl: './input.component.html',
	styleUrl: './input.component.scss',
	hostDirectives: [HostControlDirective],
})
export class InputComponent implements OnInit {
	public hcd = inject(HostControlDirective)
	private el = inject(ElementRef)
	public label = input<string>()
	public useFloatingLabel = input<boolean>(false)
	public placeholder = input<string>('')
	public inputBackgroundColor = input<string | null>(null)
	public inputIconColor = input<string | null>(null)
	public inputValidColor = input<string | null>(null)
	public inputInvalidColor = input<string | null>(null)
	public errorMessages = input<InputErrorMessages>({})
	public showErrorMessage = input<boolean>(true)
	public focusEvent = output<void>()
	public blurEvent = output<void>()
	public keydownEvent = output<KeyboardEvent>()

	private formControl?: FormControl
	public isFocused = signal<boolean>(false)

	public ngOnInit(): void {
		this.formControl = this.hcd.control
		this.setupStyles()
	}

	public handleInputChange(event: Event): void {
		const value = (event.target as HTMLInputElement).value
		this.formControl?.setValue(value)
		this.formControl?.markAsDirty()
	}

	get isInvalid(): boolean {
		return this.hcd.control?.invalid && this.hcd.control?.touched && !this.hcd.control?.pending
	}

	get isDisabled(): boolean {
		return this.hcd.control?.disabled ?? false
	}

	get isRequired(): boolean {
		return this.formControl?.hasValidator(Validators.required) ?? false
	}

	public getErrorMessage(): string | null {
		if (!this.formControl || !this.formControl.errors) return null

		const errors = this.formControl.errors
		const customMessages = this.errorMessages()

		// Prioritize custom messages if provided
		if (errors['required']) return customMessages['required'] || 'This field is required.'
		if (errors['minlength']) return customMessages['minlength'] || `Must be at least ${errors['minlength'].requiredLength} characters.`
		if (errors['maxlength']) return customMessages['maxlength'] || `Must be at most ${errors['maxlength'].requiredLength} characters.`
		if (errors['pattern']) return customMessages['pattern'] || 'Invalid format.'
		if (errors['email']) return customMessages['email'] || 'Enter a valid email address.'

		return null
	}

	public handleBlur(): void {
		this.formControl?.markAsTouched()
		this.blurEvent.emit()
		this.isFocused.set(false)
	}

	public handleFocus(): void {
		this.focusEvent.emit()
		this.isFocused.set(true)
	}

	public handleKeydown(event: KeyboardEvent): void {
		this.keydownEvent.emit(event)
	}

	private setupStyles() {
		if (this.inputBackgroundColor()) {
			this.el.nativeElement.style.setProperty('--input-bg-color', this.inputBackgroundColor())
		}
		if (this.inputIconColor()) {
			this.el.nativeElement.style.setProperty('--input-icon-tint', this.inputIconColor())
		}
		if (this.inputValidColor()) {
			this.el.nativeElement.style.setProperty('--valid-input-tint', this.inputValidColor())
		}
		if (this.inputInvalidColor()) {
			this.el.nativeElement.style.setProperty('--invalid-input-tint', this.inputInvalidColor())
		}
	}
}
