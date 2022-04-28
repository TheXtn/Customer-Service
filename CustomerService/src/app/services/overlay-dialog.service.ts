import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatOverlayComponent } from '../components/mat-overlay/mat-overlay.component';

@Injectable({
  providedIn: 'root'
})
export class OverlayDialogService {

  constructor(private dialog:MatDialog) { }

  openOverlay(){
    this.dialog.open(MatOverlayComponent,{
      width: '300px'
    })
  }
}
