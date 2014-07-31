/*global module:false*/
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> Rihards Steinbergs \n' +
            "* Created by Rihards Steinbergs \n*/",

        // generating minified and uglified js files from source
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: ["assets/js/src/*.js"],
                dest: "assets/js/combined.js"
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: "assets/js/combined.js",
                dest: "assets/js/combined.min.js"
            }
        },

        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: false,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
            },
            gruntfile: {
                src: 'Gruntfile.js'
            }
        },

        // compile a development and a minified css file
        sass: {
            development: {
                options: {
                    compress: false
                },
                files: {
                    "assets/css/combined.css": "assets/css/main.scss"
                }
            },
            production: {
                options: {
                    style: "compressed"
                },
                files: {
                    "assets/css/combined.min.css": "assets/css/main.scss"
                }
            }
        },

        usebanner: {
            cssbanner: {
                options: {
                    banner: '<%= banner %>'
                },
                files: {
                    src: ["assets/css/combined.css", "assets/css/combined.min.css"]
                }
            }
        },

        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },

            js: {
                files: ["assets/js/src/*.js"],
                tasks: ["concat:dist", "uglify:dist"]
            },

            css: {
                files: ["assets/css/*.scss"],
                tasks: ["sass", "usebanner"]
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-banner');

    // Default task.
    grunt.registerTask('default', [/*'jshint',*/ /*'nodeunit',*/ 'concat', 'uglify', 'sass', 'usebanner']);
};
