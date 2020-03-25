const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//show input error mesage
function ShowError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}
function ShowSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}
function checkEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email.value.trim())) {
    ShowSuccess(email);
  } else {
    ShowError(email, 'Email is not valid');
  }
  return re.test(String(email).toLowerCase());
}
function checkRequired(inputArr) {
  inputArr.forEach(function(input) {
    if (input.value.trim() == '') {
      console.log(input.id);
      ShowError(input, `${getFieldName(input)} is required`);
    } else {
      ShowSuccess(input);
    }
  });
}
function checkLength(input, min, max) {
  if (input.value.length < min) {
    ShowError(
      input,
      `${getFieldName(input)} mus be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    ShowError(
      input,
      `${getFieldName(input)} mus be less than ${max} characters`
    );
  } else {
    ShowSuccess(input);
  }
}
//check password match
function checkPasswordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    ShowError(input2, 'Password do not match');
  }
}
//get field name
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
//Event Listeners
form.addEventListener('submit', function(e) {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 3, 15);
  checkEmail(email);
  checkPasswordMatch(password, password2);
});
