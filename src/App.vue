<template>
    <div id="app" class="container">
        <tree-view/>
    </div>
</template>

<script>
    import TreeView from './components/TreeView.vue';

    export default {
        name: 'app',
        components: {
            'tree-view': TreeView
        }
    }
</script>

<style>
    #app {
        font-family: "Roboto Mono", Monaco, courier, monospace;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
        background: #f0f8ff;
        min-height: 700px;
        margin-bottom: 50px;
    }
</style>
