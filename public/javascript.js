
if(window.location.pathname==='/'||window.location.pathname==='/route/login'){


  const form = document.querySelector("form")
  form.addEventListener('click', e=>{
    if(!form.checkValidity()){
      e.preventDefault()
    }
    form.classList.add('was-validated')
  })


}