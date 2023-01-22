<template>
  <div class="isolate bg-white">
    <div class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
      <svg class="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]" viewBox="0 0 1155 678" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)" fill-opacity=".3" d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z" />
        <defs>
          <linearGradient id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533" x1="1155.49" x2="-78.208" y1=".177" y2="474.645" gradientUnits="userSpaceOnUse">
            <stop stop-color="#9089FC" />
            <stop offset="1" stop-color="#FF80B5" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    <div class="px-6 pt-6 lg:px-8">
      <div>
        <nav class="flex h-9 items-center justify-between" aria-label="Global">
          <div class="flex lg:min-w-0 lg:flex-1" aria-label="Global">
            <a href="/" class="font-semibold text-lg -m-1.5 p-1.5 flex items-center space-x-2">
              <component :is="svgIcon" class="h-6 w-6 text-green-500/80" />
              <span class="text-green-500/95">SVG-Converter</span>
            </a>
          </div>
          <div class="flex lg:hidden">
            <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = true">
              <span class="sr-only">Open main menu</span>
              <Bars3Icon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div class="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-end">
            <a href="https://github.com/Rene-Roscher" target="_blank" class="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20">GitHub</a>
          </div>
        </nav>
        <Dialog as="div" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
          <DialogPanel focus="true" class="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden">
            <div class="flex h-9 items-center justify-between">
              <div class="flex">
                <a href="#" class="-m-1.5 p-1.5">
                  <component :is="svgIcon" class="h-6 w-6 text-green-500/80" />
                  <span class="text-green-500/95">SVG-Converter</span>
                </a>
              </div>
              <div class="flex">
                <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
                  <span class="sr-only">Close menu</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div class="mt-6 flow-root">
              <div class="-my-6 divide-y divide-gray-500/10">
                <div class="py-6">
                  <a href="https://github.com/Rene-Roscher" target="_blank" class="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10">GitHub</a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </div>
    </div>
    <main>
      <div class="">
        <div class="mx-auto max-w-7xl pt-20 pb-32 sm:pb-40">
          <h1 class="text-center mb-8 text-3xl font-semibold">Convert a SVG to Vue-Component</h1>
          <div class="grid grid-cols-2 gap-6 ">
            <div v-show="preview" class="col-span-full h-24 w-1/2 w-full mx-auto p-4 border border-gray-200 rounded-md shadow bg-white/30 relative">
              <component :is="preview" class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
            </div>
            <div class="min-h-48 w-full">
              <textarea v-model="source" placeholder="Enter plain svg" rows="7" class="bg-white/30 min-h-[20em] w-full outline-none border-0 shadow focus:outline-none focus:border-0 rounded-md focus:ring-0"></textarea>
            </div>
            <div class="w-full">
              <textarea v-model="output" rows="7" class="bg-white/30 min-h-[20em] select-all w-full outline-none border-0 shadow focus:outline-none focus:border-0 rounded-md focus:ring-0"></textarea>
            </div>
            <div class="col-span-full">
              <button @click="copyOutput" class="border-2 p-1 w-full rounded-md border-green-500/50 hover:opacity-75 bg-green-500/80 text-gray-50 font-medium transition-all duration-150 ease-in-out active:bg-transparent active:text-gray-800">
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
import util from "util-browser";
import js_beautify from "js-beautify";
import { ref, watch, defineComponent, computed } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const mobileMenuOpen = ref(false);

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

const source = ref('')
const output = ref('')
const preview = ref('')

const getAttributes = (element) =>  {
  let attributes = {};
  for (let i = 0; i < element.attributes.length; i++) {
    let attribute = element.attributes[i];
    attributes[attribute.name] = attribute.value;
  }
  return attributes;
};

const copyOutput = () => {
  navigator.clipboard.writeText(output.value);
};

watch(source, (val) => {
  const svg = cheerio.load(val);

  const svgProperties = {};
  const paths = [];

  svg('svg').each(function(){
    Object.assign(svgProperties, svg(this).attr())
  });

  svg('path').each(function(){
    paths.push(Object.assign({}, svg(this).attr()));
  });

  var data = `defineComponent({
    render() {
        return h('svg', ${util.inspect(svgProperties, {depth: null, showHidden: false})}, [
            ${Object.values(paths).map(path => `h('path', ${util.inspect(path, {depth: null, showHidden: false})})`).join(",\n")}
        ]);
    }
})`;
  output.value = js_beautify(data, { indent_size: 4 });
  preview.value = defineComponent({
    render() {
      return h('svg', svgProperties, [
        ...Object.values(paths).map(path => h('path', path))
      ]);
    }
  });
});
</script>

<style scoped>
*::-webkit-scrollbar {
  width: 13px;
}
*::-webkit-scrollbar-track {
  @apply bg-transparent;
}
*::-webkit-scrollbar-thumb {
  @apply bg-neutral-400 border-2 rounded-full;
  /*border-radius: 100px;*/
  border: 4px solid #fafafa;
}
</style>