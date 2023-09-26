// src/pages/Tab1.tsx
import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem } from '@ionic/react';
import { observer } from 'mobx-react-lite';
import { spaceStore} from '../stores/SpaceStore';
import './Tab1.css';

const Tab1: React.FC = () => {
    useEffect(() => {
        spaceStore.fetchAstronauts();
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Home</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Home</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonList>
                    {spaceStore.astronauts.map((astronaut, index) => (
                        <IonItem key={index}>{astronaut}</IonItem>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default observer(Tab1);
