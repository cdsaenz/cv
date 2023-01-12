/**
 * Scripts del proyecto
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
        // primero, cambiar el color de todo a default
        changeClassElementsColor('section-title','darkslategray');        
        // colocar un color que destaque
        document.getElementById(target_id).style.color = "mediumpurple";
  });
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

/**
 * Cambiar colores en un clase
 */
function changeClassElementsColor(className, color) {
    var elements = document.getElementsByClassName(className);
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.color = color;
    }
}

