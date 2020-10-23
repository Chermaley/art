const filter = () => {
    const menu = document.querySelector('.portfolio-menu'),
        items = menu.querySelectorAll('li'),
        wrapper = document.querySelector('.portfolio-wrapper'),
        markAll = wrapper.querySelectorAll('.all'),
        no = document.querySelector('.portfolio-no');

    menu.addEventListener('click', (e) => {
        let target = e.target;

        if (target && target.tagName == 'LI') {
            
            //скрываем весь контент 
            markAll.forEach(item => {
                if(!target.classList.contains('active')){       //Если таб уже выбран, то контент не скрываем!
                    item.style.display = 'none';
                    item.classList.remove('animated', 'fadeIn');
                }
            });

            let classBtn = target.classList.value;
            //открываем таб с соответствующим классом
            markAll.forEach(mark => {
                if (mark.classList.contains(classBtn)) {
                    mark.style.display = "block";
                    mark.classList.add('animated', 'fadeIn');
                } else if(classBtn == 'grandmother' || classBtn == 'granddad'){
                    no.style.display = "block";
                    no.classList.add('animated', 'fadeIn');
                }
            });

            //добавляем класс активности на таргет.
            items.forEach((item) => {
                item.classList.remove('active');
            });
            target.classList.add('active');
            
        }

    });
};
export default filter;