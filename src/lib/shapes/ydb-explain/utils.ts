import type {fabric} from 'fabric';

export function initRegroup(c: fabric.Canvas, g: fabric.Group) {
    const items: fabric.Object[] = [];
    g.forEachObject((o) => {
        items.push(o);
        g.removeWithUpdate(o);
        c.add(o);
    });

    return () => {
        items.forEach((o) => {
            c.remove(o);
            g.addWithUpdate(o);
        });
    };
}
