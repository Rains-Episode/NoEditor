const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const tsify = require('tsify');

const build = () => {
	return browserify({
		basedir: './',
		debug: true,
		entries: ['src/ts/index.ts'],
		cache: {},
		packageCache: {}
	}).plugin(tsify, { target: 'es6' })
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('./bin/bundle'));
}

gulp.task('build', build);

gulp.task('default', () => {
	gulp.watch('./src/ts/**/*.ts', {
		delay: 1000
	}, build);
});
