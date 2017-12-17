import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {KandidaatModel, KandidatenService} from '../kandidaten.service';

@Component({
  selector: 'app-kandidaten',
  templateUrl: './kandidaten.component.html',
  styleUrls: ['./kandidaten.component.css']
})
export class KandidatenComponent implements OnInit {
  kandidatenSub: Subscription;
  kandidaten: KandidaatModel[];
  saveKandidatenSub: Subscription;
  isEditActive: boolean;
  activeKandidaat: KandidaatModel;

  constructor(private kandidatenService: KandidatenService) {
  }

  ngOnInit() {
    this.kandidatenSub = this.kandidatenService.getKandidaten().subscribe(response => {
      this.kandidaten = response;
    });
  }

  saveKandidaat() {
    this.saveKandidatenSub =  this.kandidatenService.saveKandidaat(this.activeKandidaat).subscribe( response => {
      console.log(this.activeKandidaat.display_name + ' is opgeslagen');
      this.isEditActive = false;
      this.activeKandidaat = null;
    });
  }

  editKandidaat(kandidaat) {
    this.isEditActive = true;
    this.activeKandidaat = kandidaat;
  }

  cancelKandidaat(kandidaat) {
    this.isEditActive = false;
    this.activeKandidaat = null;
  }
}
