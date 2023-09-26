import {makeAutoObservable, runInAction} from 'mobx';

class SpaceStore {

    constructor() {
        makeAutoObservable(this);
    }

    astronauts: string[] = [];

    async fetchAstronauts() {
        try {
            const response = await fetch('http://api.open-notify.org/astros.json');
            const data = await response.json();
            this.astronauts = data.people.map((person: any) => person.name);
        } catch (error) {
            console.error('Error fetching astronauts:', error);
        }
    }
}

export const spaceStore = new SpaceStore();
