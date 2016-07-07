/**
 * Created by oospace on 2016/7/7.
 */
//Wrapper函数
'use strict';
module.exports = function(grunt) {

    // 配置项目
    grunt.initConfig({
        // 配置任务
        pkg:grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/js/<%= pkg.name %>.js',
                dest: 'build/js/<%= pkg.name %>.min.js'
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                expand: true,
                cwd: 'src/styles/sass/',
                src: ['*.scss'],
                dest: 'build/styles/css',
                ext: '.css'
            },
            dev: {
                options: {
                    style: 'expanded',
                    debugInfo: true,
                    lineNumbers: true
                },
                expand: true,
                cwd: 'src/styles/sass/',
                src: ['*.scss'],
                dest: 'build/styles/css',
                ext: '.css'
            }
        }
    });
};