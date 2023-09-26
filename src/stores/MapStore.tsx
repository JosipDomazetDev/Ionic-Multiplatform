import {makeAutoObservable} from 'mobx';

interface DeviceLocation {
    latitude: number;
    longitude: number;
}

class MapStore {
    deviceLocation: DeviceLocation | null = null;
    issLocation: DeviceLocation | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setDeviceLocation(location: DeviceLocation | null) {
        this.deviceLocation = location;
    }

    setIssLocation(location: DeviceLocation | null) {
        this.issLocation = location;
    }

    fetchDeviceLocation() {
        navigator.geolocation.getCurrentPosition((position: any) => {
            const {latitude, longitude} = position.coords;
            const location: DeviceLocation = {latitude: latitude, longitude: longitude};

            console.log('Device location:', location);

            this.setDeviceLocation(location);
        });

    }

    fetchIssLocation() {
        fetch('http://api.open-notify.org/iss-now.json')
            .then((response) => response.json())
            .then((data) => {
                const {iss_position} = data;
                const location: DeviceLocation = {
                    latitude: Number(iss_position.latitude),
                    longitude: Number(iss_position.longitude)
                };

                console.log('ISS location:', location);

                this.setIssLocation(location);
            })
            .catch((error) => {
                console.error('Error fetching ISS location:', error);
            });
    }
}


export const mapStore = new MapStore();
