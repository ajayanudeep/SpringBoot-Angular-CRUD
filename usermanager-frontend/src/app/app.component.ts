import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { UserService } from './user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  ngOnInit(): void {
    this.getUsers()
  }
  title = 'UserManager';
  public users! : User[];
  public editUser : User | undefined;
  public deletedUser!: User;

  constructor(private userService : UserService){}

  public getUsers() : void {
    this.userService.getUsers().subscribe({
      next:(response : User[]) => {
        this.users = response
      },
      error:(error : HttpErrorResponse) => {
        alert(error.message)
      }
    }
      )
  }
  public addUser(addForm:NgForm): void{
    console.log(addForm)
    document.getElementById('add-negative')?.click()
    this.userService.addUser(addForm.value).subscribe({
      next:(response : User) =>{
        console.log(response)
        this.getUsers()
        addForm.reset()
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message)
        addForm.reset()
      }
    }
    )
  }
  public updateUser(user:User): void{
    console.log(user)
    document.getElementById('update-negative')?.click()
    this.userService.updateUser(user).subscribe(
      {
        next:(response:User) => {
          this.getUsers()
        },
        error:(error:HttpErrorResponse) => {
          alert(error.message)
        }
      }
    )
  }
  public delete_User(id:number): void{
    document.getElementById('delete-positive')?.click()
    this.userService.deleteUser(id).subscribe(
      {
        next:(response:void) => {
          this.getUsers()
        },
        error:(error:HttpErrorResponse) => {
          alert(error.message)
        }
      }
    )
  }
  public search(key : string) : void{
    const results: User[] = [];
    for (const user of this.users) {
      if (user.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || user.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || user.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || user.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(user);
      }
    }
    this.users = results;
    if (results.length === 0 || !key) {
      this.getUsers();
    }
  }
  public set_updateUser(event: Event,user : User) : void{
    this.editUser=user
    console.log(this.editUser)
  }
  public set_deleteUser(event: Event,user : User) : void{
    this.deletedUser=user
    console.log(this.deletedUser)
  }
}
