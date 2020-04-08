import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, FormControl } from '@angular/forms'
import { v4 as uuid } from 'uuid';
import * as fromPostActions from '../../store/actions/post.actions'
import * as fromPost from '../../store/reducers/post.reducer'
import { Store } from '@ngrx/store'
import { PostItem } from '../../models/postItem.model'
import { AppState } from 'src/app/store/reducers/post.reducer';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  id: string

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { }

  ngOnInit(): void {

  }

  postForm = this.formBuilder.group({
    title: ['', Validators.required],
    body: ['', Validators.required]
  })

  addPost() {
    this.id = uuid();
    const newPost: PostItem = {
      id: this.id,
      userid: "1",
      title: this.postForm.get("title").value,
      body: this.postForm.get("body").value
    }
    this.store.dispatch(new fromPostActions.AddItemAction(newPost))
  }

}
