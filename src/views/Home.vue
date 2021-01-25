<template>
  <div class="home">
    <canvas ref="imageCanvas" v-bind:width="width" v-bind:height="height" class="canvas"></canvas>

    {{images.length}}
    {{images[4]}}


  </div>
</template>

<script>
// @ is an alias to /src
import Home from '@/components/Home.vue'

export default {
  name: 'Home',
  components: {
    Home
  },
  props:{
    images:{
      type: Array
    }
  },
  data(){
    return{

      height: 400,
      width: 400,

      img:'',
      ctx:'',

      // height: window.innerHeight,
      // width: window.innerWidth,

    }
  },
  mounted() {


    this.ctx = this.$refs.imageCanvas.getContext('2d')

    this.drawImage(4)

  },
  methods:{
    drawImage(inx){
      //캔버스에 이미지 드로잉
      let img = new Image ()
      img.src = this.images[inx]

      img.onload = () => {
        // this.ctx.drawImage(img, this.width, this.height);
        this.ctx.drawImage(img, 0, 0, this.width, this.height);
      }

    }
  }
}
</script>


<style scoped>
  .canvas {
    /*width: 400px;*/
    /*height: 400px;*/
    border: 1px solid #000;
  }
</style>
