import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-qualifications',
  templateUrl: './qualifications.component.html',
  styleUrls: ['./qualifications.component.css']
})
export class QualificationsComponent {
  @Input() editable: boolean = true; // Permite al usuario calificar si es verdadero
  @Input() rating: number = 0; // la calificación
  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>(); // Emite la nueva calificación

  hoveredRating: number | null = null;
  stars: string[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.updateStars();
  }
  onStarClick(index: number): void {
    if (this.editable) {
      // Si es editable, actualiza la calificación y emite el evento
      this.rating = index + 1;
      this.ratingChange.emit(this.rating);
      this.updateStars();
    }
  }
  trackByIndex(index: number, item: any): number {
    return index;
  }
  onStarHover(index: number): void {
    this.hoveredRating = index + 1;
    this.updateStars();
    this.cdr.detectChanges();
  }

  onStarLeave(): void {
    this.hoveredRating = null;
    this.updateStars();
  }

  private updateStars(): void {
    this.stars = [];
    const ratingToShow =
      this.hoveredRating !== null ? this.hoveredRating : this.rating;
    for (let i = 1; i <= 5; i++) {
      if (i <= ratingToShow) {
        this.stars.push('full');
      } else if (i - 0.5 <= ratingToShow) {
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
