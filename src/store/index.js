import { defineStore } from 'pinia'
import { searchPhotos } from '../services/apiClient.js';

export const useSearchStore = defineStore('search', {
    state: () => ({
        searchQuery: '',
        searchResults: [],

        defaultSearch: 'africans',
        initialSearchResults: [],
        initialSearchComplete: false,

        loading: false

    }),

    actions: {
        async fetchPhotos(query) {
            if (!query) return;
            this.loading = true;
            try {
                const response = await searchPhotos(query);
                this.searchResults = response.results;

            } catch (err) {
                console.error(`Failed to load ${query} images`, err);
            } finally {
                this.loading = false;
            }
        },

        async loadInitialSearch() {
            if (this.initialSearchComplete && this.initialSearchResults.length > 0) return;
            
            try {
                this.loading = true;
                const response = await searchPhotos(this.defaultSearch);
                this.initialSearchResults = response.results;

                this.initialSearchComplete = true;

            } catch (err) {
                console.error(`Failed to load ${this.defaultSearch} images`, err);

            } finally {
                this.loading = false;
            }
        }
    },
    persist: true
})
