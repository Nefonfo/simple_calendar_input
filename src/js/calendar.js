import moment from 'moment';

import calendar_container from './components/calendar_container';


document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll("[data-date-component]").forEach((input) => {
        let active = false;
        const container = document.body;

        input.addEventListener('click', () => {
            let calendar_element;
            if(!active) {
                calendar_element = calendar_container(
                    input.dataset.dateComponent,
                    input.dataset.dateColor,
                    input.dataset.dateTextColor,
                    (date) => {
                        input.value = date.format('DD-MM-YYYY');
                        document.getElementById(input.dataset.dateComponent).remove();
                        active = false;
                    }
                );
                container.appendChild(calendar_element);
                active = true;

                document.getElementById(input.dataset.dateComponent).addEventListener('click', (e) => {
                    if(document.getElementById(input.dataset.dateComponent + '_modal') === e.target){
                        document.getElementById(input.dataset.dateComponent).remove();
                        active = false;
                    } 
                    
                });

            } else {
                document.getElementById(input.dataset.dateComponent).remove();
                active = false;
            }
        });

        input.addEventListener('change', () => {
            let date = moment(input.value);
            if(!date.isValid()) {
                input.value = '';
                active = false;
                document.getElementById(input.dataset.dateComponent).remove();
            }
        });
    });
});