import firebase from 'firebase';
import { Component, SiteInfo } from '../typedefs';

const componentsCollection = "components";
const siteInfoCollection = "siteInfo";
const siteInfoDocId = "siteInfoDoc";

/**
 *  Component API Implementations
 */
export const getComponents = async (): Promise<Component[]> => {
    let snapshot = await firebase.firestore().collection(componentsCollection).get();
    return snapshot.docs.map(doc => {
        const data = doc.data();
        const id = doc.id;
        return {
            id,
            title: data.title,
            status: data.status,
        }
    });
}

export const addComponent = async (component: Component) => {
    let componentRef = await firebase.firestore().collection(componentsCollection).add(component);
    return componentRef.id;
}

export const deleteComponent = async (componentId: string) => {
    await firebase.firestore().collection(componentsCollection).doc(componentId).delete();
}

export const updateComponent = async (componentId: string, component: Component) => {
    await firebase.firestore().collection(componentsCollection).doc(componentId).set(component, { merge: true });
}

/**
 *  Site Info API Implementations
 */
export const fetchSiteInfo = async (): Promise<SiteInfo> => {
    let snapshot = await firebase.firestore().collection(siteInfoCollection).doc(siteInfoDocId).get();
    let docData = snapshot.data();
    return {
        title: docData?.title,
    }
}

export const updateSiteInfo = async (siteInfo: SiteInfo) => {
    await firebase.firestore().collection(siteInfoCollection).doc(siteInfoDocId).set(siteInfo, { merge: true })
}