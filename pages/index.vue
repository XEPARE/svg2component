<template>
  <div>
    <div class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-13rem]">
      <svg class="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[34deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]" viewBox="0 0 1155 678" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)" fill-opacity=".3" d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z" />
        <defs>
          <linearGradient id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533" x1="1155.49" x2="-78.208" y1=".177" y2="474.645" gradientUnits="userSpaceOnUse">
            <stop stop-color="#9089FC" />
            <stop offset="1" stop-color="#FF80B5" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    <div class="pt-6 max-w-7xl mx-auto">
      <div>
        <nav class="flex h-9 items-center justify-between" aria-label="Global">
          <div class="flex lg:min-w-0 lg:flex-1" aria-label="Global">
            <a href="/" class="font-semibold text-lg -m-1.5 p-1.5 flex items-center space-x-3">
              <component :is="svgIcon" class="h-7 w-7 text-green-500/80" />
              <span class="text-green-500/95">SVG-Converter</span>
            </a>
          </div>
          <div class="flex items-center space-x-2">
            <button
                type="button"
                class="flex h-8 w-8 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
                aria-label="Toggle Dark Mode"
                @click="isDark = !isDark"
            >
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" class="h-5 w-5 stroke-white" v-show="isDark">
                <path d="M12.5 10a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"></path>
                <path stroke-linecap="round" d="M10 5.5v-1M13.182 6.818l.707-.707M14.5 10h1M13.182 13.182l.707.707M10 15.5v-1M6.11 13.889l.708-.707M4.5 10h1M6.11 6.111l.708.707"></path>
              </svg>
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" class="h-5 w-5 stroke-zinc-900" v-show="!isDark">
                <path d="M15.224 11.724a5.5 5.5 0 0 1-6.949-6.949 5.5 5.5 0 1 0 6.949 6.949Z"></path>
              </svg>
            </button>
            <div class="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-end">
              <a href="https://github.com/Rene-Roscher" target="_blank" class="flex h-8 w-auto px-2 items-center justify-center rounded-md transition text-zinc-900 dark:text-white hover:bg-zinc-900/5 dark:hover:bg-white/5">GitHub</a>
            </div>
          </div>
        </nav>
      </div>
    </div>
    <main>
      <div class="text-zinc-900 dark:text-white">
        <div class="mx-auto max-w-7xl pt-20 pb-32 sm:pb-40">
          <h1 class="text-center mb-8 text-3xl font-semibold text-zinc-900 dark:text-white">Convert a SVG to Vue-Component</h1>

          <!-- Logo cloud -->
          <div class="mx-auto max-w-7xl px-6 lg:px-8 mb-8 bg-gray-800/5 dark:bg-zinc-800/95 p-4 rounded-md">
            <div class="mx-auto grid max-w-lg grid-cols-3 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:gap-x-10 sm:gap-y-14 lg:mx-0 lg:max-w-none">
              <a v-for="company in companies" :href="company.url" target="_blank" class="col-span-2 lg:col-span-1 mx-auto">
                <img class="max-h-12 w-full object-contain grayscale hover:grayscale-0 transition duration-300" :class="company?.classes" :src="company.logo" :alt="company.name" />
              </a>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-6 ">
            <div v-show="preview" class="col-span-full resizable rounded-md shadow bg-white/30 relative flex justify-center items-center mx-auto">
              <component :is="preview" class="svg-preview"/>
              <div class="resize-handle"></div>
            </div>
            <div class="min-h-48 w-full">
              <textarea v-model="source" placeholder="Enter plain svg" rows="7" class="bg-white/30 dark:bg-zinc-800/95 min-h-[20em] select-all w-full outline-none border-0 shadow focus:outline-none focus:border-0 rounded-md focus:ring-0"></textarea>
            </div>
            <div class="w-full">
              <textarea disabled v-model="output" rows="7" class="bg-white/30 dark:bg-zinc-800/95 min-h-[20em] select-all w-full outline-none border-0 shadow focus:outline-none focus:border-0 rounded-md focus:ring-0"></textarea>
            </div>
            <div class="col-span-full">
              <button @click="copyOutput" class="p-1 w-full rounded-md hover:opacity-75 bg-green-500/80 text-gray-50 font-medium transition-all duration-150 ease-in-out active:bg-transparent active:text-gray-800">
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import cheerio from "cheerio";
import js_beautify from "js-beautify";
import { ref, watch, defineComponent, h } from 'vue'
import {useLocalStorage} from "@vueuse/core";

