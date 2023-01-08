import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAdminComponent } from './components/pages/login-admin/login-admin.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { RequestsComponent } from './components/pages/requests/requests.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent, title: 'Login' },
	{ path: 'admin', component: LoginAdminComponent, title: 'Admin Login' },
	{ path: 'register', component: RegisterComponent, title: 'Register' },
	{ path: 'requests', component: RequestsComponent, title: 'Requests' },
	{ path: '**', redirectTo: '' },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes),
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
