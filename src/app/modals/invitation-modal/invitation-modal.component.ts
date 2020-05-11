import { Component, Inject, ChangeDetectorRef, NgZone } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { HelperService } from 'src/app/services/helper-service/helper.service';
import { BusinessService } from 'src/app/services/business-service/business.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-invitation-modal',
  templateUrl: './invitation-modal.component.html',
  styleUrls: ['./invitation-modal.component.less']
})

export class InvitationModalComponent {
  inviteForm: FormGroup;
  searchResults = [];
  private businessId: number;
  private companyName: string;
  searchResultCheckedArray = [];
  userid: number;
  pagelimit: number = 10;
  offset: number = 0;
  pageNumber: number = 1;
  totalPage: number;

  constructor(private dialogRef: MatDialogRef<InvitationModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data, private _fb: FormBuilder, private helper: HelperService, private businessService: BusinessService, private cd: ChangeDetectorRef, private zone: NgZone, private _toastr: ToastrService) {

    if (this.data) {
      this.userid = Number(this.helper.getuserId());
      this.searchResults = this.data;
      if (this.data && this.data['company']) {
        this.businessId = this.data['company'].id;
        this.companyName = this.data['company'].name;
        this.totalPage = this.data['total'];
      } 
      this.getLists();      
    }
  }

  ngOnInit() {
    this.onChanges();
  }

  onScroll() {
    this.pageNumber++
    this.offset = (this.pageNumber - 1) * this.pagelimit + 1;
    if (this.offset < this.totalPage) {
      this.getLists();
    }
  }


  public getLists() {
    this.businessService.getAllInviteCustomersAndVendors(this.businessId, this.offset, this.pagelimit).subscribe((res) => { 
      if (res['customers'] && res['customers'].length > 0) { 
        this.searchResults['customers'] = [...this.searchResults['customers'], ...res['customers']]
        this.searchResults = this.searchResults;
      } else if (res['vendors'] && res['vendors'].length > 0) {
        this.searchResults['vendors'] = [...this.searchResults['vendors'], ...res['vendors']];
        this.searchResults = this.searchResults;
      }
    }); 
    if(this.searchResults && ((this.searchResults['customers'] && this.searchResults['customers'].length > 0) || (this.searchResults['vendors'] && this.searchResults['vendors'].length > 0))) {
      this.createInviteForm();
      this.onChanges();
    }
  }

  private createInviteForm() {
    const customerFormControls = this.searchResults['customers'].map(control => new FormControl(true));
    const vendorFormControls = this.searchResults['vendors'].map(control => new FormControl(true));

    // Create a FormControl for the select/unselect all checkbox      
    const customerSelectAllControl = new FormControl(true);
    const vendorSelectAllControl = new FormControl(true);

    // Simply add the list of FormControls to the FormGroup as a FormArray, add the selectAllControl separetely
    this.inviteForm = this._fb.group({
      customers: new FormArray(customerFormControls),
      vendors: new FormArray(vendorFormControls),
      selectAllCustomers: customerSelectAllControl,
      selectAllVendors: vendorSelectAllControl,
    });
  }


  onChanges(): void {
    // Subscribe to changes on the selectAll checkbox
    this.inviteForm.get('selectAllCustomers').valueChanges.subscribe(bool => {
      this.inviteForm.get('customers').patchValue(Array(this.searchResults['customers'].length).fill(bool), { emitEvent: false });
    });

    this.inviteForm.get('selectAllVendors').valueChanges.subscribe(bool => {
      this.inviteForm.get('vendors').patchValue(Array(this.searchResults['vendors'].length).fill(bool), { emitEvent: false });
    });

    // Subscribe to changes on the Customers preference checkboxes
    this.inviteForm.get('customers').valueChanges.subscribe(val => {
      console.log('Cust value changes: ', val);
      const allSelectedCustomers = val.every(bool => bool);
      if (this.inviteForm.get('selectAllCustomers').value !== allSelectedCustomers) {
        this.inviteForm.get('selectAllCustomers').patchValue(allSelectedCustomers, { emitEvent: false });
      }
    });

    this.inviteForm.get('vendors').valueChanges.subscribe(val => {
      const allSelectedVendors = val.every(bool => bool);
      if (this.inviteForm.get('selectAllVendors').value !== allSelectedVendors) {
        this.inviteForm.get('selectAllVendors').patchValue(allSelectedVendors, { emitEvent: false });
      }
    });
  }


  sendInvite() {
    const selectedCustomersPreferences = this.inviteForm.value.customers
      .map((checked, index) => {
        console.log('sendinvite::', checked, '-', index);
        if (checked) {
          const customerData = {
            userId: this.userid,
            businessid: this.searchResults['customers'][index].companyId,
            requestType: 2,
            ccId: this.searchResults['customers'][index].id,
            contactType: 1,
            email: this.searchResults['customers'][index].email,
            companyName: this.companyName,
            ccName: this.searchResults['customers'][index].displayName ? this.searchResults['customers'][index].displayName : this.searchResults['customers'][index].companyName
          }
          return customerData;
        }
        else {
          return null;
        }
      })
      .filter(value => value !== null);

    const selectedVendorsPreferences = this.inviteForm.value.vendors
      .map((checked, index) => {
        if (checked) {
          const vendorData = {
            userId: this.userid,
            businessid: this.searchResults['vendors'][index].companyId,
            requestType: 2,
            ccId: this.searchResults['vendors'][index].id,
            contactType: 2,
            email: this.searchResults['vendors'][index].email,
            companyName: this.companyName,
            ccName: this.searchResults['vendors'][index].displayName ? this.searchResults['vendors'][index].displayName : this.searchResults['customers'][index].companyName
          }
          return vendorData;
        }
        else {
          return null;
        }
      })
      .filter(value => value !== null);

    if (selectedCustomersPreferences != undefined && selectedVendorsPreferences != undefined) {
      this.searchResultCheckedArray = [...selectedCustomersPreferences,...selectedVendorsPreferences];
    } else if (selectedCustomersPreferences != undefined && selectedVendorsPreferences === undefined) {
      this.searchResultCheckedArray = selectedCustomersPreferences;
    } else if (selectedVendorsPreferences != undefined && selectedCustomersPreferences === undefined) {
      this.searchResultCheckedArray = selectedVendorsPreferences;
    }

    const inviteSendLists = {
      "isMultiInvite": true,
      "contacts": this.searchResultCheckedArray
    }
    console.log('form saveddd: ', inviteSendLists);
    if (this.searchResultCheckedArray.length > 0) {
      this.businessService.postInvite(inviteSendLists).subscribe((res) => {
        if (res) {
          this._toastr.success(res.message);
          this.close();
        }
      }, (err) => {
        console.log("email failed", err)
      })
    }
  }

  close(): void {
    this.dialogRef.close();
  }

}
