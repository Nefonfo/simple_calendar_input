const step_button_selector = (svg, text_color, step, listener) => {
    let button = document.createElement('button');
    button.classList.add(`text-${text_color}${(text_color === 'white' || text_color === 'black') ? '': '-900'}`, 'font-bold', 'focus:outline-none');
    button.innerHTML = svg;
    button.addEventListener('click', (e) => {
        listener(step);
    });

    let button_container = document.createElement('div');
    button_container.classList.add('flex', 'justify-center', 'items-center', 'w-auto', 'px-2');
    button_container.appendChild(button);

    return button_container;
}

const calendar_title = (title_text, color, text_color, listener) => {
    
    let chevron_left = step_button_selector('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="fill-current h-8 feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>', text_color, 0, listener);
    let chevron_right = step_button_selector('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="fill-current h-8 feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>', text_color, 1, listener);
    let chevrons_left = step_button_selector('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="fill-current h-8 feather feather-chevrons-left"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg>', text_color, 2, listener);
    let chevrons_right = step_button_selector('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="fill-current h-8 feather feather-chevrons-right"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>', text_color, 3, listener);

    let title = document.createElement('h1');
    title.classList.add('w-2/3', 'text-center', `text-${text_color}${(text_color === 'white' || text_color === 'black') ? '': '-900'}`, 'text-xl', 'font-bold');
    title.innerHTML = title_text;

    let title_container = document.createElement('div');
    title_container.classList.add('w-full', 'flex', 'flex-row', 'justify-center', 'items-center', `bg-${color}${(color === 'white' || color === 'black') ? '': '-600'}`, 'rounded-t-md', 'py-2');
    title_container.appendChild(chevrons_left);
    title_container.appendChild(chevron_left);
    title_container.appendChild(title);
    title_container.appendChild(chevron_right);
    title_container.appendChild(chevrons_right);

    return title_container;
}

export default calendar_title;