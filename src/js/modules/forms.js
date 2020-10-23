import {postData} from '../services/requests';

const forms = (state) =>{         //Селектор последнего окна пекредаем, чтобы закрыть после отправки
        const form = document.querySelectorAll('form'),
              inputs = document.querySelectorAll('input'),  //берем все инпуты, чтобы потом их очистить
              upload = document.querySelectorAll('[name = "upload"]');

    // checkNumInputs('input[name="user_phone"]');
    const message = {
        loading: "Загрузка",
        success: "Спасибо! Скоро мы с вами свяжемся",
        failure: "Что-то пошло не так...!" ,
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    };
    
    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    };


    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
        upload.forEach(item => {
            item.previousElementSibling.textContent = "Файл не выбран";
        });
    };

    //Отображаем имя загружаемого файла в определенном поле 
    upload.forEach(item =>{
        item.addEventListener('input', () =>{    
            console.log(item.files[0]);  // Получаем загруженный файл
            let dots;
            //Обрезаем имя изображения если оно больше 6 символов
            const arr = item.files[0].name.split('.');
            if(arr[0].length > 7){
                dots ="...";
            }else{
                dots = '.';
            }
            const name = arr[0].substring(0, 6) + dots + arr[1];
            item.previousElementSibling.textContent = name;
        });
    });

    form.forEach(item =>{
        item.addEventListener('submit', (e) =>{   //event нужен для того, чтобы страница не пперезагружалась
            e.preventDefault();
            
            //Создаем блок для оповаещения и скрываем форму
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.parentNode.appendChild(statusMessage);
            item.classList.add('animated', 'fadeOutUp');
            setTimeout(() => {
                item.style.display = "none";
            }, 400);

            //Добавляем в этот блок картинку и текстовое оповещение
            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessage.appendChild(statusImg);

            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);

            const formData = new FormData(item);
            if (item.getAttribute('data-calc') === 'calc'){
                console.log(state);
               for(let k in state){
                    formData.append(k, state[k]);
               }
            }
            let api; 
            //Отправляем форму на определнный сервер в зависимомти от класса
            if (item.closest('.popup-design') || item.classList.contains('calc_form')){
                api = path.designer;
            }else{
                api = path.question;
            }

            console.log(api);
            
            postData(api, formData)
            .then(res => {
                statusImg.setAttribute('src', message.ok);
                textMessage.textContent = message.success;
                console.log(res);
            })
            .catch(() => {
                textMessage.textContent = message.fail;
                statusImg.setAttribute('src', message.fail);
            })
            .finally(() => {
                clearInputs();
                setTimeout(() => {
                    statusMessage.remove();
                    item.style.display = "block";
                    item.classList.remove("fadeOutUp");
                    item.classList.add("fadeInUp");
                }, 2000);
            });
        });
    });
};

export default forms;