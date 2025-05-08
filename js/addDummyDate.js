let dummyContacts;
let dummyTasks;

async function loadDummyContactJson() {
    let src = '../json/dummyContacts.json';
    let response = await fetch(src);
    dummyContacts = await response.json();
}

async function loadDummyTasksJson() {
    let src = '../json/dummyTasks.json';
    let response = await fetch(src);
    dummyTasks = await response.json();
}

async function loadDummyJsons() {
    await loadDummyContactJson();
    await loadDummyTasksJson();
    await startToAddDummyContacts();
    await getDummyToPushContacts();
    await startToAddDummyTasks();
    setTimeout(function(){
        sumFinalLoadDataFromDatabase();
      }, 500)
}

async function startToAddDummyContacts() {
    for (let i = 0; i < dummyContacts.length; i++) {
        const dummyContact = dummyContacts[i];
        addDummyContacts(dummyContact);
    }
}

async function startToAddDummyTasks() {
    for (let i = 0; i < dummyTasks.length; i++) {
        const dummyTask = dummyTasks[i];
        await takeTheRightUser(dummyTask);
    }
}

let pushedContactsIds = [];
let pushedTasksIds = [];

function getDummyContactsId(pushedDummyContacts) {
    for (let i = 0; i < pushedDummyContacts.length; i++) {
        const pushedDummyContact = pushedDummyContacts[i];
        pushedContactsIds.push(pushedDummyContact.id);
    }
}

function getDummyTasksId(pushedDummyTasks) {
    for (let i = 0; i < pushedDummyTasks.length; i++) {
        const pushedDummyTask = pushedDummyTasks[i];
        pushedTasksIds.push(pushedDummyTask.taskId);
    }
}

async function startDeleteGuestContacts() {
    for (let i = 0; i < pushedContactsIds.length; i++) {
        const pushedContactsId = pushedContactsIds[i];
        deleteGuestContacts(pushedContactsId);
    }
}

async function startDeleteGuestTasks() {
    for (let i = 0; i < pushedTasksIds.length; i++) {
        const pushedTasksId = pushedTasksIds[i];
        deleteGuestTasks(pushedTasksId);
    }
}

let assignedContacts = [];
let pushedContacts = [];

function createPushedContactsArray(contactDatas) {
    pushedContacts = contactDatas;
}

async function takeTheRightUser(dummyTask) {
    assignedContacts = [];
    let dummyTaskAssignedToContacts = dummyTask.assignedTo;
    for (let i = 0; i < dummyTaskAssignedToContacts.length; i++) {
        const dummyTaskAssignedToContact = dummyTaskAssignedToContacts[i];
        const dummyTaskAssignedToContactName = dummyTaskAssignedToContact.name;
        createAssignedToArray(dummyTaskAssignedToContactName);
    }
    addDummyTasks(dummyTask, assignedContacts);
}

function createAssignedToArray(taskAssignedToContactName) {
    for (let p = 0; p < pushedContacts.length; p++) {
        const pushedContact = pushedContacts[p];
        const pushedContactName = pushedContact.name;
        if (pushedContactName === taskAssignedToContactName) {
            assignedContacts.push(pushedContact);
        }
    }
}
