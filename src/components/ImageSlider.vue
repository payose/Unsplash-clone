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
            :initialSlide="initialPhoto"
            class="main-swiper"
        >
            <swiper-slide v-for="photo in photos" :key="photo.id" class="swiper-slide">
                <div class="featured-image">
                    <img :src="photo.urls.full" :alt="photo.description || 'Image'">
                    <div class="slider-photo-info">
                        <h3>{{ photo.user.name || 'Unknown Author' }}</h3>
                        <p class="location">{{ photo.user.location || 'Unknown Location' }}</p>
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

defineProps({
    photos: {
        type: Array,
        required: true
    },
    initialPhoto: {
        type: Number,
        default: 0
    }
});

const modules = [Navigation];

</script>

<style>
.carousel-container {
    width: 100%;
    margin: 0 auto;
}

.swiper-slide {
    align-items: center !important;
}

.featured-image {
    position: relative;
    width: max-content;
    max-width: 80vw;
    height: 100%;
    /* max-height: 90vh; */
    overflow: hidden;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    margin: auto;
}

.featured-image img {
    width: 100%;
    max-width: 80vw;
    height: 100%;
    max-height: 70vh;
    object-fit: contain;
}

.slider-photo-info {
    width: 100%;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    padding: 2rem 2rem;
    text-align: left;
    color: #0d1b3fd6;

    p{
        padding-top: 9px;
    }
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