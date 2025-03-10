import { Component, ElementRef, HostListener, inject, input, output, signal, viewChild } from '@angular/core'
import { HostControlDirective } from '../directives/host-control-directive.directive'
import { InputLabelComponent } from '../input-label/input-label.component'
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputErrorMessages } from '../interfaces/input-error-messages.interface'
import { SingleSelectOptions } from '../interfaces/select.interface'

@Component({
	selector: 'app-single-select',
	standalone: true,
	imports: [ReactiveFormsModule, InputLabelComponent],
	templateUrl: './single-select.component.html',
	styleUrl: './single-select.component.scss',
	hostDirectives: [HostControlDirective],
})
export class SingleSelectComponent {
	public hiddenSelect = viewChild<ElementRef>('hiddenSelect')
	public hcd = inject(HostControlDirective)
	private el = inject(ElementRef)
	public label = input<string>()
	public useFloatingLabel = input<boolean>(false)
	public placeholder = input<string>('')
	public errorMessages = input<InputErrorMessages>({})
	public showErrorMessage = input<boolean>(true)
	public clearable = input<boolean>(false)
	public options = input<Array<SingleSelectOptions>>([])
	public listMaxHeight = input<string>('200px')
	public focusEvent = output<void>()
	public blurEvent = output<void>()
	public selectionChanged = output<any>()

	public formControl?: FormControl
	public isFocused = signal<boolean>(false)

	public ngOnInit(): void {
		this.formControl = this.hcd.control
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

	public handleBlur(): void {
		this.formControl?.markAsTouched()
		this.blurEvent.emit()
		this.isFocused.set(false)
		this.hiddenSelect()?.nativeElement.blur()
	}

	public handleFocus(): void {
		this.focusEvent.emit()
		this.isFocused.set(true)
		this.hiddenSelect()?.nativeElement.focus()
	}

	public onSelectDropdown() {
		if (this.isDisabled) {
			return
		}
		if (this.isFocused()) {
			this.handleBlur()
		} else {
			this.handleFocus()
		}
	}

	public onSelectOption(event: Event, option: SingleSelectOptions) {
		event.stopPropagation()
		if (option.disabled) {
			return
		}
		this.formControl?.setValue(option.value)
		this.selectionChanged.emit(option.value)
		this.handleBlur()
	}

	public onClearSelection(event: Event) {
		event.stopPropagation()
		this.formControl?.reset()
		this.selectionChanged.emit(null)
		this.handleBlur()
	}

	@HostListener('document:click', ['$event'])
	public closeDropdown(event: Event) {
		if (!this.el.nativeElement.contains(event.target)) {
			this.handleBlur()
		}
	}
}
