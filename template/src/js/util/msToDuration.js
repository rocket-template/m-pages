/*
 * 时长计算 单位 ms
 */
import leftPad from './leftpad.js';

export default function msToDuration(ms) {
    var sec = 0,
        min = 0,
        hour = 0,
        day = 0,
        dur = {};

    var Floor = Math.floor;
    if (ms > 0) {
        //秒
        sec = Floor(ms / 1000);
        //分
        if (sec >= 60) {
            min = Floor(sec / 60);
            sec = sec % 60;
        }
        //时
        if (min >= 60) {
            hour = Floor(min / 60);
            min = min % 60;
        }
        //天
        if (hour >= 24) {
            day = Floor(hour / 24);
            hour = hour % 24;
        }
    }
    dur.day = leftPad(day, '00');
    dur.hour = leftPad(hour, '00');
    dur.min = leftPad(min, '00');
    dur.sec = leftPad(sec, '00');
    return dur;
}
