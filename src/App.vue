<template>
    <div class="unsplash-clone">
        <header>
            <div class="search-container" :class="{ 'search-container-results': hasSearched }">

                <form action="" @submit.prevent="fetchPhotos">
                    <SearchBox v-model="searchQuery" />
                    <button type="submit" class="submit-button" aria-label="Search"></button>
                </form>

                <!-- <h1 class="search-title">
                    Search Results for <span>"{{ searchQuery }}"</span>
                </h1> -->

            </div>
        </header>

        <main>
            <router-view></router-view>
        </main>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SearchBox from './components/SearchBox.vue';
import { useRouter } from 'vue-router';

import { useSearchStore } from '@/store';

const store = useSearchStore();

const router = useRouter();
const searchQuery = ref('');

const hasSearched = ref(false);

const fetchPhotos = async () => {
    if (searchQuery.value.trim()) {
        router.push(`/search/${encodeURIComponent(searchQuery.value)}`)
    }
    store.fetchPhotos(encodeURIComponent(searchQuery.value));
};

onMounted(() => {
    store.loadInitialSearch();
})

</script>
