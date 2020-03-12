import { create, tsx } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';

import Home from './Home';
import About from './About';
import Profile from './Profile';

const factory = create({ icache });

export default factory(function App({ middleware: { icache } }) {
	const view = icache.getOrSet<string>('view', 'home');

	let mainView = <Home />;
	if (view === 'about') {
		mainView = <About />;
	} else if (view === 'profile') {
		mainView = <Profile />;
	}

	return (
		<virtual>
			<header class="header">
				<h1 class="logo">
					<a
						href="#"
						onclick={(event) => {
							event.preventDefault();
							icache.set('view', 'home');
						}}
					>
						Lazy Example
					</a>
				</h1>
				<ul class="main-nav">
					<li>
						<a
							href="#"
							onclick={(event) => {
								event.preventDefault();
								icache.set('view', 'home');
							}}
						>
							Home
						</a>
					</li>
					<li>
						<a
							href="#"
							onclick={(event) => {
								event.preventDefault();
								icache.set('view', 'about');
							}}
						>
							About
						</a>
					</li>
					<li>
						<a
							href="#"
							onclick={(event) => {
								event.preventDefault();
								icache.set('view', 'profile');
							}}
						>
							Profile
						</a>
					</li>
				</ul>
			</header>
			<main>{mainView}</main>
		</virtual>
	);
});
