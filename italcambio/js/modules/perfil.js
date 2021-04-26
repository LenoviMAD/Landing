import Modal from './Modal.js';

// Cambio
export default function init() {
    document.addEventListener('DOMContentLoaded', () => {
        const profileForm = document.getElementById('profileForm')
        const modal = new Modal()
        modal.initModal()

        if (profileForm) {
            const areacode = document.getElementById('pAreacode')
            const phonenumber = document.getElementById('pPhonenumber')
            const countrycode = document.getElementById('pCountrycode')
            const email = document.getElementById('pEmail')
            const idlead = document.getElementById('idlead')

            const typeDocument = document.querySelector(`#${profileForm.getAttribute('id')} [name="typeDocument"]`)
            const documentC = document.querySelector(`#${profileForm.getAttribute('id')} [name="document"]`)
            const birthdate = document.querySelector(`#${profileForm.getAttribute('id')} [name="birthdate"]`)
            const firstName = document.querySelector(`#${profileForm.getAttribute('id')} [name="firstName"]`)
            const secondName = document.querySelector(`#${profileForm.getAttribute('id')} [name="secondName"]`)
            const firstSurname = document.querySelector(`#${profileForm.getAttribute('id')} [name="firstSurname"]`)
            const secondSurname = document.querySelector(`#${profileForm.getAttribute('id')} [name="secondSurname"]`)
            const country = document.querySelector(`#${profileForm.getAttribute('id')} [name="country"]`)
            const state = document.querySelector(`#${profileForm.getAttribute('id')} [name="state"]`)
            const city = document.querySelector(`#${profileForm.getAttribute('id')} [name="city"]`)
            const direction = document.querySelector(`#${profileForm.getAttribute('id')} [name="direction"]`)
            const preferenceAgency = document.querySelector(`#${profileForm.getAttribute('id')} [name="preferenceAgency"]`)
            const bankAccount = document.querySelector(`#${profileForm.getAttribute('id')} [name="bankAccount"]`)
            const bancoPagoMovil = document.querySelector(`#${profileForm.getAttribute('id')} [name="bancoPagoMovil"]`)
            const telMovil = document.querySelector(`#${profileForm.getAttribute('id')} [name="telMovil"]`)

            // Llenamos todos los campos si getparty 
            async function getParty() {
                // Fetch session currectly
                const formData = new FormData();
                formData.append("cond", "session");

                const data = await fetch("ajax.php", { method: 'POST', body: formData });
                const res = await data.json();
                console.log(res);
                // // Fetch getparty
                // const formDataIsParty = new FormData();

                // formDataIsParty.append("cond", "getparty");
                // formDataIsParty.append("idParty", res.idparty);
                // formDataIsParty.append("idLead", res.idlead);

                // const dataIsParty = await fetch("ajax.php", { method: 'POST', body: formDataIsParty });
                // const resIsParty = await dataIsParty.json();

                const resIsParty = {
                    address: "mucho texto lormelrormlroemlormelormellrmem",
                    bankaccount: "01021313131313313133",
                    birthdate: "2021-10-25 00:00:00",
                    code: "0000",
                    documentid: "V27916733",
                    email: "yonex27000@gmail.com",
                    firstname: "yone",
                    idcity: "2808",
                    idcountry: "238",
                    idlocation: "4",
                    idparty: "501121",
                    idstate: "453",
                    lastname: "González",
                    message: "OK",
                    middlename: "jose",
                    mpbankaccount: "",
                    mpbankcode: "",
                    phoneareacode: "58",
                    phonecountrycode: "8",
                    phonenumber: "123123",
                    secondlastname: "acaban"
                }

                console.log(resIsParty);

                if (resIsParty.code === "0000") {

                    typeDocument.childNodes.forEach(element => {
                        if (element.textContent.trim() === resIsParty.documentid.substr(0, 1)) {
                            element.setAttribute("selected", true)
                        }
                    });

                    documentC.value = resIsParty.documentid.substr(1, resIsParty.documentid.length)

                    birthdate.value = resIsParty.birthdate.split(" ")[0].split("/").reverse().join("-");
                    firstName.value = resIsParty.firstname
                    secondName.value = resIsParty.middlename
                    firstSurname.value = resIsParty.lastname
                    secondSurname.value = resIsParty.secondlastname


                    country.childNodes.forEach(element => {
                        if (element.value === resIsParty.idcountry) {
                            element.setAttribute("selected", true)
                        }
                    });

                    state.childNodes.forEach(element => {
                        if (element.value === resIsParty.idstate) {
                            element.setAttribute("selected", true)
                        }
                    });
                    city.childNodes.forEach(element => {
                        if (element.value === resIsParty.idcity) {
                            element.setAttribute("selected", true)
                        }
                    });

                    preferenceAgency.childNodes.forEach(element => {
                        if (element.value === resIsParty.idpreferenceAgency) {
                            element.setAttribute("selected", true)
                        }
                    });

                    direction.value = resIsParty.address
                    bankAccount.value = resIsParty.bankaccount

                    bancoPagoMovil.childNodes.forEach(element => {
                        if (element.value === res.mpbankcode) {
                            element.setAttribute("selected", true)
                        }
                    });

                    telMovil.value = res.mpbankaccount


                }
            }
            getParty()

            profileForm.addEventListener('submit', async e => {
                e.preventDefault()

                // TODO: Precargar data si eres party
                // Cargando spinner
                modal.openModal('loader')

                const formData = new FormData(profileForm);

                let doc = typeDocument.options[typeDocument.selectedIndex].textContent.trim() + "" + documentC.value.trim()

                formData.append("cond", "leadToParty");
                formData.append("areacode", areacode.textContent);
                formData.append("phonenumber", phonenumber.textContent);
                formData.append("email", email.textContent);
                formData.append("countrycode", countrycode.textContent);
                formData.append("prepaidcardnumber", "prepaidcardnumber");
                formData.append("debitcardnumber", "debitcardnumber");
                formData.append("idlead", idlead.textContent);
                formData.append("documentid", doc.textContent);

                const data = await fetch("ajax.php", { method: 'POST', body: formData });
                const res = await data.text();

                // Quitando spinner
                modal.closeModal('loader')

                console.log(res);
                if (res.code == "0000") {
                    modal.openModal('modalSuccess')
                } else if (res.code === "5000") {
                    modal.openModal('modalDanger', 'Datos incompletos', res.message)
                } else {
                    modal.openModal('modalDanger', 'Hubo un error', 'Ocurrio un error, favor intente de nuevo')
                }
            })
        }
    })
}