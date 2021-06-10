// title_days_element
const day_element = (title) => {
    let element = document.createElement('div');
    element.innerHTML = title;
    return element;
}

const days_header = (text_color) => {
    
    const days = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
    let container = document.createElement('div');
    container.classList.add('w-full', 'my-2', 'px-2', 'grid', 'grid-cols-7', 'gap-0', 'text-center', `text-${text_color}${(text_color === 'white' || text_color === 'black') ? '': '-900'}`, 'md:text-lg', 'text-base', 'font-semibold');
    days.forEach(day => {
        container.appendChild(day_element(day));
    });

    return container;
}

export default days_header;

