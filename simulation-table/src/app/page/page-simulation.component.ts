import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-page-simulation',
    templateUrl: 'page-simulation.component.html',
    styleUrls: ['page-simulation.component.css'],
})

export class PageSimulation implements OnInit {
    
    constructor(private fb: FormBuilder) {}


    form1: FormGroup
    tecArray = [] as any
    tsArray = [] as any

    ngOnInit(): void {
        this.formCreation();
    }
    formCreation() {
        this.form1 = this.fb.group({
            time: [''],
            tec: [''],
            ts: ['']
        });
    }
    sendData() {
        const TIME = this.form1.get('time')?.value

        
    }
    addTec(){
        const tec = this.form1.get('tec')?.value
        this.tecArray.push(tec)
        console.log(this.tecArray);
        this.tecArray.forEach((element:any) => {
            console.log(element);
        });
    }
    addTs(){
        const tec = this.form1.get('ts')?.value
        this.tsArray.push(tec)
        console.log(this.tsArray);
        this.tsArray.forEach((element:any) => {
            console.log(element);
        });
    }
   
}
