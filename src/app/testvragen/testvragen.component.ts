import {take} from 'rxjs/operators';
import {Component, OnInit} from '@angular/core';
import {AntwoordModel, TestvraagModel} from '../testvragen.service';
import * as _ from 'lodash';
import {IKandidaat} from '../interface/IKandidaat';
import {IAflevering} from '../interface/IAflevering';
import {Observable} from 'rxjs';
import {IAppState} from '../store/store';
import {Store} from '@ngrx/store';
import {getActiveKandidaten} from '../store/kandidaten/kandidaten.reducer';
import {AddTestVraagInProgress, FetchTestvragenInProgress, UpdateTestVraagInProgress} from '../store/testvragen/testvragen.actions';
import {getAfleveringVoorTestvragen, getTestvragen} from '../store/testvragen/testvragen.reducer';
import {IActies} from '../interface/IActies';

@Component({
  selector: 'app-testvragen',
  templateUrl: './testvragen.component.html',
  styleUrls: ['./testvragen.component.css']
})
export class TestvragenComponent implements OnInit {
  kandidaten$: Observable<IKandidaat[]>;
  kandidaten: IKandidaat[];
  acties$: Observable<IActies>;
  afleveringen$: Observable<IAflevering[]>;
  activeAflevering$: Observable<number>;
  testVragen$: Observable<TestvraagModel[]>;

  currentAflevering: number;
  form: TestvraagModel;
  defaultAntwoord: AntwoordModel = {
    antwoord: '',
    kandidaten: []
  };
  showEditMenu: Boolean = false;
  showEditVraag: Boolean = false;

  constructor(private store: Store<IAppState>) {
  }

  ngOnInit() {
    // todo prefill current aflevering

    this.currentAflevering = 1;
    this.store.dispatch(new FetchTestvragenInProgress(this.currentAflevering));

    this.afleveringen$ = this.store.select('afleveringen');
    this.testVragen$ = this.store.select(getTestvragen);
    this.acties$ = this.store.select('acties');
    this.kandidaten$ = this.store.select(getActiveKandidaten);
    this.kandidaten$.subscribe(kandidaten => this.kandidaten = kandidaten);
    this.activeAflevering$ = this.store.select(getAfleveringVoorTestvragen);
    // this.acties$.take(1).subscribe(response => { this.resetTestvraagForm();
    this.resetTestvraagForm();
  }

  fetchTestvragenVoorAflevering() {
    this.store.dispatch(new FetchTestvragenInProgress(this.currentAflevering));
  }

  addAntwoord() {
    this.form.antwoorden.push(_.cloneDeep(this.defaultAntwoord));
  }

  cancelVraag() {
    this.resetTestvraagForm();
    this.showEditMenu = false;
    this.showEditVraag = false;
  }

  addTestVraag() {
    this.showEditMenu = true;
  }

  deleteAntwoord(index) {
    this.form.antwoorden.splice(index, 1);
  }

  resetTestvraagForm() {
    this.form = {
      aflevering: this.currentAflevering,
      vraag: '',
      antwoorden: [_.cloneDeep(this.defaultAntwoord)]
    };
  }

  saveTestVraag() {
    this.form = {
      ...this.form,
      aflevering: +this.currentAflevering
    };

    this.store.dispatch(new AddTestVraagInProgress(this.form));
    this.showEditMenu = false;
    this.showEditVraag = false;
    this.resetTestvraagForm();
  }

  updateTestVraag() {
    this.store.dispatch(new UpdateTestVraagInProgress(this.form));
    this.showEditMenu = false;
    this.showEditVraag = false;
    this.resetTestvraagForm();
  }

  editVraag(vraag: TestvraagModel) {
    this.form = _.cloneDeep(vraag);
    // this.kandidaten$.take(1).subscribe(kandidaten => {
    //   this.kandidaten = kandidaten;
    // });
    this.showEditVraag = true;
  }

  areAllKandidatenSelected() {
    let selectedKandidaten = 0;
    let remainingKandidaten: IKandidaat[] = [];
    let activeKandidaten: IKandidaat[] = [];
    this.kandidaten$.pipe(take(1)).subscribe(kandidaten => {
      remainingKandidaten = _.cloneDeep(kandidaten);
      activeKandidaten = _.cloneDeep(kandidaten);
      this.form.antwoorden.forEach(antwoord => {
        selectedKandidaten = selectedKandidaten + antwoord.kandidaten.length;
        antwoord.kandidaten.forEach(kandidaat => {
          const selectedKandidaat = _.find(remainingKandidaten, {id: kandidaat.id});
          if (selectedKandidaat) {
            _.remove(remainingKandidaten, {
              id: selectedKandidaat.id
            });
            kandidaat.selected = true;
            selectedKandidaat.selected = true;
          }
        });
      });
    });
    return (activeKandidaten.length === selectedKandidaten
      && remainingKandidaten.length === 0
      && this.form.vraag
    );
  }
}

// return (this.kandidaten.length === selectedKandidaten
//   && (_.filter(mutatedKandidaten, {selected: true}).length === this.kandidaten.length));
// }
