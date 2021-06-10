import moment from 'moment';

const grid_day_element = (current_date, date, color, text_color, evt_selected) => {
    let button = document.createElement('button');
    button.classList.add('px-2', 'py-1');
    button.classList.add(
        `${(current_date.format('MM') !== date.format('MM')) ? 'font-extrabold' : 'font-semibold'}`,
        `text-${text_color}${(text_color === 'white' || text_color === 'black') ? '': '-900'}`,
        'focus:outline-none'
    );
    button.innerHTML = date.format('DD');
    button.addEventListener('click', (e) => {
        evt_selected(date)
    });

    let day_ele = document.createElement('div');
    day_ele.appendChild(button);
    
    return day_ele;
}

const calendar_grid = (current_date, color, text_color, evt_selected) => {
    
    let days = [];

    let begin_week = current_date.startOf('month').week();
    let last_week = current_date.endOf('month').week();

    if(current_date.format('MM') !== '12') {
        for(let week = begin_week; week < last_week+1; week++) {
            for(let day = 0; day < 7; day++) {
                let day_of_week = moment(moment(`01-01-${current_date.format('YYYY')}`, 'MM-DD-YYYY').week(week).startOf('week').clone());
                day_of_week.add(day, 'day');
                days.push(day_of_week);
            }
        } 
    } else {
        for(let week = begin_week; week < 52+2; week++) {
            for(let day = 0; day < 7; day++) {
                let day_of_week = moment(moment(`01-01-${current_date.format('YYYY')}`, 'MM-DD-YYYY').week(week).startOf('week').clone());
                day_of_week.add(day, 'day');
                days.push(day_of_week);
            }
        }
        
    }

    let container = document.createElement('div');
    container.classList.add('w-full', 'my-2', 'px-2', 'grid', 'grid-cols-7', 'gap-0', 'text-center');
    days.forEach((day_data) => {
        container.appendChild(grid_day_element(current_date, day_data, color, text_color, evt_selected));
    });

    return container;
}

export default calendar_grid;