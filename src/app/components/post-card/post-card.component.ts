import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers/comment.reducer';
import * as fromPostActions from 'src/app/store/actions/post.actions';
import * as fromPosts from '../../store/reducers/post.reducer'


@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

 
  @Input() public post;

  selectedid;

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<AppState>) { }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'))
      this.selectedid = id;
    });
  }

  onSelect(post) {
    this.store.dispatch(new fromPostActions.LoadPostById(post.id))
    this.router.navigate([post.id],  { relativeTo: this.route } )
  }

  isSelected(post) {
    return post.id === this.selectedid;
  }

}
