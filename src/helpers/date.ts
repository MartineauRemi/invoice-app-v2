const months = [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec'
]

function getMonthChars(month: string): string{
    switch(month){
        case "01":
            return months[0]
        case "02":
            return months[1]
        case "03":
            return months[2]
        case "04":
            return months[3]
        case "05":
            return months[4]
        case "06":
            return months[5]
        case "07":
            return months[6]
        case "08":
            return months[7]
        case "09":
            return months[8]
        case "10":
            return months[9]
        case "11":
            return months[10]
        case "12":
            return months[11]
        default:
            return 'error'
    }
}

/**
 * @param date is either a string following the pattern 'yyyy-mm-dd' or a Date object
 * @returns the date as a string (e.g. 2021-01-01 => 01 jan 2021)
 */
export function dateFormat(date: string | Date): string{
    var dateFragments: string[];

    if(typeof date === 'string'){
        dateFragments = date.split('-')
        const month = getMonthChars(dateFragments[1])
        return month === 'error'
            ? ''
            : dateFragments[2] + " " + getMonthChars(month) + " " + dateFragments[0]

    } else if(typeof date === 'object'){
        dateFragments = date.toDateString().split(' ')
        return dateFragments[2] + ' ' + dateFragments[1] + ' ' + dateFragments[3]

    }
    
    return ''
}