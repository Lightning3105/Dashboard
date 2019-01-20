<template>
	<div id="app" ref="app">
		<dashboard id="dash"></dashboard>
		<!--camera id="cam"></camera-->
	</div>
</template>

<script>
	import Dashboard from './screens/Dashboard.vue'
	import Camera from './screens/Camera.vue'

	export default {
		name: "app",
		components: {
			Dashboard,
			Camera
		},
		data() {
			return {
				lastScroll: 0,
				scrolling: false
			}
		},
		computed: {
			screenSize () {
				return {x: screen.width, y: screen.height}
			}
		},
		methods: {
			onScroll (event){
				if (this.scrolling){
					return
				}
				let current = document.documentElement.scrollTop
				if (current === this.lastScroll){
					return
				}
				if (current > this.lastScroll){
					document.documentElement.scroll({
						top: 534,
						left: 0,
						behavior: 'smooth'
					});
					this.lastScroll = 534
				}
				else {
					document.documentElement.scroll({
						top: 0,
						left: 0,
						behavior: 'smooth'
					});
					this.lastScroll = 0
				}

				this.scrolling = true
				setTimeout(() => {this.scrolling = false; this.onScroll()}, 1000)
			}
		},
		created () {
			//window.addEventListener('scroll', this.onScroll);
		},
		destroyed () {
			window.removeEventListener('scroll', this.onScroll);
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
</style>
