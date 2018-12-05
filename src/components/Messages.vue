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
				axios.get(window.APIROOT + "/calendar/events").then(response => {
					this.fetched = false
					response.data.forEach(function (event) {
						event.start.dateTime = moment(event.start.dateTime).format('YYYY-MM-DDTHH:mm:ss.SSSZ')
					})
					let events = response.data
					events.sort(function(a, b){
						return moment(a.start.dateTime) - moment(b.start.dateTime);
					})
					this.firstTime = null

					if (moment().hour() <= 5){
						var day = moment().format('YYYY-MM-DD')
					}
					else {
						var day = moment().add(1, 'days').format('YYYY-MM-DD')
					}
					console.log("day", events)
					for (let i in events){
						let est = moment(events[i].start.dateTime)
						if (day == est.format('YYYY-MM-DD')){
							this.firstTime = est
							break
						}
					}
					console.log("FT", this.firstTime.format('YYYY-MM-DD HH:mm:ss'))
					// gotta take into account it being early in the morning
					if (this.firstTime == null){
						if (moment().hour() <= 5){
							this.firstTime = moment().hour(10).minute(0).second(0).millisecond(0)
						}
						else {
							this.firstTime = moment().add(1, 'days').hour(10).minute(0).second(0).millisecond(0)
						}
					}

					this.setTime()
				})
			},
			setTime(){
				this.message1 = 'You need to wake up for ' + this.firstTime.format('hh:mm') + ', in ' + this.firstTime.fromNow() + ' time';
				let sleepTime = moment(this.firstTime).subtract(8 + 1.5, 'hours');
				this.message2 = 'You should go to sleep in ' + sleepTime.fromNow() + ', at ' + sleepTime.format('h:mm');
			}
		},
		created () {
			this.fetchData()
			setInterval(() => this.fetchData(), 60 * 60 * 1000);
			setInterval(() => this.setTime(), 60 * 1000);
		},
	}
</script>

<style scoped>

	.messages {
		position: absolute;
		margin-left: 40px;
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
