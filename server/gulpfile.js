var gulp = require('gulp');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');
var del = require('del');


gulp.task('build', function () {
    console.log('compile start');
    try {
	    return gulp.src('./src/**/*.js')
		    .pipe(plumber())
		    .pipe(babel())
		    .pipe(gulp.dest('./dist'))
    } catch (e) {
      console.log(e)
    }

});

gulp.task('clean', function () {
    del([
        // 这里我们使用一个通配模式来匹配 `mobile` 文件夹中的所有东西
        './dist/**/*',
        // 我们不希望删掉这个文件，所以我们取反这个匹配模式
        // '!dist/mobile/deploy.json'
    ]);
});

gulp.task('watch', function () {
    gulp.watch('./src/**/*.js', ['clean', 'build']);
    console.log('start watch')
});


gulp.task('dev', ['clean', 'build', 'watch']);
