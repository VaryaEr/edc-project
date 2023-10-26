import { defineStore } from "pinia";

export const useFilmStore = defineStore("film", {
    state: () => ({
        films: [],
        nowId: 0,
    }),
    persist: true,
    actions: {
        addFilm(el) {
            let film = el;
            this.nowId++;
            film.id = this.nowId;
            this.films.push(film);
        },
        removeFilm(idEl) {
            this.films = this.films.filter((el) => el.id !== idEl);
        },
        editFilm(objectEl) {
            this.films = this.films.map((el) => (el.id === objectEl.id ? objectEl : el));
        },
    },
});
