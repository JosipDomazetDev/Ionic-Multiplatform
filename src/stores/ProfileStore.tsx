// profileStore.ts
import {makeAutoObservable, runInAction} from 'mobx';
import {addDoc, collection, doc, getDocs, updateDoc} from "firebase/firestore";
import db from "../firebaseConfig";


export interface Note {
    title: string;
    description: string;
    id?: string;
}

export interface User {
    name: string;
    address: string;
    email: string;
    profilePicture: string;
    id?: string;
}

class ProfileStore {
    _notes: Note;
    _currentUser: User;

    constructor() {
        makeAutoObservable(this);
    }

    updateProfileField(fieldName: string, value: string) {
        if (fieldName === 'name') {
            this._currentUser.name = value;
        } else if (fieldName === 'address') {
            this._currentUser.address = value;
        } else if (fieldName === 'email') {
            this._currentUser.email = value;
        } else if (fieldName === 'profilePicture') {
            this._currentUser.profilePicture = value;
        }
    }


    async addUser(data: User) {
        try {
            const dataRef: any = collection(db, 'users');
            const response = await addDoc(dataRef, data);
            const id = response?.id;

            runInAction(() => {
                this._currentUser = {...data, id};
            });

        } catch (e) {
            throw (e);
        }
    }

    async saveProfileToFirebase() {
        try {
            if (!this._currentUser) {
                return false;
            }

            const userCollection = collection(db, 'users');
            const userDocRef = doc(userCollection, this._currentUser.id || '');

            const userData = {
                name: this._currentUser.name,
                address: this._currentUser.address,
                email: this._currentUser.email,
                profilePicture: this._currentUser.profilePicture,
            };

            if (this._currentUser.id) {
                await updateDoc(userDocRef, userData);
            } else {
                const response = await addDoc(userCollection, userData);
                runInAction(() => {
                    this._currentUser.id = response.id;
                });
            }

            runInAction(() => {
                this._currentUser = {...this._currentUser, ...userData};
            });
            return true;
        } catch (e) {
            console.error(e)
            return false;
        }
    }


    async loadProfileFromFirebase() {
        try {
            const userCollection = collection(db, 'users');
            const querySnapshot = await getDocs(userCollection);

            if (!querySnapshot.empty) {

                const userDoc = querySnapshot.docs[0];
                const userData = userDoc.data() as User;
                userData.id = userDoc.id;
                runInAction(() => {
                    this._currentUser = userData;
                });

                console.log('Loaded user from Firestore: ' + JSON.stringify(this._currentUser));

            } else {
                await this.addUser({
                    name: 'Sample User',
                    address: '',
                    email: '',
                    profilePicture: '',
                })

                console.log('No users found in Firestore. Created dummy user.' + JSON.stringify(this._currentUser));
            }

            return true;
        } catch (e) {
            console.error(e)
            return true;
        }
    }

}

export const profileStore = new ProfileStore();
