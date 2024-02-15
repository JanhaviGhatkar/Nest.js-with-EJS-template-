function getUrlParams() {
    const searchParams = new URLSearchParams(window.location.search);
    const params = {};
    for (const [key, value] of searchParams) {
        params[key] = value;
    }
    return params;
}

// Function to populate input fields with parameter values
function populateInputFields() {
    const params = getUrlParams();
    document.getElementById('userId').value = params.id || '';
    document.getElementById('name').value = params.name || '';
    document.getElementById('email').value = params.email || '';
}
populateInputFields();


function updateUser(id){
    console.log(id);
    const email = document.getElementById('email').value
    console.log(email);
    fetch(`http://localhost:3000/user/updateUser/${id}`,
    {
        method:'PATCH',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email})
        
    })
    .then((response)=>{
        if (!response.ok) {
        throw new Error('Failed to update user');
    }
    console.log('User updated successfully');
    alert("User updated successfully")
    })
    .catch((error) => {
    console.log('Error:', error.message);
    alert(error.message);
});
}