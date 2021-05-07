import { animate, state, style, transition, trigger } from "@angular/animations";

export let fadeIn=trigger('fadeIn',[
    state('void',style({opacity:0})),
    transition(':enter,:leave',[animate(500)])
]);

export let fadeOut=trigger('fadeOut',[
    state('void',style({opacity:0})),
    transition(':leave,:enter',[animate(500)])
]);