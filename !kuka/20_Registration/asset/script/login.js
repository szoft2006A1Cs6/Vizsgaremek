let form = document.querySelector("form")
let box = document.createElement("div")
form.appendChild(box)
box.classList.add("error_box")
var url = "https://localhost:7198/api/Login"
form.onsubmit = (event) => {
    event.preventDefault()
    box.innerHTML = ""
    let email_input = document.getElementById("email-input").value
    let password_input = document.getElementById("password-input").value
    if(email_input == "" || password_input == ""){
        let sor = document.createElement("div")
        sor.classList.add("error")
        sor.innerHTML = "Nem töltötted ki adatokkal!"
        box.appendChild(sor)
    }
    else{
        //Küldés
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Email: email_input,
                Passwd: password_input,
            })

        })
        .then(response => {
            if(!response.ok){
                if(response.status === 401){
                    alert("Hibás a jelszó.")
                }
                else if(response.status === 404){
                    alert("Az e-mail cím nem található")
                }
                else{
                    alert("Szerver hiba. Kérlek próbáld meg később!")
                    throw new Error(`HTTP hiba! Státuszkód: ${response.status}`)
                }
            }
            else{
                alert("Sikeres bejelentkezés")
                //és a továbbiak
            }return response.json()
        })
        .then((data => {
            //a továbbiak
        }))
        .catch((error) => {
            console.error("Hiba történt:", error)
        })
        
    }

}