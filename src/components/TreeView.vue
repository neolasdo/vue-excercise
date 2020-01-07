<template>
    <div class="content">
        <ul class="tree-view" id="treeview" v-if="renderComponent">
            <tree-item v-for="(item, index) in tree" :item="item" v-bind:key="index"
                       v-on:drag-drop-item="changePosition($event)"/>
        </ul>
        <button class="btn btn-primary" v-b-modal.modal-1>Add Menu item</button>

        <b-modal id="modal-1"
                 ref="my-modal"
                 @show="resetFormModal()"
                 @hide="resetFormModal()"
                 no-close-on-backdrop
                 title="Modal title">
            <div class="container-fluid">
                <div class="form-group">
                    <label for="new_item_label">Item Label</label>
                    <input type="text" id="new_item_label" class="form-control" v-model="newItem.label">
                </div>
                <div class="form-group">
                    <label for="new_item_parent">Item parent</label>
                    <select class="form-control" name="parent" v-model="newItem.parent"
                            id="new_item_parent">
                        <option v-for="(item, index) in listItem" v-bind:key="index"
                                v-bind:data-value="item.value" v-bind:value="item.key" v-html="item.label"></option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="note">Item Note</label>
                    <textarea class="form-control" v-model="newItem.note" name="note" id="note" rows="3"></textarea>
                </div>
            </div>
            <template v-slot:modal-footer>
                <button type="button" class="btn btn-secondary" @click="$bvModal.hide('modal-1')">Close</button>
                <button type="button" class="btn btn-primary" @click="addItem()">Save</button>
            </template>
        </b-modal>
    </div>
</template>

<script>
    import TreeItem from './TreeItem.vue';
    import list from './list.js';


    export default {
        name: 'tree-view',
        props: {
            tree: {
                default: function () {
                    return list.tree
                }
            }
        },
        computed: {
            listItem: function () {
                let items = [];
                getItems(this.tree);

                function getItems(tree, char = '', level = 0) {
                    let levels = level.toString().split(".");
                    tree.forEach(function (item) {
                        levels[levels.length - 1]++;
                        level = levels.join('.');
                        if (!item.hasOwnProperty('children')) {
                            items.push({
                                value: item.label,
                                label: char + item.label,
                                key: level
                            });
                        } else {
                            items.push({
                                value: item.label,
                                label: char + item.label,
                                key: level
                            });
                            getItems(item.children, char + '|----', level + '.' + 0);
                        }
                    });

                    return items;
                }

                return items;
            }
        },
        components: {
            'tree-item': TreeItem,
        },
        data() {
            return {
                renderComponent: true,
                newItem: {
                    label: '',
                    parent: '',
                    note: ''
                }
            }
        },
        methods: {
            changePosition(event) {
                let dropItem = event.dropItem;
                let dragItem = event.dragItem;
                let dragIndex = undefined;
                let dropIndex = undefined;
                this.tree.forEach(function (child, index) {
                    if (child == dragItem) dragIndex = index;
                    if (child == dropItem) dropIndex = index;
                });
                // this.tree[dragIndex] = dropItem;
                // this.tree[dropIndex] = dragItem;
                this.tree.splice(dragIndex, 1);
                this.tree.splice(dropIndex, 0, dragItem);
                this.forceRerender();
            },
            forceRerender() {
                this.renderComponent = false;

                this.$nextTick(() => {
                    this.renderComponent = true;
                });
            },
            addItem() {
                //add item to the list
                this.resetFormModal();
                this.$refs['my-modal'].hide()
            },
            resetFormModal() {
                this.newItem = {
                    label: '',
                    parent: '',
                    note: ''
                };
            }
        }
    }
</script>