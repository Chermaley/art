const accordion = (triggerSelector) => {
    const heading = document.querySelectorAll(triggerSelector);

    heading.forEach(btn => {
        btn.addEventListener('click', function() {
           //Скрываем все остальные табы, если хоть один открыт
            if (!this.classList.contains('active-style')){
                heading.forEach(item => {
                    item.classList.remove('active-style');    // удаляем класс активности у заголовка
                    item.nextElementSibling.classList.remove('active-content'); //удаляем класс активности у контента
                    item.nextElementSibling.style.maxHeight = "0px"; //Скрываем его
                });
            } 
            //Открываем контент выбранного таба 
            this.classList.toggle('active-style');
            this.nextElementSibling.classList.toggle('active-content');
            if(this.classList.contains('active-style')){
                this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + "px";
            }else{
                this.nextElementSibling.style.maxHeight = "0px";
            }
        });
    });



    
    //Через стили

        //   content = document.querySelectorAll(itemSelector);

    // content.forEach(item => {
    //     item.classList.add('animated', 'fadeInDown');
    //     // item.style.display = "none";
    // });

    // heading.forEach((item) =>{
    //     item.addEventListener('click', function(){
    //         if (!this.classList.contains('active')){
    //             heading.forEach(head => {
    //                 head.classList.remove('active', 'active-style');
    //             });
    //             this.classList.add('active', 'active-style');
    //         }
           
    //     });
    // });
};

export default accordion;