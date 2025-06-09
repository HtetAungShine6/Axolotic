import {Tracker} from "@/domain/models/trackers/Tracker";

export interface TrackerInterface {
    getPrimaryTracker(token: string): Promise<Tracker>;
}