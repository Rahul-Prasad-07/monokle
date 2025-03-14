import {useCallback} from 'react';

import {Select} from 'antd';

import invariant from 'tiny-invariant';

import {resourceSetSelected, selectClusterResourceSet} from '@redux/compare';
import {useAppDispatch, useAppSelector} from '@redux/hooks';

import {PartialResourceSet} from '@shared/models/compare';

import * as S from './ResourceSetSelectColor.styled';

type Props = {
  side: 'left' | 'right';
};

export const ClusterContextSelect: React.FC<Props> = ({side}) => {
  const dispatch = useAppDispatch();
  const resourceSet = useAppSelector(state => selectClusterResourceSet(state, side));
  invariant(resourceSet, 'invalid_state');
  const {currentContext, allContexts} = resourceSet;

  const handleSelect = useCallback(
    (context: string) => {
      const value: PartialResourceSet = {type: 'cluster', context};
      dispatch(resourceSetSelected({side, value}));
    },
    [dispatch, side]
  );
  return (
    <S.SelectColor>
      <Select
        defaultOpen={!resourceSet}
        onChange={handleSelect}
        placeholder="Choose context…"
        value={currentContext?.name}
        style={{width: 160}}
      >
        {allContexts.map(context => {
          return (
            <Select.Option key={context.name} value={context.name}>
              {context.name}
            </Select.Option>
          );
        })}
      </Select>
    </S.SelectColor>
  );
};
