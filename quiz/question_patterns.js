export const questionPatterns = {
    'integer': {
        'layout': '{integer}',
        'fields': {
            'integer': {type:'number', placeholder:'nombre'}
        },
        'unpack': (a) => {return {integer: a};},
        'checkAnswer': (f, a) => {return Number(f.integer.value) === a.integer}
    },
    
    'decimal': {
        'layout': '{decimal}',
        'fields': {
            'decimal': {type:'number', step:'any', placeholder:'nombre décimal'}
        },
        'unpack': (a) => {return {decimal: a};},
        'checkAnswer': (f, a) => {return Number(f.decimal.value) === a.decimal}
    },
    
    'text': {
        'layout': '{text}',
        'fields': {
            'text': {type:'text'}
        },
        'unpack': (a) => {return {text: a};},
        'checkAnswer': (f, a) => {return f.text.value.toLowerCase() === a.text.toLowerCase()}
    },
    
    'date': {
        'layout': '{day} {month} {year}',
        'fields': {
            'day': {type:'number', min:1, max:31, placeholder:'jour'},
            'month': {type:'number', build: function() {}},
            'year': {type:'number', placeholder:'année'}
        },
        'unpack': (a) => {
            let date = a.split('-').map(Number);
            return {year:date[0], month:date[1], day:date[2]};
        },
        'checkAnswer': (f, a) => {
            return Number(f.year.value) === a.year && Number(f.month.value) === a.month && Number(f.day.value) === a.day;
        }
    }
};