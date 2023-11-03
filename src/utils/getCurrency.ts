export default function formatNumberWithCents(number: number): string {
    if(!number) return ''
    const formattedNumber = number.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return formattedNumber;
}