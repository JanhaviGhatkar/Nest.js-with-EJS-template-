function mainPage() {
    let email = document.getElementById('email');
    let  password = document.getElementById('password');
    console.log(email.value);
    console.log(password.value);
    const data = { email: email.value , password:password.value};
    fetch('http://localhost:3000/user/loginUser', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          // document.getElementById('submit').classList.add('redButton')
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
        }
        return response.json();
        // else {

        //   // .then(() =>

        //   //   //
        //   // );
        // }
      })
      .then((data) => {
        // const data = response.json();
        console.log(data);
        localStorage.setItem('userData', JSON.stringify(data.data[0].name));
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
      })
      })
      
      .catch((error) => {
        console.log(error);
      });
  }