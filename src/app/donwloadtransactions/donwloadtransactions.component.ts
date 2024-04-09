import { Component, Input } from '@angular/core';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-donwloadtransactions',
  templateUrl: './donwloadtransactions.component.html',
  styleUrls: ['./donwloadtransactions.component.css']
})
export class DonwloadtransactionsComponent {
  @Input() data: any;
  exportToExcel() {

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Transactions');

    XLSX.writeFile(wb, 'transactions.xlsx');
  }
}
