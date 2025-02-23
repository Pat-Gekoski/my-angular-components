import { Component } from '@angular/core'
import { RouterModule, RouterOutlet } from '@angular/router'
import { HeaderComponent } from './layout/header/header.component'
import { MainContentComponent } from './layout/main-content/main-content.component'

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [HeaderComponent, RouterModule, MainContentComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	title = 'my-angular-components'
}
