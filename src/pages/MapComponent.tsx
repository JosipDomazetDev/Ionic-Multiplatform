import React from 'react';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import {observer} from 'mobx-react';
import {mapStore} from '../stores/MapStore';
import {useIonViewDidEnter} from "@ionic/react";

const MapComponent = observer(() => {
    const deviceLocation = mapStore.deviceLocation;
    const issLocation = mapStore.issLocation;

    useIonViewDidEnter(() => {
        window.dispatchEvent(new Event('resize'));
    });

    return ((
        <div className="map">
            <link
                rel="stylesheet"
                href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
                integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
                crossOrigin=""
            />

            <MapContainer
                center={[deviceLocation?.latitude, deviceLocation?.longitude]}
                zoom={2}
                className="map"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {deviceLocation && (
                    <Marker position={[deviceLocation.latitude, deviceLocation.longitude]}>
                        <Popup>
                            Device Location
                        </Popup>
                    </Marker>
                )}
                {issLocation && (
                    <Marker position={[issLocation.latitude, issLocation.longitude]}>
                        <Popup>
                            ISS Location
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    ));
});

export default MapComponent;
