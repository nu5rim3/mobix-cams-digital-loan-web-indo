export default function genarateSlikStatus(status: string): string {
    if (status == 'C') {
        return 'Claimable'
    } else if (status == 'OK') {
        return 'Ok'
    } else if (status == 'NOT_OK') {
        return 'Not Ok'
    } else {
        return status.toUpperCase();
    }
}