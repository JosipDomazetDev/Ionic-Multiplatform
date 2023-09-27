// Tab2.tsx
import React, {useEffect} from 'react';
import {IonButton, IonContent, IonHeader, IonLoading, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import {observer} from 'mobx-react';
import {mapStore} from '../stores/MapStore'; // Import your Mobx store
import './Tab2.css';
import MapComponent from "./MapComponent";
import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-icon-2x.png";
import "leaflet/dist/images/marker-icon.png";

const Tab2: React.FC = observer(() => {

    useEffect(() => {
        mapStore.fetch();
    }, []);

    const handleReset = () => {
        mapStore.setDeviceLocation(null);
        mapStore.setIssLocation(null);
        mapStore.fetch();
    };


    if (!mapStore.dataLoaded) {
        return (
            <IonContent fullscreen>
                <IonLoading isOpen={true} message={'Loading...'}/>
                <IonButton onClick={handleReset}>Reset</IonButton>
            </IonContent>
        );
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Map</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Map</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <MapComponent/>

                <div>
                    Device
                    Location: {mapStore.deviceLocation ? `${mapStore.deviceLocation.longitude}, ${mapStore.deviceLocation.latitude}` : 'Loading...'}
                </div>
                <div>
                    ISS
                    Location: {mapStore.issLocation ? `${mapStore.issLocation.longitude}, ${mapStore.issLocation.latitude}` : 'Loading...'}
                </div>
                <IonButton onClick={handleReset}>Reset</IonButton>
            </IonContent>
        </IonPage>
    );
});

export default Tab2;
