import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShareService } from '../ShareService';

/**
 * วิธี call ne tive java scri และไปสร้าง script ที่ index.html >> function ปิดหน้าต่าง Modal
 */
declare function closeModal(): any;

@Component({
  selector: 'app-repair',
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.css']
})
export class RepairComponent implements OnInit {

  customers: any
  pets: any
  medicines: any

  repairs: any

  customer = {
    name: null,
    code: null,
    _id: null
  }

  pet = {
    _id: null,
    name: null,
    problem: null
  }

  repair = {
    _id: null,
    problem: null,
    price: null,
    remark: null
  }


  repairMedicine = {
    _id: null,
    qty: null,
    remark: null,
    medicine_id: null,
    repair_id: null
  }

  historys: any;




  constructor(private http: HttpClient, private shareService: ShareService) { }

  ngOnInit(): void  {
    this.loadCustomers()
  }

  loadCustomers() {
    this.http.get(this.shareService.serverPath + '/customerAll').subscribe((res: any) => {
      this.customers = res
    })
  }

  chooseCustomer(customer) {
    this.customer = customer
    this.loadPets()
  }

  loadPets(){
    this.http.post(this.shareService.serverPath + '/petOfCustomer', this.customer).subscribe((res: any) => {
      this.pets = res
    })

  }

  choosePet(item) {
    this.pet = item
    this.loadRepairOfPet()
  }

  saveRepair() {
    var params = {
      repair: this.repair,
      pet: this.pet
    }

    this.http.post(this.shareService.serverPath + "/repairSave", params).subscribe((res: any) => {
      this.loadRepairOfPet()
      alert("บันทึกข้อมูลสำเร็จ")
      // clear object & form input

    })
  }

/**
 * ประวัติการรักษา
 */
  loadRepairOfPet() {
    var params = {
      pet_id: this.pet._id
    }

    this.http.post(this.shareService.serverPath + "/repairOfPet", params).subscribe((res: any) => {
      this.repairs = res
      console.log(res)
    })
  }

  /**
   * ลบข้อมูลประวัติการรักษา ที่เลือก
   */

   removeRepair(item) {
     if (confirm("ยืนยันการลบ")) {
      this.http.post(this.shareService.serverPath + "/repairRemove", item).subscribe((res: any) => {
        this.loadRepairOfPet()
        alert("ลบรายการสำเร็จ")
     })
    }
   }

   /**
    * แก้ไขรายการประวัติ
    */
   editRepair(item){
     this.repair = item
   }

   modalMedicine(item) {
     this.repairMedicine.repair_id = item._id;
     this.http.get(this.shareService.serverPath + '/medicineAll', item).subscribe((res: any) => {
       this.medicines = res
     })
   }

   saveRepairMedicine() {
    if (confirm("ยืนยันการบันทึก ?")) {
    this.http.post(this.shareService.serverPath + "/repairMedicineSave", this.repairMedicine).subscribe((res: any) => {
      closeModal();
    })
  }
}

chooseMedicine(item){
  this.repairMedicine.medicine_id = item._id
}

modalHistory(item){
  this.http.post(this.shareService.serverPath + '/history', item).subscribe((res: any) => {
    this.historys = res;
  })
}


removeHistory(item) {
  if (confirm('ยืนยันการลบประวัติ ?')) {
    this.http.post(this.shareService.serverPath + '/historyRemove', item).subscribe((res: any) => {
      var newItem = {
        _id: item.repair_id
      }
      this.modalHistory(newItem);
    })
  }
}

editHistory(item) {
  this.repairMedicine = item
}


}
