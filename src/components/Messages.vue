<template>
<div class="messages">
	<h4>{{message1}}</h4>
	<h4>{{message2}}</h4>
</div>
</template>

<script>
	import axios from "axios";
	import moment from 'moment';
	export default {
		name: "Messages",
		data() {
			return {
				message1: '',
				message2: '',
				firstTime: null
			}
		},
		methods: {
			fetchData() {
				axios.get(window.APIROOT + "/calendar/first").then(response => {
					if (response.data){
						this.firstTime = moment(response.data)
					}
					else {
						this.firstTime = null
					}
					//console.log("FT", this.firstTime.format('YYYY-MM-DD HH:mm:ss'))
					// gotta take into account it being early in the morning
					this.setTime()
				})
			},
			setTime(){
				let wakeFor;
				let urgency;
				if (this.firstTime){
					wakeFor = moment(this.firstTime);
					urgency = 'need to';
				}
				else{
					urgency = 'should';
					if (moment().hour() <= 5){
						wakeFor = moment().hour(9).minute(0).second(0).millisecond(0)
					}
					else {
						wakeFor = moment().add(1, 'days').hour(9).minute(0).second(0).millisecond(0)
					}
				}
				this.message1 = `You ${urgency} wake up for ${wakeFor.format('hh:mm a')}, in ${ wakeFor.fromNow()} time`;
				let sleepTime = wakeFor.subtract(8 + 1.5, 'hours');
				this.message2 = `You should go to sleep in ${sleepTime.fromNow()}, at ${sleepTime.format('h:mm')}`;
			}
		},
		created () {
			this.fetchData()
			setInterval(() => this.fetchData(), 60 * 60 * 1000 * 0.5);
			setInterval(() => this.setTime(), 60 * 1000 * 0.5);
		},
	}
</script>

<style scoped>

	.messages {
		position: absolute;
		margin-left: 25px;
		left: 0;
		top: 26%;
		color: white;
		text-align: left;

	}

	h4 {
		margin-bottom: 5px;
		margin-top: 0;
		font-family: Roboto;
		opacity: 0.8;
	}
</style>
