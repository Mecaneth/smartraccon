document.getElementById('comment-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la forma tradicional

    // Obtiene el valor del comentario
    const textarea = this.querySelector('textarea');
    const commentText = textarea.value;

    // Crea un nuevo elemento para mostrar el comentario
    const opinionDiv = document.createElement('div');
    opinionDiv.classList.add('opinion');
    opinionDiv.innerHTML = `<p>${commentText}</p><cite>- Usuario Anónimo</cite>`;

    // Agrega el nuevo comentario al contenedor de opiniones
    document.getElementById('opinions-section').appendChild(opinionDiv);

    // Limpia el campo de texto
    textarea.value = '';
});