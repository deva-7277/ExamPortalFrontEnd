import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
//import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css'],
})
export class UpdateQuestionComponent implements OnInit {
  public Editor = ClassicEditor;
  quesId:any;
  qTitle:any;
  question:any = {
    quiz: {},
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  };

  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService
  ) {}

  ngOnInit(): void {
    this.quesId = this._route.snapshot.params['quesId'];
    
    this._question.getQuestion(this.quesId).subscribe(
      (data:any) =>{
        this.question = data;
        console.log(this.question);
      },
      (error) =>{
        console.log(error);
      }
    );
  }

  formSubmit() {
    if (this.question.content.trim() == '' || this.question.content == null) {
      return;
    }

    if (this.question.option1.trim() == '' || this.question.option1 == null) {
      return;
    }
    if (this.question.option2.trim() == '' || this.question.option2 == null) {
      return;
    }
    if (this.question.answer.trim() == '' || this.question.answer == null) {
      return;
    }

    //form submit
    this._question.updateQuestion(this.question).subscribe(
      (data: any) => {
        Swal.fire('Success ', 'Question updated.', 'success');
        // this.question.content = '';
        // this.question.option1 = '';
        // this.question.option2 = '';
        // this.question.option3 = '';
        // this.question.option4 = '';
        // this.question.answer = '';
      },
      (error) => {
        Swal.fire('Error', 'Error in updating question', 'error');
      }
    );
  }
}