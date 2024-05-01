(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
            .forEach(function (form) {
                    form.addEventListener('submit', function (event) {
                            if (!form.checkValidity()) {
                                    event.preventDefault()
                                    event.stopPropagation()
                            }

                            callOpenFaaSFunction(form);

                            form.classList.add('was-validated')
                    }, false)
            })
})()
// Function to call OpenFaaS function
function callOpenFaaSFunction(form) {
    // Extract form data (if applicable)
    const formData = new FormData(form);

    // Replace with your OpenFaaS function URL and access key (if required)
    const url = 'https://faas.thu4n.dev/function/auto-scaling';
    const accessKey = '<your-access-key>'; // Optional, if your function requires authentication

    const options = {
      method: 'POST', // Adjust based on your function's requirements (GET, POST, etc.)
      headers: {
            'Content-Type': 'application/json', // Adjust content type if needed
      },
      body: JSON.stringify() // Replace with actual data if not using FormData
    };

    // if (accessKey) {
    //   options.headers['Authorization'] = `Bearer ${accessKey}`;
    // }

    fetch(url, options)
      .then(response => response.json())
      .then(data => {
            // Handle the response data from your OpenFaaS function
            console.log('Function response:', data);
            //window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; // Redirect to your website after form submission
            // You can update the popup message or perform other actions based on the response
      })
      .catch(error => {
            console.error('Error calling OpenFaaS function:', error);
            // Handle any errors that might occur during the call
      });
}