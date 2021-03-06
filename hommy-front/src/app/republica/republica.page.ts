import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommentService } from '../services/comment/comment.service';

@Component({
  selector: 'app-republica',
  templateUrl: './republica.page.html',
  styleUrls: ['./republica.page.scss'],
})
export class RepublicaPage implements OnInit {

  commentForm: FormGroup;
  editCommentForm: FormGroup;
  editMode = false;

  republic = JSON.parse(localStorage.getItem('republica'));
  republicId = this.republic.id;
  username = localStorage.getItem('username');
  comments = [];
  commentId: number;

  constructor( public formbuilder: FormBuilder,
               public commentService: CommentService ) {
    this.commentForm = this.formbuilder.group({
      text: [null, [Validators.required, Validators.maxLength(140)]],
    });
    this.editCommentForm = this.formbuilder.group({
      text: [null, [Validators.required, Validators.maxLength(140)]],
    });
  }

  ngOnInit() {
    this.getRepublicWithComments(this.republicId);
  }

  sendComment(form){
    console.log(form);
    console.log(form.value);
    form.value.republic_id = this.republicId;
    form.value.username = this.username;
    this.commentService.createComment(form.value).subscribe(
      (res) => {
        console.log(res);
        this.getRepublicWithComments(this.republicId);
      },
      (err) => {
        console.log(err);
      });
  }

  sendEditComment(form){
    console.log(form);
    console.log(form.value);
    this.commentService.updateComment(this.commentId, form.value).subscribe(
      (res) => {
        console.log(res);
        this.getRepublicWithComments(this.republicId);
      },
      (err) => {
        console.log(err);
      }
    );
    this.editMode = false;
  }

  toggleEdit(id){
    this.editMode = true;
    this.commentId = id;
    console.log(id)
  }

  deleteComment(id){
    console.log('Mais que cancelado: ' + id);
    this.commentService.deleteComment(id).subscribe(
      (res) => {
        console.log(res);
        this.getRepublicWithComments(this.republicId);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getRepublicWithComments(id) {
    this.commentService.showRepublicWithComments(id).subscribe(
      (res) => {
        this.republic = res.republic;
        this.comments = res.comments;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
