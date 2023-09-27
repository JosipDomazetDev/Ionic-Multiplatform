import React from 'react';
import {MapContainer, Marker, Popup, TileLayer, useMap} from 'react-leaflet';
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
        <div className="map-container">
            <MapContainer
                center={[deviceLocation?.latitude, deviceLocation?.longitude]}
                zoom={2}
                scrollWheelZoom={false}
                dragging={false}
                doubleClickZoom={false}
                zoomControl={false}
                touchZoom={false}
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
