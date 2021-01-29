<template>
  <div class="DrawImage">
    <canvas ref="imageCanvas" v-bind:width="width" v-bind:height="height" class="canvas"></canvas>
  </div>
</template>

<script>
  // 이미지 url arr import
  import images from '/src/assets/js/imageUrls'

export default {
  name: 'DrawImage',
  data(){
    return{

      height: 800,
      width: 800,

      changedWidth: 0,
      changedHeight: 0,



      canvas: null,
      ctx: null,

      // 현재 클릭된 마우스 (좌, 우)
      clickedVal:null,
      // 클릭 되어있는 상태 (클릭, 비클릭)
      clicked: false,

      img:'',
      imgInx:0,

      //이미지 기존 스케일
      scale:1,

      mousePositionX:null,
      mousePositionY:null,



    }
  },
  mounted() {

    this.canvas = this.$refs.imageCanvas
    this.ctx = this.canvas.getContext('2d')

    this.bufferCanvas = document.createElement('canvas')
    this.bufferCtx = this.bufferCanvas.getContext('2d')

    this.bufferCanvas.height = this.canvas.height
    this.bufferCanvas.width = this.canvas.width


    // 마우스 휠
    this.canvas.addEventListener('wheel', this.wheelEvents, false)

    // 마우스 이벤트
    this.canvas.addEventListener('mousedown',  event => {
      console.log('mousedown', event)

      this.mousePositionX = event.offsetX
      this.mousePositionY = event.offsetY

      this.clicked = true
      this.clickedVal = event.buttons
    }, false)

    this.canvas.addEventListener('mousemove', this.dragEvents, false);

    this.canvas.addEventListener('mouseup', event => {
      console.log('mouseup', event)

      this.clicked = false
      this.clickedVal = null
    }, false);

    // 이미지 랜더링
    this.drawImage(this.imgInx)

  },

  methods:{

    zoomImage(event){
      // 이미지 줌 (좌클릭 + 드래그)
      console.log('이미지 줌 (좌클릭 + 드래그)', event)

      let scale = this.scale

      if(this.mousePositionX > event.offsetX || this.mousePositionY > event.offsetY){

        scale = scale + 0.00001;
        this.scale = scale
        this.ctx.scale(scale, scale);

        this.drawImage(this.imgInx)

        this.mousePositionX = event.offsetX
        this.mousePositionY = event.offsetY

      }else{

        scale = scale - 0.00001;
        this.ctx.scale(scale, scale);
        this.scale = scale

        this.drawImage(this.imgInx)

        this.mousePositionX = event.offsetX
        this.mousePositionY = event.offsetY
      }

    },


    rotateImage(){
      // 이미지 회전 (우클릭 + 드래그)
      console.log('이미지 회전 (우클릭 + 드래그)')

      this.ctx.clearRect (this.changedWidth, this.changedHeight, this.canvas.width, this.canvas.height );

      let degrees = 0.5

      this.ctx.translate(this.width / 2, this.height / 2);
      this.ctx.rotate(degrees * Math.PI/180);
      this.ctx.translate(-(this.width / 2), -(this.height / 2));

      this.drawImage(this.imgInx)

    },

    dragEvents(event){
      //마우스 클릭후 드래그 이벤트

      if(this.clicked){
        // 초기화
        this.ctx.clearRect (this.changedWidth, this.changedHeight, this.canvas.width, this.canvas.height );

        if(this.clickedVal === 1){
          // click and wheel -- left
          this.zoomImage(event)
        }else if(this.clickedVal === 2){
          //click and wheel -- right
          this.rotateImage()
        }else{
          // -- NO OP
        }
      }

    },

    wheelEvents(event){
      //마우스 휠 이벤트
      console.log('wheels', event)

      //1 = down wheel / -1 = up wheel
      let scale = Math.sign(event.deltaY)

      let inxData = this.imgInx - scale

      // up wheel : plus , down wheel : minus
      //이미지 끝 - 처음, 처음 - 끝 연결
      if(inxData < 0){
        this.imgInx = 49
      }else if(inxData > 49){
        this.imgInx = 0
      }else{
        this.imgInx = inxData
      }

      this.drawImage(this.imgInx)
    },

    drawImage(inx){
      //캔버스에 이미지 드로잉
      let img = new Image ()
      img.src = images[inx]

      img.onload = () => {
        this.bufferCtx.drawImage(img, this.changedWidth, this.changedHeight, this.width, this.height);
        this.ctx.drawImage(this.bufferCanvas, this.changedWidth, this.changedHeight, this.width, this.height);
      }

    },
  },
  watch:{}
}
</script>


<style scoped>
  .canvas {
    border: 1px solid #000;
  }
</style>
