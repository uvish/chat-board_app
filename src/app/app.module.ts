import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Components
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateSidebarComponent } from './create-sidebar/create-sidebar.component';
import { ChannelsSidebarComponent } from './channels-sidebar/channels-sidebar.component';
import { EditorModule } from '@tinymce/tinymce-angular';
// Angular Material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatExpansionModule} from '@angular/material/expansion';


// Angular Forms
import { ReactiveFormsModule } from '@angular/forms';

// Communication
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChannelComponent } from './channel/channel.component';
import { PostComponent } from './shared/post/post.component';
import { AnswerComponent } from './shared/answer/answer.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { BriefPostComponent } from './shared/brief-post/brief-post.component';
import { MychannelsComponent } from './mychannels/mychannels.component';

import { TimeagoModule } from 'ngx-timeago';
import { RequestsComponent } from './requests/requests.component';
import { RecentPostsComponent } from './recent-posts/recent-posts.component';
import { TokenInterceptor } from './services/auth.interceptor';






@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NavbarComponent,
    LoginComponent,
    DashboardComponent,
    CreateSidebarComponent,
    ChannelsSidebarComponent,
    ChannelComponent,
    PostComponent,
    AnswerComponent,
    LandingPageComponent,
    BriefPostComponent,
    MychannelsComponent,
    RequestsComponent,
    RecentPostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSnackBarModule,
    MatSelectModule,
    MatMenuModule,
    ReactiveFormsModule,
    HttpClientModule,
    EditorModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTooltipModule,
    MatExpansionModule,
    TimeagoModule.forRoot()
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
