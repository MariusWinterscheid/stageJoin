import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, doc, deleteDoc, collection, getDocs, setDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getAuth, deleteUser, signOut} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBrslTwOvrS4_tnF6uODjT1KQuWR4ttzFY",
    authDomain: "join193-5ae20.firebaseapp.com",
    databaseURL: "https://join193-5ae20-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "join193-5ae20",
    storageBucket: "join193-5ae20.appspot.com",
    messagingSenderId: "330884835484",
    appId: "1:330884835484:web:20d71dc457ab9659d0a559"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth(app);

let logOutGuest = () => {
    signOut(auth).then(() => {
        sessionStorage.removeItem("user-creds");
        sessionStorage.removeItem("user-info");
        sessionStorage.removeItem("start-Animation");
        window.location.href = 'log_in.html';
    })
}

async function startDeleteCurrentGuest() {
    await startDeleteDummyContacts();
    await startDeleteDummyTasks();
    await deleteGuestData();
    deleteGuestUser();
}

async function startDeleteDummyContacts() {
    await getDummyContacts();
    startDeleteGuestContacts();
}

async function startDeleteDummyTasks() {
    await getDummyTasks();
    startDeleteGuestTasks();
}

async function addDummyContacts(dummyContact) {
    try {
        const contactRef = collection(db, 'UserAuthList', userCreds.uid, 'contacts');
        const newDocRef = doc(contactRef);
        const docID = newDocRef.id;
        const contactData = {
            name: dummyContact.name,
            email: dummyContact.email,
            phone: dummyContact.phone,
            id: docID,
            color: dummyContact.color,
            initials: dummyContact.initials
        };
        await setDoc(newDocRef, contactData);
    } catch (error) {
        console.log("Error to add Dummy Contacts:", error);
    }
}

async function addDummyTasks(dummyTask, assignedContacts) {
    try {
        const contactRef = collection(db, 'UserAuthList', userCreds.uid, 'addTasks');
        const newDocRef = doc(contactRef);
        const docID = newDocRef.id;
        const taskData = {
            header: dummyTask.header,
            description: dummyTask.description,
            dueDate: dummyTask.dueDate,
            priority: dummyTask.priority,
            category: dummyTask.category,
            subtasks: dummyTask.subtasks,
            categoryAbbreviations: dummyTask.categoryAbbreviations,
            assignedTo: assignedContacts,
            kanbanCategory: dummyTask.kanbanCategory,
            taskId: docID
        };
        await setDoc(newDocRef, taskData);
    } catch (error) {
        console.log("Error to add Dummy Tasks:", error);
    }
}

async function getDummyContacts() {
    try {
        const contactRef = collection(db, 'UserAuthList', userCreds.uid, 'contacts');
        const querySnapshot = await getDocs(contactRef);
        if (!querySnapshot.empty) {
            let pushedDummyContacts = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                pushedDummyContacts.push(data);
            });
            getDummyContactsId(pushedDummyContacts);
        } else {
        }
    } catch (error) {
        console.log(error.code);
        console.log(error.message);
    }
}

async function getDummyToPushContacts() {
    try {
        const contactRef = collection(db, 'UserAuthList', userCreds.uid, 'contacts');
        const querySnapshot = await getDocs(contactRef);
        if (!querySnapshot.empty) {
            let xy = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                xy.push(data);
            });
            createPushedContactsArray(xy);
        } else {
        }
    } catch (error) {
        console.log(error.code);
        console.log(error.message);
    }
}

async function getDummyTasks() {
    try {
        const contactRef = collection(db, 'UserAuthList', userCreds.uid, 'addTasks');
        const querySnapshot = await getDocs(contactRef);
        if (!querySnapshot.empty) {
            let pushedDummyTasks = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                pushedDummyTasks.push(data);
            });
            getDummyTasksId(pushedDummyTasks);
        } else {
        }
    } catch (error) {
        console.log(error.code);
        console.log(error.message);
    }
}

async function deleteGuestContacts(contactID) {
    try {
        const docRef = doc(db, 'UserAuthList', userCreds.uid, 'contacts', contactID);
        await deleteDoc(docRef);
    } catch (error) {
        console.log(error.code);
        console.log(error.message);
    }
}

async function deleteGuestTasks(taskId) {
    try {
        const docRef = doc(db, 'UserAuthList', userCreds.uid, 'addTasks', taskId);
        await deleteDoc(docRef);
    } catch (error) {
        console.log("Error deleting document:", error);
    }
}

async function deleteGuestData() {
    try {
        const docRef = doc(db, 'UserAuthList', userCreds.uid);
        await deleteDoc(docRef);
    } catch (error) {
        console.log("Error deleting document:", error);
    }
}

async function deleteGuestUser() {
    const user = auth.currentUser;
    await deleteUser(user)
    .then(() => {
        logOutGuest();
    }).catch(error => {
        console.log(error.code);
        console.log(error.message);
    })
}



window.addDummyContacts = addDummyContacts;
window.addDummyTasks = addDummyTasks;
window.getDummyToPushContacts = getDummyToPushContacts;
window.startDeleteCurrentGuest = startDeleteCurrentGuest;
window.getDummyTasks = getDummyTasks;
window.getDummyContacts = getDummyContacts;
window.deleteGuestTasks = deleteGuestTasks;
window.deleteGuestContacts = deleteGuestContacts;
window.deleteGuestUser = deleteGuestUser;