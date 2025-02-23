import { Routes } from '@angular/router'
import { FormComponents } from './routes/form-components/form-components.component'
import { DisplayComponents } from './routes/display-components/display-components.component'

export const routes: Routes = [
	{
		path: 'form-components',
		component: FormComponents,
	},
	{
		path: 'display-components',
		component: DisplayComponents,
	},
	{
		path: '**',
		redirectTo: 'form-components',
	},
]
