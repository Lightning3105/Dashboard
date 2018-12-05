<template>
	<div id="app">
		<img class="background" src="./assets/background.jpg"/>
		<div class="shade"></div>
		<schedule></schedule>
		<actions></actions>
		<messages></messages>
		<Clock/>
	</div>
</template>

<script>
import Clock from './components/Clock.vue'
import Schedule from './components/Schedule.vue'
import Actions from './components/Actions.vue'
import Messages from './components/Messages.vue'


export default {
	name: 'app',
	components: {
	Clock, Schedule, Actions, Messages
	},
	methods: {

	}
}
</script>

<style lang="scss">
@import '../node_modules/roboto-fontface/css/roboto/roboto-fontface.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body, html {height:100%;}

body {
  margin: 0;
  /*overflow: hidden;*/
}

.background {
  object-fit: cover;
  height: 100vh;
  width: 100vw;
	position: fixed;
	left: 0;
}

	.shade {
		position: absolute;
		height: 100%;
		width: 100%;
		background: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 20%, rgba(0, 212, 255, 0) 60%);
	}
</style>
