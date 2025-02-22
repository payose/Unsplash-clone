<template>
    <div class="">
        <input 
            type="text" 
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            placeholder="Search for photo" 
            class="search-input"
            aria-label="Search for photos"
        />
        <svg class="input-icon"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-4.35-4.35M17 10A7 7 0 1 1 3 10a7 7 0 0 1 14 0z" />
        </svg>
    </div>
</template>

<script setup>
defineProps({
    modelValue: String
});
defineEmits(['update:modelValue']);
</script>
