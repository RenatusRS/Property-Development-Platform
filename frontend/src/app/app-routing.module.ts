import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAdminComponent } from './components/pages/login-admin/login-admin.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { ManageComponent } from './components/manage/manage.component';
import { UserComponent } from './components/pages/user/user.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent, title: 'Login' },
	{ path: 'admin', component: LoginAdminComponent, title: 'Admin Login' },
	{ path: 'register', component: RegisterComponent, title: 'Register' },
	{ path: 'manage', component: ManageComponent, title: 'Manage' },
	{ path: 'user/:id', component: UserComponent, title: 'User' },
	{ path: '**', redirectTo: '', title: 'Home' },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes),
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
