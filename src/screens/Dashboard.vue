<template>
	<div>
		<img class="background" src="../assets/background.jpg"/>
		<div class="shade"></div>
		<schedule></schedule>
		<actions></actions>
		<messages></messages>
		<weather></weather>
		<Clock/>
	</div>
</template>

<script>
import Clock from '../components/Clock.vue'
import Schedule from '../components/Schedule.vue'
import Actions from '../components/Actions.vue'
import Messages from '../components/Messages.vue'
import Weather from '../components/Weather.vue'

export default {
	name: 'Dashboard',
	components: {
	Clock, Schedule, Actions, Messages, Weather
	},
	methods: {
	}
}
</script>

<style lang="scss">
.background {
  object-fit: cover;
  height: 100vh;
  width: 100vw;
	position: absolute;
	left: 0;
}

	.shade {
		position: absolute;
		height: 100%;
		width: 100%;
		background: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 20%, rgba(0, 212, 255, 0) 60%);
		top: 0;
	}
</style>
