const calc = (size, material, options, promocode, result, state) =>{
    const sizeBlock = document.querySelector(size),
          materialBlock = document.querySelector(material),
          optionsBlock = document.querySelector(options),
          promocodeBlock = document.querySelector(promocode),
          resultBlock = document.querySelector(result);
    
    let sum = 0;


    const calcFunction = () => {
        sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value));
        
        if (sizeBlock.value == '' || materialBlock.value == ''){
            resultBlock.textContent = "Пожалуйста, выберите размер и материал картины";
        }else if (promocodeBlock.value ===  'IWANTPOPART'){
            sum = Math.round(sum * 0.7);
            resultBlock.textContent = sum + " руб";
            state.sum = sum;
        }else{
            resultBlock.textContent = sum + " руб";
            state.sum = sum;
        }
        
    };
    

    const changeModalState = (element, prop) => {
        element.addEventListener('change', (e) => {
             state[prop] = element.options[element.selectedIndex].text;
        });
        
    };
    
    changeModalState(sizeBlock, 'size');
    changeModalState(materialBlock, 'material');
    changeModalState(optionsBlock, 'options');


    sizeBlock.addEventListener('change', calcFunction);
    materialBlock.addEventListener('change', calcFunction);
    optionsBlock.addEventListener('change', calcFunction);
    promocodeBlock.addEventListener('input', calcFunction);
    
};
export default calc;