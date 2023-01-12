/**
 * Scripts del proyecto
 */

/* Obtener de storage o remoto */
getProfileData();

/**
 * Cosmetica cuando se clickea un menu item
 */
let i = 0;
const menuLinks = document.getElementsByClassName('menu-link');
for (i; i < menuLinks.length; i++) {
  let link = menuLinks[i];
  link.addEventListener("click",function(e){
        // adonde apunta el menu?
        let target_id  = e.target.dataset.id; 
        // anterior activo, desactivar y activar este.
        setMenuActive(e.target);                
  });
}

/**
 * Evento para ocultar/mostrar proyectos
 */
const projectsToggle = document.getElementById('projects-toggle');
projectsToggle.addEventListener("click",function(e){
  toggleElementVisibility("projects-list");
});


/**
 * Funciones
 */

/**
 * Obtener data de localstore o random para el perfil
 * 500 daily results max plan free ?
 */

function getProfileData() {

  let storage  = localStorage.getItem("profile-data");
  
  /* no hallado, traer remoto */
  if (storage === null) {
    fetch('https://randomuser.me/api/')
      .then((response) => response.json())
      .then((data) => updateProfileDataFromRemote(data));
  }
  else {
    let profile  = JSON.parse(storage);    
    showProfileData(profile);
  }

}




/**
 * Procesar data random remota
 */
function updateProfileDataFromRemote(data) {

    const result   = data.results[0];
    const location = result.location;

    // obtener data
    const profile    = {};
    profile.name     = result.name.first + ' ' + result.name.last;
    profile.email    = result.email;
    profile.phone    = result.phone;
    profile.age      = result.dob.age;
    profile.picsrc   = result.picture.large;
    profile.location = location.street.name + ' ' + location.street.number + ' ' +
                       location.postcode + ' ' + location.city + ' ' + 
                       location.state + ' ' + location.city + ' ' + location.country;

    // store in storage.
    localStorage.setItem("profile-data", JSON.stringify(profile));
    // show in DOM
    showProfileData(profile);
}

/**
 * Profile data a DOM
 */
function showProfileData(profile) {

  // inyectar en el DOM
  document.getElementById('profile-name').innerHTML = profile.name;
  document.getElementById('profile-email').innerHTML = profile.email;
  document.getElementById('profile-phone').innerHTML = profile.phone;
  document.getElementById('profile-age').innerHTML = profile.age;
  document.getElementById('profile-location').innerHTML = profile.location;
  document.getElementById('profile-picture').src = profile.picsrc;  
}

/**
 * Toggle ver o ocultar element
 */
function toggleElementVisibility(elementId) {
  const element    = document.getElementById(elementId);
  let displayStyle = element.style.display;
  if (displayStyle == 'block') {
    element.style.display = 'none';
  }
  else {
    element.style.display = 'block';
  }
}

/**
 * Cambiar menu activo
 */
function setMenuActive(newActiveMenuItem) {
  
  // quitar todos los activos (deberia ser uno)
  var elements = document.getElementsByClassName('menu-link active');
  for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove('active');
  }

  // fijar como activo el elemento pasado
  newActiveMenuItem.classList.add('active');
}


