import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, reauthenticateWithCredential, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail } from 'firebase/auth';
import { getFirestore, setDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { firebaseConfig } from '../firebase.config';
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { HotToastService } from '@ngneat/hot-toast';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  isAuthenticated!: boolean;
  isLoading: boolean = false;
  isLoadingPass: boolean = false;
  app = initializeApp(firebaseConfig);
  db = getFirestore(this.app);
  storage = getStorage();
  uid: string = "";
  firstName?: string;
  lastName?: string;
  email?: string;
  age?: number;
  gender?: string;
  src?: string;
  userProfile$?: BehaviorSubject<{}> = new BehaviorSubject<{}>({});

  constructor(private router: Router, private toast: HotToastService) {

    const defaultPic = "user-icon.png";


    //USER AUTH STATE CHANGE

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.uid = user.uid;
        const unsub = onSnapshot(doc(this.db, "users", this.uid), (doc) => {
          this.firstName = doc.get("firstName");
          this.lastName = doc.get("lastName");
          this.email = doc.get("email");
          this.age = doc.get("age");
          this.gender = doc.get("gender");
          const profileData = {
            firstName: doc.get("firstName"),
            lastName: doc.get("lastName"),
            age: doc.get("age"),
            gender: doc.get("gender")
          }
          this.userProfile$?.next(profileData)
        });
        this.isAuthenticated = true;
        const fileRef = ref(this.storage, "user-images/" + this.uid + ".jpg");
        getDownloadURL(fileRef)
          .then((url) => {
            this.src = url;
          }).catch((error) => {
            switch (error.code) {
              case 'storage/object-not-found':
                console.error("File not found")
                const defaultFileRef = ref(this.storage, defaultPic)
                getDownloadURL(defaultFileRef)
                  .then((url) => {
                    console.log("Default image uploaded")
                    this.src = url;
                  });
                break;
              case 'storage/unauthorized':
                toast.error("User does not have a permisson to read from storage")
                break;
              case 'storage/canceled':
                toast.error("User canceled the action")
                break;
              case 'storage/unknown':
                toast.error("Unkown error occured")
                break;
            }
          });
      } else {
        this.isAuthenticated = false;
        const defaultFileRef = ref(this.storage, defaultPic)
        getDownloadURL(defaultFileRef)
          .then((url) => {
            console.log("Default image uploaded")
            this.src = url;
          });
      }
    });
  }

  //USER LOGIN

  login(email: string, password: string) {

    if (this.isLoading) return;

    this.isLoading = true;

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        this.isAuthenticated = true;
        this.router.navigate(['/main']);
        this.toast.success('Logged in!')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage)
        this.toast.error("There was an error!")
        this.isAuthenticated = false;
      }).finally(() => (this.isLoading = false));
  }

  //USER REGISTRATION

  async addUser(firstName: string, lastName: string, email: string, age: string, gender: string, userId: string) {
    try {
      await setDoc(doc(this.db, "users", this.uid), {
        firstName: firstName,
        lastName: lastName,
        email: email,
        age: age,
        gender: gender,
      })
      this.router.navigate(['/main']);
      this.toast.success('User created!');
      this.isAuthenticated = true;
      console.log("Document written with ID:", this.uid);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async register(firstName: string, lastName: string, email: string, password: string, age: string, gender: string) {

    if (this.isLoading) return;

    this.isLoading = true;

    const auth = getAuth();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.uid = user.uid;
      })
      .catch((error) => {
        this.toast.error("There was an error!");
        console.error(error.message)
        this.isAuthenticated = false;
      }).finally(() => (this.isLoading = false, this.addUser(firstName, lastName, email, age, gender, this.uid)));
  }

  // FOTGOT PASSWORD RESET

  async forgotPassword(email: string) {

    if (this.isLoadingPass) return;

    const auth = getAuth();
    this.isLoadingPass = true;
    return await sendPasswordResetEmail(auth, email).then(() => {
      this.toast.success("Email has been sent!");
      this.router.navigate(['/login']);
    }, err => {
      if (err.code == "auth/user-not-found") {
        this.toast.warning("User not found!");
      } else {
        this.toast.warning("Something went wrong" + err.message);
      }
    }).finally(() => (this.isLoadingPass = false))
  }

  //USER UPDATE

  async updateUser(firstName: string, lastName: string, age: string, gender: string) {
    const docRef = doc(this.db, "users", this.uid);
      await updateDoc(docRef, {
        firstName: firstName,
        lastName: lastName,
        age: age,
        gender: gender
      }).then(()=>{
        this.toast.success("Profile updated successfully");
        this.toast.info("Profile changes on your created routes will show on the next created route",{
          duration: 5500,
        })
      }).catch((error)=>{
        this.toast.warning("Something went wrong " + error);
      })
    
  }


  //USER LOGOUT

  logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      this.toast.success('Logout successfull!');
      this.router.navigate(['/login']);
      this.isAuthenticated = false;

    }).catch((error) => {
      this.toast.error('There was an error!')
    });
  }

  //Firebase initialization

  ngOnInit(): void {
    initializeApp(firebaseConfig);
  }

}

