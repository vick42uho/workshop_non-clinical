import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShareService } from '../ShareService';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})
export class PetComponent implements OnInit {

  customers: any
  customer = {
    name: null,
    code: null,
    _id: null
  }

  pets: any

  pet = {
    customer_id: null,
    name: null,
    remark: null
  }

  constructor(private http: HttpClient, private shareService: ShareService) { }

  ngOnInit(): void  {
    this.loadCustomers()
    this.loadPets()
  }

  loadCustomers() {
    this.http.get(this.shareService.serverPath + '/customerAll').subscribe((res: any) => {
      this.customers = res
    })
  }

  chooseCustomer(customer) {
    this.customer = customer
  }

  save() {
    this.pet.customer_id = this.customer._id
    this.http.post(this.shareService.serverPath + '/petSave', this.pet).subscribe((res: any) =>{
      alert("บันทึกสำเร็จ");
      this.loadPets()
      this.pet.name = '';
      this.pet.remark = '';
      this.customer.name = '';
    })
  }

  loadPets() {
    this.http.get(this.shareService.serverPath + '/petAll',).subscribe((res: any) => {
      this.pets = res
    })
  }

  deletePet(item) {
    if (confirm('ยืนยันการลบ ?')) {
      this.http.post(this.shareService.serverPath + '/petDelete', item).subscribe((res: any) => {
        this.loadPets()
        this.pet.name = '';
      this.pet.remark = '';
      this.customer.name = '';
    })
  }
  }

  editPet(item) {
    this.pet = item;
    this.customer = item.customer[0];
  }


}