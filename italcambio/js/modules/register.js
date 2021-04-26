import Modal from './Modal.js';
import { numberFormater } from '../helpers.js';

// Cambio
export default function init() {
    document.addEventListener('DOMContentLoaded', () => {
        const modal = new Modal()
        modal.initModal()

        const registerForm = document.getElementById('registerForm')

        if (registerForm) {
            registerForm.addEventListener('submit', async e => {
                e.preventDefault()

                // Cargando spinner
                modal.openModal('loader')

                // Generar pin
                let formData = new FormData()
                formData.append("cond", "genpin");
                let dataPin = await fetch("ajax.php", { method: 'POST', body: formData });
                let resPin = await dataPin.json();
                console.log(resPin);

                if (resPin.code === "0000") {
                    // Guardar pin en una variable de sesion para sus porterior validacion
                    let formData1 = new FormData()
                    formData1.append("cond", "savePin");
                    formData1.append("pin", resPin.pin);
                    let dataSavePin = await fetch("ajax.php", { method: 'POST', body: formData1 });
                    let resSavePin = await dataSavePin.text();

                    console.log(resPin);

                    // enviar pin al correo

                    // let formData = new FormData(registerForm)
                    // formData.append("cond", "sendEmailPin");
                    // formData.append("pin", resPin.pin);

                    // let dataEmailPin = await fetch("ajax.php", { method: 'POST', body: formData });
                    // let resEmailPin = await dataEmailPin.text();

                    // modal.closeModal('loader')
                    modal.closeModal('loader')

                    if (true) {
                        // abriendo pin modal
                        modal.openModal('pinVerification')

                        const btnPin = document.querySelector('#pinVerification [data-id="btnPin"]')
                        let inputPin = document.querySelector('#pinVerification #pinCode')

                        btnPin.addEventListener('click', async() => {
                            // Verificar pin
                            let formData = new FormData()
                            formData.append("cond", "pinVerification");
                            formData.append("pin", inputPin.value);
                            modal.openModal('loader')
                            let dataVerification = await fetch("ajax.php", { method: 'POST', body: formData });
                            let resVerification = await dataVerification.json();
                            modal.closeModal('loader')

                            // Si es el pin correcto
                            if (resVerification.code === "0000") {
                                modal.closeModal('pinVerification')
                                modal.openModal('loader')
                                let codeArea = document.querySelector('#registerForm [name="codeArea"]')

                                // Enviamos info para primer paso de registro
                                let formData = new FormData(registerForm)
                                formData.append("cond", "addlead");
                                formData.append("codeArea", codeArea.options[codeArea.selectedIndex].textContent);

                                let dataSignup = await fetch("ajax.php", { method: 'POST', body: formData });
                                let resSignup = await dataSignup.json();

                                modal.closeModal('loader')

                                if (resSignup.code === "0000") {
                                    modal.openModal('modalSuccess', `OK ${resSignup.pin}`)
                                } else if (resSignup.code === "5000") {
                                    modal.openModal('modalDanger', 'Datos incompletos', resSignup.message)
                                } else {
                                    modal.openModal('modalDanger', 'Hubo un error', 'Ocurrio un error, favor intente de nuevo')
                                }
                            }
                        })
                    } else if (resEmailPin.code === "5000") {
                        modal.openModal('modalDanger', 'Datos incompletos', resEmailPin.message)
                    } else {
                        modal.openModal('modalDanger', 'Hubo un error', 'Ocurrio un error, favor intente de nuevo')
                    }
                } else if (res.code === "5000") {
                    modal.openModal('modalDanger', 'Datos incompletos', res.message)
                } else {
                    modal.openModal('modalDanger', 'Hubo un error', 'Ocurrio un error, favor intente de nuevo')
                }
            })

        }
    })
}