import {makeAutoObservable, runInAction} from 'mobx';

class SpaceStore {

    constructor() {
        makeAutoObservable(this);
    }

    astronauts: string[] = [];

    async fetchAstronauts() {
        try {
            const response = await fetch('http://api.open-notify.org/astros.json', {
                referrerPolicy: "unsafe-url"
            });
            const data = await response.json();

            runInAction(() => {
                this.astronauts = data.people.map((person: any) => person.name);
            });
        } catch (error) {
            console.error('Error fetching astronauts:', error);
        }
    }
}

export const spaceStore = new SpaceStore();
