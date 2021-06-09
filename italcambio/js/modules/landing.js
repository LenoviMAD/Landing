import Modal from './Modal.js';
import { numberFormater } from '../helpers.js';

//Landing
export default function init() {
    document.addEventListener('DOMContentLoaded', () => {
        const modal = new Modal()
        modal.initModal()

        const btnSubmit = document.getElementById('sendButtom')
        const email = document.getElementById('email')
        const contrycode = document.getElementById('codeCountry')
        const areacode = document.getElementById('codeArea')
        const phonenumber = document.getElementById('phone')

        if (btnSubmit !== null) {
            btnSubmit.addEventListener('click', () => {
                stepLanding()
            })
        }

        async function stepLanding() {
            if (email.value && phonenumber.value && areacode.options[areacode.selectedIndex].text && contrycode.options[contrycode.selectedIndex].text) {
                let formData = new FormData()
                formData.append("cond", "addlead");
                formData.append("email", email.value);
                formData.append("contrycode", contrycode.options[contrycode.selectedIndex].text);
                formData.append("areacode", areacode.options[areacode.selectedIndex].text);
                formData.append("phonenumber", phonenumber.value);

                // Cargando spinner
                modal.openModal('loader')

                let data = await fetch("ajax.php", { method: 'POST', body: formData });
                let res = await data.json();
                modal.closeModal('loader')

                if (res.code === "0000") {
                    //console.log(res.code);
                    window.location.href = "downloadPage.php";
                } else {
                    modal.openModal("modalDanger", 'Datos incompletos', res.message)
                }
                // Quitando spinner
                modal.closeModal('loader')
            } else {
                modal.openModal("modalDanger", 'Datos incompletos', 'Por favor ingrese todos los datos')
            }
        }
    })
}