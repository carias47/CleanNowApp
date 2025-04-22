import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css'],
})
export class StarRatingComponent {
  @Input() rating: number = 0; // la calificación

  hoveredRating: number | null = null;
  stars: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.rating) {
      this.updateStars();
    }
  }

  ngOnInit(): void {
    this.updateStars();
  }

  private updateStars(): void {
    this.stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= this.rating) {
        this.stars.push('full');
      } else if (i - 0.5 <= this.rating) {
        this.stars.push('half');
      } else {
        this.stars.push('empty');
      }
    }
  }

  getStarImage(starType: string): string {
    switch (starType) {
      case 'full':
        return 'assets/images/start-gold.svg';
      case 'half':
        return 'assets/images/start-half-gold.svg';
      case 'empty':
      default:
        return 'assets/images/start-grey.svg';
    }
  }
}
