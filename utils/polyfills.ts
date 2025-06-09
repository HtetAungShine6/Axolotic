// polyfills.ts
import { Buffer } from 'buffer';
if (typeof global.Buffer === "undefined") {
    global.Buffer = Buffer;
}