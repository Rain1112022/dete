<template>
  <div class="scale-box-container">
    <ScaleBox>
      <div class="monitor-container">
        <div class="container-content">
          <div class="content-left">
            <LeftTop></LeftTop>
            <LeftBottom></LeftBottom>
          </div>
          <div class="content-mid">
            <Center></Center>
          </div>
          <div class="content-right">
            <RightTop></RightTop>
          </div>
        </div>
        <div class="container-footer">
          <Footer></Footer>
        </div>
      </div>
    </ScaleBox>
  </div>
</template>

<script lang="ts" setup>
import { ScaleBox } from '@/components';
import LeftTop from './components/LeftTop.vue';
import LeftBottom from './components/LeftBottom.vue';
import Center from './components/Center.vue';
import RightTop from './components/RightTop.vue';

import Footer from './components/Footer.vue';
</script>

<style lang="scss" scoped>
.scale-box-container {
  width: 100%;
  height: 100%;
  background: $coverBg;
  position: relative;
  .monitor-container {
    width: 100%;
    height: 100%;
    .container-content {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 670px;
      .content-left {
        position: relative;
        width: 500px;
        padding: 0 0 0 12px;
        // background: rgba($color: $green, $alpha: 0.3);
      }
      .content-mid {
        width: calc(100% - 1000px);
        // background: rgba($color: $active-blue, $alpha: 0.3);
        padding: 0 10px;
      }
      .content-right {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 500px;
        padding: 0 12px 0 0;
        // background: rgba($color: $pink, $alpha: 0.3);
      }
    }
    .container-footer {
      width: 100%;
      padding: 0 12px;
      margin-top: 14px;
      height: calc(100% - 686px);
      // background: rgba($color: $pink, $alpha: 0.3);
    }
  }
}
</style>
