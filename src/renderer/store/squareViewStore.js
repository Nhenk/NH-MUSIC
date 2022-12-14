import { defineStore } from "pinia";
import { usePlatformStore } from "./platformStore";

export const useSquareViewStore = defineStore('squareView', {
    state: () => ({
        // (platformCode, categoryArray)
        categoryMap: new Map(),
        currentCategoryItem: {
            data: { key: '默认', value: '' },
            row: 0,
            col: 0
        }
    }),
    getters: {
        currentPlatformCode(state) {
            const platform = usePlatformStore()
            return platform.currentPlatformCode
        },
        currentCategoryCode(state) {
            return state.currentCategoryItem.data.value
        }
    },
    actions: {
        putCategory(key, value) {
            this.categoryMap.set(key, value)
        },
        putCurrentCategory(value) {
            this.putCategory(this.currentPlatformCode, value)
        },
        getCategory(key) {
            return this.categoryMap.get(key)
        },
        currentCategory() {
            return this.getCategory(this.currentPlatformCode)
        },
        currentVender() {
            const platform = usePlatformStore()
            return platform.currentVender()
        },
        updateCurrentCategoryItem(data, row, col) {
            this.currentCategoryItem.data = data
            this.currentCategoryItem.row = row
            this.currentCategoryItem.col = col
        },
        resetCurrentCategoryItem() {
            this.updateCurrentCategoryItem({ key: '默认', value: '' }, 0, 0)
        }
    }
})