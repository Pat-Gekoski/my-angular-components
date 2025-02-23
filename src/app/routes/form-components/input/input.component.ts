import { Component, inject, input } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { HostControlDirective } from '../directives/host-control-directive.directive'

@Component({
	selector: 'app-input',
	imports: [ReactiveFormsModule],
	standalone: true,
	templateUrl: './input.component.html',
	styleUrl: './input.component.scss',
	hostDirectives: [HostControlDirective],
})
export class InputComponent {
	public label = input<string>()
	public hcd = inject(HostControlDirective)
	private formControl = this.hcd.control

	public handleInputChange(event: Event): void {
		const value = (event.target as HTMLInputElement).value
		this.formControl?.setValue(value)
		this.formControl?.markAsDirty()
	}

	public handleBlur(): void {
		this.formControl?.markAsTouched()
	}

	public handleFocus(): void {}
}
