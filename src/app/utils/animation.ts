import {
 animate,
 group,
 keyframes,
 query,
 sequence,
 stagger,
 state,
 style,
 transition,
 trigger,
} from "@angular/animations";

export const slideRightInOut = trigger("slideRightInOut", [
 state("in", style({ transform: "translateX(-0%)" })),
 transition("void => *", [
   style({ transform: "translateX(100%)" }),
   animate('200ms'),
 ]),
 transition("* => void", [
   animate('200ms', style({ transform: "translateX(100%)" })),
 ]),
]);

export const slideLeftInOut = trigger("slideLeftInOut", [
 state("in", style({ transform: "translateX(-0%)" })),
 transition("void => *", [
   style({ transform: "translateX(-100%)" }),
   animate('200ms'),
 ]),
 transition("* => void", [
   animate('200ms', style({ transform: "translateX(-100%)" })),
 ]),
]);
