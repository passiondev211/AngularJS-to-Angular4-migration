import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ModalModule, AlertModule } from 'ng2-bootstrap';
import { ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import {TimeAgoPipe} from 'time-ago-pipe';
// Custom component
import { AuthGuard } from './common/auth.guard';
import { routes } from './app.routes';
import { AppComponent } from './livup-co.component';
import { HeaderComponent } from './header.component';
import { FooterComponent } from './footer.component';
import { FeedComponent } from './feed/feed.component';
import { LandingComponent } from './landing.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './users/login.component';
import { RegisterComponent } from './users/register.component';
import { FilterService } from './shared/filter.service';
import { SearchComponent } from './search.component';
import { ApiService } from './shared/api.service';
import { DropdownDirective } from './dropdown.directive';
import { DropdownDirective1 } from './dropdown.directive1';
import { LogoutComponent } from './users/logout.component';
import { SettingComponent } from './profile/setting.component';
import { MyOrganisationsComponent } from './partials/my-organisations.component';
import { MyInterestsComponent } from './partials/my-interests.component';
import { AccountComponent } from './profile/account.component';
import { ProfileDetailComponent } from './profile/profile-detail.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { FavoriteDetailsComponent } from './organizations/favorite-details.component';
import { OrganizationDetailsComponent } from './organizations/organization-details.component';
import { Config } from './common/config';
import { OrganizationDetailByIdComponent } from './organizations/organization-detail-by-id.component';
import { ActivitesComponent } from './activites/activites.component'; 
import { DpDatePickerModule } from 'ng2-date-picker';
import { TimepickerModule } from 'ng2-bootstrap/timepicker';
import {DatePickerModule } from 'angular-io-datepicker';
import {OverlayModule } from 'angular-io-overlay';
@NgModule({
 imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    OverlayModule,
    DatePickerModule,
    MaterialModule,
    DpDatePickerModule,
    TimepickerModule.forRoot()
  ],
  providers: [FilterService, AuthGuard, ApiService, Config],
  declarations: [
    TimeAgoPipe,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FeedComponent,
    LandingComponent,
    ProfileComponent,
    UsersComponent,
    LoginComponent,
    RegisterComponent,
    SearchComponent,
    DropdownDirective,
    DropdownDirective1,
    LogoutComponent,
    SettingComponent,
    MyOrganisationsComponent,
    MyInterestsComponent,
    AccountComponent,
    ImageCropperComponent,
    ProfileDetailComponent,
    OrganizationsComponent,
    FavoriteDetailsComponent,
    OrganizationDetailsComponent,
    OrganizationDetailByIdComponent,
    ActivitesComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }