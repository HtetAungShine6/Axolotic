import {TrackerInterface} from "@/domain/interfaces/trackers/TrackerInterface";
import {Tracker} from "@/domain/models/trackers/Tracker";

export class TrackerUseCase {
    constructor(
        private trackerInterface: TrackerInterface
    ) {}

    async execute(token: string): Promise<Tracker> {
        return await this.trackerInterface.getPrimaryTracker(token);
    }
}