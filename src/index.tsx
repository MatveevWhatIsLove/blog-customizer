import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [ArtState, setArtState] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': ArtState.fontFamilyOption.value,
					'--font-size': ArtState.fontSizeOption.value,
					'--font-color': ArtState.fontColor.value,
					'--container-width': ArtState.contentWidth.value,
					'--bg-color': ArtState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setState={setArtState} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
