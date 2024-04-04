import { Component, Directive, Input } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';

@Directive({
  selector: 'app-directive-level-1',
  standalone: true,
})
export class Level1Directive {
  @Input() name = '';
}

@Directive({
  selector: 'app-directive-level-2',
  standalone: true,
  hostDirectives: [{ directive: Level1Directive, inputs: ['name'] }],
})
export class Level2Directive {}

@Directive({
  selector: 'app-directive-level-3',
  standalone: true,
  hostDirectives: [{ directive: Level2Directive, inputs: ['name'] }],
})
export class Level3Directive {}

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h1 app-directive-level-3>Hello from {{ name }}!</h1>
    <a target="_blank" href="https://angular.dev/overview">
      Learn more about Angular
    </a>
  `,
  imports: [Level3Directive],
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
