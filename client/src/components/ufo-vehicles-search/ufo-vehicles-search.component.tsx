import React, { useState } from 'react';
import classNames from 'classnames';

import styles from './ufo-vehicles-search.module.scss';

type UfoVehiclesSearchProps = {
  onVisibleVehiclesChange: (searchValue: string) => void;
  className?: string;
};
export const UfoVehiclesSearch: React.FC<UfoVehiclesSearchProps> = ({
  onVisibleVehiclesChange,
  className
}) => {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleSearchValueChange = (value: string) => {
    setSearchValue(value);
    onVisibleVehiclesChange(value);
  };
  return (
    <div className={classNames(styles.wrapper, className)}>
      <label className={styles.searchLabel} htmlFor="visible-vehicles">
        Visible vehicles:
        <input
          className={styles.searchInput}
          id="visible-vehicles"
          value={searchValue}
          onChange={e => handleSearchValueChange(e.target.value)}
        />
      </label>
    </div>
  );
};
