import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { PostService } from './post.service';
import { PostItem } from '../models/postItem.model'

describe('PostService', () => {
  let service: PostService, httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [PostService]
    });
    service = TestBed.get(PostService);
    httpMock = TestBed.get(HttpTestingController)
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should fetch all posts', () => {
    let testPosts: PostItem[] = [
      {
        userId: '1',
        id: '1',
        title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      },
      {
        userId: "1",
        id: "2",
        title: "qui est esse",
        body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
      }
    ]

    service.getPostItems().subscribe(posts => {
      expect(posts.length).toBe(2);
      expect(posts).toEqual(testPosts)
    });

    const request = httpMock.expectOne(`${service.POST_URL}`)
    expect(request.request.method).toBe('GET');
    request.flush(testPosts);
  });

  it('should create new post', () => {
    let newPost: PostItem = {
      userId: "1",
      id: "3",
      "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
      "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
    }
    service.addPostItem(newPost).subscribe(posts => { posts })
    const request = httpMock.expectOne(`${service.POST_URL}`)
    expect(request.request.method).toBe('POST');
  })

  it('should delete Post', () => {
    let id = '1';
    service.deletePostItem(id).subscribe(users => { })
    const request = httpMock.expectOne(`${service.POST_URL}/${id}`)
    expect(request.request.method).toBe('DELETE')
  })


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
