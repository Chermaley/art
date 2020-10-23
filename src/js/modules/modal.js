const modal = () => {
    let btnPressed = false;
    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
        
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]'),
            scroll = calcScroll();
       
            trigger.forEach(item => {
               item.addEventListener('click', (e) => {
                    if (e.target) {
                        e.preventDefault();
                    }
                    windows.forEach(item => {
                        item.style.display = 'none';  // Скрываем все уже открытые модальные окна
                        item.classList.add('animated', 'fadeIn'); //Добавляем класс анимации и библиотеки.
                    });

                    btnPressed = true;   //Переменная отвечающая за то что пользователь нажал кнопку
        
                    modal.style.display = "block";
                    document.body.style.overflow = "hidden";
                    document.body.style.marginRight = `${scroll}px`;
                    
                    // document.body.classList.add('modal-open');
                    if(destroy){
                        item.remove();
                    }
                });
                
            });

        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = 'none';
            });

            modal.style.display = "none";
            document.body.style.overflow = "";
            document.body.style.marginRight = `0px`;
            // document.body.classList.remove('modal-open');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                windows.forEach(item => {
                    item.style.display = 'none';
                });
                modal.style.display = "none";
                document.body.style.overflow = "";
                document.body.style.marginRight = `0px`;
                // document.body.classList.remove('modal-open');
            }
        });
    }

    function openByScroll(selector){
        window.addEventListener('scroll', () => {

            //Создаем эту переменную если хотим поддерживать старье
            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

            //Проверяем долистал ли пользователь до конца
            if(!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight)){   
                document.querySelector(selector).click();
            }
        });
    }

    function openModalTimer(selector, time) {
        setTimeout(() => {
            let display;  //Проверка на то что модальное окно уже не открыто
            document.querySelectorAll('[data-modal]').forEach(item => {
                if(getComputedStyle(item).display !== 'none'){
                    display = "block";
                }
            });
            if(!display){
                document.querySelector(selector).style.display = "block";
                document.body.style.overflow = "hidden";
                let scroll = calcScroll();
                document.body.style.marginRight = `${scroll}px`;
            }
            
        }, time);
    }
 
//Чтобы страница не прыгала, возвращает ращмер скролла.
    function calcScroll(){
        let div = document.createElement('div');
        div.style.overflow = 'scroll';
        div.style.visibility ='hidden';
        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();
        return scrollWidth;
    }

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
    openByScroll('.fixed-gift');
    // openModalTimer('.popup-consultation', 60000);
};







export default modal;