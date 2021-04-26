import Modal from './Modal.js';
import { numberFormater } from '../helpers.js';

// Cambio
export default function init() {
    document.addEventListener('DOMContentLoaded', () => {
        const modal = new Modal()
        modal.initModal()

        const cambioForm = document.getElementById('cambioForm')
        if (cambioForm) {
            const amount = document.querySelector(`#${cambioForm.getAttribute('id')} [name="amount"]`)
            const paidMethod = document.querySelector(`#${cambioForm.getAttribute('id')} [name="paidMethod"]`)
            const recieveCurrency = document.querySelector(`#${cambioForm.getAttribute('id')} [name="recieveCurrency"]`)
            const sendCurrency = document.querySelector(`#${cambioForm.getAttribute('id')} [name="sendCurrency"]`)
            const recieveMethod = document.querySelector(`#${cambioForm.getAttribute('id')} [name="recieveMethod"]`)
            const bank = document.querySelector(`#${cambioForm.getAttribute('id')} [name="bank"]`)
            const reference = document.querySelector(`#${cambioForm.getAttribute('id')} [name="reference"]`)
            const routing = document.querySelector(`#${cambioForm.getAttribute('id')} [name="routing"]`)
            const ping = document.querySelector(`#${cambioForm.getAttribute('id')} .ping`)

            bank.addEventListener('blur', () => {
                togglePing()
            })
            reference.addEventListener('blur', () => {
                togglePing()
            })
            routing.addEventListener('blur', () => {
                togglePing()
            })

            // Toggle para calcComission
            amount.addEventListener('blur', () => {
                calComisionCompra()
                togglePing()
            })
            paidMethod.addEventListener('change', () => {
                calComisionCompra()
                togglePing()
            })
            recieveMethod.addEventListener('change', () => {
                calComisionCompra()
                togglePing()
            })
            sendCurrency.addEventListener('change', () => {
                calComisionCompra()
                togglePing()
            })

            // Toggle para mostrar modal (mas info)
            recieveCurrency.addEventListener('change', async() => {
                calComisionCompra()
            })

            // fetch final de venta
            ping.addEventListener('click', async() => {
                // GEN OTP FETCH
                // Cargando spinner
                modal.openModal('loader')

                let formData = new FormData()
                formData.append("cond", "genotp");
                let dataOtp = await fetch("ajax.php", { method: 'POST', body: formData });
                let resOtp = await dataOtp.json();

                // Quitando spinner
                modal.closeModal('loader')

                if (resOtp.code == "0000") {
                    // abrir modal para ultimo fetch 
                    modal.openModal('otpVerification')
                    document.getElementById('otpCode').value = resOtp.otp

                    document.querySelector("[data-id='btnOtp']").addEventListener('click', async e => {
                        e.preventDefault()
                        modal.closeModal('otpVerification')

                        // Cargando spinner
                        modal.openModal('loader')
                        let formData = new FormData(cambioForm)

                        formData.append("cond", "execexchange");
                        formData.append("otp", resOtp.otp);
                        formData.append("sendCurrency", sendCurrency.options[sendCurrency.selectedIndex].value);
                        formData.append("recieveCurrency", recieveCurrency.options[recieveCurrency.selectedIndex].value);
                        formData.append("recieveMethod", recieveMethod.options[recieveMethod.selectedIndex].value);
                        formData.append("paidMethod", paidMethod.options[paidMethod.selectedIndex].value);

                        let data = await fetch("ajax.php", { method: 'POST', body: formData });
                        let res = await data.json();

                        // Quitando spinner
                        modal.closeModal('loader')
                        if (res.code === "0000") {
                            modal.openModal('modalSuccess')
                        } else if (res.code === "5000") {
                            modal.openModal('modalDanger', 'Datos incompletos', res.message)
                        } else {
                            modal.openModal('modalDanger', 'Hubo un error', 'Ocurrio un error, favor intente de nuevo')
                        }
                    })
                } else if (res.code === "5000") {
                    modal.openModal('modalDanger', 'Datos incompletos', res.message)
                } else {
                    modal.openModal('modalDanger', 'Hubo un error', 'Ocurrio un error, favor intente de nuevo')
                }
            })

            // mostrar modal cuando se modifique monto o divisa, teniendo seleccionado una forma de abono
            async function calComisionCompra() {
                if (amount.value && (paidMethod.options[paidMethod.selectedIndex].value !== "Seleccione") && (recieveMethod.options[recieveMethod.selectedIndex].value !== "Seleccione") && (recieveCurrency.options[recieveCurrency.selectedIndex].value !== "Seleccione") && (sendCurrency.options[sendCurrency.selectedIndex].value !== "Seleccione")) {
                    // Todo: validar campos
                    let formData = new FormData(cambioForm)
                    formData.append("cond", "calcexchange");
                    formData.append("sendCurrency", sendCurrency.options[sendCurrency.selectedIndex].value);
                    formData.append("recieveCurrency", recieveCurrency.options[recieveCurrency.selectedIndex].value);
                    formData.append("recieveMethod", recieveMethod.options[recieveMethod.selectedIndex].value);
                    formData.append("paidMethod", paidMethod.options[paidMethod.selectedIndex].value);

                    // Cargando spinner
                    modal.openModal('loader')

                    let data = await fetch("ajax.php", { method: 'POST', body: formData });
                    let res = await data.json();

                    // LLenamos los campos correspondientes
                    if (res.code === "0000") {
                        // Creando elementos para mostrar
                        let html = `
                            <p>
                                Monto Divisa a Cobrar: ${numberFormater(res.exchangeamount)}
                            </p>
                            <p>
                                ${res.txtcommission}: ${numberFormater(res.commission)}
                            </p>
                        `
                        const inner = document.querySelector('#operationSummary .modal-body')
                        inner.innerHTML = html
                    } else if (res.code === "5000") {
                        modal.openModal('modalDanger', 'Datos incompletos', res.message)
                    } else {
                        modal.openModal('modalDanger', 'Hubo un error', 'Ocurrio un error, favor intente de nuevo')
                    }

                    modal.closeModal('loader')

                    // Abrir modal con datos
                    modal.openModal('operationSummary')
                }
            }

            // activamos el ping cuando todos los inputs esten full
            function togglePing() {
                if (amount.value && bank.value && reference.value && routing.value && (paidMethod.options[paidMethod.selectedIndex].value !== "Seleccione") && (recieveMethod.options[recieveMethod.selectedIndex].value !== "Seleccione") && (recieveCurrency.options[recieveCurrency.selectedIndex].value !== "Seleccione") && (sendCurrency.options[sendCurrency.selectedIndex].value !== "Seleccione")) {
                    // Mostramos boton de enviar
                    ping.classList.remove('hidden')
                } else {
                    ping.classList.add('hidden')
                }
            }
        }
    })
}