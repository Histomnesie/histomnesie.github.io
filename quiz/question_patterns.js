import * as layout from '/layout.js';

//ISO 8601

class BaseQPattern {
    static init(question) {}
    static build(question, parent) {return question.prompt;}
    static check(question, form) {return true;}
    static correct(question) {}
}


class IntegerQPattern  extends BaseQPattern { // n
    static build(question, parent) {
        parent.append(layout.input({
            name:'integer',
            type:'number',
            placeholder:'nombre'
        }));
        return question.prompt;
    }

    static check(question, form) {
        return Number(form.integer.value) === question.answer;
    }

    static correct(question) {
        alert(question.answer);
    }
}

class DecimalQPattern  extends BaseQPattern { // n
    static build(question, parent) {
        parent.append(layout.input({
            name:'decimal',
            type:'number',
            placeholder:'nombre décimal',
            step:'any'
        }));
        return question.prompt;
    }

    static check(question, form) {
        return Number(form.decimal.value) === question.answer;
    }

    static correct(question) {
        alert(question.answer);
    }
}

class TextQPattern  extends BaseQPattern { // "..."
    static build(question, parent) {
        parent.append(layout.input({
            name:'text',
            type:'text',
            placeholder:'texte'
        }));
        return question.prompt;
    }

    static check(question, form) {
        return form.text.value.trim().toLowerCase() === question.answer.toLowerCase();
    }

    static correct(question) {
        alert(question.answer);
    }
}


class DateQPattern  extends BaseQPattern { // "(-)yyyy-MM-dd"
    static init(question) {
        let match = question.answer.match(/^(-?\d{4,})-(\d{2})-(\d{2})$/);
        question.answer = {
            year: Number(match[1]),
            month: Number(match[2]),
            day: Number(match[3])
        };
    }

    static build(question, parent) {
        parent.append(layout.input({
            name:'day',
            type:'number',
            placeholder:'jour',
            min:1, max:31
        }));
        parent.append(layout.monthSelect('month'));
        parent.append(layout.input({
            name:'year',
            type:'number',
            placeholder:'année'
        }));
        return question.prompt;
    }

    static check(question, form) {
        return (
            Number(form.year.value) === question.answer.year &&
            Number(form.month.value) === question.answer.month &&
            Number(form.day.value) === question.answer.day
        );
    }

    static correct(question) {
        alert(`${question.answer.day} ${layout.months[question.answer.month]} ${question.answer.year}`);
    }
}

class MonthQPattern  extends BaseQPattern { // "(-)yyyy-MM"
    static init(question) {
        let match = question.answer.match(/^(-?\d{4,})-(\d{2})$/);
        question.answer = {
            year: Number(match[1]),
            month: Number(match[2])
        };
    }

    static build(question, parent) {
        parent.append(layout.monthSelect('month'));
        parent.append(layout.input({
            name:'year',
            type:'number',
            placeholder:'année'
        }));
        return question.prompt;
    }

    static check(question, form) {
        return (
            Number(form.year.value) === question.answer.year &&
            Number(form.month.value) === question.answer.month
        );
    }

    static correct(question) {
        alert(`${layout.months[question.answer.month]} ${question.answer.year} `);
    }
}

class YearQPattern  extends BaseQPattern { // "(-)yyyy"
    static init(question) {
        question.answer = {year: Number(question.answer)};
    }

    static build(question, parent) {
        parent.append(layout.input({
            name:'year',
            type:'number',
            placeholder:'année'
        }));
        return question.prompt;
    }

    static check(question, form) {
        return Number(form.year.value) === question.answer.year;
    }

    static correct(question) {
        alert(question.answer.year);
    }
}

class DatePeriodQPattern  extends BaseQPattern { // "(-)yyyy-MM-dd/(-)yyyy-MM-dd"
    static init(question) {
        let match = question.answer.match(/^(-?\d{4,})-(\d{2})-(\d{2})\/(-?\d{4,})-(\d{2})-(\d{2})$/);
        question.answer = {
            startYear: Number(match[1]),
            startMonth: Number(match[2]),
            startDay: Number(match[3]),
            endYear: Number(match[4]),
            endMonth: Number(match[5]),
            endDay: Number(match[6])
        };
    }

