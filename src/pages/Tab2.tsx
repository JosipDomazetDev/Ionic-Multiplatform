// Tab2.tsx
import React, {useEffect} from 'react';
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton} from '@ionic/react';
import {observer} from 'mobx-react';
import {mapStore} from '../stores/MapStore'; // Import your Mobx store
import './Tab2.css';
import MapComponent from "./MapComponent";


const Tab2: React.FC = observer(() => {

    useEffect(() => {
        mapStore.fetch();
    }, []);

    const handleReset = () => {
        mapStore.setDeviceLocation(null);
        mapStore.setIssLocation(null);
    };


    // show progress bar if not loaded
    if (!mapStore.dataLoaded) {
        return ("Loading...");
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Map</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Map</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <MapComponent />

                <div>
                    Device Location: {mapStore.deviceLocation ? `${mapStore.deviceLocation.longitude}, ${mapStore.deviceLocation.latitude}` : 'Loading...'}
                </div>
                <div>
                    ISS Location: {mapStore.issLocation ? `${mapStore.issLocation.longitude}, ${mapStore.issLocation.latitude}` : 'Loading...'}
                </div>
                <IonButton onClick={handleReset}>Reset</IonButton>
            </IonContent>
        </IonPage>
    );
});

export default Tab2;
