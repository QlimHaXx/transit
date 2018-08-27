<template>
  <div id="augmentedreality">
    <h1>Réalité augmentée</h1>
    <v-btn v-on:click="activateVideo()">Activer vidéo</v-btn>
    <div class="video">
      <img id="fleche" src="https://www.freeiconspng.com/uploads/right-arrow-icon-4.png">
      <video id="video" autoplay></video>
    </div>
  </div>
</template>

<script>
import modernizr from 'modernizr'

export default {
  name: 'AugmentedReality',
  components: {
    modernizr
  },
  data: () => ({
  }),
  created: function () {
    if (modernizr.devicemotion) {
      console.log('device motion')
    }
    if (modernizr.deviceorientation) {
      console.log('device orientation')
    }
  },
  methods: {
    activateVideo () {
      // Get access to the camera!
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
          var video = document.getElementById('video')
          document.getElementById('fleche').style.display = 'block'
          video.src = window.URL.createObjectURL(stream)
          video.play()
        })
      }

      window.addEventListener('deviceorientation', function (event) {
        // console.log("z : " + event.alpha + "\n x : " + event.beta + "\n y : " + event.gamma);
        document.getElementById('fleche').style.transform = 'rotateX(' + event.beta + 'deg) ' + 'rotateZ(' + event.alpha + 'deg)'
      })
    }
  }
}

</script>
<style scoped>
  .video {
    position: relative;
    width: 100%;
    height: 400px;
  }
  .video img {
    display: none;
    position: absolute;
    z-index:1;
    width: 30%;
    top: 20%;
    left: 35%;
  }
  video {
    position: absolute;
    width: 600px;
    height: 400px;
    left: calc(50% - 300px);
  }
  @media screen and (max-width: 600px){
    .video {
      position: relative;
      width: 100%;
      height: 300px;
    }
    video {
      left: 0;
      width: 100%;
      height: 300px;
    }
  }
</style>
