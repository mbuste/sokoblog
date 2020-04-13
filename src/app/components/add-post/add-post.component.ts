import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { v4 as uuid } from 'uuid';
import * as fromPostActions from '../../store/actions/post.actions'
import { Store } from '@ngrx/store'
import { PostItem } from '../../models/postItem.model'
import { AppState } from 'src/app/store/reducers/post.reducer';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  id: string
  userid: string

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>, public auth: AuthService) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      if (user) {
        this.userid = user.uuid
      }
    }
    )

  }

  postForm = this.formBuilder.group({
    title: ['', Validators.required],
    body: ['', Validators.required]
  })

  addPost() {
    this.id = uuid();
    const newPost: PostItem = {
      id: this.id,
      userId: this.userid,
      title: this.postForm.get("title").value,
      body: this.postForm.get("body").value
    }
    this.store.dispatch(new fromPostActions.AddItemAction(newPost))
    this.store.dispatch(new fromPostActions.LoadPostAction())
  }

}
