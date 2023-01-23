import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatCardModule } from '@angular/material/card'

import { CommonModule } from '@angular/common';
// Material Form Controls
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
// Material Navigation
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
// Material Layout
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
// Material Buttons & Indicators
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
// Material Popups & Modals
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
// Material Data tables
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { LoginInputComponent } from './components/shared/login-input/login-input.component';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { LoginAdminComponent } from './components/pages/login-admin/login-admin.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { ManageUsersComponent } from './components/manage/manage-users/manage-users.component';
import { ManageWorkshopsComponent } from './components/manage/manage-workshops/manage-workshops.component';
import { ManageAttendancesComponent } from './components/manage/manage-attendances/manage-attendances.component';
import { ManageComponent } from './components/manage/manage.component';
import { UserComponent } from './components/pages/user/user.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		LoginAdminComponent,
		LoginInputComponent,
		HeaderComponent,
		FooterComponent,
		RegisterComponent,
		ManageComponent,
		ManageUsersComponent,
		ManageWorkshopsComponent,
		ManageAttendancesComponent,
		UserComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule,
		BrowserAnimationsModule,
		MatSlideToggleModule,
		MatFormFieldModule,
		MatInputModule,
		MatCardModule,
		CommonModule,
		// Material Form Controls
		MatAutocompleteModule,
		MatCheckboxModule,
		MatDatepickerModule,
		MatRadioModule,
		MatSelectModule,
		MatSliderModule,
		// Material Navigation
		MatMenuModule,
		MatSidenavModule,
		MatToolbarModule,
		// Material Layout
		MatDividerModule,
		MatExpansionModule,
		MatGridListModule,
		MatListModule,
		MatStepperModule,
		MatTabsModule,
		MatTreeModule,
		// Material Buttons & Indicators
		MatButtonModule,
		MatButtonToggleModule,
		MatBadgeModule,
		MatChipsModule,
		MatIconModule,
		MatProgressSpinnerModule,
		MatProgressBarModule,
		MatRippleModule,
		// Material Popups & Modals
		MatBottomSheetModule,
		MatDialogModule,
		MatSnackBarModule,
		MatTooltipModule,
		// Material Data tables
		MatPaginatorModule,
		MatSortModule,
		MatTableModule,
	],
	providers: [
		{ provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000 } }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