    static build(question, parent) {
        parent.append($('<span></span>').text('du'));

        parent.append(layout.input({
            name:'startDay',
            type:'number',
            placeholder:'jour',
            min:1, max:31
        }));

        parent.append(layout.monthSelect('startMonth'));

        parent.append(layout.input({
            name:'startYear',
            type:'number',
            placeholder:'année'
        }));

        parent.append($('<span></span>').text('au'));

        parent.append(layout.input({
            name:'endDay',
            type:'number',
            placeholder:'jour',
            min:1, max:31
        }));

        parent.append(layout.monthSelect('endMonth'));

        parent.append(layout.input({
            name:'endYear',
            type:'number',
            placeholder:'année'
        }));

        return question.prompt;
    }

    static check(question, form) {
        return (
            Number(form.startYear.value) === question.answer.startYear &&
            Number(form.startMonth.value) === question.answer.startMonth &&
            Number(form.startDay.value) === question.answer.startDay &&
            Number(form.endYear.value) === question.answer.endYear &&
            Number(form.endMonth.value) === question.answer.endMonth &&
            Number(form.endDay.value) === question.answer.endDay
        );
    }

    static correct(question) {
        alert(`du ${question.answer.startDay} ${layout.months[question.answer.startMonth]} ${question.answer.startYear} au ${question.answer.endDay} ${layout.months[question.answer.endMonth]} ${question.answer.endYear}`);
    }
}

class MonthPeriodQPattern  extends BaseQPattern { // "(-)yyyy-MM/MM"
    static init(question) {
        let match = question.answer.match(/^(-?\d{4,})-(\d{2})\/(\d{2})$/);
        question.answer = {
            year: Number(match[1]),
            startMonth: Number(match[2]),
            endMonth: Number(match[3])
        };
    }

    static build(question, parent) {
        parent.append($('<span></span>').text('de'));

        parent.append(layout.monthSelect('startMonth'));

        parent.append($('<span></span>').text('à'));

        parent.append(layout.monthSelect('endMonth'));

        parent.append(layout.input({
            name:'year',
            type:'number',
            placeholder:'année'
        }));

        return question.prompt;
    }

    static check(question, form) {
        return (
            Number(form.year.value) === question.answer.year &&
            Number(form.startMonth.value) === question.answer.startMonth &&
            Number(form.endMonth.value) === question.answer.endMonth
        );
    }

    static correct(question) {
        alert(`de ${layout.months[question.answer.startMonth]} à ${layout.months[question.answer.endMonth]} ${question.answer.year}`);
    }
}

class YearPeriodQPattern  extends BaseQPattern { // "(-)yyyy/(-)yyyy"
    static init(question) {
        let match = question.answer.match(/^(-?\d{4,})\/(-?\d{4,})$/);
        question.answer = {
            startYear: Number(match[1]),
            endYear: Number(match[2])
        };
    }

    static build(question, parent) {
        parent.append($('<span></span>').text('de'));

        parent.append(layout.input({
            name:'startYear',
            type:'number',
            placeholder:'année'
        }));

        parent.append($('<span></span>').text('à'));

        parent.append(layout.input({
            name:'endYear',
            type:'number',
            placeholder:'année'
        }));

        return question.prompt;
    }

    static check(question, form) {
        return (
            Number(form.startYear.value) === question.answer.startYear &&
            Number(form.endYear.value) === question.answer.endYear
        );
    }

    static correct(question) {
        alert(`de ${question.answer.startYear} à ${question.answer.endYear}`);
    }
}

const questionPatterns = {
    'integer': IntegerQPattern,
    'decimal': DecimalQPattern,
    'text': TextQPattern,
    'date': DateQPattern,
    'month': MonthQPattern,
    'year': YearQPattern,
    'datePeriod': DatePeriodQPattern,
    'monthPeriod': MonthPeriodQPattern,
    'yearPeriod': YearPeriodQPattern
};

export function getPattern(type) {
    return questionPatterns[type] || BaseQPattern;
};