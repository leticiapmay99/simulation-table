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
    customers = new Array();


    tempoFinal: any
    GlobalTempoMedioFila: any
    GlobalProbabilidadeClientefila: any
    GlobalProbabilidadeOperadorLivre:  any
    GlobalTempoMedioServico:  any
    GlobalTempoMedioDespendidoSistema:  any

    avgTempoMedioFila: any
    avgProbabilidadeClientefila: any
    avgProbabilidadeOperadorLivre:  any
    avgTempoMedioServico:  any
    avgTempoMedioDespendidoSistema:  any

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

    randomTec() {
        let vlsTec = Math.floor(Math.random() * this.tecArray.length);
        return parseInt(this.tecArray[vlsTec]);
    }
    randomTs() {
        let vlsTs = Math.floor(Math.random() * this.tsArray.length);
        return parseInt(this.tsArray[vlsTs]);
    }

    sendData() {
        const TIME = this.form1.get('time')?.value
        let clockSystem = 0;
        let TempoFinalServicoNoRelogio = 0
        let TempoMedioFila = 0
        let ProbabilidadeClientefila = 0
        let ProbabilidadeOperadorLivre = 0
        let TempoMedioServiço = 0
        let TempoMedioDespendidoSistema = 0

        while (clockSystem < TIME) {
            let tec = this.randomTec();

            let ts  = this.randomTs();

            let client = {
                tec: tec,
                ts: ts,
                TempoChegadaNoRelogio: clockSystem + tec,
                
                TempoLivreOperador: 0,
                TempoClienteFila: 0,
                TempoInicio: 0,
                TempoFinal: 0,
                TempoSistema: 0,


            };
            
            if(TempoFinalServicoNoRelogio < client.TempoChegadaNoRelogio) {
                client.TempoLivreOperador= client.TempoChegadaNoRelogio - TempoFinalServicoNoRelogio
            } else {   
                client.TempoLivreOperador = 0    
            }

            if(TempoFinalServicoNoRelogio >= client.TempoChegadaNoRelogio) {              
                client.TempoClienteFila =  TempoFinalServicoNoRelogio - client.TempoChegadaNoRelogio
            } else {  
                client.TempoClienteFila= 0
            }

            client.TempoInicio  = client.TempoChegadaNoRelogio + client.TempoClienteFila;
            client.TempoFinal = client.TempoInicio + ts;
            client.TempoSistema = (client.TempoFinal - client.TempoInicio) + client.TempoClienteFila;
            TempoFinalServicoNoRelogio = client.TempoFinal


            this.tempoFinal = client.TempoFinal
            this.GlobalTempoMedioFila = TempoMedioFila += client.TempoClienteFila;
            this.GlobalProbabilidadeClientefila = ProbabilidadeClientefila += client.TempoClienteFila;
            this.GlobalProbabilidadeOperadorLivre = ProbabilidadeOperadorLivre  += client.TempoLivreOperador
            this.GlobalTempoMedioServico =  TempoMedioServiço += ts
            this.GlobalTempoMedioDespendidoSistema = TempoMedioDespendidoSistema += client.TempoSistema            
            clockSystem += tec;
            this.customers.push(client);
        }



        this.avgTempoMedioFila = (this.GlobalTempoMedioFila / this.customers.length).toFixed(2)
        this.avgProbabilidadeClientefila = (this.GlobalProbabilidadeClientefila / this.customers.length).toFixed(2)
        this.avgProbabilidadeOperadorLivre = (this.GlobalProbabilidadeOperadorLivre / this.tempoFinal).toFixed(2)
        this.avgTempoMedioServico = (this.GlobalTempoMedioServico / this.customers.length).toFixed(2)
        this.avgTempoMedioDespendidoSistema = (this.GlobalTempoMedioDespendidoSistema / this.customers.length).toFixed(2)
    }

}
