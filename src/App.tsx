import { create, tsx, w } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';

const factory = create({ icache });

export default factory(function App({ middleware: { icache } }) {
	const view = icache.getOrSet<string>('view', 'home');

	let mainView = w(
		{
			label: 'home',
			registryItem: () => {
				return import('./Home');
			}
		},
		{}
	);
	if (view === 'about') {
		mainView = w(
			{
				label: 'about',
				registryItem: () => {
					return import('./About');
				}
			},
			{}
		);
	} else if (view === 'profile') {
		mainView = w(
			{
				label: 'profile',
				registryItem: () => {
					return import('./Profile');
				}
			},
			{}
		);
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
