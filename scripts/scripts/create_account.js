 //for password eye
 const togglePassword = document.querySelector('#togglePassword');
 const password = document.querySelector('#id_password');

 togglePassword.addEventListener('click', function (e) {
     // toggle the type attribute
     const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
     password.setAttribute('type', type);
     // toggle the eye slash icon
     this.classList.toggle('fa-eye-slash');
 });

 let timeout;
 let strengthBadge = document.getElementById('StrengthDisp')
 let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
 let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
 function StrengthChecker(PasswordParameter) {
    
     if (strongPassword.test(PasswordParameter)) {
         strengthBadge.style.backgroundColor = "green"
         strengthBadge.textContent = 'Strong'
     } else if (mediumPassword.test(PasswordParameter)) {
         strengthBadge.style.backgroundColor = 'blue'
         strengthBadge.textContent = 'Medium'
     } else {
         strengthBadge.style.backgroundColor = 'red'
         strengthBadge.textContent = 'Weak'
     }
 }
 password.addEventListener("input", () => {
    strengthBadge.style.display = 'block'
    clearTimeout(timeout);

    timeout = setTimeout(() => StrengthChecker(password.value), 500);

    if (password.value.length !== 0) {
        strengthBadge.style.display != 'block'
    } else {
        strengthBadge.style.display = 'none'
    }
 });

let userArr = JSON.parse(localStorage.getItem("userDetails")) ||  []
let CreatAccountFunction = (msg, myYes) => {
    let email = document.getElementById("email").value
    let Name = document.getElementById("name").value
    let surname = document.getElementById("surname").value
    let passwoord = document.getElementById("id_password").value


    if (email == "" ||  Name == "" || surname == "" ||  passwoord == "") {
        alert("Please Fill all the Details!!")
    }
    else {
        var confirmBox = $("#confirm");
        confirmBox.find(".message").text(msg);
        confirmBox.find(".yes").unbind().click(function () {
            confirmBox.hide();

            window.location.href = "welcom.html"

        });
        confirmBox.find(".yes").click(myYes);
        confirmBox.show();
    }








    let userObj =
    {
        Email: email,
        Name: Name,
        Surname: surname,
        Password: passwoord
    }
    userArr.push(userObj)
    console.log(userObj)
    localStorage.setItem("userDetails", JSON.stringify(userArr))


}