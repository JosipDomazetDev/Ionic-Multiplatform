import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {profileStore} from '../stores/ProfileStore';
import './Tab4.css';
import { getFirestore, doc, setDoc } from 'firebase/firestore';


import {
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonText,
    IonTitle,
    IonToolbar,
} from '@ionic/react';

const Tab3: React.FC = observer(() => {
    const [isSaving, setIsSaving] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        profileStore.loadProfileFromFirebase();
    }, []);

    const handleSaveProfile = async () => {
        setIsSaving(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const success = await profileStore.saveProfileToFirebase();
            setIsSaving(false);

            if (success) {
                setSuccessMessage('Profile saved successfully.');
            } else {
                setErrorMessage('Error saving profile data.');
            }
        } catch (error) {
            setErrorMessage('Error saving profile data.');
            setIsSaving(false);
        }
    };


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Edit Profile</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <form>
                    <IonItem>
                        <IonLabel position="floating">Name:</IonLabel>
                        <IonInput
                            type="text"
                            value={profileStore.name}
                            onIonChange={(e) => profileStore.updateProfileField('name', e.detail.value!)}
                        ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Address:</IonLabel>
                        <IonInput
                            type="text"
                            value={profileStore.address}
                            onIonChange={(e) => profileStore.updateProfileField('address', e.detail.value!)}
                        ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">E-Mail:</IonLabel>
                        <IonInput
                            type="text"
                            value={profileStore.email}
                            onIonChange={(e) => profileStore.updateProfileField('email', e.detail.value!)}
                        ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Profile Picture:</IonLabel>
                        <IonInput
                            type="text"
                            value={profileStore.profilePicture}
                            onIonChange={(e) =>
                                profileStore.updateProfileField('profilePicture', e.detail.value!)
                            }
                        ></IonInput>
                    </IonItem>
                    <IonButton onClick={handleSaveProfile} expand="full" disabled={isSaving}>
                        {isSaving ? 'Saving...' : 'Save Profile'}
                    </IonButton>
                    {successMessage && <IonText color="success">{successMessage}</IonText>}
                    {errorMessage && <IonText color="danger">{errorMessage}</IonText>}
                </form>
            </IonContent>
        </IonPage>
    );
});

export default Tab3;
