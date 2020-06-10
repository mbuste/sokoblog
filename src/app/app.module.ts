import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EditPostFormComponent } from './components/edit-post-form/edit-post-form.component'
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
import { UserEffects } from './store/effects/user.effects'
import { MaterialModule } from './material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule, routingComponents } from './app.routing';
import { PostCardComponent } from './components/post-card/post-card.component';
import { PostCommentCardComponent } from './components/post-comment-card/post-comment-card.component';
import { AddPostComponent } from './components/add-post/add-post.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ServiceWorkerModule } from '@angular/service-worker';

const config = {
  apiKey: "AIzaSyA3TxUGCDi7TBsZlqu01fapn8ONnb6BhJ8",
  authDomain: "sokoblog-309d1.firebaseapp.com",
  databaseURL: "https://sokoblog-309d1.firebaseio.com",
  projectId: "sokoblog-309d1",
  storageBucket: "sokoblog-309d1.appspot.com",
  messagingSenderId: "660385264247",
  appId: "1:660385264247:web:98e4af692c74cbb9dc0c72",
  measurementId: "G-Y437LVSEQ9"
}


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    routingComponents,
    PostCardComponent,
    PostCommentCardComponent,
    AddPostComponent,
    EditPostFormComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([PostEffects, CommentEffects, UserEffects]),
    HttpClientModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
