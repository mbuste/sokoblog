import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

 
  @Input() public post;

  selectedid;

  constructor(private router: Router, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'))
      this.selectedid = id;
    });

  }

  onSelect(post) {
    this.router.navigate([post.id],  { relativeTo: this.route } )
  }

  isSelected(post) {
    return post.id === this.selectedid;
  }

}
