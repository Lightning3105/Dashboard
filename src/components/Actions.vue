<template>
<div class="actions">
	<action-button :data="button" v-for="button in buttons" :key="button.url"></action-button>
</div>
</template>

<script>
	import ActionButton from './ActionButton.vue'

	export default {
		name: "Actions",
		components: {
			ActionButton
		},
		data () {
			return {
				buttons: [
					{icon: 'lightbulb', url: '/lights/toggle', background: 'getpower'},
					{icon: 'sun', url: '/lights/mode/day', background: 'getmodes'},
					{icon: 'regular/sun', url: '/lights/mode/evening', background: 'getmodes'},
					{icon: 'regular/moon', url: '/lights/mode/night', background: 'getmodes'},
					{icon: 'moon', url: '/lights/mode/dark', background: 'getmodes'},
					{icon: 'power-off', url: '/dashboard/screen/toggle', background: 'linear-gradient(90deg, #4b6cb7 0%, #182848 100%)'},
				]
			}
		}
	}
</script>

<style scoped>

	.actions {
		position: absolute;
		margin-bottom: 25px;
		margin-right: 25px;
		right: 0;
		bottom: 0;
		width: 15%;
		height: 60%;
	}

</style>
