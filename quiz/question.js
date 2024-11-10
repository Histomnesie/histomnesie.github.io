import {getPattern} from './question_patterns.js';

export class Question {
    constructor(data) {
        $.extend(this, data);
        this.pattern = getPattern(this.type);
        this.pattern.init(this);
        console.log(this.answer);
    }
}