import { startOfHour, parseISO } from 'date-fns';

export interface DateUtils {
    parseISO(dateISO: string): Date;
    startOfHour(date: Date): Date;
}

export interface ServiceUtils {
    date: DateUtils
}

export default class implements ServiceUtils {
    public date: DateUtils = {
        parseISO,
        startOfHour
    }
}