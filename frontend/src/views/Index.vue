<template>
    <div>
        <router-view></router-view>
        <commentComponent />
    </div>
</template>

<script>
import commentComponent from "@/components/commentComponent.vue";
export default {
    name: "Index",
    components: {
        commentComponent
    }
};
</script>
