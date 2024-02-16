function register_user() {
  let id = parseInt(document.getElementById('id').value);
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let confpassword = document.getElementById('confirm-password').value;
  if (!(password === confpassword)) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Password and Confirm Password do not match!',
      showConfirmButton: false,
      timer: 1000,
    });
  }else{
  const userDto = { id, name, email, password };
  console.log(userDto);
  fetch('http://localhost:3000/user/addUser', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userDto),
  })
    .then((response) => {
      if (!response.ok) {
        console.log(response);
        document.getElementById('submit').classList.add('redButton');
        response.json().then((error) => {
          console.log(error);
          Swal.fire({
            title: 'User already exist',
            heightAuto: false,
            width: '30%',
            icon: 'error',
            allowOutsideClick: false,
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            // location.reload();
            return;
          });
        });
      } else {
        console.log('User registered successfully');
        document.getElementById('submit').value = 'Successfully Registered';
        document.getElementById('submit').classList.add('greenButton');
        Swal.fire({
          title: 'User registerd Successfully!',
          heightAuto: false,
          width: '30%',
          icon: 'success',
          allowOutsideClick: false,
          showConfirmButton: false,
          timer: 1500,
        }).then(() => location.replace('http://localhost:3000/user-ui/login'));
      }
    })
    .catch((error) => {
      console.error('Error:', error.message);
      alert('Something went wrong while registering the user');
    });
  }
}
