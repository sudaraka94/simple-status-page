export type Component = {
    id?: string,
    title: string,
    status: "operational" | "degraded" | "outage" | "maintainance"
}

export type SiteInfo = {
    title: string,
}