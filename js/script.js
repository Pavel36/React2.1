'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    const ads = document.querySelectorAll('.promo__adv img'),
        poster = document.querySelector('.promo__bg'),
        genre = document.querySelector('.promo__genre'),
        movieList = document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector('.add'),
        addInput = document.querySelector('.adding__input'),
        checkbox = document.querySelector('input[type="checkbox"]');

    const deleteADS = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };

    const deleteFilm = (e) => {
        console.log(e.target);
        movieDB.movies.splice();
    };

    const makeChanges = () => {
        genre.textContent = 'ДРАМА';
        poster.style.backgroundImage = 'url("img/bg.jpg")';
    };

    const sortArr = (arr) => {
        arr.sort();
    };

    const createMovieList = (films, parent) => {
        parent.innerHTML = "";
        sortArr(films);
        films.forEach((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i+1} ${film}
                    <div class="delete"></div>
                </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((btn,i)=>{
            btn.addEventListener('click',()=>{
                btn.parentElement.remove();
                movieDB.movies.splice(i,1);
                createMovieList(films, parent);
            });
        });
    };

    const filmsList = document.querySelector('.promo__interactive-list');
    sortArr(movieDB.movies);
    filmsList.innerHTML = "";
    movieDB.movies.forEach((film, i) => {
        filmsList.innerHTML += `
            <li class="promo__interactive-item">${i+1} ${film}
                <div class="delete"></div>
            </li>
        `;
    });

    addForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let newFilm = addInput.value;

        const favorite = checkbox.checked;
        if (newFilm) {
            if (newFilm.length > 21) {
                newFilm=`${newFilm.substring(0,22)}...`;
            }
            if(favorite) {
                console.log("Добавляем любимый фильм");
            }
            movieDB.movies.push(newFilm);
            movieDB.movies.sort();
            createMovieList(movieDB.movies, movieList);
        }
        event.target.reset();
    });

    const list = document.querySelector('.promo__interactive-list');
    list.querySelectorAll('.promo__interactive-item').forEach((film) => {
        film.lastElementChild.addEventListener('click', deleteFilm);
    });

    checkbox.addEventListener('click', () => {
        console.log('Добавляем любимый фильм');
    });

    deleteADS(ads);
    makeChanges();
    createMovieList(movieDB.movies, movieList);
});