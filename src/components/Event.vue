<template>
<div :class="{event: true, 'split': split}" :style="addStyle">
<p class="summary">{{formatSummary}}</p>
<p class="time">{{time}}</p>
	<p class="time">{{duration}}</p>
</div>
</template>

<script>
	import moment from 'moment';
	export default {
		name: "Event",
		props: ['data', 'split'],
		data () {
			return {
				time: '',
				duration: ''
			}
		},
		methods: {
			isToday() {
				return moment().format('YYYY/MM/DD') === moment(this.data.start.dateTime).format('YYYY/MM/DD')
			},
			setTime(){
				if(this.isToday()){
					this.time = moment(this.data.start.dateTime).format('hh:mm a') + ' - ' + moment(this.data.start.dateTime).fromNow()
					this.duration = '➜ ' + moment(this.data.start.dateTime).format('hh:mm a') + ' ' + this.getDuration(this.data.start.dateTime, this.data.end.dateTime)
				}
				else{
					this.time = moment(this.data.start.dateTime).format('hh:mm a')
					this.duration = this.getDuration(this.data.start.dateTime, this.data.end.dateTime)
				}
			},
			getDuration(start, end){
				if (moment(end).diff(moment(start), 'hours') > 0){
					return '(' + moment(end).diff(moment(start), 'hours') + ' hour' + ((moment(end).diff(moment(start), 'hours') === 1) ? '' : 's') + ')'
				}
				else {
					return '(' + moment(end).diff(moment(start), 'minutes') + ' minutes' + ')'
				}
			}
		},
		created () {
			this.setTime()
			setInterval(() => this.setTime(), 1 * 60 * 1000);
		},
		computed: {
			addStyle() {
				var colour = 'white';
				switch (this.data.organizer.displayName){
					case 'University':
						colour = 'lime';
						break
					case 'My Timetable':
					case 'https://timetable.soton.ac.uk/Feed/Index/-mrhDMAnBJEkGsNWu6FY4HCudyzieLwONcOi_tKXL_uGh0lgt5UDVGXWTvgjWQV8FhvWSlFrnZ5wHAy4lRQOcg2':
						colour = 'orange';
						break
					case 'James Waters':
						colour = 'deepskyblue';
						break
				}
				return {
					'background-color': colour
				}
			},
			formatSummary(){
				//(data.summary.length &lt; 30) ? data.summary : data.summary.substring(0,24)+'...'
				let maxLen = 40
				if (this.split){
					maxLen = 30
				}
				if (this.isToday()){
					maxLen *= 1.4
				}
				if (this.data.summary.length < maxLen){
					return this.data.summary
				}
				else {
					return this.data.summary.substring(0,maxLen - 6) + '...'
				}
			}
		}
	}
</script>

<style scoped>
.event {
	min-height: 20%;
	width: 90%;
	margin: 0 5% 3% 5%;
	white-space: normal;
	vertical-align:top
}

	.split {
		width: 43%;
		display: inline-block;
		margin-right: 1.8%;
		margin-left: 1.8%;
	}

p {
	margin: 0;
	font-size: 12px;
	color: darkslategray;
	font-family: Roboto;
}

	.time {
		font-weight: bold;
		color: black;
		font-size: 14px;
	}
</style>
