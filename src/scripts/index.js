import '../styles/index.scss';
import { userScript } from './extra/user';

if (process.env.NODE_ENV === 'development') {
	require('../index.html');
}

const userStack = {
	language: 'JavaScript',
	framework: 'React',
};

const user = {
	name: 'Andrei',
	age: '20',
	...userStack,
};

$('.block').html('jQuery is working');

userScript('.user');

console.log(user);
