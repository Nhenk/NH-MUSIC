<template>
  <svg :class="svgClass" v-bind="$attrs" >
    <use :xlink:href="iconName"/>
  </svg>
</template>
​
<script setup>
import { computed } from "vue"

const props = defineProps({
    //图标名称 如 name
  name: {
    type: String,
    required: true
  },
})

const iconName = computed(() => `#icon-${props.name}`)
const svgClass = computed(() => {
  if (props.name) {
    return `svg-icon ${iconName.value}`
  }
  return "svg-icon"
})
</script>
​
<style scoped>
.svg-icon {
  /* width: 1em;
  height: 1em; */
  fill: currentColor;
  /* vertical-align: middle; */
}
</style>
