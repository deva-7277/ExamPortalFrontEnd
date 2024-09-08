// src/app/services/topQuizResult.service.spec.ts

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TopQuizResultService } from './topQuizResult.service'; // Update the import path if necessary

describe('TopQuizResultService', () => {
  let service: TopQuizResultService;
  let httpTestingController: HttpTestingController;
  const baseUrl = 'http://localhost:8080'; // Ensure this matches your actual base URL

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule
      providers: [TopQuizResultService] // Provide the service
    });

    service = TestBed.inject(TopQuizResultService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensure no outstanding requests remain
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch top quiz results', () => {
    const mockResults = [{ propertyName: 'Result 1' }, { propertyName: 'Result 2' }];
    const quizId = 59;
    const pageSize = 3;
    const pageNumber = 0;
    const limit = 3;

    // Call the service method
    service.getTopQuizResults(quizId, pageSize, pageNumber, limit).subscribe(results => {
      expect(results).toEqual(mockResults);
    });

    // Mock the HTTP request
    const req = httpTestingController.expectOne(`${baseUrl}/top-results/quiz/${quizId}?pageSize=${pageSize}&pageNumber=${pageNumber}&limit=${limit}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockResults);
  });
});
