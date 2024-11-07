import {questionPatterns} from './question_patterns.js';

export class Question {
    constructor(data) {
        $.extend(this, data);
        this.pattern = questionPatterns[this.type];
    }
}