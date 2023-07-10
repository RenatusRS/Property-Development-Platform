import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAdminComponent } from './components/pages/login-admin/login-admin.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { ManageComponent } from './components/manage/manage.component';
import { UserComponent } from './components/pages/user/user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AgenciesComponent } from './agencies/agencies.component';
import { CreateObjectComponent } from './create-object/create-object.component';
import { ObjectsComponent } from './objects/objects.component';
import { HireComponent } from './hire/hire.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobComponent } from './job/job.component';
import { WorkersComponent } from './workers/workers.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent, title: 'Login' },
	{ path: 'admin', component: LoginAdminComponent, title: 'Admin Login' },
	{ path: 'register', component: RegisterComponent, title: 'Register' },
	{ path: 'manage', component: ManageComponent, title: 'Manage' },
	{ path: 'user/:id', component: UserComponent, title: 'User' },
	{ path: 'workers/:id', component: WorkersComponent, title: 'Workers'},
	{ path: 'password', component: ChangePasswordComponent, title: 'Change Password' },
	{ path: 'agencies', component: AgenciesComponent, title: 'Agencies'},
	{ path: 'create', component: CreateObjectComponent, title: 'Create Object' },
	{ path: 'create/:id', component: CreateObjectComponent, title: 'Create Object'},
	{ path: 'objects', component: ObjectsComponent, title: 'Objects' },
	{ path: 'hire/:id', component: HireComponent, title: 'Hire'},
	{ path: 'jobs', component: JobsComponent, title: 'Jobs'},
	{ path: 'job/:id', component: JobComponent, title: 'Job'},
	{ path: '', component: AgenciesComponent, title: 'Agencies' },
	{ path: '**', redirectTo: '', title: 'Agencies' },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes),
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
