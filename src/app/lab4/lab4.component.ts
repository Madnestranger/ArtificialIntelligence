import { Component, OnInit } from '@angular/core';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-lab4',
  templateUrl: './lab4.component.html',
  styleUrls: ['./lab4.component.scss']
})
export class Lab4Component implements OnInit {

  version: string = environment.version;
  history: State[];
  stack: State[];
  currentState: State = {
    red: 13,
    green: 16,
    blue: 17,
    redBlue: false,
    redGreen: false,
    greenBlue: false
  };
  resultFound = false;
  result: any;

  constructor() {
    this.stack = [];
  }

  ngOnInit() { }

  startAlgorithm() {
    let iteration = 0;
    while (!this.checkIfHasAnswer()) {
      console.log(iteration);
      iteration++;
      this.stack = this.stack.concat(this.generateCheckQueueNewEntry());
      this.currentState = this.checkBestVariant();
      if (this.stack.length === 0) {
        console.log('no results');
        return;
      }
      if (this.currentState.red === this.currentState.blue ||
        this.currentState.red === this.currentState.green ||
        this.currentState.green === this.currentState.blue) {
        console.log('answer:');
        console.log(this.currentState);
      }
    }
    this.resultFound = true;
    this.result = {
      iteration,
      case: this.currentState.red === this.currentState.blue ? 'All Become Green' : this.currentState.red === this.currentState.green ? 'All Become Blue' : this.currentState.green === this.currentState.blue ? 'All Become Red' : 'No'
    };
    console.log('result found');
  }

  checkBestVariant() {
    this.stack.forEach((state: State) => {
      if (state.red === state.green || state.red === state.blue || state.green === state.blue) {
        state.order = 0;
      } else {
        if (state.blue - state.red === 3 || state.blue - state.green === 3
          || state.green - state.blue === 3 || state.green - state.red === 3
          || state.red - state.green === 3 || state.red - state.blue === 3) {
          state.order = 1;
        }
        else {
          state.order = 2;
        }
      }
    });
    this.stack = _.sortBy(this.stack, 'order');
    return _.first(this.stack);
  }

  generateCheckQueueNewEntry() {
    return [
      {
        red: this.currentState.red - 1,
        blue: this.currentState.blue - 1,
        green: this.currentState.green + 2
      },
      {
        red: this.currentState.red - 1,
        blue: this.currentState.blue + 2,
        green: this.currentState.green - 1
      },
      {
        red: this.currentState.red + 2,
        blue: this.currentState.blue - 1,
        green: this.currentState.green - 1
      }
    ];
  }

  checkIfHasAnswer() {
    return this.currentState.red === this.currentState.green
    || this.currentState.red === this.currentState.blue
    || this.currentState.blue === this.currentState.green;
  }

}

class State {
  red: number;
  green: number;
  blue: number;
  redGreen?: boolean;
  redBlue?: boolean;
  greenBlue?: boolean;
  order?: number;
}
