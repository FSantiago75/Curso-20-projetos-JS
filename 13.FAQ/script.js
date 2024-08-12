const accordionItems = document.querySelectorAll('.accordion-item');
accordionItems.forEach(element => {
    const header = element.querySelector('.accordion-header')
    header.addEventListener('click', () => {
        console.log(element.getAttribute('class'))
        if (element.classList.contains('accordion-item--closed')){
            accordionItems.forEach(reset => {
                reset.classList.remove('accordion-item--active');
                reset.classList.add('accordion-item--closed');
            });
            element.classList.remove('accordion-item--closed');
            element.classList.add('accordion-item--active');
            console.log("open")
        }
        else if (element.classList.contains('accordion-item--active')){
            element.classList.remove('accordion-item--active');
            element.classList.add('accordion-item--closed');
            console.log("close")
        }

    });
});