import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { LibService } from 'src/app/services/lib/lib.service';
import { UserDashboardComponent } from '../user-dashboard/user-dashboard.component';

@Component({
  selector: 'app-mat-overlay',
  templateUrl: './mat-overlay.component.html',
  styleUrls: ['./mat-overlay.component.css']
})
export class MatOverlayComponent implements OnInit {

  disabled:boolean=false

  constructor(public dialogRef: MatDialogRef<UserDashboardComponent>,@Inject(MAT_DIALOG_DATA) public data:any,public libService:LibService) { }

  ngOnInit(): void {
  }

  async close(id:string){
    this.disabled=true
    const resp = await this.libService.CloseTicket(id)
    this.dialogRef.close()
    window.location.reload();
  }

}
