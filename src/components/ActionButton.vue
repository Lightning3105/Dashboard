<template>
<div class="button" @click="go" :style="{'background': background}">
	<fa-icon :name="icon" :scale="scale" :color="colour" :class="{spin: sending}"></fa-icon>
</div>
</template>

<script>
	import FaIcon from "vue-awesome/components/Icon";
	import axios from "axios";
	import { EventBus } from '../event-bus.js';


	export default {
		name: "ActionButton",
		props: ['data'],
		components: {FaIcon},
		data () {
			return {
				background: 'black',
				scale: 2.5,
				colour: 'white',
				icon: this.data.icon,
				sending: false
			}
		},
		methods: {
			go () {
				this.icon = 'sync'
				this.sending = true
				axios.get(window.APIROOT + this.data.url).then(response => {
					this.icon = this.data.icon
					this.sending = false
					EventBus.$emit("buttonclick", this.data.url);
					if (this.data.background == 'getpower') {
						this.getBackground()
						setTimeout(() => this.getBackground(), 3 * 1000);
					}
				}).catch(reason => {
					console.log(reason)
					this.icon = this.data.icon
					this.sending = false
				})
			},
			getBackground() {
				if (this.data.background == 'getmodes'){
					axios.get(window.APIROOT + this.data.url + '/get').then(response => {
						let colours = [response.data.main, response.data.led];
						this.background = `linear-gradient(315deg, ${colours[1]} 0%, ${colours[0]} 74%)`;

					})
				}
				else if (this.data.background == 'getpower'){
					axios.get(window.APIROOT + '/lights/on/get').then(response => {
						if (response.data === 2){
							this.background = 'linear-gradient(315deg, #00b712 0%, #5aff15 74%)';
						}
						if (response.data === 1){
							this.background = 'linear-gradient(315deg, #42378f 0%, #f53844 74%)';
						}
						if (response.data === 0){
							this.background = 'linear-gradient(315deg, #a40606 0%, #d98324 74%)';
						}
					})
				}
				else if (this.data.background == 'ambient'){
					this.background = 'transparent'
					this.scale = 0.6
					this.colour = 'rgba(127, 127, 127, 0.8)'
				}
				else {
					this.background = this.data.background
				}

			}
		},
		created() {
			this.getBackground();
			if (this.data.background == 'getpower') {
				setInterval(() => this.getBackground(), 60 * 1000);
			}
		}
	}
</script>

<style scoped>

	.button {
		width: auto;
		height: 15%;
		border-radius: 10px;
		/*background: linear-gradient(315deg, #0cbaba 0%, #380036 74%);*/


	}

	.button:not(:last-child) { margin-bottom:5px}

	svg {
		top: 50%;
		position: relative;
		transform: translateY(-50%);
		/*color: white;*/
	}

	.spin {
		animation: anispin 1s 0s infinite linear;
		transform-origin: top;
	}

	@keyframes anispin {
		0% {
			-webkit-transform: rotate(0deg) translateY(-50%);
			transform: rotate(0deg) translateY(-50%);
		}
		100% {
			-webkit-transform: rotate(360deg) translateY(-50%);
			transform: rotate(360deg) translateY(-50%);
		}
	}
</style>
