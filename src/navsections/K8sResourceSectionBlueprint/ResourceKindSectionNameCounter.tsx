import {useMemo} from 'react';

import {useAppSelector} from '@redux/hooks';
import {filteredResourceMapSelector} from '@redux/selectors/resourceMapSelectors';

import {useSelectorWithRef} from '@utils/hooks';

// import {countResourceErrors, countResourceWarnings} from '@utils/resources';
import {SectionCustomComponentProps} from '@shared/models/navigator';
import {isDefined} from '@shared/utils/filter';

import * as S from './ResourceKindSectionNameCounter.styled';

function ResourceKindSectionCounter({sectionInstance, onClick}: SectionCustomComponentProps) {
  const {id, isSelected, itemIds} = sectionInstance;

  const isCollapsed = useAppSelector(state => state.navigator.collapsedSectionIds.includes(id));
  const [, filteredResourceMapRef] = useSelectorWithRef(filteredResourceMapSelector);

  const resources = useMemo(
    () => itemIds.map(itemId => filteredResourceMapRef.current[itemId]).filter(isDefined),
    [itemIds, filteredResourceMapRef]
  );

  // const warningCount = useMemo(() => countResourceWarnings(resources), [resources]);
  // const errorCount = useMemo(() => countResourceErrors(resources), [resources]);
  // TODO: use the above code after the @monokle/validation library is integrated
  const warningCount = 0;
  const errorCount = 0;

  return (
    <>
      <S.Counter $isSelected={isSelected} onClick={onClick}>
        {resources.length}
      </S.Counter>

      {isCollapsed && warningCount > 0 ? (
        <span onClick={onClick}>
          <S.Badge $type="warning" count={warningCount} size="small" />
        </span>
      ) : undefined}

      {isCollapsed && errorCount > 0 ? (
        <span onClick={onClick}>
          <S.Badge $type="error" count={errorCount} size="small" />
        </span>
      ) : undefined}
    </>
  );
}

export default ResourceKindSectionCounter;
