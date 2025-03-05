import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const List = ({ goods }) => {
  return (
    <ul>
      {goods.map(good => (
        <ListItem good={good} key={good} />
      ))}
    </ul>
  );
};

const ListItem = ({ good }) => {
  return <li data-cy="Good">{good}</li>;
};

export const App = () => {
  const [goods, SetGoods] = useState(goodsFromServer);
  const [sortField, SetSortField] = useState('');
  const [reversed, SetReversed] = useState('');
  const [reverseCount, setReverseCount] = useState(0);

  const SORT_ALPHABETICALLY = 'alph';
  const SORT_LENGTH = 'length';
  const REVERSE = 'reversed';

  const sortAlphabetically = () => {
    SetGoods(
      [...goodsFromServer].sort((good1, good2) => good1.localeCompare(good2)),
    );
    SetSortField(SORT_ALPHABETICALLY);

    if (reversed === REVERSE) {
      SetGoods(
        [...goodsFromServer]
          .sort((good1, good2) => good1.localeCompare(good2))
          .reverse(),
      );
    }
  };

  const sortByLength = () => {
    SetGoods(
      [...goodsFromServer].sort((good1, good2) => good1.length - good2.length),
    );

    SetSortField(SORT_LENGTH);

    if (reversed === REVERSE) {
      SetGoods(
        [...goodsFromServer]
          .sort((good1, good2) => good1.length - good2.length)
          .reverse(),
      );
    }
  };

  const reverse = () => {
    SetGoods([...goods].reverse());
    SetReversed(REVERSE);
    setReverseCount(reverseCount + 1);

    if (reverseCount % 2 !== 0) {
      SetReversed('');
    }
  };

  const reset = () => {
    SetGoods(goodsFromServer);
    SetSortField('');
    SetReversed('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SORT_ALPHABETICALLY ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === SORT_LENGTH ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed === REVERSE ? '' : 'is-light'}`}
          onClick={reverse}
        >
          Reverse
        </button>

        {sortField !== '' || reversed !== '' ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        <List goods={goods} />
      </ul>
    </div>
  );
};
