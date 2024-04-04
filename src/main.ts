import { Component, Directive, HostBinding, Input } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';

@Directive({
  selector: '[level1]',
  standalone: true,
})
export class Level1Directive {
  @HostBinding('style.background') 
  @Input({required: true}) background = '';
}

@Directive({
  selector: '[level2]',
  standalone: true,
  hostDirectives: [{ directive: Level1Directive, inputs: ['background'] }],
})
export class Level2Directive {}

//works
// @Directive({
//   selector: '[level3]',
//   standalone: true,
//   hostDirectives: [{ directive: Level2Directive }],
// })
// export class Level3Directive {}

//does not work
@Directive({
  selector: '[level3]',
  standalone: true,
  hostDirectives: [{ directive: Level2Directive, inputs: ['background']}],
})
export class Level3Directive {}

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h1 level3 background="green">Hello from {{ name }}!</h1>
  `,
  imports: [Level1Directive, Level2Directive, Level3Directive],
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
