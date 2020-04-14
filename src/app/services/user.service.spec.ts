import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { UserService } from './user.service';
import { IUser } from '../models/user.model'

describe('UserService', () => {
  let service: UserService, httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.get(UserService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('should retrieve all users', () => {
    const testUsers: IUser[] = [
      {
        id: '1',
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        address: {
          street: "Kulas Light",
          suite: "Apt. 556",
          city: "Gwenborough",
          zipcode: "92998-3874",
          geo: {
            lat: "-37.3159",
            lng: "81.1496"
          }
        },
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
        company: {
          name: "Romaguera-Crona",
          catchPhrase: "Multi-layered client-server neural-net",
          bs: "harness real-time e-markets"
        }
      },
      {
        id: '2',
        name: "Ervin Howell",
        username: "Antonette",
        email: "Shanna@melissa.tv",
        address: {
          street: "Victor Plains",
          suite: "Suite 879",
          city: "Wisokyburgh",
          zipcode: "90566-7771",
          geo: {
            lat: "-43.9509",
            lng: "-34.4618"
          }
        },
        phone: "010-692-6593 x09125",
        website: "anastasia.net",
        company: {
          name: "Deckow-Crist",
          catchPhrase: "Proactive didactic contingency",
          bs: "synergize scalable supply-chains"
        }
      }
    ]

    service.getUsers().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(testUsers)
    });

    const request = httpTestingController.expectOne(`${service.uri}`)
    expect(request.request.method).toBe('GET');
    request.flush(testUsers);
  });

  it('should create new user', () => {
    let newUser: IUser = {
      id: '3',
      name: "new post",
      username: "Bret",
      email: "Sincere@april.biz",
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: {
          lat: "-37.3159",
          lng: "81.1496"
        }
      },
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      company: {
        name: "Romaguera-Crona",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets"
      }
    }
    service.addUser(newUser).subscribe(users => { users })
    const request = httpTestingController.expectOne(`${service.uri}`)
    expect(request.request.method).toBe('POST');
  })

  it('should delete user', () => {
    let id = '1';
    service.deleteUser(id).subscribe(users => { })
    const request = httpTestingController.expectOne(`${service.uri}/${id}`)
    expect(request.request.method).toBe('DELETE')
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
