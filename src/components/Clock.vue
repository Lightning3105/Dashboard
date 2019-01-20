<template>
	<div :class="{'parent': true, 'large': clockMode}">
		<div class="black"></div>
		<div class="main">
			<p class="time" v-text="currentTime"></p>
			<p class="time date" v-text="date"></p>
		</div>
			<p class="time seconds" v-text="seconds"></p>

		<div class="bcontainer" v-if="clockMode">
			<action-button :data="{icon: 'power-off', url: '/dashboard/screen/toggle', background: 'ambient'}"></action-button>
		</div>
	</div>
</template>

<script>
import moment from "moment";
import axios from "axios";
import ActionButton from "./ActionButton.vue";
import { EventBus } from '../event-bus.js';


export default {
  name: "Clock",
  components: {
    ActionButton
  },
  data() {
    return {
      currentTime: null,
      seconds: null,
      clockMode: false
    };
  },
  methods: {
    updateCurrentTime() {
      this.currentTime = moment().format("h:mm");
      this.seconds = moment().format("ss");
    },
    checkClockMode() {
      axios.get(window.APIROOT + "/dashboard/screen/get").then(response => {
        let brightness = response.data;
        if (brightness == 1) {
          this.clockMode = true;
        } else {
          this.clockMode = false
        }
      });
    }
  },
  computed: {
    date() {
      return moment().format("dddd, MMMM Do");
    }
  },
  created() {
    this.currentTime = moment().format("h:mm");
    this.seconds = moment().format("ss");
    this.checkClockMode();
    setInterval(() => this.updateCurrentTime(), 1 * 1000);
    setInterval(() => this.checkClockMode(), 180 * 1000);

	EventBus.$on('buttonclick', data => {
		if (data == '/dashboard/screen/toggle'){
			setTimeout(() => this.checkClockMode(), 100);
			setTimeout(() => this.checkClockMode(), 3 * 1000);
		}
	})
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.time {
  font-family: Roboto-Bold;
  font-size: 80px;
  margin-top: 25px;
  margin-left: 25px;
  margin-bottom: 0;
  color: white;
  text-shadow: 0 0 15px rgba(50, 50, 50, 0.35);
  display: inline-block;
}

.time.seconds {
  font-size: 22px;
  margin-left: 0;
  color: rgba(229, 229, 253, 0.794);
	position: relative;
	margin-left: 100%;
	top: -75px;
}

.time.date {
  font-size: 16px;
  display: block;
  margin-top: -10px;
  font-family: Roboto-light;
}

.large > .main {
  margin-top: 0;
  margin-left: 0;
  opacity: 0.4;
}

.parent.large > .time.seconds {
	display: none;
}

.large > .main {
  transform: scale(4) translate(-50%, -50%);
  transform-origin: top left;
  top: 50%;
  left: 50%;
	position: fixed;
}

.large > .main > .time {
	margin: 0;
}

.large > .main > .time.date {
	margin-top: -10px;
}

.large > .black {
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-color: black;
  z-index: 0;
}

.parent {
  position: absolute;
  top: 0;
}

	.bcontainer {
		position: fixed;
		right: 10px;
		bottom: 10px;
		/*width: 33px;
		height: 13px;*/
		transform: scale(4);
		transform-origin: bottom right;
		height: 9.6px;
	}
</style>
