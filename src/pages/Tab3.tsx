import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {profileStore} from '../stores/ProfileStore';
import './Tab4.css';

import {
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonLoading,
    IonPage,
    IonText,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import {createOutline} from "ionicons/icons";


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

    if (!profileStore._currentUser) {
        return (
            <IonLoading isOpen={true} message={'Loading...'}/>
        );
    }

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                const base64String = event.target?.result as string;
                profileStore.updateProfileField('profilePicture', base64String);
            };

            reader.readAsDataURL(file);
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
                    <div className="profile-picture-container">
                        {profileStore._currentUser.profilePicture && (
                            <img
                                className="profile-picture"
                                src={profileStore._currentUser.profilePicture}
                                alt="Profile Picture"
                            />
                        )}
                        {profileStore._currentUser.profilePicture ? (
                                <label htmlFor="file-upload" className="edit-button" onClick={() => handleFileUpload}>
                                    <IonIcon size={"medium"} icon={createOutline}></IonIcon>
                                </label>
                            ) :
                            <label htmlFor="file-upload" className="initial-upload-button"
                                   onClick={() => handleFileUpload}>
                                Upload Picture
                            </label>
                        }

                        <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            style={{display: 'none'}}
                            onChange={(e) => handleFileUpload(e)}
                        />
                    </div>

                    <IonItem>
                        <IonLabel position="floating">Name:</IonLabel>
                        <IonInput
                            aria-label="Name"
                            type="text"
                            value={profileStore._currentUser.name}
                            onIonChange={(e) => profileStore.updateProfileField('name', e.detail.value!)}
                        ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Address:</IonLabel>
                        <IonInput
                            aria-label="Address"
                            type="text"
                            value={profileStore._currentUser.address}
                            onIonChange={(e) => profileStore.updateProfileField('address', e.detail.value!)}
                        ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">E-Mail:</IonLabel>
                        <IonInput
                            aria-label="E-Mail"
                            type="text"
                            value={profileStore._currentUser.email}
                            onIonChange={(e) => profileStore.updateProfileField('email', e.detail.value!)}
                        ></IonInput>
                    </IonItem>

                    <IonButton fill="outline" id="saveButton" onClick={handleSaveProfile} disabled={isSaving}>
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
