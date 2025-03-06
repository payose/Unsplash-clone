<template>
    <section class="photo-grid">
        <div v-if="store.loading" class="loading-grid">
            <div v-for="n in 8" :key="n">
                <SkeletonLoader />
            </div>
        </div>

        <masonry-wall :items="store.searchResults" :column-width="300" :gap="35">
            <template #default="{ item }">
                <div class="photo-item" @click="openModal(item)">
                    <ImageCard :item="item" />
                </div>
            </template>
        </masonry-wall>

    <Transition name="modal-fade">
        <div v-if="selectedPhoto" class="modal">
            <Slider :photos="store.searchResults" :initialPhoto="selectedPhotoIndex" @close="closeModal" />
        </div>
    </Transition>

    </section>
</template>

<script setup>
import { ref } from 'vue';
import MasonryWall from '@yeger/vue-masonry-wall';
import ImageCard from '../components/ImageCard.vue';
import Slider from '../components/ImageSlider.vue';
import SkeletonLoader from '../components/SkeletonLoader.vue';
import { useSearchStore } from '@/store';


const store = useSearchStore();
const selectedPhoto = ref(null);
const selectedPhotoIndex = ref(0);

const openModal = (photo) => {
    selectedPhoto.value = photo;
    selectedPhotoIndex.value = store.searchResults.findIndex(p => p.id === photo.id);
    document.body.style.overflow = 'hidden'; 
};

const closeModal = () => {
    selectedPhoto.value = null;
    document.body.style.overflow = 'auto';
};

</script>
