import {Component, OnInit} from '@angular/core';

import {environment} from '../../environments/environment';

@Component({
  selector: 'app-lab3',
  templateUrl: './lab3.component.html',
  styleUrls: ['./lab3.component.scss']
})
export class Lab3Component implements OnInit {

  version: string = environment.version;
  statesHistory: State[];
  test: State[];
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
    this.statesHistory = [];
  }

  ngOnInit() {
  }

  startAlgorithm() {
    let iteration = 0;
    let states = [this.currentState];
    while (!this.checkIfHasAnswer(states)) {
      console.log(iteration);
      iteration++;
      states = this.generateCheckQueueForEntries(states);
      console.log(states);
      if (states.length === 0) {
        console.log('no results');
        return;
      }
      this.statesHistory = this.statesHistory.concat(states);
    }
    this.resultFound = true;
    this.currentState = this.checkIfHasAnswer(states);
    this.result = {
      iteration,
      case: this.currentState.red === this.currentState.blue ? 'All Become Green' : this.currentState.red === this.currentState.green ? 'All Become Blue' : this.currentState.green === this.currentState.blue ? 'All Become Red' : 'No'
    };
    if (this.currentState.red === this.currentState.blue) {
      this.result.iteration = this.result.iteration + this.currentState.red;
    }
    if (this.currentState.green === this.currentState.blue) {
      this.result.iteration = this.result.iteration + this.currentState.green;
    }
    if (this.currentState.red === this.currentState.green) {
      this.result.iteration = this.result.iteration + this.currentState.red;
    }
    console.log('result found');
  }

  checkIfHasAnswer(array: any) {
    return array.find((x: State) => x.red === x.blue || x.red === x.green || x.green === x.blue);
  }

  generateCheckQueueForEntries(array: any) {
    let result: any = [];
    array.forEach((arr: any) => {
      const redGreen = {
        red: arr.red - 1,
        green: arr.green - 1,
        blue: arr.blue + 2
      };
      const redBlue = {
        red: arr.red - 1,
        green: arr.green + 2,
        blue: arr.blue -1
      };
      const greenBlue = {
        red: arr.red + 2,
        green: arr.green - 1,
        blue: arr.blue - 1
      };
      if (!this.checkIfOcassionInArray(redGreen)) result.push(redGreen);
      if (!this.checkIfOcassionInArray(redBlue)) result.push(redBlue);
      if (!this.checkIfOcassionInArray(greenBlue)) result.push(greenBlue);
    });
    return result;
  }

  checkIfOcassionInArray(values: State) {
    return this.statesHistory.find((x: State) => x.red === values.red && x.blue === values.blue && x.green === values.green);
  }

}

class State {
  red: number;
  green: number;
  blue: number;
  redGreen?: boolean;
  redBlue?: boolean;
  greenBlue?: boolean;
}
