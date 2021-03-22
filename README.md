Proyecto Movies

Api Rest desarrollada con NodeJs, Express, Mysql.
Con autenticación basada en tokens.


Api que contiene información de las últimas películas en cartelera(titulo, fecha de estreno, reparto, tráiler, etc..), perfecta para buscar que película ver.

Los usuario puede ver las ultimas películas en cartelera, así como registrarse en la página y poder dejar su comentario, calificación y reacción de la película

Los usuarios que tengan rol de moderador pueden realizar el CRUD sobre las películas, se encargan de mantener la página actualizada y con la ultima información de las películas que van saliendo y pueden hacer lo mismo que un usuario normal.

Los usuarios que tengan rol de administrador, tienen los mismos privilegios que los moderadores, y son los únicos que pueden darle o quitarle el rol de moderador a un usuario.

FUNCIONES POR AGREGAR[comentarios, calificación y reacción de los usuarios].