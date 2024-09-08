import { Component, OnInit } from '@angular/core';
import { TopQuizResultService } from 'src/app/services/topQuizResult.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  topresults: any = [];
  quizzes: any[] = [];
  selectedQuizId: number = 59; // Default quiz ID
  limit: number = 3; // Default limit

  constructor(private _top_quiz_results: TopQuizResultService) {}

  ngOnInit(): void {
    this.loadQuizzes();
    this.loadTopQuizResults();
  }

  loadQuizzes(): void {
    this._top_quiz_results.getQuizNames().subscribe(
      (data: any) => {
        // Process the data to match the expected format
        this.quizzes = data.map((quiz: any) => ({
          id: quiz.qId,
          name: quiz.title
        }));
      },
      (error: any) => {
        console.error('Error fetching quiz names:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong while fetching quiz names!',
        });
      }
    );
  }

  loadTopQuizResults(): void {
    this._top_quiz_results.getTopQuizResults(this.selectedQuizId, this.limit)
      .subscribe(
        (data: any) => {
          this.topresults = data;
        },
        (error: any) => {
          console.error('Error fetching top quiz results:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong while fetching the top quiz results!',
          });
        }
      );
  }

  onQuizChange(event: any): void {
    this.selectedQuizId = event.target.value;
    this.loadTopQuizResults();
  }

  onLimitChange(event: any): void {
    // Ensure limit is a valid number
    const newLimit = parseInt(event.target.value, 10);
    if (!isNaN(newLimit) && newLimit > 0) {
      this.limit = newLimit;
      this.loadTopQuizResults();
    }
  }

  get selectedQuizName(): string {
    const selectedQuiz = this.quizzes.find(quiz => quiz.id === this.selectedQuizId);
    return selectedQuiz ? selectedQuiz.name : 'Unknown Quiz';
  }
}
