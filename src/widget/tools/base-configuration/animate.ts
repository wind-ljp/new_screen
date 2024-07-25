/*
 * 动画配置
 * @Author:  liaojp
 * @Date: 2022-08-10 10:15:40
 * @Last Modified by:  liaojp
 * @Last Modified time: 2022-08-16 15:04:48
 */
const animate = {
	configureValue: {
		styleAnimateInfinite: false,
		styleAnimationDelay: 0,
		styleAnimationName: '',
		styleAnimationDuration: 1,
		styleAnimationTimingFunction: 'linear'
	},
	configure: [
		{
			name: '动画',
			list: [
				{
					componentName: 'Select',
					label: '动画名称',
					name: 'styleAnimationName',
					required: false,
					placeholder: '请选择动画',
					options: [
						{ code: 'bounce', name: '弹跳' },
						{ code: 'flash', name: '闪烁' },
						{ code: 'pulse', name: '脉冲' },
						{ code: 'rubberBand', name: '橡皮筋' },
						{ code: 'shake', name: '抖动' },
						{ code: 'swing', name: '摇摆' },
						{ code: 'tada', name: '转出' },
						{ code: 'wobble', name: '摇晃' },
						{ code: 'bounceIn', name: '缩放弹入' },
						{ code: 'bounceInDown', name: '从下弹入' },
						{ code: 'bounceInLeft', name: '从左弹入' },
						{ code: 'bounceInRight', name: '从右弹入' },
						{ code: 'bounceInUp', name: '从上弹入' },
						{ code: 'bounceOut', name: '缩放弹出' },
						{ code: 'bounceOutDown', name: '从下弹出' },
						{ code: 'bounceOutLeft', name: '从左弹出' },
						{ code: 'bounceOutRight', name: '从右弹出' },
						{ code: 'bounceOutUp', name: '从上弹出' },
						{ code: 'fadeIn', name: '渐渐进入' },
						{ code: 'fadeInDown', name: '从下进入' },
						{ code: 'fadeInDownBig', name: '从下进入快' },
						{ code: 'fadeInLeft', name: '从左进入' },
						{ code: 'fadeInLeftBig', name: '从左进入快' },
						{ code: 'fadeInRight', name: '从右进入' },
						{ code: 'fadeInRightBig', name: '从右进入快' },
						{ code: 'fadeInUp', name: '从上进入' },
						{ code: 'fadeInUpBig', name: '从上进入快' },
						{ code: 'fadeOut', name: '慢慢消失' },
						{ code: 'fadeOutDown', name: '向下消失' },
						{ code: 'fadeOutDownBig', name: '向下消失快' },
						{ code: 'fadeOutLeft', name: '向左消失' },
						{ code: 'fadeOutLeftBig', name: '向左消失快' },
						{ code: 'fadeOutRight', name: '向右消失' },
						{ code: 'fadeOutRightBig', name: '向右消失快' },
						{ code: 'fadeOutUp', name: '向上消失' },
						{ code: 'fadeOutUpBig', name: '向上消失快' },
						{ code: 'flip', name: '翻转' },
						{ code: 'flipInX', name: '水平转入' },
						{ code: 'flipInY', name: '垂直转入' },
						{ code: 'flipOutX', name: '水平转出' },
						{ code: 'flipOutY', name: '垂直转出' },
						{ code: 'lightSpeedIn', name: '跑马灯进入' },
						{ code: 'lightSpeedOut', name: '跑马灯消失' },
						{ code: 'rotateIn', name: '旋转进入' },
						{ code: 'rotate', name: '旋转' },
						{ code: 'rotateInDownLeft', name: '从左边向下旋转进入' },
						{ code: 'rotateInDownRight', name: '从右边向下旋转进入' },
						{ code: 'rotateInUpLeft', name: '从左边向上旋转进入' },
						{ code: 'rotateInUpRight', name: '从右边向上旋转进入' },
						{ code: 'rotateOut', name: '旋转消失' },
						{ code: 'rotateOutDownLeft', name: '从左边向下旋转消失' },
						{ code: 'rotateOutDownRight', name: '从右边向下旋转消失' },
						{ code: 'rotateOutUpLeft', name: '从左边向上旋转消失' },
						{ code: 'rotateOutUpRight', name: '从右边向上旋转消失' },
						{ code: 'slideInUp', name: '向上滑动进入' },
						{ code: 'slideInDown', name: '向下滑动进入' },
						{ code: 'slideInLeft', name: '向左滑动进入' },
						{ code: 'slideInRight', name: '向右滑动进入' },
						{ code: 'slideOutLeft', name: '向左滑动消失' },
						{ code: 'slideOutRight', name: '向右滑动消失' },
						{ code: 'slideOutUp', name: '向上滑动消失' },
						{ code: 'slideOutDown', name: '向下滑动消失' },
						{ code: 'hinge', name: '合页' },
						{ code: 'rollIn', name: '滚入' },
						{ code: 'rollOut', name: '滚出' }
					]
				},
				{
					componentName: 'Select',
					label: '动画属性',
					name: 'styleAnimationTimingFunction',
					required: false,
					placeholder: '请选择时间',
					options: [
						{ code: 'linear', name: '线性' },
						{ code: 'ease', name: '缓动' },
						{ code: 'ease-in', name: '缓入' },
						{ code: 'ease-out', name: '缓出' },
						{ code: 'ease-in-out', name: '缓入缓出' }
					]
				},
				{
					componentName: 'InputNumber',
					label: '时间',
					name: 'styleAnimationDuration',
					required: false,
					placeholder: '请选择时间',
					min: 0,
					max: 100
				},
				{
					componentName: 'InputNumber',
					label: '延迟',
					name: 'styleAnimationDelay',
					required: false,
					placeholder: '请选择延迟时间',
					min: 0,
					max: 100
				},
				{
					componentName: 'Switch',
					label: '循环播放',
					name: 'styleAnimateInfinite',
					required: false,
					placeholder: '请选择是否循环播放'
				}
			]
		}
	]
};

export default animate;
