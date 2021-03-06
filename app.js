import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import exphbs from 'express-handlebars';
import serverRouter from './src/routes';
import viewRouter from './viewRoutes/index';
import multer from 'multer';

const upload = multer();

const app = express();

app.use(upload.single('file'));
console.log(app.get('env'));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({ defaultLayout: 'layout', extname: '.hbs' }));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', viewRouter);
serverRouter(app);

// catch 404 and forward to error handler
app.use(function (req, res, next){
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next){
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error =

			req.app.get('env') === 'development' ? err :
			{};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});


module.exports = app;
