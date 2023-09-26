import {makeAutoObservable, runInAction} from 'mobx';

interface DeviceLocation {
    latitude: number;
    longitude: number;
}

class MapStore {
    deviceLocation: DeviceLocation | null = null;
    issLocation: DeviceLocation | null = null;
    dataLoaded: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setDeviceLocation(location: DeviceLocation | null) {
        this.deviceLocation = location;
    }

    setIssLocation(location: DeviceLocation | null) {
        this.issLocation = location;
    }

    async fetchDeviceLocation() {
        navigator.geolocation.getCurrentPosition((position: any) => {
            const {latitude, longitude} = position.coords;
            const location: DeviceLocation = {latitude, longitude};

            console.log('Device location:', location);

            runInAction(() => {
                this.setDeviceLocation(location);

                if (this.issLocation) {
                    this.dataLoaded = true;
                }
            });

        });
    }

    async fetchIssLocation() {
        fetch('http://api.open-notify.org/iss-now.json')
            .then((response) => response.json())
            .then((data) => {
                const {iss_position} = data;
                const location: DeviceLocation = {
                    latitude: Number(iss_position.latitude),
                    longitude: Number(iss_position.longitude),
                };

                console.log('ISS location:', location);

                runInAction(() => {
                    this.setIssLocation(location);

                    if (this.deviceLocation) {
                        this.dataLoaded = true;
                    }
                });
            })
            .catch((error) => {
                console.error('Error fetching ISS location:', error);
            });
    }

    async fetch() {
        this.dataLoaded = false;
        await this.fetchDeviceLocation();
        await this.fetchIssLocation();
    }
}

export const mapStore = new MapStore();
