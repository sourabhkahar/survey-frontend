import { ref  } from 'vue'
import { findValueByKey } from '@/utils/helpers'

export function useSectionTypeFinder(sourceData) {
  const data = ref(sourceData)

  const findFirst = (key) => {
    return findValueByKey(key, data.value)
  }

  return {
    data,
    findFirst,
  }
}
