import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {finalize} from 'rxjs/operators';

import {QuoteService} from './quote.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  quote: string;
  isLoading: boolean;
  leftRelation: string;
  rightRelation: string;
  relations: Relation[];
  components: string [] [];

  constructor(private quoteService: QuoteService) {
    this.relations = [];
    this.components = [];
  }

  ngOnInit() {
    this.isLoading = true;
    this.quoteService.getRandomQuote({category: 'dev'})
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe((quote: string) => {
        this.quote = quote;
      });
  }

  addRelation() {
    this.relations.push({
      name: this.leftRelation + ' - ' + this.rightRelation,
      left: this.leftRelation,
      right: this.rightRelation
    });
    this.leftRelation = '';
    this.rightRelation = '';
    document.getElementById("leftRelation").focus();
    this.components = [];
  }

  showComponents() {
    this.components = [];
    let current_pair: Relation, visited: any = {}, u: string, v: string, src: string;
    for (let i = this.relations.length - 1; i >= 0; i--) {
      current_pair = this.relations[i];
      u = current_pair.left;
      v = current_pair.right;
      src = null;
      if (!visited[u]) {
        src = u;
      } else if (!visited[v]) {
        src = v;
      }
      if (src) {
        // there is an unvisited vertex in this pair.
        // perform a breadth first search, and push the resulting
        // group onto the list of all groups
        this.components.push(this.bfs(src, this.relations, visited));
      }
    }
  }

  bfs(v: any, all_pairs: any, visited: any) {
    let q = [];
    let current_group = [];
    let i, pair;
    let length_all_pairs = all_pairs.length;
    q.push(v);
    while (q.length > 0) {
      v = q.shift();
      if (!visited[v]) {
        visited[v] = true;
        current_group.push(v);
        // go through the input array to find vertices that are
        // directly adjacent to the current vertex, and put them
        // onto the queue
        for (i = 0; i < length_all_pairs; i += 1) {
          pair = all_pairs[i];
          if (pair.left === v && !visited[pair.right]) {
            q.push(pair.right);
          } else if (pair.right === v && !visited[pair.left]) {
            q.push(pair.left);
          }
        }
      }
    }
    // return everything in the current "group"
    return current_group;
  };

}

class Relation {
  name: string;
  left: string;
  right: string;
}
