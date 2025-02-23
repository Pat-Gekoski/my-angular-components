import { Component, input } from '@angular/core'

@Component({
	selector: 'app-component-card',
	standalone: true,
	imports: [],
	templateUrl: './component-card.component.html',
	styleUrl: './component-card.component.scss',
})
export class ComponentCardComponent {
	public title = input.required<string>()
}
