import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-comment-card',
  templateUrl: './post-comment-card.component.html',
  styleUrls: ['./post-comment-card.component.scss']
})
export class PostCommentCardComponent implements OnInit {

  constructor() { }
  @Input() public comment

  ngOnInit(): void {
  }

}
