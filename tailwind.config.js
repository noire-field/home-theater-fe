module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		"./node_modules/flowbite/**/*.js"
	],
	theme: {
		extend: {},
		colors: {
			'kuro': {
				5: '#343a40',
				6: '#30363d',
				7: '#161b22',
				8: '#0d1117'
			},
			'shiro': '#FFFFFF'
		}
	},
	plugins: [
        require('flowbite/plugin')
    ]
}