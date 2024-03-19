<template>
  <div>
    <div class="popup-container" @click="togglePopup">
      <Icon type="md-close" size="30" color="#fff" v-if="isPopup"/>
      <Icon type="ios-chatbubbles" size="30" color="#fff" v-else />
    </div>
    <transition name="popup-fade">
      <div class="popup-chat" v-if="isPopup">
        <iframe src="http://192.168.1.5:8080/popup?type=search" style="width: 100%;height: 100%; " frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
        <!-- <button class="close-button" @click="togglePopup">X</button> -->
      </div>
    </transition>
  </div>

</template>
<script>
export default {
  data() {
    return {
      isPopup: false,
    }
  },
  components: {

  },
  methods: {
    togglePopup() {
      this.isPopup = !this.isPopup;
    },

  },
  mounted: function () {
    console.log("puop mounted");
    window.onmessage = (e) => {
      console.log(e.data);
      if (e.data.type === "relevant") {
        localStorage.setItem("content", e.data.content);
        window.open("relevant");
      }

    }
  },
  beforeDestroy() {
    window.onmessage = null;
  }
}
</script>
<style scoped>
.popup-container {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 30px;
  bottom: 80px;
  width: 60px;
  height: 60px;
  background-color: #5BC0BE;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, .1);
  cursor: pointer;
  transition: all .3s;
  z-index: 1000;
  /* opacity: 0.68; */

  &:hover {
    /* opacity: 0.61; */
    box-shadow: 0 0 10px rgba(0, 0, 0, .3);
    transform: translateY(-5px);
    /* background-color: #3A8EE6; */
  }

}

@keyframes pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.95);
  }

  100% {
    transform: scale(1);
  }
}

.popup-container:active {
  animation: pulse 0.3s ease-out;
}

.popup-content {
  color: wheat;
  font-size: 10px;
  font-weight: bold;
}

.popup-chat {
  position: fixed;
  right: 30px;
  bottom: 150px;
  width: 380px;
  height: 500px;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, .1);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  transition: all .3s;
  /* opacity: 1; */
}

.popup-chat.active {
  opacity: 1;
  transform: translateY(0);
}

/* .close-button {
  position: absolute;
  top: 5px;
  right: -20px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #101010;
  background-color: white;
} */

/* 动画效果：淡入淡出 */
.popup-fade-enter-active,
.popup-fade-leave-active {
  transition: all .3s ease;
}

.popup-fade-enter,
.popup-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
<style></style>
