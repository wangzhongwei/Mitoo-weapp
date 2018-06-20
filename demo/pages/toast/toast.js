const { Toast } = require('../../components/Mixins/Toast');

Page({
	data() {
		return {
			visible1: false,
			duration: 3000
		}
	},
	methods: {

	},
	showBase() {
		Toast({
			content: 'this is a toast tip!!'
		})
	},
	showSuccess() {
		Toast({
			content: 'loading success!!',
			type: 'success'
		})
	},
	showFail() {
		Toast({
			content: 'Some error occurred',
			type: 'fail'
		})
	}
})
