import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { CrudService } from './crud.service';
import { Data } from './data.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-jsonserver-crud';
  data: Data[];
  dataString: string;
  myText: string;

  constructor(private crudService: CrudService) {
    this.data = [];
    this.dataString = "";
    this.myText = "";
  }

  showData() {
    this.crudService.getData().subscribe(data => {
      this.data = data;
      this.dataString = JSON.stringify(this.data);
    })
  }

  addData(text: string) {
    this.crudService.postData(text).subscribe(newData => {
      console.log(JSON.stringify(newData));
    })
  }

  ngOnInit() {
    this.showData();
  }
}
