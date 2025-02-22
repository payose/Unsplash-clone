<template>
    <div class="image-container">
        <div 
            class="background"
            :style="{ backgroundColor: `url(${item.color})` }"
        >
            <img 
                :src="item.urls.regular"
                :alt="item.alt_description"
            />
        </div>
        <div class="overlay">
            <div class="photo-info">
                <p> {{ item.user.name || 'Unknown Authur' }}</p>
                <p class="location">
                    {{ item.user?.location || 'Unknown Location' }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>

defineProps({
    item: Object
})

</script>

<style>
.background{
    min-height: 200px;
    width: 100%;
}</style>