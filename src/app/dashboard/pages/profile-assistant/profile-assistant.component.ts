import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { AllCategories } from '../../interfaces/categories.interface';
import { AllEmployees } from '../../interfaces/employees.interface';
import { AuxiliarsToService } from '../../interfaces/auxiliars.interface';

@Component({
  selector: 'app-profile-assistant',
  templateUrl: './profile-assistant.component.html',
  styleUrls: ['./profile-assistant.component.css'],
})
export class ProfileAssistantComponent {
  @Input() dataRespone: AuxiliarsToService[] = [];
  data: AuxiliarsToService;
  categorias: AllCategories[] = [];
  subGrupos: AllCategories[] = [];
  isLoading: boolean = true;
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.productService.employees(id, 2).subscribe(
        (data) => {
          const employee = data.find((r) => r.id == id);
          if (employee) {
            this.data = employee;
            this.isLoading = false;
          } else {
            this.router.navigate(['/']);
          }
        },
        (err) => {
          this.router.navigate(['/']);
        }
      );
    }
  }
  onImageError(item: any) {
    const defaultImage: string = '../../../../assets/images/no-image.jpg';
    item.employee.user.profileImage = defaultImage;
  }
}
