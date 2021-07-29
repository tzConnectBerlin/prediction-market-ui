import React from 'react';
import { Grid, Paper, useTheme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { FormikHelpers } from 'formik';
import { FormType, LiquidityValues } from '../../../interfaces';
import { CustomButton } from '../../atoms/Button';
import { Typography } from '../../atoms/Typography';
import { TradeForm, TradeFormProps } from '../TradeForm';
import { PositionItem, PositionSummary } from '../SubmitBidCard/PositionSummary';
import { LiquidityForm, LiquidityFormProps } from '../LiquidityForm';

const PaperContainer = styled(Paper)`
  padding: 2rem;
`;

export interface CurrentAction {
  formType: FormType;
  formValues: TradeFormProps | LiquidityFormProps;
}
export interface AddLiquidityInterface {
  currentPosition: LiquidityValues;
  adjustedPosition: LiquidityValues;
  stablecoinSymbol?: string;
  handleSubmit: (
    values: LiquidityValues,
    formikHelpers: FormikHelpers<LiquidityValues>,
  ) => void | Promise<void>;
}

export interface RemoveLiquidityInterface {
  currentPosition: LiquidityValues;
  adjustedPosition: LiquidityValues;
  stablecoinSymbol?: string;
  handleSubmit: (values: number, formikHelpers: FormikHelpers<number>) => void | Promise<void>;
  handleMaxAmount?: () => void | Promise<void>;
}

export interface FormNavigationProps {
  title?: string;
  formPositions?: PositionItem[];
  actionList: {
    formType: FormType;
    name: string;
  }[];
  current?: CurrentAction;
  handleAction: (formType: FormType) => void | Promise<void>;
}

export const FormNavigation: React.FC<FormNavigationProps> = ({
  title,
  formPositions,
  actionList,
  current,
  handleAction,
}) => {
  const theme = useTheme();
  const { t } = useTranslation(['market']);

  const FormComponent = () => {
    if (!current) return null;
    if (current.formType === FormType.buy || current.formType === FormType.sell) {
      return <TradeForm {...(current.formValues as TradeFormProps)} />;
    }
    return <LiquidityForm {...(current.formValues as LiquidityFormProps)} />;
  };

  return (
    <PaperContainer>
      {(!current || Object.keys(current).length === 0) && (
        <>
          {formPositions && formPositions.length > 0 && (
            <div style={{ marginBottom: theme.spacing(3) }}>
              <Typography component="h5" size={`${theme.spacing(2.75)}px`} fontWeight="bold">
                {title}
              </Typography>
              <PositionSummary title="" items={formPositions} />
            </div>
          )}
          {actionList && actionList.length > 0 && (
            <Grid container flexDirection="column" spacing={1}>
              {actionList.map((item, i) => (
                <Grid item key={i}>
                  <CustomButton
                    label={item.name}
                    backgroundVariant="secondary"
                    fullWidth
                    onClick={() => handleAction(item.formType)}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
      {current && <FormComponent />}
    </PaperContainer>
  );
};

export default FormNavigation;
