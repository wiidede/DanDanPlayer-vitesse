<script setup lang="ts">
import NPlayer from 'nplayer'
import NPlayerComment from '@nplayer/danmaku'
import type { GetCommentApiReturnType } from '~/typings/comment'

const playerStore = usePlayerStore()
const { video, comments } = storeToRefs(playerStore)

const commentOption = {
  autoInsert: false,
  persistOptions: true,
}
const player = new NPlayer({
  src: video.value,
  controls: [['play', 'volume', 'time', 'spacer', 'airplay', 'danmaku-settings', 'settings', 'web-fullscreen', 'fullscreen'], ['progress']],
  plugins: [new NPlayerComment(commentOption)],
})
const playerRef = ref<HTMLDivElement>()
onMounted(() => {
  player.mount(playerRef.value)
})
onBeforeUnmount(() => {
  player.dispose()
})

const handleResult = (res: GetCommentApiReturnType) => {
  if (res.count) {
    comments.value = res.comments.map(dandan2nPlayer).sort((a, b) => a.time - b.time)
    elNotify.info(`弹幕匹配成功：共${res.count}条弹幕`)
    player.danmaku.resetItems(comments.value)
    player.play()
  }
}

usePlayer(handleResult)

watch(video, (val) => {
  if (val) {
    player.updateOptions({
      src: val,
    })
  }
})
</script>

<template>
  <player-layout>
    <div ref="playerRef" w-full h-full />
  </player-layout>
</template>

<style lang="scss" scoped>
.disabled {
  pointer-events: none;
}

@media screen and (max-width: 768px) {
  .player-container {
    width: 100vw;
  }
}
</style>
