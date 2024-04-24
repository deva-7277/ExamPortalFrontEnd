import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Result } from 'src/_model/result.model';
import { LoginService } from 'src/app/services/login.service';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import { ResultService } from 'src/app/services/result.service';
import Swal from 'sweetalert2';
// import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {

  qid:any;
  questions:any;
  quizName:any;
  catId:number;
  result:any;
  
  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;

  isSubmit = false;

  timer: any;
  user:any =null;
  quiz:any =null;

 
    status:any;
    // categoryId:any;
    // quizId:any;
    // examId:any;
    // studentId:any;
    // correct:any;
    // incorrect:any;
    // marksObtained:any;
    grade:any;
    remark:any;


    currentDate = new Date();
    
    



  constructor(
    private locationSt: LocationStrategy,
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private login:LoginService,
    private _quiz: QuizService,
    private _result: ResultService,
    // private datePipe: DatePipe
  ) {}

  

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params['qid'];
    console.log(this.qid);
    this.loadQuestions();
    this.user = this.login.getUser();
    this.quiz = this._quiz.getQuiz(this.qid);

  }
  
  loadQuestions() {
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data: any) => {
        this.questions = data;

        this.timer = this.questions.length * 2 * 60;

        // this.questions.forEach((q:any) => {
        //   q['givenAnswer'] = '';
        // });

        console.log(this.questions);
        this.startTimer();
      },

      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading questions of quiz', 'error');
      }
    );
  }

  preventBackButton() {
    history.pushState(null, "", location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, "", location.href);
    });
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: `Submit`,
      icon: 'info',
    }).then((e) => {
      if (e.isConfirmed) {
        this.evalQuiz();
      }
    });
  }

  startTimer() {
    let t = window.setInterval(() => {
      //code
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`;
  }

  

  

  evalQuiz() {
    // //calculation
    // this.isSubmit = true;

    // this.questions.forEach((q:any) => {
    //   if (q.givenAnswer == q.answer) {
    //     this.correctAnswers++;
    //     let marksSingle =
    //       this.questions[0].quiz.maxMarks / this.questions.length;
    //     this.marksGot += marksSingle;
    //   }

    //   if (q.givenAnswer.trim() != '') {
    //     this.attempted++;
    //   }
    // });

    // console.log('Correct Answers :' + this.correctAnswers);
    // console.log('Marks Got ' + this.marksGot);
    // console.log('attempted ' + this.attempted);

    // console.log(this.questions);


    // Call server to evaluate Quiz
    this._question.evalQuiz(this.questions).subscribe(
      (data: any)=>{
        console.log(data);
        this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
        this.attempted = data.attempted;
        this.correctAnswers = data.correctAnswers;
        this.isSubmit = true;
        this.catId = data.catId;
        if((this.marksGot/(this.questions[0].quiz.maxMarks))*100>=40){
          this.status = "Pass";
        }else{
          this.status = "Fail";
        }
        if((this.marksGot/(this.questions[0].quiz.maxMarks))*100>=80){
          this.grade = "A";
          this.remark = "Excellent";
        }
        else if((this.marksGot/(this.questions[0].quiz.maxMarks))*100>=65){
          this.grade = "B";
          this.remark = "Good";
        }
        else if((this.marksGot/(this.questions[0].quiz.maxMarks))*100>=40){
          this.grade = "C";
          this.remark = "Average";
        }
        else{
          this.grade = "D";
          this.remark = "Below Average";
        }
        this.saveResult();
      },
      (error) =>{
        console.log(error);
      }
    )
  }

saveResult(){
  this.result = new Result();
      this.result.status = this.status;
      this.result.quizId = this.qid;
      this.result.categoryId = this.catId;
      this.result.examId = this.user.id;
      this.result.studentId = this.user.id;
      this.result.attempted = this.attempted;
      this.result.correct = this.correctAnswers
      this.result.incorrect = this.attempted- this.correctAnswers;
      this.result.marksObtained = this.marksGot;
      this.result.grade = this.grade
      this.result.remark = this.remark
  this._result.saveResult(this.result).subscribe(
    (data:any) =>{
      console.log(data);
      this.result = new Result();

    },
    (error:any)=>{
      console.log(error);
    }
  )
}

printPage(){
  window.print();
}
}