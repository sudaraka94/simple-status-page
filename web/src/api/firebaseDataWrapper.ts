import firebase from 'firebase';

const componentsCollection = "components";

// Typedef
type Component = {
    title: string,
    status: "operational" | "degraded" | "outage" | "maintainance"
}

export const getComponents = async () => {
    const db = firebase.firestore();

    let snapshot = await db.collection(componentsCollection).get();
    return snapshot.docs.map(doc => {
        const data = doc.data();
        const id = doc.id;
        return {id, ...data}
    });
}

export const addComponent = async (component:Component) => {
    const db = firebase.firestore();

    let componentRef = await db.collection(componentsCollection).add(component);
    return componentRef.id;
}

export const deleteComponent = async (componentId:string) => {
    const db = firebase.firestore();

    await db.collection(componentsCollection).doc(componentId).delete();
}