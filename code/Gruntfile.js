module.exports = function (grunt) {

    // Do grunt-related things in here
    grunt.initConfig({
        watch: {
            options: {
                livereload: true,
            },
            css: {
                files: ['src/styles/scss/*.scss', 'src/styles/scss/*/*.scss'],
                tasks: ['sass']
            },
            scripts: {
                files: ['src/javascript/vendor/**/*.js'],
                tasks: ['wiredep']
            }
        },
        wiredep: {
            target: {
                src: ['src/*.html', '!404.html'],
                exclude: ['/jquery/', '/modernizer/']
            }
        },
        sass: { // Task 
            options: {
                loadPath: require('bourbon').includePaths
            },
            dist: {
                options: {  
                    style: 'expanded',
                    sourcemap: 'none'
                },
                files: { // Dictionary of files 
                    'src/styles/css/main.css': 'src/styles/scss/main.scss',
                }
            }
        },
        copy: {
            main: {
                files: [{ expand: true, cwd: 'src/images', src: '**', dest: 'dist/images' }, 
                { expand: true, cwd: 'src', src: '*.html', dest: 'dist' },
                { expand: true, cwd: 'src/meta', src: '**', dest: 'dist/meta' },
                { expand: true, cwd: 'src/styles/css', src: '*.css', dest: 'dist/css' }]
            }
        },
        autoprefixer: {
            target: {
                expand: true,
                cwd: 'dist/css',
                src: [ '**/*.css' ],
                dest: 'dist/css'
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: [{
                    expand: true,
                    cwd: 'dist/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/css',
                    ext: '.min.css'
                }]
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            target: {
                files: {
                    'dist/js/app.js': ['src/javascript/app.js', 
                        'src/javascript/filters/*.js', 
                        'src/javascript/directives/*.js', 
                        'src/javascript/controllers/*.js'],
                    'dist/js/plugins.js': ['src/javascript/components/*.js']
                }
            }
        },
        bower_concat: {
            target: {
                exclude: [
                    'jquery',
                    'modernizr'
                ],
                dependencies: {
                  'angular': 'jquery'
                },
                dest: {
                    js: 'dist/js/vendor.js',
                    css: 'dist/css/vendor.css'
                },
                include: ['leaflet', 'angular']
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            target: {
                files: {
                    'dist/js/vendor.min.js': ['dist/js/vendor.js'],
                    'dist/js/plugins.min.js': ['dist/js/plugins.js'],
                    'dist/js/app.min.js': ['dist/js/app.js'],
                }
            }
        },
        clean: {
            target: ["dist/js/**/*.js", "!dist/js/**/*.min.js", "dist/css/**/*.css", "!dist/css/**/*.min.css"]
        },
        processhtml: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: ['*.html'],
                    dest: 'dist'
                }]
            }
        },
        replace: {
            target: {
                src: ['dist/css/*.min.css'], 
                overwrite: true, 
                replacements: [{
                    from: '../../images',                   
                    to: '../images'
                }]
            }
        }
         
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-wiredep'); 
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-text-replace');

    grunt.registerTask('default', ['watch', 'wiredep']);
    grunt.registerTask('build', ['copy', 'autoprefixer', 'bower_concat', 'cssmin', 'concat', 'uglify', 'clean', 'processhtml', 'replace']);
    
};