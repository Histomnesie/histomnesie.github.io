let unpackedAnswer;

const months = [null,'Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];

class BasePattern {
    static build(parent) {}
    static check(form, answer) {return true;}
    static correct(answer) {}
}

class IntegerPattern  extends BasePattern {
    static build(parent) {
        parent.append($('<input>',{
            name:'integer',
            type:'number',
            required:true,
            placeholder:'nombre'
        }));
    }

    static check(form, answer) {
        return Number(form.integer.value) === answer;
    }

    static correct(answer) {
        alert(answer);
    }
}

class DecimalPattern  extends BasePattern {
    static build(parent) {
        parent.append($('<input>',{
            name:'decimal',
            type:'number',
            required:true,
            placeholder:'nombre décimal',
            step:'any'
        }));
    }

    static check(form, answer) {
        return Number(form.decimal.value) === answer;
    }

    static correct(answer) {
        alert(answer);
    }
}

class TextPattern  extends BasePattern {
    static build(parent) {
        parent.append($('<input>',{
            name:'text',
            type:'text',
            required:true,
            placeholder:'texte'
        }));
    }

    static check(form, answer) {
        return form.text.value.trim().toLowerCase() === answer.toLowerCase();
    }

    static correct(answer) {
        alert(answer);
    }
}

class DatePattern  extends BasePattern {
    static build(parent) {
        parent.append($('<input>',{
            name:'day',
            type:'number',
            required:true,
            placeholder:'jour',
            min:1, max:31
        }));

        const $select = $('<select></select>',{name:'month', required:true});
        $select.append($('<option value disabled selected hidden>mois</option>'));
        for (let i = 1; i <= months.length; i++) {
            $select.append($('<option></option>',{value:i}).text(months[i]));
        }
        parent.append($select);

        parent.append($('<input>',{
            name:'year',
            type:'number',
            required:true,
            placeholder:'année'
        }));
    }

    static check(form, answer) {
        answer = answer.split('_').map(Number);
        unpackedAnswer = {year:answer[0], month:answer[1], day:answer[2]};
        return (
            Number(form.year.value) === unpackedAnswer.year &&
            Number(form.month.value) === unpackedAnswer.month &&
            Number(form.day.value) === unpackedAnswer.day
        );
    }

    static correct(answer) {
        alert(`${unpackedAnswer.day} ${months[unpackedAnswer.month]} ${unpackedAnswer.year}`);
    }
}

export const questionPatterns = {
    'integer': IntegerPattern,
    'decimal': DecimalPattern,
    'text': TextPattern,
    'date': DatePattern
}