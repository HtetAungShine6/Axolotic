import {TrackerInterface} from "@/domain/interfaces/trackers/TrackerInterface";
import {Tracker} from "@/domain/models/trackers/Tracker";
import {getRequest} from "@/application/services/Client/api";

export class TrackerImpl implements TrackerInterface {
    async getPrimaryTracker(token: string): Promise<Tracker> {
        const endpoint = `/trackers/primary`;
        return await getRequest<Tracker>(endpoint, token);
    }
}