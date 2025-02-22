<template>
    <div class="carousel-container">
        <swiper 
            :slidesPerView="1" 
            :centeredSlides="true" 
            :navigation="{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }" 
            :modules="modules"
            :initialSlide="initialSlide"
            class="main-swiper"
        >
            <swiper-slide v-for="photo in photos" :key="photo.id">
                <div class="featured-image">
                    <img :src="photo.urls.full" :alt="photo.description || 'Image'">
                    <div class="photo-info">
                        <h3>{{ photo.user.name || 'Unknown Author' }}</h3>
                        <p>{{ photo.user.location || 'Unknown Location' }}</p>
                    </div>
                </div>
            </swiper-slide>

            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </swiper>
        <button class="close-button" @click="$emit('close')">&times;</button>
    </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const props = defineProps({
  photos: {
    type: Array,
    required: true
  },
  initialSlide: {
    type: Number,
    default: 0
  }
});

const modules = [Navigation];

</script>

<style scoped>
.carousel-container {
    width: 100%;
    /* position: relative; */
    /* max-width: 1200px; */
    margin: 0 auto;
}

.featured-image {
    position: relative;
    width: max-content;
    max-width: 80vw;
    height: 90vh;
    overflow: hidden;
    border-radius: 8px;
    display: flex;
    justify-items: center;
    align-items: center;
    margin: auto;
}

.featured-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.photo-info {
    position: absolute;
    width: auto;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    padding: 16px;
    text-align: left;
}

.swiper-button-prev,
.swiper-button-next {
    color: #555555;
    background: #ffffff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.swiper-button-prev:after,
.swiper-button-next:after {
    font-size: 18px;
}
</style>