import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { forkJoin } from 'rxjs';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

import { CrudService } from './crud.service';
import { Data } from './data.interface';

import { CdkDragDrop, CdkDropList, CdkDrag, CdkDragHandle, moveItemInArray } from '@angular/cdk/drag-drop';

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
    MatButtonModule,
    CdkDropList,
    CdkDrag,
    CdkDragHandle
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
      this.data = data.sort((a, b) => a.listIndex - b.listIndex);
      this.dataString = JSON.stringify(this.data);
    })
  }

  addData(text: string) {
    this.crudService.postData(text).subscribe(newData => {
      console.log(JSON.stringify(newData));
    })
  }

  drop(event: CdkDragDrop<any[]>) {
    // Update the local order of the items array
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);

    // Update the listIndex of each item to match its new order
    this.data.forEach((item, index) => {
      item.listIndex = index;
    });

    // Prepare the patch requests to update each item's listIndex on the server
    const patchRequests = this.data.map(item => {
      return this.crudService.patchData(item.id, { listIndex: item.listIndex });
    });

    // Execute all patch requests in parallel
    forkJoin(patchRequests).subscribe(
      () => {
        console.log('Reordered items successfully patched to the server.');
      },
      (error) => {
        console.error('Failed to patch reordered items to the server:', error);
      }
    );
  }

  ngOnInit() {
    this.showData();
  }
}
