<template>
    <div class="unsplash-clone">
        <header>
            <div class="search-container" :class="{ 'search-container-results': hasSearched }">
                <h1 v-if="hasSearched" class="search-title">
                    Search Results for <span>"{{ searchQuery }}"</span>
                </h1>

                <form 
                    v-else
                    action="" 
                    @submit.prevent="fetchPhotos"
                >
                    <SearchBox v-model="searchQuery"/>
                    <button type="submit" class="submit-button" aria-label="Search"></button>
                </form>
            </div>
        </header>
        <main class="photo-grid">
            <div v-if="loading" class="loading-grid">
                <div v-for="n in 8" :key="n">
                    <SkeletonLoader />
                </div>
            </div>

            <masonry-wall v-else :items="photos" :column-width="300" :gap="35">
                <template #default="{ item }">
                    <div class="photo-item" @click="openModal(item)">
                        <ImageCard :item="item" />
                    </div>
                </template>
            </masonry-wall>
        </main>

        <Transition name="modal-fade">
            <div v-if="selectedPhoto" class="modal">
                <Slider :photos="photos" :initialPhoto="selectedPhotoIndex" @close="closeModal" />
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import MasonryWall from '@yeger/vue-masonry-wall';
import ImageCard from './components/ImageCard.vue';
import SearchBox from './components/SearchBox.vue';
import Slider from './components/ImageSlider.vue';
import { searchPhotos } from './services/apiClient.js';
import SkeletonLoader from './components/SkeletonLoader.vue';

const photos = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const selectedPhoto = ref(null);
const selectedPhotoIndex = ref(0);

const displayedSearchQuery = ref('');
const hasSearched = ref(false);
const initialSearchComplete = ref(false);
const defaultSearch = 'africans';

const fetchPhotos = async () => {
    if (!searchQuery.value) return;
    loading.value = true;
    try {
        const response = await searchPhotos(searchQuery.value);
        photos.value = response.results;
        hasSearched.value = true;
    } catch (err) {
        console.error(`Failed to load ${searchQuery.value} images`, err);
    } finally {
        loading.value = false;
    }
};

const loadInitialSearch = async () => {
    if (initialSearchComplete.value) return;
    try {
        loading.value = true;
        const response = await searchPhotos(defaultSearch);
        photos.value = response.results;
        displayedSearchQuery.value = defaultSearch;
        initialSearchComplete.value = true;
    } catch (err) {
        console.error(`Failed to load ${defaultSearch} images`, err);
    } finally {
        loading.value = false;
    }
};

const openModal = (photo) => {
    selectedPhoto.value = photo;
    selectedPhotoIndex.value = photos.value.findIndex(p => p.id === photo.id);
    document.body.style.overflow = 'hidden'; 
};

const closeModal = () => {
    selectedPhoto.value = null;
    document.body.style.overflow = 'auto';
};

onMounted(loadInitialSearch);
</script>

<style>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

</style>
