import { Slot } from "./../Model/Slot";
import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AdminService } from "../admin.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {

  dateOfDelivery : string ="Thu Sep 20 2018 00:00:00 GMT+0530 (India Standard Time)"
  data : any;
  slotCapacity= [0,0,0];
  vehicleTime: number[][]=[[0,0,0],[0,0,0],[0,0,0]];
  orderNumber: number[][]=[[0,0,0],[0,0,0],[0,0,0]];
  public slots= [];

  //Pie Chart properties
  public pieChartLabels: string[] = ["Filled", "Empty"];
  public pieChartType: string = "pie";

  //Bar Chart properties
  public barChartLabels: string[] = ["Vehicle 1", "Vehicle 2", "Vehicle 3"];
  public barChartType: string = "bar";
  public barChartLegend: boolean = true;

  public vehicleData: any[][]=[[{},{}],[{},{}],[{},{}]];


  slotLabel2="Empty";
  slotLabel3="Vehicle Covered Distance";
  slotLabel4="No. Of Orders Placed";


  constructor(private http: HttpClient, private admin: AdminService) {}

  ngOnInit() {}

  onDate(dateOfDelivery){

    this.admin.getSlotData(this.dateOfDelivery).subscribe(data => {
      this.data=data;
      for(let i = 0; i < this.data.length; i++){
        console.log(i);
        for(let j=0; j<this.data[i].slotVehicle.length; j++){
          this.slotCapacity[i] =this.slotCapacity[i] + parseInt(this.data[i].slotVehicle[j].vehicleLoadedCapacity);
          this.vehicleTime[i][j] = parseInt(this.data[i].slotVehicle[j].vehicleRouteDuration);
          this.orderNumber[i][j] = parseInt(this.data[0].slotVehicle[j].vehicleRoute.length);
        }
      }

      for(let i=0; i<this.data.length; i++){
        console.log(i);
          this.slots[i]=[this.slotCapacity[i],17010000 - this.slotCapacity[i]];
            this.vehicleData[i]=[
              { data: this.vehicleTime[i], label: "Vehicle Route Duration" },
              { data: this.orderNumber[i], label: "Orders In The Route" }
            ];
            console.log(this.vehicleTime);
          console.log(this.vehicleData);

      }
    });
  }

  onVehicle(slot,vehicle){
    this.admin.getSlotData(this.dateOfDelivery).subscribe(data => {
      this.data=data;
    });
    for(let i = 0; i < this.data.length; i++){
      
    }
  }


}
