import moment from 'moment';

const title_element = (title_text, color, text_color, listener) => {

    const button_container = (svg, step) => {
        let button = document.createElement('div');
        button.classList.add(`text-${text_color}${(text_color === 'white' || text_color === 'black') ? '': '-900'}`, 'font-bold', 'cursor-pointer');
        button.innerHTML = svg;
        button.addEventListener('click', (e) => {
            listener(step);
        });
    
        let button_container = document.createElement('div');
        button_container.classList.add('flex', 'justify-center', 'items-center', 'w-1/4');
        button_container.appendChild(button);

        return button_container;
    }
    
    let button_left = button_container('<svg class="fill-current h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>', 0);
    let button_right = button_container('<svg class="fill-current h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>', 1);
    
    let title = document.createElement('h1');
    title.classList.add('w-1/2', 'text-center', `text-${text_color}${(text_color === 'white' || text_color === 'black') ? '': '-900'}`, 'text-xl', 'font-bold');
    title.innerHTML = title_text;

    let title_container = document.createElement('div');
    title_container.classList.add('w-full', 'flex', 'flex-row', 'justify-center', 'items-center', `bg-${color}${(color === 'white' || color === 'black') ? '': '-600'}`, 'rounded-t-md', 'py-2');
    title_container.appendChild(button_left);
    title_container.appendChild(title);
    title_container.appendChild(button_right);

    return title_container;
}

const title_days_element = (text_color) => {
    const day_element = (title) => {
        let element = document.createElement('div');
        element.innerHTML = title;
        return element;
    }
    const days = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
    let container = document.createElement('div');
    container.classList.add('w-full', 'my-2', 'px-2', 'grid', 'grid-cols-7', 'gap-0', 'text-center', `text-${text_color}${(text_color === 'white' || text_color === 'black') ? '': '-900'}`, 'md:text-lg', 'text-base', 'font-semibold');
    days.forEach(day => {
        container.appendChild(day_element(day));
    });

    return container;
}

const container_grid_days_element = (GLOBAL_DATE, color, text_color, evt_selected) => {
    
    let days = [];

    let begin_week = GLOBAL_DATE.startOf('month').week();
    let last_week = GLOBAL_DATE.endOf('month').week();

    if(GLOBAL_DATE.format('MM') !== '12') {
        for(let week = begin_week; week < last_week+1; week++) {
            for(let day = 0; day < 7; day++) {
                let day_of_week = moment(moment(`01-01-${GLOBAL_DATE.format('YYYY')}`, 'MM-DD-YYYY').week(week).startOf('week').clone());
                day_of_week.add(day, 'day');
                days.push(day_of_week);
            }
        } 
    } else {
        for(let week = begin_week; week < 52+2; week++) {
            for(let day = 0; day < 7; day++) {
                let day_of_week = moment(moment(`01-01-${GLOBAL_DATE.format('YYYY')}`, 'MM-DD-YYYY').week(week).startOf('week').clone());
                day_of_week.add(day, 'day');
                days.push(day_of_week);
            }
        }
        
    }



    const grid_day_element = (date, color, text_color) => {
        let button = document.createElement('button');
        button.classList.add('px-2', 'py-1');
        if(GLOBAL_DATE.format('MM') !== date.format('MM')) {
            button.classList.add('font-bold', `text-${text_color}${(text_color === 'white' || text_color === 'black') ? '': '-900'}`);
        } else {
            button.classList.add(`text-${text_color}${(text_color === 'white' || text_color === 'black') ? '': '-900'}`);
        }
        button.innerHTML = date.format('DD');
        button.addEventListener('click', (e) => {
            evt_selected(date)
        });

        let day_ele = document.createElement('div');
        day_ele.appendChild(button);
        
        return day_ele;
    }

    let container = document.createElement('div');
    container.classList.add('w-full', 'my-2', 'px-2', 'grid', 'grid-cols-7', 'gap-0', 'text-center');
    days.forEach((day_data) => {
        container.appendChild(grid_day_element(day_data, color, text_color));
    });

    return container;
}


const calendar_element = (id, color, text_color, evt_selected) => {

    let GLOBAL_DATE = moment();

    let root = document.createElement('div');

    const month_listener = (step) => {
        // step = 1 -> mes adelante
        // step = 0 -> mes atras

        if(step === 1) {
            GLOBAL_DATE = GLOBAL_DATE.add(1, 'month');
        } else {
            GLOBAL_DATE = GLOBAL_DATE.subtract(1, 'month');
        }
        root.replaceChild(title_element(`${GLOBAL_DATE.format('YYYY')} - ${GLOBAL_DATE.format('MMMM').toUpperCase()}`, color, text_color, month_listener), root.childNodes[0]);
        root.replaceChild(container_grid_days_element(GLOBAL_DATE, color, text_color, evt_selected), root.childNodes[2]);
    }
    
    root.classList.add('z-10', 'mx-2', 'md:mx-0', 'overflow-y-auto','w-full', 'md:w-1/3', 'flex', 'flex-wrap', `bg-${color}${(color === 'white' || color === 'black') ? '': '-400'}`, 'shadow-2xl', 'rounded-md');
    root.appendChild(title_element(`${GLOBAL_DATE.format('YYYY')} - ${GLOBAL_DATE.format('MMMM').toUpperCase()}`, color, text_color, month_listener));
    root.appendChild(title_days_element(text_color));
    root.appendChild(container_grid_days_element(GLOBAL_DATE, color, text_color, evt_selected));

    let modal = document.createElement('div');
    modal.id = id;
    modal.classList.add('fixed', 'w-full', 'h-full', 'top-0', 'left-0', 'flex', 'items-center', 'justify-center');
    modal.style = 'overflow-x: hidden; overflow-y: visible !important;';

    let modal_over = document.createElement('div');
    modal_over.id = id + '_modal';
    modal_over.classList.add('modal-overlay', 'cursor-pointer','absolute', 'w-full', 'h-full', 'bg-gray-900', 'opacity-50'); 
    
    modal.appendChild(modal_over);
    modal.appendChild(root);

    return modal;

}

document.addEventListener('DOMContentLoaded', (e) => {
    document.querySelectorAll("[data-date-component]").forEach((input) => {
        let active = false;
        const container = document.body;

        const eventSelected = (date) => {
            input.value = date.format('DD-MM-YYYY');
            document.getElementById(input.dataset.dateComponent).remove();
            active = false;
        }
        
        input.addEventListener('click', () => {
            let calendar;
            if(!active) {
                calendar = calendar_element(input.dataset.dateComponent, input.dataset.dateColor, input.dataset.dateTextColor, eventSelected);
                container.appendChild(calendar);
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

        input.addEventListener('change', (evt) => {
            let date = moment(input.value);
            if(!date.isValid()) {
                input.value = '';
                active = false;
                document.getElementById(input.dataset.dateComponent).remove();
            }
        });
    });
}) 