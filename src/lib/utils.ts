export function wrapText(container: fabric.Text, maxWidth: number) {
    let width = Math.ceil(container.getLineWidth(0));
    while (width > maxWidth) {
        const text = container.text || '';
        container.set('text', text.slice(0, text.length - 4) + '...');
        width = Math.ceil(container.getLineWidth(0));
    }
}
