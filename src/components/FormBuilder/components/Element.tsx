import React, {forwardRef, HTMLAttributes} from 'react';
import type {UniqueIdentifier} from '@dnd-kit/core';
import classNames from 'classnames';

//import {removeIcon} from './icons';
import styles from './Element.module.css';

export enum Position {
  Before = -1,
  After = 1,
}

export enum Layout {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
  Grid = 'grid',
}

export interface Props extends Omit<HTMLAttributes<HTMLButtonElement>, 'id'> {
  active?: boolean;
  clone?: boolean;
  insertPosition?: Position;
  id: UniqueIdentifier;
  index?: number;
  layout: Layout;
  onRemove?(): void;
}

export const FormElement = forwardRef<HTMLLIElement, Props>(function Element(
  {id, index, active, clone, insertPosition, layout, onRemove, style, ...props},
  ref
) {
  return (
    <li
      className={classNames(
        styles.Wrapper,
        active && styles.active,
        clone && styles.clone,
        insertPosition === Position.Before && styles.insertBefore,
        insertPosition === Position.After && styles.insertAfter,
        layout === Layout.Vertical && styles.vertical
      )}
      style={style}
      ref={ref}
    >
      {id}
      <button className={styles.Element} data-id={id.toString()} {...props} />
      {!active && onRemove ? (
        <button className={styles.Remove} onClick={onRemove}>
          ❌
        </button>
      ) : null}
      {index != null ? (
        <span className={styles.ElementNumber}>{index}</span>
      ) : null}
    </li>
  );
});
