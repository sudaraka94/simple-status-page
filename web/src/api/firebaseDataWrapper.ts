import firebase from 'firebase';

export const getComponents = async () => {
    const db = firebase.firestore();

    let snapshot = await db.collection("components").get();
    return snapshot.docs.map(doc => doc.data());
}