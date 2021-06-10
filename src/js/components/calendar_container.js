import moment from 'moment';

import calendar_title from './calendar_title';
import days_header from './days_header';
import calendar_grid from './calendar_grid';

const calendar_container = (id, color, text_color, evt_selected) => {

    let GLOBAL_DATE = moment();

    let root = document.createElement('div');

    const month_listener = (step) => {
        // step = 0 -> mes atras
        // step = 1 -> mes adelante
        // step = 2 -> año atras
        // step = 3 -> año adelante

        switch(step) {
            case 0:
                GLOBAL_DATE = GLOBAL_DATE.subtract(1, 'month');
                break;
            case 1:
                GLOBAL_DATE = GLOBAL_DATE.add(1, 'month');
                break;
            case 2:
                GLOBAL_DATE = GLOBAL_DATE.subtract(1, 'year');
                break;
            case 3:
                GLOBAL_DATE = GLOBAL_DATE.add(1, 'year');
                break;
        }

        root.replaceChild(calendar_title(`${GLOBAL_DATE.format('YYYY')} - ${GLOBAL_DATE.format('MMMM').toUpperCase()}`, color, text_color, month_listener), root.childNodes[0]);
        root.replaceChild(calendar_grid(GLOBAL_DATE, color, text_color, evt_selected), root.childNodes[2]);
    }
    
    root.classList.add('z-50', 'mx-2', 'md:mx-0', 'overflow-y-auto','w-full', 'md:w-1/3', 'flex', 'flex-wrap', `bg-${color}${(color === 'white' || color === 'black') ? '': '-400'}`, 'shadow-2xl', 'rounded-md');
    root.appendChild(calendar_title(`${GLOBAL_DATE.format('YYYY')} - ${GLOBAL_DATE.format('MMMM').toUpperCase()}`, color, text_color, month_listener));
    root.appendChild(days_header(text_color));
    root.appendChild(calendar_grid(GLOBAL_DATE, color, text_color, evt_selected));

    let modal = document.createElement('div');
    modal.id = id;
    modal.classList.add('z-50', 'fixed', 'w-full', 'h-full', 'top-0', 'left-0', 'flex', 'items-center', 'justify-center');
    modal.style = 'overflow-x: hidden; overflow-y: visible !important;';

    let modal_over = document.createElement('div');
    modal_over.id = id + '_modal';
    modal_over.classList.add('z-50', 'modal-overlay', 'cursor-pointer','absolute', 'w-full', 'h-full', 'bg-gray-900', 'opacity-50'); 
    
    modal.appendChild(modal_over);
    modal.appendChild(root);

    return modal;

}

export default calendar_container;