import {makeAutoObservable, runInAction} from 'mobx';
import {Geolocation, PermissionStatus, Position} from "@capacitor/geolocation";
import {Capacitor} from "@capacitor/core";

interface DeviceLocation {
    latitude: number;
    longitude: number;
}

class MapStore {
    deviceLocation: DeviceLocation | null = {
        latitude: Number(48),
        longitude: Number(16),
    };
    issLocation: DeviceLocation | null = null;
    dataLoaded: boolean = false;
    error: string = "";

    constructor() {
        makeAutoObservable(this);
    }

    setError(error: string) {
        this.error = error;
        this.dataLoaded = false;
        console.error(error);
    }

    setSuccess() {
        this.error = "";
        this.dataLoaded = true;
    }

    setDeviceLocation(location: DeviceLocation | null) {
        this.deviceLocation = location;
    }

    setIssLocation(location: DeviceLocation | null) {
        this.issLocation = location;
    }

    async fetchDeviceLocation() {
        if (Capacitor.getPlatform() === 'electron') {
            return;
        }

        if (!Capacitor.isNativePlatform()) {
            const coordinates = await Geolocation.getCurrentPosition();
            this.saveCurrentLocation(coordinates);
            return;
        }

        Geolocation.checkPermissions()
            .then((permissionStatus: PermissionStatus) => {
                if (permissionStatus.location !== 'granted') {
                    return Geolocation.requestPermissions();
                }
                return permissionStatus;
            })
            .then((permissionResult: PermissionStatus) => {
                if (permissionResult.location === 'granted') {
                    return Geolocation.getCurrentPosition();
                } else {
                    throw Error('User did not grant access to location')
                }
            })
            .then((coordinates: Position) => {
                if (coordinates) {
                    this.saveCurrentLocation(coordinates);
                }
            })
            .catch(reason => {
                this.setError(reason.message);
            });
    }

    private saveCurrentLocation(coordinates: Position) {
        let latitude = parseFloat(coordinates.coords.latitude.toFixed(6));
        let longitude = parseFloat(coordinates.coords.longitude.toFixed(6));
        let location: DeviceLocation = {latitude, longitude};

        console.log('Device location:', location);

        runInAction(() => {
            this.setDeviceLocation(location);

            if (this.issLocation) {
                this.setSuccess()
            }
        });
    }

    async fetchIssLocation() {
        fetch('http://api.open-notify.org/iss-now.json', {
            referrerPolicy: "unsafe-url"
        })
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
                        this.setSuccess();
                    }
                });
            })
            .catch((error) => {
                this.setError(error.message);
            });
    }

    async startFetchingIssLocation() {
        setInterval(() => {
            this.fetchIssLocation();
        }, 500);
    }


    async fetch() {
        this.dataLoaded = false;
        await this.fetchDeviceLocation();
        await this.fetchIssLocation();
        await this.startFetchingIssLocation();
    }
}

export const mapStore = new MapStore();
