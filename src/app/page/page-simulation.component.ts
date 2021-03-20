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

    addTec(){
        const tec = this.form1.get('tec')?.value
        this.tecArray.push(tec) 
    }
    addTs(){
        const tec = this.form1.get('ts')?.value
        this.tsArray.push(tec)
    }
    sendData() {
        const TIME = this.form1.get('time')?.value

        // this.tsArray.forEach((element:any) => {
        //     console.log(element);
        //     console.log(randomElement);
        // });
        const randomElement = this.tsArray[(Math.random() * this.tsArray.length)];
        console.log(randomElement);

        // this.tecArray.forEach((element:any) => {
        //     console.log(element);
        // });
    }

}
