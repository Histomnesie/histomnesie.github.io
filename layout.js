export function input(attrs) {
    return $('<input>', attrs).attr('required', true);
}

export const months = [null,'Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];

export function monthSelect(name) {
    const $select = $('<select></select>', {name, required:true});
    $select.append($('<option value disabled selected hidden>mois</option>'));
    for (let i = 1; i < months.length; i++) {
        $select.append($('<option></option>',{value:i}).text(months[i]));
    }
    // $select.on('keypress', e => {
    //     e.preventDefault();
    //     console.log(e.key);
    // })
    return $select;
}