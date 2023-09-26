// profileStore.ts
import {makeAutoObservable, runInAction} from 'mobx';
import {collection, doc, getDoc, setDoc} from "firebase/firestore";
import db from "../firebaseConfig";

class ProfileStore {
    name = '';
    address = '';
    email = '';
    profilePicture = '';

    constructor() {
        makeAutoObservable(this);
    }

    updateProfileField(fieldName: string, value: string) {
        if (fieldName === 'name') {
            this.name = value;
        } else if (fieldName === 'address') {
            this.address = value;

        } else if (fieldName === 'email') {
            this.email = value;
        } else if (fieldName === 'profilePicture') {
            this.profilePicture = value;
        }
    }

    async saveProfileToFirebase() {
        try {
            const usersCollection = collection(db, 'User');
            const newUserRef = doc(usersCollection);

            await setDoc(newUserRef, {
                name: this.name,
                address: this.address,
                email: this.email,
                image: this.profilePicture
            });



            console.log('Profile data saved successfully');
            return true;
        } catch (error) {
            console.error('Error saving profile data:', error);
            return false;
        }
    }

    async loadProfileFromFirebase() {
        try {
            const userRef = doc(db, 'User');
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                const userData = userSnap.data();
                runInAction(() => {
                    this.name = userData.name;
                    this.address = userData.address;
                    this.email = userData.email;
                    this.profilePicture = userData.profilePicture;
                });
                console.log('Profile data loaded successfully');
            } else {
                console.log('No such user!');
            }
        } catch (error) {
            console.error('Error loading profile data:', error);
        }
    }
}

export const profileStore = new ProfileStore();
