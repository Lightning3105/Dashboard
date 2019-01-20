<template>
	<weather
			api-key="f2939a02e9b96fd87b67b9bd8df2be53"
			title="Weather"
			latitude="50.9403502"
			longitude="-1.401844"
			language="en"
			units="uk"
			bar-color="white"
			text-color="white">
	</weather>
</template>

<script>
	import VueWeatherWidget from 'vue-weather-widget';
	import 'vue-weather-widget/dist/css/vue-weather-widget.css';
	export default {
		name: "Weather",
		components: {
			'weather': VueWeatherWidget
		},
	}
</script>

<style>

	.fe_container {
		transform: scale(0.7);
		transform-origin: top right;
		width: 60%;
		position: absolute;
		top: 25px;
		right: 25px;
	}

	.fe_title {
		display: none !important;
	}

</style>
