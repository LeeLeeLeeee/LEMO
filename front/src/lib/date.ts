import { right } from './string';

class TimeFormatter extends Date {
    getFormatDate(dateFormat: string): string {
        const matches = dateFormat.match(/Y+|M+|D+|m+|h+/g);
        if (matches !== null) {
            return matches.reduce((date, match) => {
                const matchLength = match.length;
                switch (match[0]) {
                    case 'Y':
                        return matchLength === 2
                            ? date.replace(
                                  match,
                                  right(`${this.getFullYear()}`, 2)
                              )
                            : date.replace(match, `${this.getFullYear()}`);
                    case 'M':
                        return matchLength === 1
                            ? date.replace(match, `${this.getMonth() + 1}`)
                            : date.replace(
                                  match,
                                  `${this.getMonth() + 1}`.padStart(2, '0')
                              );
                    case 'D':
                        return matchLength === 1
                            ? date.replace(match, `${this.getDate()}`)
                            : date.replace(
                                  match,
                                  `${this.getDate()}`.padStart(2, '0')
                              );
                    case 'h':
                        return matchLength === 1
                            ? date.replace(match, `${this.getHours()}`)
                            : date.replace(
                                  match,
                                  `${this.getHours()}`.padStart(2, '0')
                              );
                    case 'm':
                        return matchLength === 1
                            ? date.replace(match, `${this.getMinutes()}`)
                            : date.replace(
                                  match,
                                  `${this.getMinutes()}`.padStart(2, '0')
                              );
                    default:
                        return date;
                }
            }, dateFormat);
        }
        throw new Error('match fail');
    }
}

export function convertDate(date: string, format: string): string {
    return new TimeFormatter(date).getFormatDate(format);
}
