import { UNITS } from '../constants/issueAnalyzer.constants';

export default class FileUploadUtils {
    static  formatBytes(bytes: number): string {
        const units = UNITS;
        const factor = 1024;
        let index = 0;
        while (bytes >= factor) {
          bytes /= factor;
          index++;
        }
        return `${parseFloat(bytes.toFixed(2))} ${units[index]}`;
    }
}
