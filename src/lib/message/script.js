 class Message{


    constructor(container, form){
        this.container = container;
        this.form = form;
    }

    valid(){
        let status = true;

        const inputs = this.getInputs();
        inputs.forEach((input) =>{
            if(!this.validators()[input.type](input.value)){
                input.focus();
                status = false;
            }
        });

        this.open(status);

        return status;
    }

    open(status){
        document.getElementById(this.container).innerHTML = this.createElement(status);
        document.querySelector('.message__close')
        .addEventListener('click', () => {
            this.close();
        });
    }

    close(){
        document.getElementById(this.container).innerHTML = '';
    }

    getInputs(){
        return document.querySelectorAll(`#${this.form} input`);
    }

    createElement(valid){
       return `<div class="message">
            <div class="message__ico ${this.getStyle(valid)}"></div>
                    <p class="message__text">
                        ${this.getText(valid)}
                    </p>
            <button class="message__close"></button>
        </div>`;
    }

    getText(valid){
        const successMessage = 'Formulario enviado con exito';
        const errorMessage = 'Error al enviar el formulario.';
        return  valid ? successMessage : errorMessage ;
    }

    getStyle(valid){
        const baseClass= 'message__ico';
        const successClass = `${baseClass}--success`;
        const errorClass = `${baseClass}--error`;
        return  valid ? successClass : errorClass ;
    }

    validators(){
       return {
            "email": (email) => {
                const regex =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return regex.test(email);
            },
            "text": (value) => {
                return value !== '' ?  true : false;
            }
        }
    }


}
