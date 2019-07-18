import {Component, OnInit} from '@angular/core';
import * as _ from 'lodash';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-lab2',
  templateUrl: './lab2.component.html',
  styleUrls: ['./lab2.component.scss']
})
export class Lab2Component implements OnInit {

  version: string = environment.version;
  currentState: State = {
    red: 13,
    green: 16,
    blue: 17,
    redBlue: false,
    redGreen: false,
    greenBlue: false
  };
  pastStates: State[] = [];
  statesPath: State[] = [];
  revertMode: boolean = false;
  lastStep: string = '';
  nextStep: string = '';
  resultFound = false;
  result: any;

  constructor() {
  }

  ngOnInit() {
  }

  randomMeeting() {

  }

  getRandomInt(max: number = 3) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  startAlgorithm() {
    let nextStep: string = '', iteration = 0;

    while (this.currentState.red !== this.currentState.blue &&
    this.currentState.red !== this.currentState.green &&
    this.currentState.green !== this.currentState.blue) {

      // check if we even were in this state
      if (!this.revertMode && this.checkIfWeEverWasAtThisState()) {
        this.getBackToOneStep();
      } else {
        this.revertMode = false;
        console.log(iteration);
        console.log(this.currentState);
        iteration++;

        // rememeber past states and full path
        if (!this.statesPath.find((x: State) => x.green === this.currentState.green && x.blue === this.currentState.blue && x.red === this.currentState.red))
        this.statesPath.push(_.cloneDeep(this.currentState));
        this.pastStates.push(_.cloneDeep(this.currentState));
        if (this.currentState.redGreen && this.currentState.redBlue && this.currentState.greenBlue) {
          this.getBackToOneStep();
        } else {
          if (!this.currentState.redBlue && this.currentState.red > 0 && this.currentState.blue > 0) {
            this.redBlueMeeting();
          } else {
            if (!this.currentState.redGreen && this.currentState.red > 0 && this.currentState.green > 0) {
              this.redGreenMeeting();
            } else {
              if (!this.currentState.greenBlue && this.currentState.green > 0 && this.currentState.blue > 0) {
                this.greenBlueMeeting();
              } else {
                this.getBackToOneStep();
              }
            }
          }
        }
        if (this.currentState.red === this.currentState.blue ||
          this.currentState.red === this.currentState.green ||
          this.currentState.green === this.currentState.blue) {
          console.log('answer:');
          console.log(this.currentState);
        }
      }
    }
    this.resultFound = true;
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
    console.log('answer finded');
    console.log('iteration:' + iteration);
  }

  resetVisitedEntries() {
    this.currentState.redBlue = false;
    this.currentState.redGreen = false;
    this.currentState.greenBlue = false;
  }

  checkIfWeEverWasAtThisState() {
    return this.pastStates.find((x: State) => x.green === this.currentState.green && x.blue === this.currentState.blue && x.red === this.currentState.red);
  }

  getBackToOneStep() {
    this.currentState = _.cloneDeep(this.statesPath[this.statesPath.length - 1]);
    if (this.statesPath.length > 1) this.statesPath.pop();
    this.revertMode = true;
    if (this.statesPath.length === 1) {
      console.log(this.statesPath);
    }
    if (this.currentState.greenBlue || this.currentState.blue === 0 || this.currentState.green === 0 || this.currentState.red === 0) {
      this.getBackToOneStep();
    }
  }

  redBlueMeeting() {
    this.resetVisitedEntries();
    this.currentState.red--;
    this.currentState.blue--;
    this.currentState.green = this.currentState.green + 2;
    this.statesPath[this.statesPath.length - 1].redBlue = true;
    this.lastStep = 'redBlue';
  }

  redGreenMeeting() {
    this.resetVisitedEntries();
    this.currentState.red--;
    this.currentState.green--;
    this.currentState.blue = this.currentState.blue + 2;
    this.statesPath[this.statesPath.length - 1].redGreen = true;
    this.lastStep = 'redGreen';
  }

  greenBlueMeeting() {
    this.resetVisitedEntries();
    this.currentState.blue--;
    this.currentState.green--;
    this.currentState.red = this.currentState.red + 2;
    this.statesPath[this.statesPath.length - 1].greenBlue = true;
    this.lastStep = 'greenBlue';
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
