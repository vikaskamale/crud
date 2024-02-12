import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
posts: Post[] = [];
showCreateForm = false;
showEditForm = false;
showallPost = true;
newPost: Post = { userId:1, id:1, title:'', body:''};
updatedPost: Post = { userId:1, id:1, title:'', body:''};

constructor(private postSerivce: PostService){}


  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(){
    this.postSerivce.getAllPosts().subscribe(posts =>{
      this.posts = posts;
    });
  }

  deletePost(id: number){
   this.postSerivce.deletePost(id).subscribe(()=> {
    this.posts = this.posts.filter(post => post.id !== id);
  })
  }
  toggleCreateForm(): void {
    this.showCreateForm = !this.showCreateForm;
    this.showEditForm = false; // Hide edit form when showing create form
    this.showallPost = false;
  }

  toggleEditForm(post: Post): void {
    this.updatedPost = { ...post }; // Assign a copy of the post to the updatedPost variable
    this.showEditForm = !this.showEditForm;
    this.showCreateForm = false; // Hide create form when showing edit form
    this.showallPost = false;
  }


  createPost(): void {
    this.postSerivce.createPost(this.newPost).subscribe((createPost)=>{
      this.posts.push(createPost);
      this.newPost = { userId:1, id:1, title:'',body:''}
      this.showCreateForm = false;
      this.showallPost = true;
    })
  }

  editPost(): void{
   this.postSerivce.updatePost(this.updatedPost).subscribe(()=>{
    const index = this.posts.findIndex(post => post.id === this.updatedPost.id);
    if(index !== -1){
      this.posts[index] = {...this.updatedPost};
    }
    this.showEditForm = false;
    this.showallPost = true;
   })
  }

}
