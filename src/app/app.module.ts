import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { reducers } from './store/reducers/index.reducer'
import { PostEffects } from './store/effects/post.effects'
import { CommentEffects } from './store/effects/comment.effects'
import { MaterialModule } from './material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule, routingComponents } from './app.routing';
import { PostCardComponent } from './components/post-card/post-card.component';
import { PostCommentCardComponent } from './components/post-comment-card/post-comment-card.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { EditPostFormComponent } from './components/edit-post-form/edit-post-form.component'


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    routingComponents,
    PostCardComponent,
    PostCommentCardComponent,
    AddPostComponent,
    LoginFormComponent,
    EditPostFormComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([PostEffects, CommentEffects]),
    HttpClientModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