const companies = [
  {
    name: 'LIVCK.com',
    logo: 'https://cdn.livck.com/livck/livck-logo-light.svg',
    url: 'https://livck.com',
    classes: 'h-8'
  },
  {
    name: 'EmeraldHost',
    logo: 'https://cdn.emeraldhost.de/branding/logo-white.svg',
    url: 'https://emeraldhost.de',
    classes: 'h-8'
  },
  {
    name: 'XEPARE',
    logo: 'https://scrn.rene-roscher.de/xepare-light.svg',
    url: 'https://github.com/XEPARE',
    classes: 'h-8'
  }
]

const isDark = useLocalStorage('isDark', false);

const setDarkMode = () => {
  console.log(isDark.value)
  if (isDark.value) {
    document.body.classList.add('dark')
  } else {
    document.body.classList.remove('dark')
  }
};

onBeforeMount(() => {
  nextTick(() => {
    setDarkMode()
  })
});
watch(isDark, setDarkMode)

const source = ref('')
const output = ref('')
const preview = ref('')

const svgIcon = defineComponent({
  render() {
    return h('svg', {
      width: '20',
      height: '20',
      viewBox: '0 0 20 20',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg'
    }, [
      h('path', {
        d: 'M6 1H4.2C3.0799 1 2.51984 1 2.09202 1.21799C1.71569 1.40973 1.40973 1.71569 1.21799 2.09202C1 2.51984 1 3.0799 1 4.2V6M6 19H4.2C3.0799 19 2.51984 19 2.09202 18.782C1.71569 18.5903 1.40973 18.2843 1.21799 17.908C1 17.4802 1 16.9201 1 15.8V14M19 6V4.2C19 3.0799 19 2.51984 18.782 2.09202C18.5903 1.71569 18.2843 1.40973 17.908 1.21799C17.4802 1 16.9201 1 15.8 1H14M19 14V15.8C19 16.9201 19 17.4802 18.782 17.908C18.5903 18.2843 18.2843 18.5903 17.908 18.782C17.4802 19 16.9201 19 15.8 19H14M14 10C14 12.2091 12.2091 14 10 14C7.79086 14 6 12.2091 6 10C6 7.79086 7.79086 6 10 6C12.2091 6 14 7.79086 14 10Z',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      })
    ]);
  }
});

const copyOutput = () => {
  navigator.clipboard.writeText(output.value);
};

const essentialAttributes = [/*'width', 'height', */'viewBox', 'fill', 'xmlns', 'd', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'cx', 'cy', 'r', 'x1', 'y1', 'x2', 'y2', 'clip-path', 'id'];

watch(source, (val) => {
  const $ = cheerio.load(val);
  const elements = [];

  function parseElement(elem) {
    const elementName = elem.tagName;
    const attributes = {};
    elem.attribs && Object.keys(elem.attribs).forEach(attr => {
      if (essentialAttributes.includes(attr)) {
        attributes[attr] = elem.attribs[attr];
      }
    });

    const children = $(elem).children().map((i, child) => parseElement(child)).get();

    return h(elementName, attributes, children.length > 0 ? children : undefined);
  }

  $('svg').each((i, elem) => {
    elements.push(parseElement(elem));
  });

  const svgComponent = elements[0];

  const renderCode = `
    defineComponent({
      render() {
        return h('svg', ${JSON.stringify(svgComponent.props)}, [
          ${svgComponent.children.map(child => `h('${child.type}', ${JSON.stringify(child.props)}, ${child.children ? child.children.map(grandchild => `h('${grandchild.type}', ${JSON.stringify(grandchild.props)})`).join(', ') : ''})`).join(', ')}
        ]);
      }
    })
  `;

  output.value = js_beautify(renderCode, { indent_size: 4 });
  preview.value = defineComponent({
    render() {
      return h('svg', svgComponent.props, svgComponent.children);
    }
  });
});
</script>

<style scoped>
.resizable {
  position: relative;
  width: 100%; /* Width stays full width */
  max-width: 100%; /* Limit maximum width for better UI */
  height: 300px; /* Initial height */
  overflow: hidden;
  resize: vertical; /* Allow only vertical resizing */
}

.svg-preview {
  padding: 2em;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  object-position: center;
}

.resize-handle {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 10px;
  cursor: ns-resize;
}

/* Hide the default scrollbar for better UI */
*::-webkit-scrollbar {
  width: 3px;
}
*::-webkit-scrollbar-track {
  @apply bg-transparent;
}
*::-webkit-scrollbar-thumb {
  @apply bg-neutral-400 border-2 rounded-full;
  border: 4px solid transparent;
}
</style>

