import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store, select } from "@ngrx/store";

import { Observable } from "rxjs";

import { PostItem } from '../../models/postItem.model'
import * as postActions from '../../store/actions/post.actions'
import * as fromPost from '../../store/reducers/post.reducer'
import { ActivatedRoute, Router, ParamMap } from '@angular/router';


@Component({
  selector: 'app-edit-post-form',
  templateUrl: './edit-post-form.component.html',
  styleUrls: ['./edit-post-form.component.scss']
})
export class EditPostFormComponent implements OnInit {

  postForm: FormGroup;
  postid: any;
  userid: string;
  post$: Observable<PostItem>
  posts: any = []
  loading$: Observable<Boolean>;
  error$: Observable<Error>

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<fromPost.AppState>,
    private fb: FormBuilder,

  ) { }

  ngOnInit() {
    this.fetchDetails()

    this.postForm = this.fb.group({
      title: ["", Validators.required],
      body: ["", Validators.required],
    })

    const post$: Observable<PostItem> = this.store.select(
      fromPost.getCurrentPost
    )

    post$.subscribe(currentPost => {
      if (currentPost) {
        this.postForm.patchValue({
          title: currentPost.title,
          body: currentPost.body,
        });
        this.postid = currentPost.id
        this.userid = currentPost.userid
      }
    })
  }

  fetchDetails() {
    this.post$ = this.store.pipe(select(fromPost.getCurrentPost))
    this.post$.subscribe(val => {
      if (val) {
        this.posts = val
      }
    })
  }

  editPost() {
    const updatedPost: PostItem = {
      id: this.postid,
      userid: this.userid,
      title: this.postForm.get("title").value,
      body: this.postForm.get("body").value
    };

    this.store.dispatch(new postActions.UpdatePost(updatedPost))
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/posts']);
  }

}
