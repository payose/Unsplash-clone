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
                <div v-for="n in 12" :key="n" class="loading-item">
                    <div class="loading-placeholder"></div>
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

        <!-- Photo Modal -->
        <div v-if="selectedPhoto" class="modal">
            <Slider :photos="photos" :initialSlide="selectedPhotoIndex" @close="closeModal" />
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import MasonryWall from '@yeger/vue-masonry-wall';
import ImageCard from './components/ImageCard.vue';
import SearchBox from './components/SearchBox.vue';
import Slider from './components/ImageSlider.vue';
import { searchPhotos } from './services/apiClient.js';

export default {
    name: 'App',
    components: {
        MasonryWall,
        ImageCard,
        SearchBox,
        Slider
    },

    setup() {
        const photos = ref([]);
        const loading = ref(true);
        const searchQuery = ref('');
        const selectedPhoto = ref(null);
        const selectedPhotoIndex = ref(0);

        const displayedSearchQuery = ref('');
        const hasSearched = ref(false);
        // const page = ref(1);
        
        const initialSearchComplete = ref(false);
        const defaultSearch = 'africans';

        const fetchPhotos = async() => {
            if (!searchQuery.value) return;
            loading.value = true;
            try {
                const response = await searchPhotos(searchQuery.value);
                photos.value = response.results;
                hasSearched.value = true;

            } catch (err) {
                err.value = 'Search failed';
                console.error(err);
            } finally {
                loading.value = false;
            }
        }

        const loadInitialSearch = async () => {
            if (initialSearchComplete.value) return;

            try {
                loading.value = true;
                const response = await searchPhotos(defaultSearch);
               
                photos.value = response.results;
                displayedSearchQuery.value = defaultSearch;
                initialSearchComplete.value = true;

            } catch (error) {
                console.error('Error loading initial photos:', error);

            } finally {
                loading.value = false;
            }
        };

        // const openModal = (photo) => {
        //     selectedPhoto.value = photo
        //     document.body.style.overflow = 'hidden'
        // }

        const openModal = (photo) => {
            selectedPhoto.value = photo;
            selectedPhotoIndex.value = photos.value.findIndex(p => p.id === photo.id);
        };

        const closeModal = () => {
            selectedPhoto.value = null
            document.body.style.overflow = 'auto'
        }

        onMounted(loadInitialSearch)

        return {
            photos,
            loading,
            searchQuery,
            selectedPhoto,
            searchPhotos,
            openModal,
            closeModal,
            displayedSearchQuery,
            hasSearched,
            fetchPhotos
        }
    }
}
</script>
