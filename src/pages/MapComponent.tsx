import React from 'react';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import {observer} from 'mobx-react';
import {mapStore} from '../stores/MapStore';
import {useIonViewDidEnter} from "@ionic/react";
import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-icon-2x.png";
import "leaflet/dist/images/marker-icon.png";
import 'leaflet/dist/leaflet.css'
import satPng from "../../resources/sat.png"
import currentPosPng from "../../resources/here.png"
import { icon } from "leaflet";

const MapComponent = observer(() => {
    const deviceLocation = mapStore.deviceLocation;
    const issLocation = mapStore.issLocation;

    useIonViewDidEnter(() => {
        window.dispatchEvent(new Event('resize'));
    });

    const satIcon = icon({
        iconUrl: satPng,
        iconSize: [40, 40]
    });

    const currentPosIcon = icon({
        iconUrl: currentPosPng,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
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
                    <Marker position={[deviceLocation.latitude, deviceLocation.longitude]} icon={currentPosIcon}>
                        <Popup>
                            Device Location
                        </Popup>
                    </Marker>
                )}
                {issLocation && (
                    <Marker position={[issLocation.latitude, issLocation.longitude]} icon={satIcon}>
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
