export default {
    data: {
        dragItem: undefined,
        dropItem: undefined
    },
    reset() {
        this.data = {
            dragItem: undefined,
            dropItem: undefined
        }
    },
    setDrag(item) {
        this.data.dragItem = item;
    },
    setDrop(item) {
        this.data.dropItem = item;
    },
    resetDrop() {
        this.data.dropItem = undefined;
    }
}