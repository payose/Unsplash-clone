<template>
    <div class="carousel-container">
        <swiper 
        :slidesPerView="1" 
            :centeredSlides="true"
            :navigation="{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }"
            :keyboard="{
                enabled: true
            }"
            :modules="modules"
            :grabCursor="true"
            :effect="'creative'"
            :creativeEffect="{
                prev: {
                    translate: ['-100%', 0, -1],
                },
                next: {
                    translate: ['100%', 0, 0],
                },
            }"
            :initialSlide="initialPhoto"
            class="main-swiper"
        >
            <swiper-slide v-for="photo in photos" :key="photo.id" class="swiper-slide">
                <div class="featured-image">
                    <img 
                        :src="getOptimizedImageUrl(photo.urls)"
                        :srcset="`
                            ${photo.urls.small} 400w,
                            ${photo.urls.regular} 1080w,
                            ${photo.urls.full} 2048w
                        `"
                        
                        sizes="(max-width: 400px) 100vw, (max-width: 1080px) 50vw, 33vw"
                        :alt="photo.description || 'Image'"
                    />
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
import { onMounted } from 'vue';
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

const getOptimizedImageUrl = (urls) => {
  const viewportWidth = window.innerWidth;
  if (viewportWidth < 768) return urls.small;
  if (viewportWidth < 1200) return urls.regular;
  return urls.full;
};

onMounted(()=>{
    document.querySelector('.swiper-wrapper').style.alignItems = 'center';
});

const modules = [Navigation];

</script>

<style scoped>
.carousel-container {
    width: 100%;
    margin: 0 auto;
}

.swiper-button-prev,
.swiper-button-next {
    color: #555555;
    background: #e0e0e0;
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