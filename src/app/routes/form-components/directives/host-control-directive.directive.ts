import { Directive, inject, Injector } from '@angular/core'
import {
	NG_VALUE_ACCESSOR,
	ControlValueAccessor,
	FormControl,
	NgControl,
	NgModel,
	FormControlDirective,
	FormControlName,
	ControlContainer,
	FormGroup,
} from '@angular/forms'
import { Subscription } from 'rxjs'

@Directive({
	standalone: true,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			multi: true,
			useExisting: HostControlDirective,
		},
	],
})
export class HostControlDirective implements ControlValueAccessor {
	public control: FormControl = new FormControl()

	private injector = inject(Injector)
	private subscription?: Subscription

	ngOnInit() {
		const ngControl = this.injector.get(NgControl, null, { self: true, optional: true })

		if (ngControl instanceof NgModel) {
			this.control = ngControl.control
			this.subscription = ngControl.control.valueChanges.subscribe((value) => {
				if (ngControl.model !== value || ngControl.viewModel !== value) {
					ngControl.viewToModelUpdate(value)
				}
			})
		} else if (ngControl instanceof FormControlDirective) {
			this.control = ngControl.control
		} else if (ngControl instanceof FormControlName) {
			const container = this.injector.get(ControlContainer).control as FormGroup
			if (ngControl.name) {
				this.control = container.controls[ngControl.name] as FormControl
			}
		} else {
			this.control = new FormControl()
		}
	}

	writeValue() {}
	registerOnChange() {}
	registerOnTouched() {}

	ngOnDestroy() {
		this.subscription?.unsubscribe()
	}
}

// Code explanaiton:
// https://dev.to/cyrillbrito/stop-re-implementing-controlvalueaccessor-5hmh
