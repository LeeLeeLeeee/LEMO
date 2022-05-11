function left(content: string, range: number): string {
    return content.substring(0, range);
}

function right(content: string, range: number): string {
    return content.substring(content.length - range, content.length);
}

export { left, right };
