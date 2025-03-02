import { Component, input } from '@angular/core'

@Component({
	selector: 'app-input-label',
	standalone: true,
	imports: [],
	templateUrl: './input-label.component.html',
	styleUrl: './input-label.component.scss',
})
export class InputLabelComponent {
	public label = input<string>()
	public isDisabled = input<boolean>(false)
	public isRequired = input<boolean>(false)
	public useFloatingLabel = input<boolean>(false)
	public isActive = input<boolean>(false)
}
