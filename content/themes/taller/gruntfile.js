module.exports = function (grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		uglify: {
			prod: {
				options: {
					mangle: true,
					compress: {
						drop_console: true
					}
				},
				files: {
					'assets/js/application.js': ['assets/js/application.js']
				}
			},

			dev: {
				options: {
					mangle: false,
					compress: false,
					beautify: true,
					preserveComments: 'all'
				},
				files: {
					'assets/js/application.js': [
						'assets/js/index.js',
						'assets/js/post.js',
						'assets/js/prism-adjust.js',

						'assets/js/vendors/prism.js',
						'assets/js/vendors/sticky-kit.js',
						'assets/js/vendors/jquery-hashchange.js',
						// 'assets/js/vendors/console-image/console.image.js',

						'assets/lib/ghost-hunter/jquery.ghostHunter.min.js',
						'assets/lib/masonry/dist/masonry.pkgd.min.js',
						'assets/lib/imagesloaded/imagesloaded.pkgd.min.js',
						'assets/js/vendors/jquery.ghostrelated.js',

						'assets/js/search.js',
						'assets/js/main.js'
					]
				}
			}
		}
	});

	grunt.registerTask('default', ['uglify:dev']);
	grunt.registerTask('prod', ['uglify:dev', 'uglify:prod']);

};
