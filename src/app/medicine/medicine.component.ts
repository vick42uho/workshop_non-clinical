import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShareService } from '../ShareService';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css']
})
export class MedicineComponent implements OnInit {

  medicine = {
    code: null,
    name: null,
    sale: null,
    buy: null,
    remark: null,
    _id: null
  }

  medicines : any

  constructor(private http: HttpClient, private shareService: ShareService) { }
  

  ngOnInit(): void {
    this.loadData()
  }

  save() {
    if (confirm("ยืนยันการบันทึก")) {
      var path = this.shareService.serverPath + "/medicineSave";

      if (this.medicine._id != null) {
        path = this.shareService.serverPath + "/medicineUpdate"
      }
      console.log(this.medicine);
    
      this.http.post(path, this.medicine).subscribe((res: any)=>{
        alert("บันทึกสำเร็จ")
        // clear object & form input
        this.medicine = {
          code: null,
          name: null,
          sale: null,
          buy: null,
          remark: null,
          _id: null
        }
        this.loadData()
    });
   }
  }

  loadData() {
    this.http.get(this.shareService.serverPath + '/medicineAll').subscribe((res: any) => {
      this.medicines = res
    })
  }

  medicineDelate(item) {
    if (confirm("ยืนยันการลบ ?")) {
      var param = {
        _id: item._id
      }
      var path = this.shareService.serverPath + '/medicineDelate'
      this.http.post(path, param).subscribe((res: any) => {
        alert("ลบรายการสำเร็จ")
        this.loadData()
      })
    }
  }

  medicineInfo(item) {
    this.medicine = {
      code: item.code,
      name: item.name,
      sale: item.sale,
      buy: item.buy,
      remark: item.remark,
      _id: item._id
    }
  }

}
