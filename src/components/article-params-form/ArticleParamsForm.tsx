import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import React, { useState, useEffect, useRef } from 'react'; //Хук для установки значений
import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from '../../constants/articleProps';
import { Select } from '../../ui/select';
import { RadioGroup } from '../../ui/radio-group';
import { Separator } from '../../ui/separator';
import { Text } from '../../ui/text';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

export const ArticleParamsForm = ({
	setState,
}: {
	setState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
}) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [settings, setSettings] =
		useState<ArticleStateType>(defaultArticleState);
	const asideRef = useRef<HTMLElement | null>(null);

	// открыть-закрыть
	const handleOpen = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	// Закртыие по клику вне стрелки и формы
	useEffect(() => {
		if (!isMenuOpen) return;

		const closeAside = (e: MouseEvent) => {
			if (asideRef.current && !asideRef.current.contains(e.target as Node)) {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener('mousedown', closeAside);

		return () => {
			document.removeEventListener('mousedown', closeAside);
		};
	}, [isMenuOpen]);

	// Очистка
	const handleClear = () => {
		setSettings(defaultArticleState);
		setState(defaultArticleState);
	};
	// Применить
	const handleApply = (e: React.FormEvent) => {
		e.preventDefault();
		setState(settings);
	};

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={handleOpen} />
			{isMenuOpen && (
				<aside
					className={clsx(styles.container, {
						[styles.container_open]: isMenuOpen,
					})}
					ref={asideRef}>
					<form className={styles.form} onSubmit={handleApply}>
						<Text as='p' size={31} weight={800} uppercase>
							Задайте параметры
						</Text>

						{/* Дропдаун с выбором шрифта */}
						<Select
							options={fontFamilyOptions}
							placeholder='Выбранный шрифт'
							selected={settings.fontFamilyOption}
							onChange={(selected) => {
								setSettings((prev) => ({
									...prev,
									fontFamilyOption: selected,
								}));
							}}
							// onClose = {}
							title='Шрифт'
						/>

						{/* размер шрифта */}
						<RadioGroup
							name='size'
							options={fontSizeOptions}
							selected={settings.fontSizeOption}
							onChange={(value) => {
								setSettings((prev) => ({
									...prev,
									fontSizeOption: value,
								}));
							}}
							title='Шрифт'
						/>

						{/* Цвет шрифта */}
						<Select
							options={fontColors}
							placeholder='Цвет шрифта'
							selected={settings.fontColor}
							onChange={(selected) => {
								setSettings((prev) => ({
									...prev,
									fontColor: selected,
								}));
							}}
							// onClose = {}
							title='Цвет шрифта'
						/>

						<Separator />

						{/* Цвет фона */}
						<Select
							options={backgroundColors}
							placeholder='Цвет фона'
							selected={settings.backgroundColor}
							onChange={(selected) => {
								setSettings((prev) => ({
									...prev,
									backgroundColor: selected,
								}));
							}}
							// onClose = {}
							title='Цвет фона'
						/>

						{/*Ширина контента*/}
						<Select
							options={contentWidthArr}
							placeholder='Цвет фона'
							selected={settings.contentWidth}
							onChange={(selected) => {
								setSettings((prev) => ({
									...prev,
									contentWidth: selected,
								}));
							}}
							// onClose = {}
							title='Ширина контента'
						/>

						<div className={styles.bottomContainer}>
							<Button
								title='Сбросить'
								htmlType='reset'
								type='clear'
								onClick={handleClear}
							/>
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			)}
		</>
	);
};
