<template>
    <div class="image-container">
        <img :src="item.urls.regular" :alt="item.alt_description"/>
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
