/* prettier-ignore */
/* eslint-disable */
import React, { FC } from 'react';
import styles from './app-header.module.css';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

export type TAppHeaderUIProps = {
  userName?: string;
  onConstructorClick?: () => void;
  onFeedClick?: () => void;
  onProfileClick?: () => void;
};

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ 
  userName, 
  onConstructorClick, 
  onFeedClick, 
  onProfileClick 
}) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `${styles.link} ${isActive ? styles.link_active : ''}`
          }
        >
          {({isActive})=>(
            <>
              <BurgerIcon type={isActive ? 'primary':'secondary'} />
              <p className='text text_type_main-default ml-2 mr-10'>Конструктор</p>
            </>
          )}
        </NavLink>
        <NavLink 
          to="/feed" 
          className={({ isActive }) => 
            `${styles.link} ${isActive ? styles.link_active : ''}`
          }
        >
          {({isActive})=>(
            <>
              <ListIcon type={isActive ? 'primary':'secondary'} />
              <p className='text text_type_main-default ml-2'>Лента заказов</p>
            </>
          )}
        </NavLink>
      </div>
      <div className={styles.logo}>
        <Logo className='' />
      </div>
      <div 
        className={styles.link_position_last}
        onClick={onProfileClick}
        style={{ cursor: 'pointer' }}
      >
        <ProfileIcon type={'primary'} />
        <p className='text text_type_main-default ml-2'>
          {userName || 'Личный кабинет'}
        </p>
      </div>
    </nav>
  </header>
);
