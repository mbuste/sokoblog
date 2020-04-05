import { Component, OnInit, Input } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router'

@Component({
  selector: 'app-post-carrd',
  templateUrl: './post-carrd.component.html',
  styleUrls: ['./post-carrd.component.scss']
})
export class PostCarrdComponent implements OnInit {

  @Input() post
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
