import {useCallback} from 'react';

import {useAppDispatch} from '@redux/hooks';
import {toggleRule} from '@redux/validation/validation.slice';

import {Button} from '@src/App.styled';

import {OPA_INTEGRATION} from '@shared/models/integrations';

import ValidationPaneHeading from '../ValidationPaneHeading';
import * as S from './ValidationOpenPolicyAgent.styled';
import {ValidationOpenPolicyAgentTable} from './ValidationOpenPolicyAgentTable';

const ValidationOpenPolicyAgent: React.FC = () => {
  const dispatch = useAppDispatch();

  const toggleRules = useCallback(
    (enable: boolean) => {
      dispatch(toggleRule({plugin: 'open-policy-agent', enable}));
    },
    [dispatch]
  );

  return (
    <>
      <ValidationPaneHeading integration={OPA_INTEGRATION} />

      <S.DescriptionContainer>
        <S.Description>Validate your resources with policies. Enable or disable OPA rules in this list.</S.Description>

        <S.DescriptionActions>
          <Button onClick={() => toggleRules(true)}>Enable all</Button>
          <Button onClick={() => toggleRules(false)}>Disable all</Button>
        </S.DescriptionActions>
      </S.DescriptionContainer>

      <ValidationOpenPolicyAgentTable />
    </>
  );
};

export default ValidationOpenPolicyAgent;
