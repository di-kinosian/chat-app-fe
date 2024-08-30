export function formatDateString(dateString: string): string {
    // Parse the date string to a Date object
    const date = new Date(dateString);

    // Extract date components
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getUTCFullYear();

    // Extract time components
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');

    // Format the final string
    return `${day}/${month}/${year}, ${hours}:${minutes}`;
}