function submit(){
    var Data = []
    var type = document.getElementById("roles").value;
    var password= document.getElementById("psw").value;
    var password2= document.getElementById("pswrepeat").value;
    var username = document.getElementById("Username").value;
    var email  = document.getElementById("email").value;
    localStorage.setItem("StoredEmail", email)
    

    if(password!=password2){
    alert("Passwords do not match")
    }

    if (type == "teacher") {
        localStorage.setItem("teacherUser", username)
        localStorage.setItem("teacherPassword", password)
        localStorage.setItem("TypeCounter",  1)
        Data.push (localStorage.getItem("TypeCounter"));
        Data.push (localStorage.getItem("StoredEmail"));
        Data.push (localStorage.getItem("teacherUser"));
        Data.push (localStorage.getItem("teacherPassword"));
    
        localStorage.setItem("Array", JSON.stringify(Data))
        
    }
    
    if (type == "student") {
        localStorage.setItem("StudentUser", username)
        localStorage.setItem("studentPassword", password)
        type = type + 2
        localStorage.setItem("TypeCounter", 2)
        Data.push(localStorage.getItem("TypeCounter"));
        Data.push(localStorage.getItem("StoredEmail"));
        Data.push(localStorage.getItem("StudentUser"));
        Data.push(localStorage.getItem("studentPassword"));
        localStorage.setItem("Array", JSON.stringify(Data))

    }

    if (password == password2){
           window.open("login.html")

    }
}

function Incorrect() {
    alert("Inncorect Username or Password")
}

function verify() {
    console.time()
    var Data = JSON.parse(localStorage.getItem("Array"))
    console.log(Data)
    var userInput = document.getElementById("enterUser").value
    var pwInput = document.getElementById("enterPw").value;
    var x = 0
    var role = Data.indexOf(userInput) - 2
    if (Data.includes(userInput)) {
        var location = Data.indexOf(userInput)
    }
  
    if (Data.includes(pwInput)) {
        var pwLocation = Data.indexOf(pwInput)
    }


    if (pwLocation - location == 1 && Data[role] == 1) {
        alert("Teacher Login Succesful")
    }
    else {
        x = x + 1
    }

    if (pwLocation - location == 1 && Data[role] == 2) {
        alert("Student Login succesful")
    }
    else {
        x = x + 1
    }
    if (x == 2) {
        Incorrect()
    }


    console.timeEnd()
}


function email() {
    console.time()
    input = prompt("Enter Recovery Email")
    var x = 0 
    var Data = JSON.parse(localStorage.getItem("Array"))
    if (Data.includes(input)) {
        var infoLocation = Data.indexOf(input)
        var userRecovery = infoLocation + 1
        var pwRecovery = infoLocation + 2
        x = x + 1
    }
    else { 
        alert("Incorrect username or Password")
    }


    if (x == 1) { 
        Email.send({
            Host: "smtp.gmail.com",
            Username: "TutoringAppTSA@gmail.com",
            Password: "tutoringpassword",
            To: input,
            From: "TutoringAppTSA@gmail.com",
            Subject: "Username and password Recovery",
            Body: "Username: " + Data[userRecovery] + "Password: " + Data[pwRecovery],
    })
            .then(function (message) {
            alert("mail sent successfully")
        });
    
    }
    console.timeEnd()
}
