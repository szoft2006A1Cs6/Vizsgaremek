var form = document.getElementById('registration')
let box = document.createElement("div")
form.appendChild(box)
box.classList.add("error_box")
const today = new Date();

errors = 
[
    {errorThis: false, text:"Nem adtál meg nevet!"},
    {errorThis: false, text:"Nem teljes egész nevet adtál meg nagy kezdőbetükkel!"},
    {errorThis: false, text:"Nem adtál meg e-mail címet!"},
    {errorThis: false, text:"Nem megfelelő az e-mail cím formátuma!"},
    {errorThis: false, text:"A jelszó túl rövid!"},
    {errorThis: false, text:"A jelszóban nem szerepel nagybetű!"},
    {errorThis: false, text:"A jelszóban nem szerepel szám!"},
    {errorThis: false, text:"A jelszóban nem szerepel különleges karakter!"},
    {errorThis: false, text:"Olyan karaktert is tartalmaz, amelyet nem szabad!"},
    {errorThis: false, text:"A két jelszó nem egyezik meg!"},
    {errorThis: false, text:"Nem múlt el még 18 éves!"},
    {errorThis: false, text: "Nem fogadtad el a felhasználói feltételeket!"}
]

function show_hide(){
    var passwordInput = document.getElementById('password-input')
    if(passwordInput.type === 'password'){
        passwordInput.type = "text"
    }
    else{
        passwordInput.type = "password"
    }
}


form.addEventListener('submit', function(event) {
    event.preventDefault()
    for (let e of errors) {
        e.errorThis = false
    }
    var name_input = document.getElementById('name-input').value
    var email_input = document.getElementById('email-input').value
    var email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    var name = /^[A-Z][a-z]+ [A-Z][a-z]+/
    var password_input = document.getElementById('password-input').value
    var repeat_password_input = document.getElementById('repeat-password-input').value
    var bd = new Date(document.getElementById("birthday").value)
    console.log(bd)
    if(name_input === "" || name_input === null){
        errors[0].errorThis = true
        //console.log("Nem adtál meg nevet")
    }
    if(!name_input.match(name)){
        errors[1].errorThis = true
    }
    if(email_input.length == 0){
        errors[2].errorThis = true
        //console.log("Nem adtál meg e-mail címet")
    }
    if(!email_input.match(email_regex)){
        errors[3].errorThis = true
        //console.log("Nem megfelelő az e-mail cím formátuma")
    }
    if(password_input.length < 8){
        errors[4].errorThis = true
        //console.log(password_input.length)
        //console.log("A jelszó túl rövid!")
    }
    if(!/[A-Z]/.test(password_input)){
        errors[5].errorThis = true
        //console.log("A jelszóban nem szerepel nagybetű!")
    }
    if(!/[0-9]/.test(password_input)){
        errors[6].errorThis = true
        //console.log("A jelszóban nem szerepel szám!")
    }
    if(!(/[*!$,%?;+@#<>\-_=\/:\\]/.test(password_input))){
        errors[7].errorThis = true
        //console.log("A jelszóban nem szerepel különleges karakter!")
    }
    var abc = "abcdefghijklmnopqrstuvwxyz"
    var number = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
    password_input.split('').forEach(c => {
        if(!(abc.includes(c)) && !(abc.toUpperCase().includes(c)) && !(number.includes(parseInt(c))) && !(c.match(/[*!$,%?;+@#<>\-_=\/:\\]/))){
            errors[8].errorThis = true
            //console.log("Olyan karaktert is tartalmaz, amelyet nem szabad!")
            //console.log(c)
        }
    });
    if(password_input !== repeat_password_input){
        errors[9].errorThis = true
        //console.log("A két jelszó nem egyezik meg!")
    }
    let age = today.getFullYear() - bd.getFullYear() //számot
    let birthMonthDay = (today.getMonth() > bd.getMonth()) || (today.getMonth == bd.getMonth() && today.getDate() >= bd.getDate())//bool
    let isOver18 = age > 18 || (age == 18 && birthMonthDay)
    if(!isOver18){
        errors[10].errorThis = true
    }
    if(!document.getElementById("elfogad").checked){
        errors[11].errorThis = true
    }
    
    
    let uzenet = false
    box.innerHTML = ""
    for (let e of errors) {
        if(e.errorThis == true){
            let sor = document.createElement("div")
            sor.classList.add("error")
            sor.innerHTML = e.text
            box.appendChild(sor)
            uzenet = true
        }
    }
    if(!uzenet){
        fetch("https://localhost:7198/api/ApplicationUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Name: name_input,
                Email: email_input,
                Passwd: password_input,
                BirthDate: bd,
                Gender: document.getElementById("gender").value
            })
        })
        .then((response) =>{
            if(!response.ok) {
                //response.status
                //response.message
                if(response.status === 409){
                    alert("Ez az e-mail cím már regisztrálva van.")
                }
                else{
                    throw new Error(`HTTTP hiba! Státuszkód: ${response.status}`)
                }
            }
            else{
                alert("Sikeres regisztráció!")
            }
            return response.json()
        })
        .catch(error =>{
            console.error("Hiba történt", error)
            alert("Szerver hiba. Kérlek próbáld meg később!")
        })
    }

    
})