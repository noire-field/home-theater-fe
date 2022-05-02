import { ISubtitleLine, ISubtitleParsed } from "../Watch.slice";

const patternTimecode = /^(\d{1,2})\:(\d{1,2})\:(\d{1,2}[,.]\d{0,5})$/;

export function PadTimeText(num: number, size: number = 2): string {
    var strNum = num.toString();
    while (strNum.length < size) strNum = "0" + strNum;
    return strNum;
}

export function DurationSecondToText(duration: number): string {
    var text;
    if(duration >= 3600) {
        var hour = PadTimeText(Math.floor(duration / 3600));
        var remainSecond: string | number = Math.floor(duration % 3600);
        var minute = PadTimeText(Math.floor(remainSecond / 60));
        remainSecond = PadTimeText(remainSecond % 60);

        text = `${hour}:${minute}:${remainSecond}`;
    } else {
        text = `${PadTimeText(Math.floor(duration / 60))}:${PadTimeText(Math.floor(duration % 60))}`;
    }

    return text;
}

export const PatternTime = /^(\d{1,2})\:(\d{1,2})\s(\d{4})\-(\d{1,2})\-(\d{1,2})$/gi;

export const IsStartTimeValid = (rawTime: string): { valid: boolean, time?: Date } => {
    var reTime: RegExpExecArray | null = new RegExp(PatternTime).exec(rawTime)

    if(!reTime || reTime.length !== 6)
        return { valid: false };

    const F = (s:string) => s.length == 1 ? "0" + s : s;

    // H 1 M 2, Y 3, M 4, D 5
    const parsedTime = new Date(`${reTime[3]}-${F(reTime[4])}-${F(reTime[5])}T${F(reTime[1])}:${F(reTime[2])}:00`);
    if(parsedTime.getTime() !== parsedTime.getTime()) {// Check for valid
        return { valid: false };
    }

    return { valid: true, time: parsedTime }
}

export const CalculateSeekTime = (progress: number, progressAtTime: number) => {
    const currentTime = new Date().getTime();
    const targetTime = progressAtTime;
    var diffTime = 0.0;

    if(targetTime > currentTime) { // Future
        diffTime = (targetTime - currentTime) / 1000;
        return progress - diffTime;
    } else if(currentTime > targetTime) { // Past
        diffTime = (currentTime - targetTime) / 1000;
        return progress + diffTime;
    }

    return progress; // No change
}

export const ParseSubtitle = (subtitle: ISubtitleLine[]): ISubtitleParsed[] => {
    var parsed: ISubtitleParsed[] = [];

    const regex = new RegExp(patternTimecode, 'i');

    parsed = subtitle.map((s: ISubtitleLine): ISubtitleParsed => {
        return {
            id: Number(s.id),
            startTime: SubtitleTimeCodeToMilisec(s.startTime, regex),
            endTime: SubtitleTimeCodeToMilisec(s.endTime, regex),
            text: s.text
        }
    });

    return parsed;
}

export const SubtitleTimeCodeToMilisec = (timecode: string, regex: RegExp): number => {
    const result = regex.exec(timecode);
    if(result && result?.length === 4)
        return (((Number(result[1]) * 60 * 60) + (Number(result[2]) * 60) * 1000)) + (Number(result[3].replace(',', '.')) * 1000)

    return 0;
}