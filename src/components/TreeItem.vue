<template>
    <li class="tree-item" v-if="renderComponent" >
        <div :class="[isFolder? 'font-weight-bold' : 'font-weight-normal', dragOvering ? 'drag-overing' : '']">
            <div draggable="true" style="cursor: pointer"
                 @click="toggle" @dragend="dragEnd()" @dragstart="drag()" @dragover="dragOver()" @dragleave="dragOvering = false">
                <font-awesome-icon :icon="['fas', item.icon ? item.icon : 'circle']"></font-awesome-icon>

                <del v-if="item.status"><span> {{item.label}} </span></del>
                <span v-if="!item.status"> {{item.label}} </span>
                <font-awesome-icon :icon="['fas', isOpen ? 'minus-square' : 'plus-square']" v-show="isFolder"></font-awesome-icon>
                <font-awesome-icon :icon="['fas', 'comment']" v-show="item.note" v-bind:title="item.note"></font-awesome-icon>
                <span v-if="!item.status && !isFolder" class="btn btn-link btn-sm" @click="makeDone()">Make Done</span>
            </div>
            <ul v-show="isOpen" class="tree-view">
                <tree-item v-for="(child, index) in children" :item="child" v-bind:key="index" v-on:drag-drop-item="changePosition($event)"/>
            </ul>
        </div>
    </li>
</template>

<script>
    import dataStore from './dragDropDataStore.js';

    export default {
        name: 'tree-item',
        props: ['item'],
        data() {
            return {
                isOpen: false,
                dragOvering: false,
                renderComponent: true,
            }
        },
        methods: {
            toggle() {
                this.isOpen = !this.isOpen;
            },
            drag() {
                dataStore.setDrag(this.item);
            },
            dragOver() {
                this.dragOvering = true;
                dataStore.resetDrop();
                dataStore.setDrop(this.item);
            },
            drop() {
                this.$emit('drag-drop-item', {
                    dropItem: dataStore.data.dropItem,
                    dragItem: dataStore.data.dragItem
                })
            },
            dragEnd() {
                this.drop();
                dataStore.reset();
            },
            makeDone() {
                event.preventDefault();
                this.item.status = true;
            },
            changePosition(event) {
                let dropItem = event.dropItem;
                let dragItem = event.dragItem;
                let dragIndex = undefined;
                let dropIndex = undefined;
                this.item.children.forEach(function (child, index) {
                    if (child == dragItem) dragIndex = index;
                    if (child == dropItem) dropIndex = index;
                });
                // this.item.children[dragIndex] = dropItem;
                // this.item.children[dropIndex] = dragItem;
                if (dragIndex !== undefined && dropIndex !== undefined) {
                    this.item.children.splice(dragIndex, 1);
                    this.item.children.splice(dropIndex, 0, dragItem);
                    this.forceRerender();
                }
            },
            forceRerender() {
                this.renderComponent = false;

                this.$nextTick(() => {
                    this.renderComponent = true;
                });
            }
        },
        computed: {
            isFolder: function () {
                return this.item.hasOwnProperty('children')
            },
            children: function () {
                return this.item.children;
            }
        }
    }
</script>
