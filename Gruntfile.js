module.exports = function(grunt) {
    grunt.initConfig({
        version: '0.11.2',
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                },
                files: {
                    'css/style.css': 'scss/style.scss',
                    'css/menu.css': 'scss/menu.scss',
                    'css/video_banner.css': 'scss/video_banner.scss',
                    'css/banner_image.css': 'scss/banner_image.scss',
                    'css/headings.css': 'scss/headings.scss',
                    'css/about.css': 'scss/about.scss',
                    'css/glitch.css': 'scss/glitch.scss',
                    'css/services.css': 'scss/services.scss',
                    'css/the_grid.css': 'scss/the_grid.scss',
                    'css/team.css': 'scss/team.scss',
                    'css/contacts.css': 'scss/contacts.scss',
                    'css/info_block.css': 'scss/info_block.scss',
                    'css/skills.css': 'scss/skills.scss',
                    'css/call_to_action.css': 'scss/call_to_action.scss',
                    'css/portfolio_modal.css': 'scss/portfolio_modal.scss',
                    'css/line_of_images.css': 'scss/line_of_images.scss',
                    'css/testimonials.css': 'scss/testimonials.scss',
                },
            },
        },
        postcss: {
            options: {
                map: {
                    inline: false,
                    annotation: 'build/css',
                },
                processors: [
                    require('pixrem')(),
                    require('autoprefixer')({ browsers: ['> 1%'] }),
                    require('cssnano')(),
                ],
            },
            dist: {
                src: 'build/css/*.css',
            },
        },
        watch: {
            sass: {
                files: ['scss/*'],
                tasks: ['sass'],
                options: {
                    livereload: true,
                    nospaces: true,
                },
            },
        },
        concat: {
            css: {
                src: [
                    'node_modules/bootstrap/dist/css/bootstrap.css',
                    'node_modules/simple-line-icons/css/simple-line-icons.css',
                    'node_modules/swiper/dist/css/swiper.min.css',
                    'css/style.css',
                    'css/menu.css',
                    'css/video_banner.css',
                    'css/banner_image.css',
                    'css/headings.css',
                    'css/about.css',
                    'css/glitch.css',
                    'css/services.css',
                    'css/the_grid.css',
                    'css/team.css',
                    'css/contacts.css',
                    'css/info_block.css',
                    'css/skills.css',
                    'css/call_to_action.css',
                    'css/portfolio_modal.css',
                    'css/line_of_images.css',
                    'css/testimonials.css',
                ],
                dest: 'build/css/main.min.css',
            },
            js: {
                src: [
                    'node_modules/jquery/dist/jquery.js',
                    'node_modules/jquery-countto/jquery.countTo.js',
                    'node_modules/parallax-js/dist/parallax.js',
                    'node_modules/lazyload/lazyload.min.js',
                    'node_modules/swiper/dist/js/swiper.jquery.min.js',
                    'node_modules/bootstrap/js/tooltip.js',
                    'node_modules/bootstrap/js/popover.js',
                    'js/banner_slider.js',
                    'js/script.js',
                    'js/portfolio.js',
                ],
                dest: 'build/js/app.js',
            },
        },
        uglify: {
            options: {
                mangle: false,
                compress: true,
            },
            my_target: {
                files: {
                    'build/js/app.min.js': [
                        'build/js/app.js',
                    ],
                },
            },
        },
        copy: {
            html: {
                files: [
                    {
                        expand: true,
                        src: ['index.html', 'error.html', 'robots.txt', 'humans.txt', 'favicon.ico'],
                        dest: 'build/',
                    },
                ],
            },
            img: {
                files: [
                    {
                        expand: true,
                        cwd: 'img',
                        src: ['**'],
                        dest: 'build/img/',
                    },
                ],
            },
            fonts: {
                files: [
                    {
                        expand: true,
                        cwd: 'node_modules/simple-line-icons/fonts',
                        src: ['**'],
                        dest: 'build/fonts/',
                    },
                ],
            },
            bg: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['index.html'],
                        dest: '/',
                        rename: function(path, name) {
                            return 'index-bg.html';
                        },
                    },
                ],
            },
            en: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['index.html'],
                        dest: '/',
                        rename: function(path, name) {
                            return 'index-en.html';
                        },
                    },
                ],
            },
            tr_en: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['index-en.html'],
                        dest: '/',
                        rename: function(path, name) {
                            return 'build/index.html';
                        },
                    },
                ],
            },
            tr_bg: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['index-bg.html'],
                        dest: '/',
                        rename: function(path, name) {
                            return 'build/bg/index.html';
                        },
                    },
                ],
            },
        },
        replace: {
            bg: {
                options: {
                    patterns: [
                        {
                            json: grunt.file.readJSON('i18n-bg.json'),
                        },
                    ],
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['index.html'],
                        dest: '/',
                        rename: function(path, name) {
                            return 'index-bg.html';
                        },
                    },
                ],
            },
            en: {
                options: {
                    patterns: [
                        {
                            json: grunt.file.readJSON('i18n-en.json'),
                        },
                    ],
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['index.html'],
                        dest: '/',
                        rename: function(path, name) {
                            return 'index-en.html';
                        },
                    },
                ],
            },
        },
        processhtml: {
            options: {
                data: {
                    version: '2',
                },
            },
            html: {
                files: {
                    'build/index.html': ['build/index.html'],
                    'build/bg/index.html': ['build/bg/index.html'],
                    'build/error.html': ['build/error.html'],
                },
            },
        },
        clean: {
            root: ['.DS_Store'],
            temp: ['dist/temp/*', 'dist/temp/.DS_Store', 'dist/temp/.htaccess', 'dist/temp/.well-known', '!dist/temp/.gitkeep'],
            clappr: ['dist/temp/js/clappr.js', 'dist/temp/js/clappr.min.js', 'dist/temp/js/clappr.min.js.map'],

            dist: ['dist/*', 'dist/.DS_Store', 'dist/.htaccess', 'dist/.gitignore', 'dist/.well-known', '!dist/.git/'],
            distUS: ['distUS/*', 'distUS/.DS_Store', 'distUS/.htaccess', 'distUS/.well-known', '!distUS/.git/'],
            dev: ['dev/*', 'dev/.DS_Store', 'dev/.htaccess', 'dev/.well-known', '!dev/.git/'],
        },
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-replace');

    grunt.registerTask('i18n', ['copy:bg', 'copy:en', 'replace']);
    grunt.registerTask('build', ['sass', 'concat:css', 'postcss', 'concat:js', 'uglify', 'copy:html', 'copy:img', 'copy:fonts', 'i18n', 'copy:tr_en', 'copy:tr_bg', 'processhtml']);
};
