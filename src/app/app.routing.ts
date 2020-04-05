import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component'
import { PostListComponent } from './components/post-list/post-list.component'
import { PostDetailComponent } from './components/post-detail/post-detail.component'


const routes: Routes = [
    { path: "", redirectTo: '/posts', pathMatch: "full" },
    { path: "posts", component: PostListComponent },
    { path: "posts/:id", component: PostDetailComponent },

]

@NgModule({
    imports: [RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponents = [NavbarComponent,
    HomeComponent, PostListComponent, PostDetailComponent
]