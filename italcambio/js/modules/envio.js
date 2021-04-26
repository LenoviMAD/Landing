import Modal from './Modal.js';
import { test } from './validations.js';
import { numberFormater } from '../helpers.js';

// Envio
export default function init() {
    document.addEventListener('DOMContentLoaded', () => {
        const modal = new Modal()
        modal.initModal()

        const billeteraForm = document.getElementById('billeteraForm')
        const encomiendaForm = document.getElementById('encomiendaForm')
        const transferenciaForm = document.getElementById('transferenciaForm')

        // Billetera
        if (billeteraForm) {
            const MovilPay = document.getElementById('MovilPayWallet')
            const paidFormWallet = document.getElementById('paidFormWallet')
            const SectionPrepaid = document.getElementById('SectionPrepaidWallet')
            const beneficiarioWallet = document.getElementById('beneficiarioWallet')
            const btnSubmitBilletera = document.querySelector('[data-targetping="billetera"]')
            const SectionDebitCardNumber = document.getElementById('SectionDebitCardNumberWallet')
            const users = document.querySelector(`#${billeteraForm.getAttribute('id')} [name="users"]`)
            const amountWallet = document.querySelector(`#${billeteraForm.getAttribute('id')} [name="amountWallet"]`)
            const currencyWallet = document.querySelector(`#${billeteraForm.getAttribute('id')} [name="currencyWallet"]`)
            amountWallet.addEventListener('blur', () => {
                step1Wallet()
            })
            currencyWallet.addEventListener('change', () => {
                step1Wallet()
            })

            // Resumen de operacion
            async function step1Wallet() {
                // Cuando ambos campos esten llenos seguiente etapa
                if (amountWallet.value && (currencyWallet.options[currencyWallet.selectedIndex].value !== "Seleccione")) {
                    // Todo: validar campos
                    let formData = new FormData()
                    formData.append("cond", "calcsendw");
                    formData.append("amountWallet", amountWallet.value);
                    formData.append("currencyWallet", currencyWallet.options[currencyWallet.selectedIndex].value);

                    // Cargando spinner
                    modal.openModal('loader')

                    let data = await fetch("ajax.php", { method: 'POST', body: formData });
                    console.log(data);
                    let res = await data.json();

                    // Quitando spinner
                    modal.closeModal('loader')

                    // Fetch exitoso
                    if (res.code == "0000") {
                        // liberando inputs y mostrando los resultados
                        let resAmount = new Intl.NumberFormat().format(amountWallet.value),
                            resComission = new Intl.NumberFormat().format(res.usdcommission)

                        // Creando elementos para mostrar
                        let html = `
                            <p>
                                Monto envio en divisa: <br> ${parseInt(resAmount).toFixed(2)}
                            </p>
                            <p>
                                ${res.txtusdcommission}: <br> ${parseInt(resComission).toFixed(2)}
                            </p>
                        `
                        const inner = document.querySelector('#operationSummary .modal-body')
                        inner.innerHTML = html

                        modal.openModal('operationSummary')
                        beneficiarioWallet.classList.remove('hidden')

                    } else {
                        console.log('Error interno');
                    }
                }
            }

            beneficiarioWallet.addEventListener('change', () => {
                // Mostramos boton de enviar
                btnSubmitBilletera.classList.remove('hidden')
            })


            btnSubmitBilletera.addEventListener('click', async e => {
                e.preventDefault()
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

                    // mandar correo con el otp

                    document.getElementById('otpCode').value = resOtp.otp

                    document.querySelector("[data-id='btnOtp']").addEventListener('click', e => {
                        e.preventDefault()

                        finalFetch()
                    })
                } else {
                    modal.openModal('modalDanger')
                }

            })

            // Toggle para mas inputs del formulario de encomienda
            paidFormWallet.addEventListener('change', async() => {
                // Mostramos boton de enviar
                let valueSelected = paidFormWallet.options[paidFormWallet.selectedIndex].value;
                /*
                1 = Efectivo
                2 = Billetera 
                3 = Depósito en Cuenta
                4 = Pago Movil 
                5 = Tarjeta de Credito 
                6 = ACH 
                7 = Tarjeta Prepagada 
                8 = Tarjeta de Debito en Divisa 
                */

                if (valueSelected === "1") {
                    beneficiarioWallet.classList.remove('hidden')

                    // Poner hidden los demas
                    MovilPay.classList.add('hidden')
                    SectionDebitCardNumber.classList.add('hidden')
                    SectionPrepaid.classList.add('hidden')
                } else if (valueSelected === "2") {
                    beneficiarioWallet.classList.remove('hidden')

                    // Poner hidden los demas
                    MovilPay.classList.add('hidden')
                    SectionPrepaid.classList.add('hidden')
                    SectionDebitCardNumber.classList.add('hidden')
                } else if (valueSelected === "3") {
                    beneficiarioWallet.classList.remove('hidden')

                    // Poner hidden los demas
                    MovilPay.classList.add('hidden')
                    SectionPrepaid.classList.add('hidden')
                    SectionDebitCardNumber.classList.add('hidden')
                } else if (valueSelected === "4") {
                    beneficiarioWallet.classList.remove('hidden')
                        // Poner hidden los demas
                    MovilPay.classList.add('hidden')
                    SectionPrepaid.classList.add('hidden')
                    SectionDebitCardNumber.classList.add('hidden')
                } else if (valueSelected === "5") {
                    SectionPrepaid.classList.remove('hidden')
                    beneficiarioWallet.classList.remove('hidden')
                        // Poner hidden los demas
                    MovilPay.classList.add('hidden')
                    SectionDebitCardNumber.classList.add('hidden')
                } else if (valueSelected === "6") {
                    MovilPay.classList.remove('hidden')
                    beneficiarioWallet.classList.remove('hidden')
                        // Poner hidden los demas
                    SectionPrepaid.classList.add('hidden')
                    SectionDebitCardNumber.classList.add('hidden')
                } else if (valueSelected === "7") {
                    SectionPrepaid.classList.remove('hidden')
                    beneficiarioWallet.classList.remove('hidden')
                        // Poner hidden los demas
                    MovilPay.classList.add('hidden')
                    SectionDebitCardNumber.classList.add('hidden')
                } else if (valueSelected === "8") {
                    beneficiarioWallet.classList.remove('hidden')
                        // Poner hidden los demas
                    MovilPay.classList.add('hidden')
                    SectionDebitCardNumber.classList.add('hidden')
                    SectionPrepaid.classList.add('hidden')
                }

                // Abrir modal con datos
                modal.openModal('modalEncomienda')
            })

            async function finalFetch() {
                // ENVIO FETCH
                // Todo: validar campos
                let formData = new FormData()
                formData.append("cond", "addEnvio");
                formData.append("amountWallet", amountWallet.value);
                formData.append("currencyWallet", currencyWallet.options[currencyWallet.selectedIndex].value);
                formData.append("users", users.options[users.selectedIndex].value);
                modal.closeModal('otpVerification')

                // Cargando spinner
                modal.openModal('loader')

                let data = await fetch("ajax.php", { method: 'POST', body: formData });
                let res = await data.json();
                console.log(res);

                // Quitando spinner
                modal.closeModal('loader')

                if (res.code === "0000") {
                    modal.openModal('modalSuccess')
                } else if (res.code === "5000") {
                    modal.openModal('modalDanger', 'Datos incompletos', res.message)
                } else {
                    modal.openModal('modalDanger', 'Hubo un error', 'Ocurrio un error, favor intente de nuevo')
                }
            }

        }

        if (encomiendaForm) {
            const MovilPay = document.getElementById('MovilPayCommend')
            const btnAddWallet = document.getElementById('btnAddWallet')
            const depositCommend = document.getElementById('depositCommend')
            const efectivoCommend = document.getElementById('efectivoCommend')
            const SectionPrepaid = document.getElementById('SectionPrepaidCommend')
            const beneficiarioCommend = document.getElementById('beneficiarioCommend')
            const btnSubmitCommend = document.querySelector('[data-targetping="encomienda"]')
            const SectionDebitCardNumber = document.getElementById('SectionDebitCardNumberCommend')
            const usersCommend = document.querySelector(`#${encomiendaForm.getAttribute('id')} [name="usersCommend"]`)
            const amountCommend = document.querySelector(`#${encomiendaForm.getAttribute('id')} [name="amountCommend"]`)
            const countryCommend = document.querySelector(`#${encomiendaForm.getAttribute('id')} [name="countryCommend"]`)
            const paidFormCommend = document.querySelector(`#${encomiendaForm.getAttribute('id')} [name="paidFormCommend"]`)
            const providerCommend = document.querySelector(`#${encomiendaForm.getAttribute('id')} [name="providerCommend"]`)
            const amountBsCommend = document.querySelector(`#${encomiendaForm.getAttribute('id')} [name="amountBsCommend"]`)
            const exchangeRateCommend = document.querySelector(`#${encomiendaForm.getAttribute('id')} [name="exchangeRateCommend"]`)

            amountCommend.addEventListener('blur', () => {
                calculandoEnvioCamioMonto()
            })
            countryCommend.addEventListener('change', () => {
                calculandoEnvioCamioMonto()
            })
            providerCommend.addEventListener('change', () => {
                calculandoEnvioCamioMonto()
            })

            async function calculandoEnvioCamioMonto() {
                if (amountCommend.value && (countryCommend.options[countryCommend.selectedIndex].value !== "Seleccione") && (providerCommend.options[providerCommend.selectedIndex].value !== "Seleccione")) {
                    // Todo: validar campos
                    let formData = new FormData()
                    formData.append("cond", "calcsendenvio");
                    formData.append("amountCommend", amountCommend.value);
                    formData.append("countryCommend", countryCommend.options[countryCommend.selectedIndex].value);
                    formData.append("providerCommend", providerCommend.options[providerCommend.selectedIndex].value);

                    // Cargando spinner
                    modal.openModal('loader')

                    let data = await fetch("ajax.php", { method: 'POST', body: formData });
                    let res = await data.json();

                    // LLenamos los campos correspondientes
                    if (res.code === "0000") {
                        amountBsCommend.value = numberFormater(res.totalves)
                        exchangeRateCommend.value = numberFormater(res.usdrate)

                        // Creando elementos para mostrar
                        let html = `
                            <p>
                                Monto Divisa a Enviar: <br> ${numberFormater(amountCommend.value)}
                            </p>
                            <p>
                                ${res.txtusdcommission}: <br> ${numberFormater(res.usdcommission)}
                            </p>
                            <p>
                                Tasa de Cambio: <br> ${numberFormater(res.usdrate)}
                            </p>
                            <p>
                                ${res.txtvescommission}: <br> ${numberFormater(res.vescommission)}
                            </p>
                            <p>
                                Total Enviar Bs. : <br> ${numberFormater(res.totalves)}
                            </p>
                            `
                        const inner = document.querySelector('#modalEncomienda .modal-body')
                        inner.innerHTML = html
                    } else {
                        // Mostramos alerta de errore
                        console.log('problems');
                    }

                    modal.closeModal('loader')
                }
            }
            // -tasa de cambio y monto se llenan cuando (proveedor, pais, monto) sean completados

            // Toggle para add beneficiario
            btnAddWallet.addEventListener('click', e => {
                e.preventDefault()
                let userInfo = document.getElementById('userCommend')
                if (userInfo.classList.contains('hidden')) {
                    userInfo.classList.remove('hidden')
                } else {
                    userInfo.classList.add('hidden')
                }
            })

            // Toggle para mas inputs del formulario de encomienda
            paidFormCommend.addEventListener('change', async() => {
                // Mostramos boton de enviar
                let valueSelected = paidFormCommend.options[paidFormCommend.selectedIndex].value;
                /*
                1 = Efectivo
                2 = Billetera 
                3 = Depósito en Cuenta
                4 = Pago Movil 
                5 = Tarjeta de Credito 
                6 = ACH 
                7 = Tarjeta Prepagada 
                8 = Tarjeta de Debito en Divisa 
                */

                if (valueSelected === "1") {
                    efectivoCommend.classList.remove('hidden')
                    beneficiarioCommend.classList.remove('hidden')

                    // Poner hidden los demas
                    MovilPay.classList.add('hidden')
                    SectionDebitCardNumber.classList.add('hidden')
                    depositCommend.classList.add('hidden')
                    SectionPrepaid.classList.add('hidden')
                } else if (valueSelected === "2") {
                    beneficiarioCommend.classList.remove('hidden')

                    // Poner hidden los demas
                    MovilPay.classList.add('hidden')
                    depositCommend.classList.add('hidden')
                    SectionPrepaid.classList.add('hidden')
                    efectivoCommend.classList.add('hidden')
                    SectionDebitCardNumber.classList.add('hidden')
                } else if (valueSelected === "3") {
                    depositCommend.classList.remove('hidden')
                    beneficiarioCommend.classList.remove('hidden')

                    // Poner hidden los demas
                    MovilPay.classList.add('hidden')
                    SectionPrepaid.classList.add('hidden')
                    efectivoCommend.classList.add('hidden')
                    SectionDebitCardNumber.classList.add('hidden')
                } else if (valueSelected === "4") {
                    depositCommend.classList.remove('hidden')
                    beneficiarioCommend.classList.remove('hidden')
                        // Poner hidden los demas
                    MovilPay.classList.add('hidden')
                    SectionPrepaid.classList.add('hidden')
                    efectivoCommend.classList.add('hidden')
                    SectionDebitCardNumber.classList.add('hidden')
                } else if (valueSelected === "5") {
                    SectionPrepaid.classList.remove('hidden')
                    beneficiarioCommend.classList.remove('hidden')
                        // Poner hidden los demas
                    MovilPay.classList.add('hidden')
                    depositCommend.classList.add('hidden')
                    efectivoCommend.classList.add('hidden')
                    SectionDebitCardNumber.classList.add('hidden')
                } else if (valueSelected === "6") {
                    MovilPay.classList.remove('hidden')
                    beneficiarioCommend.classList.remove('hidden')
                        // Poner hidden los demas
                    depositCommend.classList.add('hidden')
                    SectionPrepaid.classList.add('hidden')
                    efectivoCommend.classList.add('hidden')
                    SectionDebitCardNumber.classList.add('hidden')
                } else if (valueSelected === "7") {
                    SectionPrepaid.classList.remove('hidden')
                    beneficiarioCommend.classList.remove('hidden')
                        // Poner hidden los demas
                    MovilPay.classList.add('hidden')
                    efectivoCommend.classList.add('hidden')
                    SectionDebitCardNumber.classList.add('hidden')
                } else if (valueSelected === "8") {
                    depositCommend.classList.remove('hidden')
                    beneficiarioCommend.classList.remove('hidden')
                        // Poner hidden los demas
                    MovilPay.classList.add('hidden')
                    SectionDebitCardNumber.classList.add('hidden')
                    SectionPrepaid.classList.add('hidden')
                    efectivoCommend.classList.add('hidden')
                }

                // Abrir modal con datos
                modal.openModal('modalEncomienda')
            })

            // Agregar usuario estatico al select y ocultando los campos nuevamente
            addContact.addEventListener('click', e => {
                e.preventDefault()
                if (test('Beneficiario', 'Debe llenar los campos obligatorios!', 'userCommend')) {
                    let userInfo = document.getElementById('userCommend')
                    const firstNameCommend = document.querySelector(`#${encomiendaForm.getAttribute('id')} [name="firstNameCommend"]`)
                    const firstSurnameCommend = document.querySelector(`#${encomiendaForm.getAttribute('id')} [name="firstSurnameCommend"]`)

                    // let html = `<option value="1">${firstNameCommend.value} - ${firstSurnameCommend.value} </option>`
                    let html = `<option value="1">${firstNameCommend.value} - ${firstSurnameCommend.value} </option>`
                    let node = document.createElement('option')
                    node.setAttribute('value', 1)
                    node.setAttribute('selected', true)
                    node.innerHTML = html
                    usersCommend.append(node)

                    // TODO: validar todos los campos

                    // ocultamos los campos nuevamente
                    userInfo.classList.add('hidden')

                    // Mostramos el ping button
                    btnSubmitCommend.classList.remove('hidden')
                }
            })

            btnSubmitCommend.addEventListener('click', async e => {
                e.preventDefault()

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
                        let valueSelected = paidFormCommend.options[paidFormCommend.selectedIndex].value;

                        // Billetera
                        modal.closeModal('otpVerification')

                        // Cargando spinner
                        modal.openModal('loader')
                        let formData = new FormData(encomiendaForm)

                        formData.append("cond", "commendWallet");
                        let data = await fetch("ajax.php", { method: 'POST', body: formData });
                        let res = await data.json();

                        // Quitando spinner
                        modal.closeModal('loader')

                        if (res.code === "0000") {
                            modal.openModal('modalSuccess')
                        } else {
                            modal.openModal('modalDanger')
                        }
                    })
                } else {
                    modal.openModal('modalDanger')
                }
            })
        }

        if (transferenciaForm) {
            const btnSubmitTransfer = document.querySelector('[data-targetping="transferencia"]')
            const btnIconAdd = document.getElementById(`btnIconAdd`)
            const beneficiarioTransfer = document.getElementById(`beneficiarioTransfer`)
            const addContactTransfer = document.getElementById(`addContactTransfer`)

            const MovilPay = document.getElementById('MovilPayTransfer')
            const SectionPrepaid = document.getElementById('SectionPrepaidTransfer')
            const SectionDebitCardNumber = document.getElementById('SectionDebitCardNumberTransfer')

            ///// POR MODIFICAR 
            //Idlead <- falta por indicar, esta hardcode
            //idcountry
            const countryTransfer = document.querySelector(`#${transferenciaForm.getAttribute('id')} [name="countryTransfer"]`)
                //idcurrency
            const currencyTransfer = document.querySelector(`#${transferenciaForm.getAttribute('id')} [name="currencyTransfer"]`)
                //amount
            const amountTransfer = document.querySelector(`#${transferenciaForm.getAttribute('id')} [name="amountTransfer"]`)
                //idclearencetype
            const paidFormTransfer = document.querySelector(`#${transferenciaForm.getAttribute('id')} [name="paidFormTransfer"]`)
            const exchangedRateTransfer = document.querySelector(`#${transferenciaForm.getAttribute('id')} [name="exchangedRateTransfer"]`)
            const amountBsTransfer = document.querySelector(`#${transferenciaForm.getAttribute('id')} [name="amountBsTransfer"]`)
            let data = new FormData()
            amountTransfer.addEventListener('blur', () => {
                calculandoEnvioCambioMonto()
            })
            countryTransfer.addEventListener('change', () => {
                calculandoEnvioCambioMonto()
            })
            currencyTransfer.addEventListener('change', () => {
                calculandoEnvioCambioMonto()
            })

            async function calculandoEnvioCambioMonto() {
                if (amountTransfer.value && (countryTransfer.options[countryTransfer.selectedIndex].value !== "Seleccione") && (currencyTransfer.options[currencyTransfer.selectedIndex].value !== "Seleccione")) {
                    // Todo: validar campos
                    let formData = new FormData()
                    formData.append("cond", "calcsendtr");
                    formData.append("amountTransfer", amountTransfer.value);
                    formData.append("countryTransfer", countryTransfer.options[countryTransfer.selectedIndex].value);
                    formData.append("currencyTransfer", currencyTransfer.options[currencyTransfer.selectedIndex].value);

                    // Cargando spinner
                    modal.openModal('loader')

                    let data = await fetch("ajax.php", { method: 'POST', body: formData });
                    let res = await data.json();
                    // LLenamos los campos correspondientes
                    if (res.code === "0000") {
                        amountBsTransfer.value = numberFormater(res.totalves)
                        exchangedRateTransfer.value = numberFormater(res.usdrate)

                        // Creando elementos para mostrar
                        let html = `
                            <p>
                                Monto Transferencia en Divisa: <br> ${numberFormater(amountTransfer.value)}
                            </p>
                            <p>
                                ${res.txtusdcommission}: <br> ${numberFormater(res.usdcommission)}
                            </p>
                            <p>
                                Tasa de Cambio: <br> ${numberFormater(res.usdrate)}
                            </p>
                            <p>
                                ${res.txtvescommission}: <br> ${numberFormater(res.vescommission)}
                            </p>
                            <p>
                                Total Transferencia Bs.: <br> ${numberFormater(res.totalves)}
                            </p>
                            `
                        const inner = document.querySelector('#modalTransferencia .modal-body')
                        inner.innerHTML = html
                    } else {
                        // Mostramos alerta de errore
                        console.log('problems');
                    }
                    modal.closeModal('loader')
                }
            }
            // -tasa de cambio y monto se llenan cuando (proveedor, pais, monto) sean completados
            ///falta modificar

            // Toggle para add beneficiario
            btnIconAdd.addEventListener('click', e => {
                e.preventDefault()
                let userInfo = document.getElementById('userTransfer')
                if (userInfo.classList.contains('hidden')) {
                    userInfo.classList.remove('hidden')
                } else {
                    userInfo.classList.add('hidden')
                }
            })

            paidFormTransfer.addEventListener('change', () => {
                // Mostramos boton de enviar
                let valueSelected = paidFormTransfer.options[paidFormTransfer.selectedIndex].value;
                const accountDeposit = document.getElementById(`accountDeposit`)
                const cash = document.getElementById(`cash`)
                    /*
                    1 = Efectivo 
                    2 = Billetera
                    3 = Depósito en Cuenta
                    */

                if (valueSelected === "1") {
                    beneficiarioTransfer.classList.remove('hidden')
                    cash.classList.remove('hidden')
                        // Poner hidden los demas                
                    accountDeposit.classList.add('hidden')
                    MovilPay.classList.add('hidden')
                    SectionPrepaid.classList.add('hidden')
                    SectionDebitCardNumber.classList.add('hidden')
                } else if (valueSelected === "2") {
                    beneficiarioTransfer.classList.remove('hidden')
                        // Poner hidden los demas
                    accountDeposit.classList.add('hidden')
                    cash.classList.add('hidden')
                    MovilPay.classList.add('hidden')
                    SectionPrepaid.classList.add('hidden')
                    SectionDebitCardNumber.classList.add('hidden')
                } else if (valueSelected === "3") {
                    beneficiarioTransfer.classList.remove('hidden')
                    accountDeposit.classList.remove('hidden')
                        // Poner hidden los demas
                    cash.classList.add('hidden')
                    MovilPay.classList.add('hidden')
                    SectionPrepaid.classList.add('hidden')
                    SectionDebitCardNumber.classList.add('hidden')
                } else if (valueSelected === "4") {
                    beneficiarioTransfer.classList.remove('hidden')
                        // Poner hidden los demas
                    MovilPay.classList.add('hidden')
                    SectionPrepaid.classList.add('hidden')
                    SectionDebitCardNumber.classList.add('hidden')
                    accountDeposit.classList.add('hidden')
                    cash.classList.add('hidden')
                } else if (valueSelected === "5") {
                    SectionPrepaid.classList.remove('hidden')
                    beneficiarioTransfer.classList.remove('hidden')
                        // Poner hidden los demas
                    MovilPay.classList.add('hidden')
                    SectionDebitCardNumber.classList.add('hidden')
                    accountDeposit.classList.add('hidden')
                    cash.classList.add('hidden')
                } else if (valueSelected === "6") {
                    MovilPay.classList.remove('hidden')
                    beneficiarioTransfer.classList.remove('hidden')
                        // Poner hidden los demas
                    SectionPrepaid.classList.add('hidden')
                    SectionDebitCardNumber.classList.add('hidden')
                    accountDeposit.classList.add('hidden')
                    cash.classList.add('hidden')
                } else if (valueSelected === "7") {
                    SectionPrepaid.classList.remove('hidden')
                    beneficiarioTransfer.classList.remove('hidden')
                        // Poner hidden los demas
                    MovilPay.classList.add('hidden')
                    SectionDebitCardNumber.classList.add('hidden')
                    accountDeposit.classList.add('hidden')
                    cash.classList.add('hidden')
                } else if (valueSelected === "8") {
                    beneficiarioTransfer.classList.remove('hidden')
                        // Poner hidden los demas
                    MovilPay.classList.add('hidden')
                    SectionDebitCardNumber.classList.add('hidden')
                    SectionPrepaid.classList.add('hidden')
                    accountDeposit.classList.add('hidden')
                    cash.classList.add('hidden')
                }

                // Abrir modal con datos
                modal.openModal('modalTransferencia')
            })


            // Agregar usuario estatico al select y ocultando los campos nuevamente
            addContactTransfer.addEventListener('click', e => {
                e.preventDefault()
                if (test('Beneficiario', 'Debe llenar los campos obligatorios!', 'userTransfer')) {
                    let userInfo = document.getElementById('userTransfer')
                    let usersTransfer = document.getElementById('usersTransfer')

                    const firstNameTransfer = document.querySelector(`#${transferenciaForm.getAttribute('id')} [name="firstNameTransfer"]`)
                    const firstSurnameTransfer = document.querySelector(`#${transferenciaForm.getAttribute('id')} [name="firstSurnameTransfer"]`)

                    let html = `<option value="1">${firstNameTransfer.value} - ${firstSurnameTransfer.value} </option>`
                    let node = document.createElement('option')
                    node.setAttribute('value', 1)
                    node.setAttribute('selected', true)
                    node.innerHTML = html
                    usersTransfer.append(node)

                    // TODO: validar todos los campos

                    // ocultamos los campos nuevamente
                    userInfo.classList.add('hidden')
                        // Mostramos el ping button
                    btnSubmitTransfer.classList.remove('hidden')
                }
            })

            btnSubmitTransfer.addEventListener('click', async e => {
                e.preventDefault()

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
                        let formData = new FormData(transferenciaForm)

                        formData.append("cond", "saveTransfer");
                        let data = await fetch("ajax.php", { method: 'POST', body: formData });
                        let res = await data.json();

                        // Quitando spinner
                        modal.closeModal('loader')

                        if (res.code === "0000") {
                            modal.openModal('modalSuccess')
                        } else {
                            modal.openModal('modalDanger')
                        }
                    })
                } else {
                    modal.openModal('modalDanger')
                }
            })
        }
    })
}

function separateCode(code) {
    const element = []
    for (let index = 0; index < code.length; index++) {
        if (code.charAt(index) != 0 && code.charAt(index) != 7) {
            element = code.charAt(index);
        }
    }
    return element
}