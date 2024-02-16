function mainPage() {
  let email = document.getElementById('email');
  let password = document.getElementById('password');
  // console.log(email.value);
  // console.log(password.value);
  const data = { email: email.value, password: password.value };
  fetch('http://localhost:3000/auth/login', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        document.getElementById('submit').classList.add('redButton');
        Swal.fire({
          icon: 'error',
          heightAuto: false,
          width: '30%',
          title: 'Oops...',
          text: 'User not found...!. Register the user',
          allowOutsideClick: false,
          showConfirmButton: false, // Hide the "OK" button
          timer: 1000, // Show the popup for 2 seconds
        }).then(() => location.reload());
        return ;
      }
      return response.json();
    })
    .then((data) => {
      // const data = response.json();
      console.log(data.access_token);
      const useDataWithtoken = { data: data.data, token: data.access_token };
      localStorage.setItem('userData', JSON.stringify(useDataWithtoken));
      console.log('User loggein successfully');
      document.getElementById('submit').value = 'Successfully Loged In';
      document.getElementById('submit').classList.add('greenButton');
      Swal.fire({
        title: 'LogIn Successfully!',
        heightAuto: false,
        width: '30%',
        icon: 'success',
        allowOutsideClick: false,
        showConfirmButton: false, // Hide the "OK" button
        timer: 1000, // Show the popup for 2 seconds
      }).then(() => {
        location.replace('http://localhost:3000/user-ui/allrecords');
      });
    })

    .catch((error) => {
      console.log(error);
    });
}
